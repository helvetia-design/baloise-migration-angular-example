# Findings

What this fixture turned up while being built against
`@baloise/ds-angular@19.11.0` / `@baloise/ds-core@19.11.0` on Angular 19.2.

Every item below was reproduced in this app, in a browser, against the installed
packages. Where a workaround was needed it is applied in the code and the call
site carries a comment pointing back here.

---

## 1. `BalFormBundle` cannot be used by a standalone component

`BalFormBundle` contains `BalNgErrorComponent`, which is the only entry in the
package that is **not** `standalone: true` (the other 118 components are).
Spreading the bundle into a standalone component's `imports` fails the build:

```
TS-992011: The directive 'BalNgErrorComponent' appears in 'imports', but is not
standalone and cannot be imported directly. It must be imported via an NgModule.
```

`BalAutoFocus` (the `balAutoFocus` directive) has the same problem.

Both are documented in the official Angular form guide, so the documented
validation pattern

```html
<bal-field-message>
  <bal-ng-error controlName="email" error="isRequired">This field is required</bal-ng-error>
</bal-field-message>
```

is unreachable in an application that uses standalone components only.

**In this app:** `/application` uses the individual form components plus
`BalFieldBundle` / `BalFormGridBundle` / `BalRadioBundle` / `BalCheckboxBundle` /
`BalSelectBundle` / `BalSegmentBundle` instead of `BalFormBundle`, and renders
validation messages with plain `*ngIf` on `bal-field-message`.

Secondary observation: even where it can be imported, `BalNgErrorComponent` is
declared as a bare `@Directive` with no template and no host bindings in this
version — the `@Component` with `<ng-content *ngIf="…hasError">` is commented out
in the shipped source, so its `hasError` getter is never used by anything.

---

## 2. A design-system container silently reorders its children after it re-renders

Reproduced minimally on `/` during development:

```html
<bal-data [border]="true">
  <bal-data-item *ngFor="let fact of facts"> … </bal-data-item>
  <bal-data-item>Jahresprämie</bal-data-item>   <!-- declared LAST -->
</bal-data>
```

renders `Jahresprämie` **first**. The same happens with `bal-list` and with
`bal-stack`.

Isolation result:

| container                        | bound `@Input()`? | resulting order          |
| -------------------------------- | ----------------- | ------------------------ |
| plain `<div>`                    | –                 | loop items, then static  |
| `<bal-stack>` with no bindings   | no                | loop items, then static  |
| `<bal-stack [space]="'small'">`  | yes               | **static, then loop**    |
| `<bal-data>` with no bindings    | no                | loop items, then static  |
| `<bal-data [border]="true">`     | yes               | **static, then loop**    |

So it is not an Angular ordering issue — it is the Stencil non-shadow `<slot>`
relocation running again when the host re-renders. Angular sets `@Input()`
properties *after* the element is created, which triggers that re-render, and the
structural-directive views get re-appended behind the statically created ones.

Build stays green and the console stays clean.

**In this app:** containers are either fully `*ngFor`-driven or fully static.
Where both were wanted, a second container is used (`/` → "Stammdaten" and
"Dokumente").

---

## 3. A group never pushes its props onto `*ngFor`-generated children

`bal-radio-group` / `bal-checkbox-group` propagate `interface`, `columns`,
`columnsTablet`, `columnsMobile`, `disabled`, `readonly` and `invalid` onto their
children in two places: `componentWillLoad()`, and a `MutationObserver` callback
for later additions.

`componentWillLoad()` runs before Angular has inserted the `*ngFor` views, and
the `MutationObserver` never fires for them, because of a case bug in
`packages/core/src/utils/mutation/mutation.listener.ts`:

```ts
this.tags = (options.tags || []).map(t => t.toLowerCase())   // ['bal-radio', …]
…
const hasAddedNodeChanges = tagRecords.some(record =>
  Array.from(record.addedNodes).some((node: any) => this.tags.includes(node.nodeName)),
)                                                      // nodeName is 'BAL-RADIO'
```

`node.nodeName` is upper case and is compared against a lower-cased list, so
`hasAddedNodeChanges` (and `hasRemovedNodeChanges`) is always `false`. Only the
`attributes` branch of the same callback lower-cases correctly, which is why
attribute changes still work.

Result: `<bal-radio-group interface="tile">` with `*ngFor`-generated
`<bal-radio>` children renders plain radio buttons — the tile frame, the column
grid and the tile colours are all missing. No error, no warning.

**In this app:** every loop-generated radio/checkbox repeats `interface` on the
item itself, and passes the column size through `[attr.col-size]` (see finding 4).
Static sibling groups keep the documented group-only form, which works.

---

## 4. 31 components have Stencil props the Angular proxies never expose

Generated by diffing `Components.Bal*` in `@baloise/ds-core` against the
`ɵɵComponentDeclaration` input maps in `@baloise/ds-angular`:

```
BalAccordionDetails: active, animated, state
BalAccordionSummary: active, state
BalAccordionTrigger: active, state
BalApp:              ready
BalCheck:            hovered, pressed
BalCheckbox:         colSize, colSizeMobile, colSizeTablet, hovered, pressed
BalContent:          alignment, direction
BalDropdown:         inverted
BalIcon:             hovered, pressed
BalInput:            hasIconRight
BalInputDate:        hasIconRight
BalLabel:            hovered, pressed
BalModal:            dataTestId, delegate, demo, overlayIndex
BalNavbarBrand:      interface
BalNavbarMenu:       interface
BalNavbarMenuEnd:    interface
BalNavbarMenuStart:  interface
BalNotices:          animated, container, interface
BalPopup:            demo
BalRadio:            colSize, colSizeMobile, colSizeTablet, hovered, pressed
BalRadioIcon:        hovered, pressed
BalSegmentItem:      checked, focused
BalSelect:           inverted
BalSelectOption:     for
BalSnackbar:         actionHandler, closeHandler
BalStack:            alignment, direction
BalSwitch:           hovered, pressed
BalTag:              transparent
BalText:             hovered, pressed
BalToast:            closeHandler
BalTooltip:          demo
```

A *static* attribute still works (`<bal-stack alignment="center">` is written to
the DOM and Stencil parses it), but a *property binding* does not compile:

```
NG8002: Can't bind to 'alignment' since it isn't a known property of 'bal-stack'.
```

**In this app:** static attributes where the value is constant, `[attr.…]`
bindings where the value comes from state — e.g. `[attr.col-size]="3"` on the
loop-generated radio/checkbox tiles, `[attr.interface]="variant"` on the navbar
parts in the showcase.

---

## 5. Event typings that do not match what is emitted

* `bal-checkbox-group`'s `balChange` is declared as
  `EventEmitter<BalEvents.BalCheckboxCustomEvent<boolean>>`, but at runtime the
  detail is the array of selected values. Handlers in this app take the declared
  type and cast the detail.
* `bal-segment` lists `balFocus` in its `ɵcmp` output map but declares no
  `balFocus` member on the class, so binding `(balFocus)` fails
  `strictTemplates` with
  `Property 'balFocus' does not exist on type 'BalSegment'`. Only `balChange`
  and `balBlur` are usable.
* `BalEvents.BalStepItemNavigate` is aliased to `BalStepsCustomEvent` in
  `bal-steps.interfaces.d.ts`, while the Angular proxy emits
  `BalStepItemCustomEvent`. Use the proxy's type in handlers.
* `bal-dropdown`'s `balChange` detail is `string | string[] | undefined` in the
  proxy but `string | string[]` in `BalEvents.BalDropdownChangeDetail`.

---

## 6. `fullheight` and `bal-card-actions` do not combine

`bal-card--has-fullheight` sets `height: 100%` on `.bal-card-content`, so a
`bal-card-actions` or `bal-card-button` sibling is pushed outside the card's
painted background. Visible as detached buttons under the card.

**In this app:** `fullheight` is only used on cards whose only child is
`bal-card-content` — which is also what every documented example does.

---

## 7. Components that are not visually self-sufficient

Confirmed by inspection, and worth repeating because none of them errors:

* **`bal-table`** renders no table styling of its own. The look comes from
  `class="table w-full is-striped is-hoverable"` on the native `<table>` inside
  it. `bal-table` only adds structural/behavioural plumbing.
* **`bal-list background="dark"`** switches its text to white but paints no
  background; the dark surface has to come from a surrounding element.
* **`bal-select-option`** renders its visible text from its children. The
  `label` attribute only feeds `data-label`/ARIA, so both are required.
* **`bal-popup`** couples to its trigger through the literal DOM attribute
  `bal-popup="<id>"` read via `closest('[bal-popup]')` — not through the typed
  `balPopup` `@Input()`. The same applies to `bal-popover-trigger` on
  `bal-popover`'s trigger element.
* **`bal-popup`**'s `variant` is resolved at present time from
  `getValue(trigger, 'bal-popup-variant', this.variant)`, so the rendered
  container class stays `variant-popover` until the popup is first opened.
* **`bal-radio interface="tile"` / `bal-checkbox interface="tile"`** need the
  documented body (`bal-stack` → `bal-icon` + `bal-content` + `bal-radio-icon` /
  `bal-check` / `bal-switch`). A bare text child renders an unframed radio.

---

## 8. Build warning from the Stencil loader under esbuild

`ng build` emits one warning:

```
▲ [WARNING] The glob pattern import("./**/*.entry.js*") did not match any files [empty-glob]
    node_modules/@stencil/core/internal/client/index.js:169:2
```

This is the Stencil lazy-loader's dynamic import being statically analysed by
esbuild. The entry chunks *are* emitted (`bal-check_7-entry`, `bal-list_8-entry`,
…) and all lazy components — including the animated logo, the spinner animation
and the floating-ui-based popover family — load at runtime without a 404. The
React/Vite workaround for this family of problems is **not** needed here and has
deliberately not been copied over.
