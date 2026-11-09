# Coverage

The checklists below are generated, not eyeballed. Regenerate them with:

```bash
node tools/coverage-report.mjs > docs/coverage-report.txt
```

`docs/coverage-report.txt` is the raw output and is the evidence behind every
claim on this page. Two more checks ship alongside it:

```bash
node tools/diff-proxy-props.mjs      # Stencil props the Angular proxies omit
node tools/find-mixed-children.mjs   # structural + static children in one bal-* container
```

---

## 1. One default usage with no props

Every component in the brief's list appears once with no props on `/showcase`,
directly under its section heading — for example `<bal-badge>42</bal-badge>`,
`<bal-divider></bal-divider>`, `<bal-input name="input-default">`. The section
subtitle names the enum props that follow.

## 2. Every enum prop, at least once with a non-default value

All of this lives on `/showcase`. The value lists come from
`src/app/data/showcase.data.ts`, which mirrors the `BalProps.*` unions in
`@baloise/ds-core`, so the showcase renders the *complete* set of each enum
rather than a sample.

| component | enum props covered |
| --- | --- |
| bal-accordion | `bal-accordion-trigger` `variant`, `color`, `size`; `card` |
| bal-badge | `color`, `size`, `position` |
| bal-button | `color` (16), `size`, `elementType`, `target` |
| bal-button-group | `position`, `direction` |
| bal-card | `color` (30), `space`; `bal-card-actions` `position` |
| bal-carousel | `interface`, `controls`, `itemsPerView`, `aspectRatio`, `space`, `htmlRole`; item `color`, `htmlRole` |
| bal-checkbox | `interface` (4), tile `color` (5), `columns` (4) |
| bal-close | `size` |
| bal-content | `layout`, `direction`, `space`, `align` |
| bal-data | `border`, `horizontal` (booleans — no enums) |
| bal-date | no enum props; states and `bal-date-calendar` covered |
| bal-divider | `layout`, `borderStyle`, `color` (12), `space` (11) |
| bal-dropdown | `size`, `theme`, `filter` |
| bal-field | label `weight`/`size`, message `color` |
| bal-file-upload | no enum props; states covered |
| bal-footer | `logoBrand` (in the app shell) |
| bal-form-col | `size` (7) |
| bal-heading | `level` (7), `visualLevel` (8), `color` (7), `space` (4) |
| bal-hint | no enum props; `small` covered |
| bal-icon | `color` (18), `size` (8), `tileColor` (5) + both icon-name families |
| bal-input | `type`, `inputmode` (8), `mask` (7), `textAlign` (3), `autocorrect` |
| bal-input-slider / bal-input-stepper | no enum props; ranges and states covered |
| bal-label | `weight`, `size` (6) |
| bal-list | `size`, `background` (3); accordion-head `icon`, body `contentAlignment` (4) / `contentSpace` (2); item-title `level`/`visualLevel` |
| bal-logo | `color`, `size`, `brand` |
| bal-modal | `space` (3) |
| bal-navbar | `interface`, `container`, `light` |
| bal-notification | `color` (6) |
| bal-number-input | no enum props; `decimal`/`suffix`/states covered |
| bal-pagination | `size`, `interface`, `align` |
| bal-popover | `position` (15); content `color`, `radius` (7) |
| bal-popup | `variant` (3), `placement` (12) |
| bal-progress-bar | `background`, `color` (5) |
| bal-radio | `interface` (3), tile `color` (5), `columns` (4) |
| bal-segment | no enum props; `vertical`/`expanded`/states covered |
| bal-select | `filter` |
| bal-shape | `variation` (3), `color` (8), `rotation` (4) |
| bal-sheet | `containerSize` (5) |
| bal-snackbar | `color` (4) |
| bal-spinner | `color`, `variation` |
| bal-stack | `layout` (5), `space` (11), `px`/`py` (9), `alignment` (10), `direction` (3) |
| bal-steps | `color` (6) |
| bal-table | `expanded` (boolean) |
| bal-tabs | `context` (3), `iconPosition` (2), `vertical` (3 forms), `float` (2), `verticalColSize` (6) |
| bal-tag | `color` (12), `size` (4), `position` (2) |
| bal-text | `size` (4), `space` (4), `color` (13) |
| bal-textarea | `wrap` (3) |
| bal-toast | `color` (4) |
| bal-tooltip | `placement` (4) |

Props that are in the Stencil component but have no Angular `@Input()` are set
through `[attr.…]` or a static attribute — see `docs/FINDINGS.md` §4.

## 3. Composition and nesting

On the portal pages, not on `/showcase`:

* `/` — `bal-card` ▸ `bal-card-content` ▸ `bal-stack` ▸ `bal-icon` + `bal-content` +
  `bal-card-title`/`bal-card-subtitle`; `bal-data` ▸ `bal-data-item` ▸
  `bal-data-label` ▸ `bal-hint`; `bal-list` ▸ `bal-list-item` ▸
  `bal-list-item-icon`/`-content`/`-title`/`-subtitle`; accordion list item with
  `-accordion-head`/`-accordion-body`; `bal-carousel` ▸ `bal-carousel-item` ▸
  `bal-card`.
* `/application` — `bal-form` ▸ `bal-card` ▸ `bal-form-grid` ▸ `bal-form-col` ▸
  `bal-field` ▸ `bal-field-label`/`-hint`/`-control`/`-message`; nested
  `bal-form-grid` inside a `bal-form-col`; `bal-radio-group` tiles with
  `bal-stack` ▸ `bal-icon` + `bal-content` + `bal-radio-icon`; `bal-accordion` ▸
  `-summary`/`-trigger`/`-details`.
* `/claim` — `bal-checkbox-group` tiles with `bal-check`; `bal-sheet` ▸
  `bal-stack` ▸ `bal-button-group`; `bal-modal` ▸ `bal-modal-header`/`-body`.
* `/profile` — `bal-table` ▸ native `<table class="table …">` ▸ `bal-tag` +
  `bal-button`; `bal-dropdown` ▸ `bal-option`; `bal-tabs` ▸ `bal-tab-item` ▸
  `bal-data`.

## 4. Props driven by state or an expression

Everywhere on the portal pages. The deliberate literal/expression pairs the
brief asks for:

| prop | literal | expression |
| --- | --- | --- |
| `bal-card` `color` | `/` "Stammdaten" and "Dokumente" (`color="white"`) | `/` contract cards (`[color]="contract.cardColor"`) |
| `bal-tag` `color` | `/showcase` `bal-tag-group` (`color="primary"` …) | `/showcase` colour loop (`[color]="color"`), `/` (`[color]="statusColor(contract)"`), `/profile` filter chips (ternary) |
| `bal-carousel` `value` | `/showcase` interface/controls examples (uncontrolled) | `/` (`[value]="carouselIndex"`), `/showcase` (`[value]="carouselValue"`) |

Others: `bal-progress-bar` `[value]` and `[color]` (ternary) on `/`,
`bal-steps` `[value]` and `bal-step-item` `[done]` on `/application`,
`bal-tabs` `[value]` in the shell and on `/profile`, `bal-pagination` `[value]`
and `[totalPages]` on `/profile`, `bal-field-message` `[color]` (ternary) on
`/claim`.

## 5. Events and imperative methods

Generated — see the "Event coverage" and "Method coverage" blocks of
`docs/coverage-report.txt`.

* **Events:** every component in the app that declares at least one `bal*`
  output has **all** of its declared outputs bound somewhere, with the single
  exception noted in `docs/FINDINGS.md` §5 (`bal-segment`'s `balFocus` is listed
  in the proxy's output map but has no typed member, so it cannot be bound).
* **Methods:** every component in the app that declares at least one instance
  method has at least one of them called through a `@ViewChild` + `ElementRef`.
  37 components, from `bal-accordion.toggle()` to `bal-tooltip.update()`.

Plus the three injectable services, used through constructor DI:
`BalToastService` (`/claim`, `/showcase`), `BalSnackbarService` (`/`,
`/profile`, `/showcase`), `BalModalService` (`/claim`, `/showcase`, and inside
`ClaimConfirmModalComponent` / `ShowcaseModalComponent` to dismiss).

## 6. Step and tab content — both shapes

| family | shape 1 — items carry panel content | shape 2 — selection strip, page renders the panel |
| --- | --- | --- |
| steps | `/application` "Wie geht es weiter?" (static items with children) | `/application` wizard (`*ngFor` items, no children, panel from `activeStep`) |
| tabs | `/profile` "Vertragsdetails" (static items with children) | app shell navbar (`*ngFor` items, no children, panel is the router outlet) and `/profile` main strip |

`/showcase` adds a third of each with every enum value, so both shapes exist in
the showcase too.

## 7. Loop-generated children

Children produced by `*ngFor` rather than written out as siblings — the full
list is in the "Loop generated children" block of `docs/coverage-report.txt`.
The families the brief calls out:

* **steps** — `bal-step-item` on `/application`
* **tabs** — `bal-tab-item` in the app shell and on `/profile`
* **radio group** — `bal-radio` on `/application`, `/claim`, `/profile`, `/showcase`
* **checkbox group** — `bal-checkbox` on `/application`, `/claim`, `/profile`, `/showcase`
* **carousel** — `bal-carousel-item` on `/` and `/showcase`

Also looped: `bal-select-option`, `bal-option`, `bal-segment-item`,
`bal-list-item`, `bal-data-item`, `bal-tag`, `bal-button`, `bal-field`,
`bal-form-col`, `bal-accordion`, `bal-notification`, `bal-toast`,
`bal-snackbar`, `bal-popover`, `bal-carousel`, `bal-heading`, `bal-text`,
`bal-label`.

What this surfaced is in `docs/FINDINGS.md` §3: a group component never pushes
`interface`/`columns` onto loop-generated children, so those have to repeat the
props themselves.

## 8. Structurally different enum values, covered twice

| prop | first usage | second, differently composed usage |
| --- | --- | --- |
| `bal-radio` `interface="button"` | `/application` step 1, "Anrede" (reactive form) | `/claim`, "Wo ist es passiert?" (template form, with a disabled option) |
| `bal-radio` `interface="tile"` | `/application` step 2, "Objekttyp" (icon + label + description) | `/claim`, "Was ist passiert?" (tile `color` per option) |
| `bal-checkbox` `interface="tile"` | `/claim` checklist (`bal-check` body) | `/showcase` (one tile with `bal-check`, one with `bal-switch`) |
| `bal-checkbox` `interface="button"` | `/application` step 3, "Deckungen" | `/showcase` columns examples |
| `bal-carousel` `interface` | `/` teaser carousel (`card`) | `/showcase` (`card`, `image`, `product`, default) |

## 9. Icons

* **Baked-in names** — `info-circle`, `close`, `plus`, `minus`, `edit`, `trash`,
  `check`, `date`, `document`, `upload`, `menu-bars`, `clock`, `web`,
  `caret-down`, `nav-go-right`. Used across all pages and listed on `/showcase`.
* **Registered names** — 20 entries from `@baloise/ds-icons` plus one
  hand-written SVG (`portal-shield`), all registered through
  `provideBaloiseDesignSystem({ defaults: { icons } })` in
  `src/app/app.config.ts` and listed on `/showcase`. `/profile` uses
  `portal-shield` in the page body, so the registration path is exercised
  outside the showcase too.
* **Brand icons** — four constants from `@baloise/ds-brand-icons` passed to
  `svg` with `color="auto"`, on `/`, `/application`, `/claim` and `/showcase`.

## 10. Form wrappers

`bal-field` + `bal-field-label` + `bal-field-control` + `bal-field-message`
wrap `bal-input`, `bal-number-input`, `bal-textarea`, `bal-select`,
`bal-dropdown`, `bal-date`, `bal-file-upload`, `bal-input-slider`,
`bal-input-stepper`, and the `bal-checkbox-group` / `bal-radio-group` /
`bal-segment` groups on `/application`, `/claim`, `/profile` and `/showcase`.
`bal-form-grid` + `bal-form-col` lay out the multi-field forms on
`/application` and `/claim`, including one nested grid.
