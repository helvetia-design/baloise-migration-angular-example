import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, withInMemoryScrolling } from '@angular/router'
import { provideBaloiseDesignSystem } from '@baloise/ds-angular'

import { routes } from './app.routes'
import { portalIcons } from './data/icons'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideBaloiseDesignSystem({
      defaults: {
        region: 'CH',
        language: 'de',
        allowedLanguages: ['de', 'fr', 'it', 'en'],
        fallbackLanguage: 'en',
        animated: true,
        icons: portalIcons,
      },
      forms: {
        setInvalid: true,
        invalidateOn: 'touched',
      },
    }),
  ],
}
