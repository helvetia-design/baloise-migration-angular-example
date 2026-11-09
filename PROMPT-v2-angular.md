You are building an internal reference application for the Baloise Design System, the
component library this project consumes. Its purpose is to exercise the library broadly,
so the team has one place where every component and its variants can be seen and clicked.
It doubles as the fixture for testing the `ds-migrate-from-baloise` Angular migration path,
the same way the React version of this app (`baloise-migration-react-example`) did for React
— so deliberately exercising edge cases, not just the happy path, is part of the job.

Work only inside this folder. Do not read, list or traverse any directory above it — the
sibling folders are unrelated projects. Your sources of truth are the installed package
types under `node_modules/@baloise/ds-angular/dist/types` (or the package's own `.d.ts`
files if no separate types folder exists) **and the public documentation at
https://design.baloise.dev — in that order of priority reversed: the documented example is
authoritative, the types are only a prop-shape reference.** Use no other UI library; every
piece of UI comes from the Baloise Design System.

## Build method (new)

The type definitions tell you which props exist and what type they are. They do **not**
tell you how a component is meant to be composed, which children it silently requires, or
which of its props only make sense alongside something else. This library's components are
permissive at the type level (`svg: string`, `color: SomeEnum | string`, props typed `any`)
and fail **silently** when misused: wrong-but-type-valid usage renders blank, misaligned, or
invisible — no console error, no type error, build stays green.

Before writing a component's first usage, fetch and read its actual documented example at
design.baloise.dev (or its Storybook iframe under `?viewMode=docs&id=…`). Do not infer
structure, required children, or prop combinations from the type signature alone. Concretely,
check for:

- **Required children, not just attributes.** Some components read their visible content
  from children/innerHTML, not from a same-named prop (`bal-select-option label="X"` renders
  nothing unless it also has `X` as a text child — the `label` attribute only feeds
  `data-label`/ARIA). Match the documented example's children exactly, even when it looks
  redundant with an attribute of the same name.
- **Props that only work with an external wrapper.** Some components adjust their own
  styling for a context they expect the app to supply, rather than providing that context
  themselves (`bal-list background="dark"` switches text to white but does not paint a
  background — the dark surface must come from a surrounding element). If the documented
  example wraps the component in something, replicate that wrapper.
- **Attribute-vs-property traps.** A handful of components couple to each other through a
  literal HTML attribute read via `closest('[attr]')` or `querySelector`, not through the
  typed Angular `@Input()` of the same name (which only sets the JS property and never
  reflects to the DOM unless the component's own metadata marks it `reflect: true`). If
  clicking/toggling does nothing despite bindings looking correct, check whether the real DOM
  attribute is actually present — use `[attr.foo]="x"` instead of `[foo]="x"` when in doubt.
- **Components with near-zero own CSS.** A few components (e.g. a table wrapper) only
  provide structural/behavioral plumbing and expect the actual visual styling to live on a
  native element inside them via utility classes shown in the documented example. Don't
  assume a component is visually self-sufficient just because it renders without error.

If a component's documented example doesn't match what seems like the obvious reading of its
type, defer to the documented example.

## Stack

Angular CLI (`ng new`), standalone components (no `NgModule`s — every Baloise Angular binding
in this package version is `standalone: true`), TypeScript, Angular Router. Dependencies
`@baloise/ds-angular@^19` and `@baloise/ds-styles@^19` (`@baloise/ds-core` comes along
transitively). Wire the styles the documented way, with these five imports in the app's
global stylesheet or entry (`angular.json`'s `styles` array, or `@import`/`@use` in
`styles.scss`):

    @baloise/ds-styles/css/normalize.css
    @baloise/ds-styles/css/font.css
    @baloise/ds-styles/css/structure.css
    @baloise/ds-styles/css/core.css
    @baloise/ds-styles/css/utilities/all.css

Bootstrap the library in `app.config.ts`'s `providers` array with `provideBaloiseDesignSystem()`
from `@baloise/ds-angular`, not a bare global side-effect import — this is the real,
documented API (`EnvironmentProviders`). **Give the config call real, non-default values for
every option it accepts** — `region`, `language`, `allowedLanguages`, and a custom `icons`
entry alongside the standard set — not just an empty `provideBaloiseDesignSystem()` call.
This single call turned out to be one of the richest sources of real bugs in the React
version of this exercise: its shape, its presence or absence, and exactly which keys it
carries all affect how later component migrations are expected to behave. An empty or
missing config call is a materially different (and less useful) test fixture than a populated
one.

Import components either individually from `@baloise/ds-angular`, or via its `Bundle` arrays
(`BalCardBundle`, `BalFormBundle`, `BalTabsBundle`, `BalLayoutBundle`, etc. — check
`node_modules/@baloise/ds-angular/bundles.d.ts` for the full list) into each standalone
component's own `imports: [...]`. Prefer whichever the documented example actually shows;
don't assume one over the other.

**Known packaging quirks — verify, don't assume (new).** The React version of this app needed
a Vite plugin to strip a `/* @vite-ignore */` comment that caused dynamic-import chunks
(animated logo/spinner, a floating-ui loader for popover-family components, a touch/swipe
helper) to 404 at runtime under Vite's bundler. Angular CLI uses esbuild, not Vite, so that
specific fix does not necessarily apply — **do not copy it over**. Instead, once you reach
those same feature areas (animated logo/spinner, anything positioned via popover, touch
gestures), build and actually exercise them; if something 404s or silently fails to animate,
diagnose fresh rather than assuming the Vite-era root cause.

## Structure

Shell: `bal-app` wrapping everything, with `bal-navbar` and `bal-footer`, and `bal-logo` in
the brand slot. Match the documented shell shape: `bal-app` carries the `has-sticky-footer`
class, navigation sits in a native `<header>`, routed content sits in a native `<main>`
(Angular's `<router-outlet>`).

Route `/showcase`: one section per component, each showing that component's enum props with
their distinct values side by side. This is the page someone opens to see what the library
offers.

Four pages of a fictional insurance portal, built from the same components but composed
naturally:

- `/` dashboard — cards, badges, tags, lists, progress bars, data items
- `/application` multi-step application form — steps, form controls, labels, hints,
  validation messages, accordion
- `/claim` claim report — file upload, date picker, textarea, confirmation modal, toast on
  submit
- `/profile` — tabs, segments, checkbox and radio groups, pagination, table, dropdown

**Step and tab content — both shapes, deliberately (expanded from the React run's learning).**
Where a step/tab component exposes an active/inactive visual state controlled by its own item
elements, include **both** of these as genuinely separate, real usages, not just one:

1. At least one steps/tabs group whose items carry real panel content as children, matching
   the documented multi-panel pattern (content toggles because the library's own item
   elements hold it).
2. At least one steps/tabs group used purely as a navigation/selection strip — items with no
   content of their own, where the surrounding page renders the "current step/tab" content
   separately based on application state (exactly how `/application`'s wizard or a
   tabs-as-page-switcher pattern would realistically be built).

These two shapes look almost identical on screen but are structurally opposite, and a
migration tool has to treat them completely differently — one as "rebuild into the new
component's real children," the other as "there is nothing to migrate into, this has to stay
as-is or be restructured by a human." Only building one of the two gives the migration a
single, easy case to handle; both together is what actually stresses it.

**Loop-generated children, not just loop-generated prop values (new).** Point 4 below already
asks for dynamic prop values. Separately, and in addition: at least one steps/tabs group, one
radio/checkbox group, and one carousel's items should be generated from an `*ngFor` over an
array/data source, not written out as static sibling elements. In the React run, every single
instance of this shape — items built from a loop rather than listed by hand — surfaced a
distinct, real migration-tooling limitation (a loop can't always be mechanically split into
the two sibling collections some of the newer components expect). Treat "at least one
component family has `*ngFor`-generated children" as its own checklist item, verified with
the same rigor as point 5's event/method checklist below — list every component whose
children you could plausibly loop over, then confirm which ones actually do in the code.

## Components to cover

Every component below appears at least once, together with its child elements where the
library has them (for example `bal-card-title`, `bal-list-item`, `bal-navbar-brand`,
**and — treat this list as a floor, not just a sample — anything else the documentation
shows as a standard composition of a listed component, such as an accordion-style list item
or an icon variant of a radio/checkbox**):

bal-accordion, bal-app, bal-badge, bal-button, bal-card, bal-carousel, bal-checkbox,
bal-close, bal-content, bal-data, bal-date, bal-divider, bal-dropdown, bal-file-upload,
bal-footer, bal-form-grid, bal-heading, bal-hint, bal-icon, bal-input, bal-input-slider,
bal-input-stepper, bal-label, bal-list, bal-logo, bal-modal, bal-navbar, bal-notification,
bal-number-input, bal-pagination, bal-popover, bal-popup, bal-progress-bar, bal-radio,
bal-segment, bal-select, bal-shape, bal-sheet, bal-snackbar, bal-spinner, bal-stack,
bal-steps, bal-table, bal-tabs, bal-tag, bal-text, bal-textarea, bal-toast, bal-tooltip

Toast, snackbar, and modal have no plain markup element meant for imperative presentation —
use their documented, **injectable Angular services** (`BalToastService`, `BalSnackbarService`,
`BalModalService` from `@baloise/ds-angular`), via constructor dependency injection, the way a
real Angular app would. Do not reach for the framework-agnostic controllers
(`balToastController`, etc.) directly from `@baloise/ds-core` just because they also work —
the services are the documented, idiomatic Angular entry point, and testing the realistic
pattern is the point of this fixture, same reasoning as point 5 below.

**Form-wrapper components, explicitly, not incidentally (new).** Wrap at least several of the
real form controls above (`bal-input`, `bal-select`, `bal-checkbox`/`bal-radio` groups) in
`bal-field` / `bal-field-label` / `bal-field-control` / `bal-field-message`, and group at
least one multi-field layout with `bal-form-grid` / `bal-form-col`, matching how the
documented form examples actually compose them. This is completely natural, realistic usage
— don't avoid it. It is also, as of this writing, a component family the migration skill has
no rewrite path for at all (confirmed during the React run), so expect any future Angular
migration attempt to visibly, correctly leave these wrappers untouched. That is useful
information to capture, not a sign the app was built wrong.

**Icons — both kinds, both "safe" and "unmapped" names (new).** Use `bal-icon` with at least
one name from the legacy icon set's common/baked-in defaults, and at least one name that is
more unusual or domain-specific — the exact split matters less than having more than one, so
a later migration test isn't exercising only the trivially-safe case. Separately, use
`@baloise/ds-brand-icons`: import at least two or three brand icon SVG constants and pass them
to a component's `svg` prop, matching the documented pattern (illustration icons are
multi-color and expect `color="auto"` or no color override, unlike the single-color
`@baloise/ds-icons` set). Both the icon registration call (in `app.config.ts`'s bootstrap, via
`provideBaloiseDesignSystem`'s `icons` option) and direct `bal-icon name="…"` usage sites need
to be present — the registration step and the usage sites are migrated by different parts of
the tooling and need independent coverage.

## Coverage per component

1. one default usage with no props
2. every enum prop at least once with a non-default value (colors, sizes, positions)
3. one composition or nesting case
4. at least one prop whose value comes from state or an expression, not a string literal
5. where the component has them, one event handler and one imperative method or controller
   call **— and verify this the same way as point 2: build a list of every component that
   exposes at least one `bal*` event and every component that exposes at least one
   instance method (from the type definitions), then check off each one against actual
   usage in the code before calling coverage complete. A claim of "done" here needs the same
   evidence as the enum-prop table, not a visual spot-check.**

**For an enum prop whose values select a structurally different render path, not just a
different color — cover it twice, not once (new).** `bal-radio`'s `interface`
(`radio`/`button`/`tile`), `bal-carousel`'s `interface`, and `bal-checkbox`'s `interface` are
exactly this kind of prop: each value changes what gets rendered and how it behaves, not just
how it looks. In the React run, two different values of the same such prop surfaced two
independent, differently-shaped bugs. One usage per value (already required by point 2) is
the floor; where you can, give at least one of those values a second, differently-composed
usage elsewhere in the app, the same way `bal-radio`'s `interface="button"` and
`interface="tile"` should each appear in more than one place if the app has more than one
form.

**Mix literal and dynamic usage of the same prop across different instances (new).** Point 4
asks for at least one non-literal usage somewhere. Go further for at least `bal-card`'s
`color`, `bal-tag`'s `color`, and `bal-carousel`'s `value`: use a plain string-literal value
in one place and a value driven by component state or a ternary in another place, for the
*same* prop on the *same* component. Migration docs frequently have one rule for "this exact
literal maps to that exact new value" and a completely separate rule for "this is not a
literal, leave the expression and flag it" — only exercising one of the two leaves the other
rule unverified.

Point 2 belongs on /showcase. Points 3 to 5 belong on the portal pages, spread over several
files, inside `*ngFor` lists and conditional rendering — not collected into one file.

## Constraints

- No backend, no authentication, no data fetching. Static mock data in plain modules.
- No randomness, no time-dependent values: every page renders identically on every load.
- Every view reachable directly by URL, with no state that must be clicked into existence.
- `tsc --noEmit` (or `ng build`'s own type-checking) and the production build pass; the app
  runs with no console errors or warnings.
- **Passing the build and a clean console are necessary but not sufficient (new).** This
  library fails silently on structural misuse — before calling a component's coverage done,
  look at its actual rendered output (screenshot or direct inspection), not just the absence
  of errors.
- Do not commit anything.
