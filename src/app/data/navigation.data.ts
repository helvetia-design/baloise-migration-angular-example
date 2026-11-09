import { BalLanguage } from '@baloise/ds-core'

export interface NavigationItem {
  readonly route: string
  readonly label: string
  readonly icon: string
  readonly bubble?: boolean
}

/**
 * Source of the navbar tab strip. The items are rendered with `@for`, which makes
 * the whole group loop generated rather than a list of static siblings.
 */
export const MAIN_NAVIGATION: readonly NavigationItem[] = [
  { route: '/', label: 'Übersicht', icon: 'home' },
  { route: '/application', label: 'Antrag', icon: 'document' },
  { route: '/claim', label: 'Schaden melden', icon: 'alert-triangle', bubble: true },
  { route: '/profile', label: 'Profil', icon: 'account' },
  { route: '/showcase', label: 'Showcase', icon: 'star-full' },
]

export interface PortalLanguage {
  readonly code: BalLanguage
  readonly label: string
}

export const PORTAL_LANGUAGES: readonly PortalLanguage[] = [
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
]
