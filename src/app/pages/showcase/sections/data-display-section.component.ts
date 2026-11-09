import { Component, ElementRef, ViewChild } from '@angular/core'
import { NgFor } from '@angular/common'
import {
  BalBadge,
  BalButton,
  BalCardBundle,
  BalCarouselBundle,
  BalDataBundle,
  BalHintBundle,
  BalIcon,
  BalListBundle,
  BalPopover,
  BalPopoverContent,
  BalPopup,
  BalStack,
  BalTable,
  BalTagBundle,
  BalText,
  BalTooltip,
} from '@baloise/ds-angular'

import {
  BADGE_COLORS,
  BADGE_POSITIONS,
  BADGE_SIZES,
  CAROUSEL_ASPECT_RATIOS,
  CAROUSEL_CONTROLS,
  CAROUSEL_HTML_ROLES,
  CAROUSEL_INTERFACES,
  CAROUSEL_ITEMS_PER_VIEW,
  CAROUSEL_ITEM_COLORS,
  CAROUSEL_SPACES,
  LIST_ACCORDION_ICONS,
  LIST_BACKGROUNDS,
  LIST_CONTENT_ALIGNMENTS,
  LIST_CONTENT_SPACINGS,
  LIST_SIZES,
  POPOVER_CONTENT_COLORS,
  POPOVER_CONTENT_RADII,
  POPOVER_PLACEMENTS,
  POPUP_PLACEMENTS,
  POPUP_VARIANTS,
  TAG_COLORS,
  TAG_PLACEMENTS,
  TAG_SIZES,
  TOOLTIP_PLACEMENTS,
} from '../../../data/showcase.data'
import { ShowcaseSectionComponent } from './showcase-section.component'

@Component({
  selector: 'app-data-display-section',
  imports: [
    NgFor,
    ShowcaseSectionComponent,
    BalBadge,
    BalButton,
    ...BalCardBundle,
    ...BalCarouselBundle,
    ...BalDataBundle,
    ...BalHintBundle,
    BalIcon,
    ...BalListBundle,
    BalPopover,
    BalPopoverContent,
    BalPopup,
    BalStack,
    BalTable,
    ...BalTagBundle,
    BalText,
    BalTooltip,
  ],
  templateUrl: './data-display-section.component.html',
})
export class DataDisplaySectionComponent {
  readonly badgeColors = BADGE_COLORS
  readonly badgeSizes = BADGE_SIZES
  readonly badgePositions = BADGE_POSITIONS
  readonly tagColors = TAG_COLORS
  readonly tagSizes = TAG_SIZES
  readonly tagPlacements = TAG_PLACEMENTS
  readonly listSizes = LIST_SIZES
  readonly listBackgrounds = LIST_BACKGROUNDS
  readonly listContentAlignments = LIST_CONTENT_ALIGNMENTS
  readonly listContentSpacings = LIST_CONTENT_SPACINGS
  readonly listAccordionIcons = LIST_ACCORDION_ICONS
  readonly carouselInterfaces = CAROUSEL_INTERFACES
  readonly carouselControls = CAROUSEL_CONTROLS
  readonly carouselItemsPerView = CAROUSEL_ITEMS_PER_VIEW
  readonly carouselAspectRatios = CAROUSEL_ASPECT_RATIOS
  readonly carouselSpaces = CAROUSEL_SPACES
  readonly carouselItemColors = CAROUSEL_ITEM_COLORS
  readonly carouselHtmlRoles = CAROUSEL_HTML_ROLES
  readonly popupVariants = POPUP_VARIANTS
  readonly popupPlacements = POPUP_PLACEMENTS
  readonly popoverPlacements = POPOVER_PLACEMENTS
  readonly popoverContentColors = POPOVER_CONTENT_COLORS
  readonly popoverContentRadii = POPOVER_CONTENT_RADII
  readonly tooltipPlacements = TOOLTIP_PLACEMENTS

  /** Literal counterpart lives in the template; this one is state driven. */
  carouselValue = 1
  closedTags: string[] = []
  lastEvent = ''

  @ViewChild('showcaseCarousel') showcaseCarousel?: ElementRef<HTMLBalCarouselElement>
  @ViewChild('showcasePopover') showcasePopover?: ElementRef<HTMLBalPopoverElement>
  @ViewChild('showcasePopup') showcasePopup?: ElementRef<HTMLBalPopupElement>
  @ViewChild('showcaseTooltip') showcaseTooltip?: ElementRef<HTMLBalTooltipElement>
  @ViewChild('showcaseHint') showcaseHint?: ElementRef<HTMLBalHintElement>
  @ViewChild('showcaseListItem') showcaseListItem?: ElementRef<HTMLBalListItemElement>
  @ViewChild('showcaseCarouselItem') showcaseCarouselItem?: ElementRef<HTMLBalCarouselItemElement>

  onTagClose(label: string) {
    this.closedTags = [...this.closedTags, label]
  }

  onCarouselChange(event: BalEvents.BalCarouselCustomEvent<number | undefined>) {
    this.carouselValue = event.detail ?? 0
  }

  onCarouselItemFocus() {
    this.lastEvent = 'bal-carousel-item balFocus'
  }

  onCarouselItemBlur() {
    this.lastEvent = 'bal-carousel-item balBlur'
  }

  onDataValueFocus() {
    this.lastEvent = 'bal-data-value balFocus'
  }

  onDataValueBlur() {
    this.lastEvent = 'bal-data-value balBlur'
  }

  onDataValueClick() {
    this.lastEvent = 'bal-data-value balClick'
  }

  onListItemAnimate(event: BalEvents.BalListItemCustomEvent<boolean>) {
    this.lastEvent = `bal-list-item balDidAnimate: ${event.detail}`
  }

  onListGroupStateChanged() {
    this.lastEvent = 'bal-list-item balGroupStateChanged'
  }

  onPopoverChange(event: BalEvents.BalPopoverCustomEvent<boolean>) {
    this.lastEvent = `bal-popover balChange: ${event.detail}`
  }

  onPopupAnimate(event: BalEvents.BalPopupCustomEvent<boolean>) {
    this.lastEvent = `bal-popup balWillAnimate: ${event.detail}`
  }

  onTooltipAnimate(event: BalEvents.BalTooltipCustomEvent<boolean>) {
    this.lastEvent = `bal-tooltip balWillAnimate: ${event.detail}`
  }

  nextSlide() {
    void this.showcaseCarousel?.nativeElement.next(1)
  }

  previousSlide() {
    void this.showcaseCarousel?.nativeElement.previous(1)
  }

  async logContainerId() {
    const id = await this.showcaseCarousel?.nativeElement.getContainerId()
    this.lastEvent = `bal-carousel getContainerId(): ${id}`
  }

  focusCarouselItem() {
    void this.showcaseCarouselItem?.nativeElement.setFocus()
  }

  togglePopover() {
    void this.showcasePopover?.nativeElement.toggle()
  }

  presentPopover() {
    void this.showcasePopover?.nativeElement.present()
  }

  dismissPopover() {
    void this.showcasePopover?.nativeElement.dismiss()
  }

  togglePopup() {
    void this.showcasePopup?.nativeElement.toggle()
  }

  async updateTooltip() {
    await this.showcaseTooltip?.nativeElement.present()
    await this.showcaseTooltip?.nativeElement.update()
  }

  dismissTooltip() {
    void this.showcaseTooltip?.nativeElement.dismiss()
  }

  presentHint() {
    void this.showcaseHint?.nativeElement.present()
  }

  dismissHint() {
    void this.showcaseHint?.nativeElement.dismiss()
  }

  toggleListItem() {
    void this.showcaseListItem?.nativeElement.toggle()
  }
}
