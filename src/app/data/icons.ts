import {
  balIconAccount,
  balIconAlertTriangle,
  balIconAudio,
  balIconBack,
  balIconCall,
  balIconDownload,
  balIconFile,
  balIconHelpCustomerSupport,
  balIconHome,
  balIconLink,
  balIconLocation,
  balIconLogout,
  balIconPicture,
  balIconPrint,
  balIconRefresh,
  balIconSearch,
  balIconSend,
  balIconSettings,
  balIconStarFull,
  balIconVideo,
} from '@baloise/ds-icons'

import {
  balBrandIconAssetBuildingGreen,
  balBrandIconCarCrashWithAnimalGreen,
  balBrandIconCarGreen,
  balBrandIconBuildingPurple,
} from '@baloise/ds-brand-icons'

/**
 * A hand drawn SVG that is not part of any Baloise icon package. It is registered
 * under the key `balIconPortalShield`, which makes it reachable as
 * `<bal-icon name="portal-shield">`.
 */
export const balIconPortalShield = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M12 2 4 5.2v6.1c0 4.9 3.4 9.5 8 10.7 4.6-1.2 8-5.8 8-10.7V5.2L12 2Zm0 2.2 6 2.4v4.7c0 3.9-2.5 7.5-6 8.6-3.5-1.1-6-4.7-6-8.6V6.6l6-2.4Zm-1 4.3v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2Z"/></svg>`

/**
 * UI icons that are not part of the baked in default set and therefore have to be
 * registered during bootstrap. The key is what `bal-icon`'s `name` resolves to:
 * `name="help-customer-support"` looks up `balIconHelpCustomerSupport`.
 */
export const portalIcons = {
  balIconAccount,
  balIconAlertTriangle,
  balIconAudio,
  balIconBack,
  balIconCall,
  balIconDownload,
  balIconFile,
  balIconHelpCustomerSupport,
  balIconHome,
  balIconLink,
  balIconLocation,
  balIconLogout,
  balIconPicture,
  balIconPrint,
  balIconRefresh,
  balIconSearch,
  balIconSend,
  balIconSettings,
  balIconStarFull,
  balIconVideo,
  balIconPortalShield,
}

/**
 * Brand icons are multi colour illustrations. They are passed to `bal-icon`'s `svg`
 * property instead of being registered by name, and want `color="auto"`.
 */
export const brandIcons = {
  car: balBrandIconCarGreen,
  building: balBrandIconAssetBuildingGreen,
  household: balBrandIconBuildingPurple,
  carCrashWithAnimal: balBrandIconCarCrashWithAnimalGreen,
}
