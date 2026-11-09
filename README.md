# Baloise Design System — Angular reference app

An internal reference application for the Baloise Design System. It exists for two
reasons:

1. one place where every component of `@baloise/ds-angular` and its variants can be
   seen and clicked;
2. a fixture for the `ds-migrate-from-baloise` Angular migration path — the Angular
   counterpart of `baloise-migration-react-example`.

Because of (2) the app deliberately exercises edge cases, not just the happy path:
both shapes of the steps/tabs contract, loop-generated children next to static ones,
literal *and* expression values for the same prop, attribute-coupled components,
and both icon registration paths.

## Run it

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build, type-checked
```

## Stack

Angular 19 with standalone components and no `NgModule`s, the Angular Router,
`@baloise/ds-angular@^19` and `@baloise/ds-styles@^19` (`@baloise/ds-core` comes
along transitively), plus `@baloise/ds-icons` and `@baloise/ds-brand-icons`.

Styles are wired in `src/styles.scss`:

```scss
@use '@baloise/ds-styles/css/normalize.css';
@use '@baloise/ds-styles/css/structure.css';
@use '@baloise/ds-styles/css/font.css';
@use '@baloise/ds-styles/css/core.css';
@use '@baloise/ds-styles/css/utilities/all.css';
```

The library is bootstrapped in `src/app/app.config.ts` with
`provideBaloiseDesignSystem()`, populated rather than empty:

```ts
provideBaloiseDesignSystem({
  defaults: {
    region: 'CH',
    language: 'de',
    allowedLanguages: ['de', 'fr', 'it', 'en'],
    fallbackLanguage: 'en',
    animated: true,
    icons: portalIcons,          // standard set + one custom entry
  },
  forms: { setInvalid: true, invalidateOn: 'touched' },
})
```

`src/zone-flags.ts` / `src/polyfills.ts` carry the zone.js flags the getting-started
guide asks for, and `angular.json` raises the initial bundle budget to 3 MB / 5 MB
as the guide instructs.

## Routes

| route | what it shows |
| --- | --- |
| `/` | Dashboard — cards, badges, tags, lists, progress bars, data items, a loop-generated carousel, popup, tooltip, hint, snackbar service |
| `/application` | Multi-step application form — steps as a selection strip, reactive form with field wrappers, labels, hints, validation messages, accordion, and a second steps group that owns its panels |
| `/claim` | Claim report — file upload, date picker, textarea, radio/checkbox tiles, a declarative modal, a modal through `BalModalService`, toast on submit, sticky sheet |
| `/profile` | Tabs (both shapes), segments, checkbox and radio groups, pagination, table, dropdown |
| `/showcase` | One section per component: a default usage with no props, then every enum value side by side |

The app shell (`src/app/app.component.html`) is the documented one: `bal-app` with
`has-sticky-footer`, navigation in a native `<header>`, the routed page in a native
`<main>`, and `bal-footer` at the end. `bal-navbar-brand` supplies the `bal-logo` in
the brand slot.

## Layout of the source

```
src/app/
  app.config.ts            provideBaloiseDesignSystem + router
  app.component.*          the bal-app shell, navbar tabs as a navigation strip
  data/                    static mock data and the icon registry — no fetching
  shared/                  the component BalModalService renders into
  pages/
    dashboard/ application/ claim/ profile/
    showcase/              one child component per component family
tools/                     the scripts behind docs/coverage-report.txt
docs/
  COVERAGE.md              what is covered, and where
  coverage-report.txt      generated evidence behind COVERAGE.md
  FINDINGS.md              library behaviour this fixture turned up
```

## Constraints this app keeps

* No backend, no authentication, no data fetching — everything comes from plain
  modules under `src/app/data/`.
* No randomness and no time-dependent values; every page renders identically on
  every load.
* Every view is reachable directly by URL with no state that has to be clicked into
  existence.
* `ng build` type-checks and succeeds; the browser console stays clean on every
  route.

## Read this before changing templates

`docs/FINDINGS.md` records eight behaviours of this library version that fail
silently — a build stays green and the console stays empty while the UI is wrong.
Two of them shape how templates in this app are written:

* a design-system container relocates its slotted children when it re-renders, so a
  container is either fully `*ngFor`-driven or fully static, never both
  (`node tools/find-mixed-children.mjs` checks this);
* a group component never pushes `interface` / `columns` onto `*ngFor`-generated
  children, so loop-generated radios and checkboxes repeat those props themselves.
