import { Component } from '@angular/core'
import { NgFor } from '@angular/common'
import { BalButton, BalButtonGroup, BalClose, BalIcon, BalStack, BalText } from '@baloise/ds-angular'

import { brandIcons } from '../../../data/icons'
import {
  BUTTON_COLORS,
  BUTTON_ELEMENT_TYPES,
  BUTTON_GROUP_DIRECTIONS,
  BUTTON_GROUP_POSITIONS,
  CLOSE_SIZES,
  DEFAULT_ICON_NAMES,
  ICON_COLORS,
  ICON_SIZES,
  ICON_TILE_COLORS,
  REGISTERED_ICON_NAMES,
} from '../../../data/showcase.data'
import { ShowcaseSectionComponent } from './showcase-section.component'

@Component({
  selector: 'app-action-section',
  imports: [
    NgFor,
    ShowcaseSectionComponent,
    BalButton,
    BalButtonGroup,
    BalClose,
    BalIcon,
    BalStack,
    BalText,
  ],
  templateUrl: './action-section.component.html',
})
export class ActionSectionComponent {
  readonly buttonColors = BUTTON_COLORS
  readonly buttonGroupPositions = BUTTON_GROUP_POSITIONS
  readonly buttonGroupDirections = BUTTON_GROUP_DIRECTIONS
  readonly buttonElementTypes = BUTTON_ELEMENT_TYPES
  readonly closeSizes = CLOSE_SIZES
  readonly iconColors = ICON_COLORS
  readonly iconSizes = ICON_SIZES
  readonly iconTileColors = ICON_TILE_COLORS
  readonly defaultIconNames = DEFAULT_ICON_NAMES
  readonly registeredIconNames = REGISTERED_ICON_NAMES
  readonly brandIcons = brandIcons

  lastButtonEvent = ''
  closeCount = 0

  onButtonClick(event: BalEvents.BalButtonCustomEvent<MouseEvent>) {
    this.lastButtonEvent = `balClick auf (${event.detail.clientX | 0}/${event.detail.clientY | 0})`
  }

  onButtonFocus() {
    this.lastButtonEvent = 'balFocus'
  }

  onButtonBlur() {
    this.lastButtonEvent = 'balBlur'
  }

  onButtonDidRender() {
    // balDidRender fires on every render of the button.
  }

  onClose() {
    this.closeCount = this.closeCount + 1
  }
}
