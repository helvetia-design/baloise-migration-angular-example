/**
 * Enum prop value lists for /showcase. Every list is a complete set of the
 * distinct values the matching `BalProps` type accepts, so the showcase can put
 * them side by side.
 */

export const BUTTON_COLORS = [
  'primary',
  'secondary',
  'tertiary',
  'tertiary-purple',
  'tertiary-red',
  'tertiary-yellow',
  'tertiary-green',
  'link',
  'light',
  'success',
  'warning',
  'danger',
  'text',
  'info',
  'primary-light',
  'info-light',
] as const

export const BUTTON_GROUP_POSITIONS = ['', 'center', 'right'] as const
export const BUTTON_GROUP_DIRECTIONS = ['auto', 'row', 'column'] as const
export const BUTTON_ELEMENT_TYPES = ['button', 'reset', 'submit'] as const

export const BADGE_COLORS = [
  '',
  'grey',
  'danger',
  'warning',
  'success',
  'red',
  'yellow',
  'green',
  'purple',
] as const
export const BADGE_SIZES = ['', 'small', 'large'] as const
export const BADGE_POSITIONS = ['', 'card', 'button', 'tabs'] as const

export const TAG_COLORS = [
  '',
  'blue',
  'grey',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
  'green',
  'yellow',
  'red',
  'purple',
] as const
export const TAG_SIZES = ['', 'small', 'medium', 'large'] as const
export const TAG_PLACEMENTS = ['left', 'center'] as const

export const CARD_COLORS = [
  '',
  'white',
  'primary',
  'info',
  'success',
  'warning',
  'danger',
  'grey',
  'blue',
  'red',
  'yellow',
  'purple',
  'green',
  'red-light',
  'yellow-light',
  'purple-light',
  'green-light',
  'grey-light',
  'purple-1',
  'purple-2',
  'purple-3',
  'green-1',
  'green-2',
  'green-3',
  'red-1',
  'red-2',
  'red-3',
  'yellow-1',
  'yellow-2',
  'yellow-3',
] as const
export const CARD_SPACES = ['', 'small', 'medium', 'large'] as const
export const CARD_ACTION_POSITIONS = ['', 'center', 'right'] as const

export const HEADING_LEVELS = ['display', 'display-2', 'h1', 'h2', 'h3', 'h4', 'h5'] as const
export const HEADING_VISUAL_LEVELS = [
  'xxxxx-large',
  'xxxx-large',
  'xxx-large',
  'xx-large',
  'x-large',
  'large',
  'medium',
  'normal',
] as const
export const HEADING_COLORS = ['', 'primary', 'info', 'success', 'warning', 'danger', 'blue'] as const
export const HEADING_SPACES = ['none', 'bottom', 'top', 'all'] as const

export const TEXT_SIZES = ['', 'small', 'lead', 'block'] as const
export const TEXT_SPACES = ['none', 'bottom', 'top', 'all'] as const
export const TEXT_COLORS = [
  '',
  'light-blue',
  'blue-dark',
  'blue-light',
  'primary-light',
  'black',
  'grey',
  'primary',
  'blue',
  'info',
  'success',
  'warning',
  'danger',
] as const

export const LABEL_WEIGHTS = ['bold', 'regular'] as const
export const LABEL_SIZES = ['', 'small', 'large', 'x-large', 'xx-large', 'xxx-large'] as const

export const ICON_COLORS = [
  '',
  'blue',
  'light-blue',
  'success',
  'success-dark',
  'success-darker',
  'danger',
  'danger-dark',
  'danger-darker',
  'warning',
  'warning-dark',
  'warning-darker',
  'grey',
  'grey-light',
  'grey-dark',
  'primary',
  'primary-light',
  'primary-dark',
] as const
export const ICON_SIZES = ['', 'xsmall', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'] as const
export const ICON_TILE_COLORS = ['', 'purple', 'red', 'yellow', 'green'] as const

/** Icon names that ship in the baked in default set. */
export const DEFAULT_ICON_NAMES = [
  'info-circle',
  'close',
  'plus',
  'minus',
  'edit',
  'trash',
  'check',
  'date',
  'document',
  'upload',
  'menu-bars',
  'clock',
  'web',
  'caret-down',
  'nav-go-right',
] as const

/** Icon names that only resolve because they were registered in app.config.ts. */
export const REGISTERED_ICON_NAMES = [
  'account',
  'alert-triangle',
  'call',
  'download',
  'file',
  'help-customer-support',
  'home',
  'link',
  'location',
  'logout',
  'picture',
  'print',
  'refresh',
  'search',
  'send',
  'settings',
  'star-full',
  'video',
  'portal-shield',
] as const

export const CLOSE_SIZES = ['', 'small', 'medium'] as const

export const CONTENT_LAYOUTS = ['', 'horizontal', 'vertical'] as const
export const CONTENT_DIRECTIONS = ['', 'row', 'column'] as const
export const CONTENT_SPACES = ['', 'none', 'xxx-small', 'xx-small', 'x-small', 'small', 'normal'] as const
export const CONTENT_ALIGNMENTS = ['', 'start', 'center', 'end'] as const

export const DIVIDER_LAYOUTS = ['', 'horizontal', 'vertical'] as const
export const DIVIDER_BORDER_STYLES = ['', 'solid', 'dashed'] as const
export const DIVIDER_COLORS = [
  'primary',
  'primary-light',
  'primary-dark',
  'grey-light',
  'grey',
  'grey-dark',
  'warning',
  'success',
  'danger',
  'danger-dark',
  'danger-darker',
  'light-blue',
] as const
export const DIVIDER_SPACES = [
  '',
  'none',
  'xx-small',
  'x-small',
  'small',
  'normal',
  'medium',
  'large',
  'x-large',
  'xx-large',
  'xxx-large',
] as const

export const STACK_LAYOUTS = ['', 'horizontal', 'vertical', 'horizontal-reverse', 'vertical-reverse'] as const
export const STACK_SPACES = [
  '',
  'auto',
  'none',
  'xx-small',
  'x-small',
  'small',
  'normal',
  'medium',
  'large',
  'x-large',
  'xx-large',
] as const
export const STACK_PADDINGS = [
  'none',
  'xx-small',
  'x-small',
  'small',
  'normal',
  'medium',
  'large',
  'x-large',
  'xx-large',
] as const
export const STACK_ALIGNMENTS = [
  '',
  'top start',
  'top center',
  'top end',
  'start',
  'center',
  'end',
  'bottom start',
  'bottom center',
  'bottom end',
] as const
export const STACK_DIRECTIONS = ['', 'row', 'column'] as const

export const SHAPE_VARIATIONS = ['1', '2', '3'] as const
export const SHAPE_COLORS = [
  'green',
  'green-light',
  'red',
  'red-light',
  'purple',
  'purple-light',
  'yellow',
  'yellow-light',
] as const
export const SHAPE_ROTATIONS = ['0', '90', '180', '270'] as const

export const LOGO_COLORS = ['blue', 'white'] as const
export const LOGO_SIZES = ['', 'small'] as const
export const LOGO_BRANDS = ['', 'baloise', 'helvetia'] as const

export const LIST_SIZES = ['', 'small', 'large'] as const
export const LIST_BACKGROUNDS = ['light', 'color', 'dark'] as const
export const LIST_CONTENT_ALIGNMENTS = ['start', 'center', 'end', 'space-between'] as const
export const LIST_CONTENT_SPACINGS = ['none', 'normal'] as const
export const LIST_ACCORDION_ICONS = ['plus', 'nav-go-down'] as const

export const NOTIFICATION_COLORS = ['', 'primary', 'info', 'success', 'warning', 'danger'] as const
export const TOAST_COLORS = ['info', 'success', 'warning', 'danger'] as const
export const SNACKBAR_COLORS = ['info', 'success', 'warning', 'danger'] as const
export const MODAL_SPACES = ['', 'small', 'medium'] as const
export const SPINNER_COLORS = ['blue', 'white'] as const
export const SPINNER_VARIATIONS = ['logo', 'circle'] as const
export const PROGRESS_BACKGROUNDS = ['white', 'grey'] as const
export const PROGRESS_COLORS = ['primary', 'purple', 'yellow', 'red', 'green'] as const
export const SHEET_CONTAINERS = ['', 'fluid', 'detail-page', 'compact', 'blog-page'] as const

export const PAGINATION_SIZES = ['', 'small'] as const
export const PAGINATION_INTERFACES = ['', 'small'] as const
export const PAGINATION_ALIGNMENTS = ['', 'start', 'end'] as const

export const STEPS_COLORS = ['primary', 'light-blue', 'purple', 'yellow', 'red', 'green'] as const

export const TABS_CONTEXTS = ['meta', 'navigation', 'navbar'] as const
export const TABS_ICON_POSITIONS = ['horizontal', 'vertical'] as const
export const TABS_VERTICALS = ['mobile', 'tablet'] as const
export const TABS_FLOATS = ['left', 'right'] as const
export const TABS_COL_SIZES = [
  'one-quarter',
  'one-third',
  'half',
  'two-thirds',
  'three-quarters',
  'full',
] as const

export const ACCORDION_TRIGGER_VARIANTS = ['button', 'icon', 'text'] as const
export const ACCORDION_COLORS = ['primary', 'info'] as const

export const NAVBAR_INTERFACES = ['app', 'simple'] as const

export const CAROUSEL_INTERFACES = ['', 'card', 'image', 'product'] as const
export const CAROUSEL_CONTROLS = ['none', 'small', 'large', 'dots', 'tabs'] as const
export const CAROUSEL_ITEMS_PER_VIEW = ['auto', 1, 2, 3, 4] as const
export const CAROUSEL_ASPECT_RATIOS = ['1by1', '3by2', '4by3', '16by9'] as const
export const CAROUSEL_SPACES = ['none', 'normal', 'medium'] as const
export const CAROUSEL_ITEM_COLORS = ['white', 'green', 'yellow', 'red', 'purple'] as const
export const CAROUSEL_HTML_ROLES = ['', 'tablist', 'list'] as const

export const POPUP_VARIANTS = ['popover', 'fullscreen', 'drawer'] as const
export const POPUP_PLACEMENTS = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
] as const

export const POPOVER_PLACEMENTS = [
  'auto',
  'auto-start',
  'auto-end',
  'top',
  'left',
  'bottom',
  'right',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'right-start',
  'right-end',
  'left-start',
  'left-end',
] as const
export const POPOVER_CONTENT_COLORS = ['white', 'grey'] as const
export const POPOVER_CONTENT_RADII = [
  'none',
  'normal',
  'large',
  'normal-bottom-none',
  'normal-top-none',
  'large-bottom-none',
  'large-top-none',
] as const

export const TOOLTIP_PLACEMENTS = ['top', 'right', 'bottom', 'left'] as const

export const FIELD_LABEL_WEIGHTS = ['bold', 'regular'] as const
export const FIELD_LABEL_SIZES = ['', 'small', 'large', 'x-large', 'xx-large', 'xxx-large'] as const
export const FIELD_MESSAGE_COLORS = ['', 'success', 'warning', 'danger'] as const
export const FORM_COL_SIZES = [
  'full',
  'fullwidth',
  'half',
  'one-third',
  'two-thirds',
  'one-quarter',
  'three-quarters',
] as const

export const INPUT_TYPES = ['text', 'email', 'password', 'search', 'tel', 'url', 'number'] as const
export const INPUT_MODES = ['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'] as const
export const INPUT_MASKS = [
  'vehicle-registration-number',
  'contract-number',
  'basic-contract-number',
  'claim-number',
  'offer-number',
  'be-enterprise-number',
  'be-iban',
] as const
export const INPUT_TEXT_ALIGNS = ['left', 'center', 'right'] as const
export const INPUT_AUTOCORRECTS = ['on', 'off'] as const

export const TEXTAREA_WRAPS = ['hard', 'soft', 'off'] as const

export const SELECT_FILTERS = ['includes', 'starts-with'] as const
export const DROPDOWN_SIZES = ['', 'small'] as const
export const DROPDOWN_THEMES = ['', 'purple'] as const
export const OPTION_LIST_FILTERS = ['includes', 'starts-with'] as const

export const CHECKBOX_INTERFACES = ['checkbox', 'switch', 'button', 'tile'] as const
export const CHECKBOX_TILE_COLORS = ['', 'purple', 'green', 'yellow', 'red'] as const
export const RADIO_INTERFACES = ['radio', 'button', 'tile'] as const
export const RADIO_TILE_COLORS = ['', 'purple', 'green', 'yellow', 'red'] as const
export const GROUP_COLUMNS = [1, 2, 3, 4] as const

export const SHOWCASE_OPTIONS = [
  { value: 'bs', label: 'Basel-Stadt' },
  { value: 'bl', label: 'Basel-Landschaft' },
  { value: 'ag', label: 'Aargau' },
] as const
