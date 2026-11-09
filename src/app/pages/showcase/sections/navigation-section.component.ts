import { Component, ElementRef, ViewChild } from '@angular/core'
import { NgFor } from '@angular/common'
import {
  BalAccordionBundle,
  BalBadge,
  BalButton,
  BalButtonGroup,
  BalCardBundle,
  BalCheckbox,
  BalContent,
  BalIcon,
  BalLabel,
  BalListBundle,
  BalNavbarBundle,
  BalPagination,
  BalPopover,
  BalPopoverContent,
  BalStack,
  BalStepsBundle,
  BalTabsBundle,
  BalText,
} from '@baloise/ds-angular'

import { brandIcons } from '../../../data/icons'
import {
  ACCORDION_TRIGGER_VARIANTS,
  CARD_ACTION_POSITIONS,
  CARD_COLORS,
  CARD_SPACES,
  NAVBAR_INTERFACES,
  PAGINATION_ALIGNMENTS,
  PAGINATION_INTERFACES,
  PAGINATION_SIZES,
  STEPS_COLORS,
  TABS_COL_SIZES,
  TABS_CONTEXTS,
  TABS_FLOATS,
  TABS_ICON_POSITIONS,
  TABS_VERTICALS,
} from '../../../data/showcase.data'
import { ShowcaseSectionComponent } from './showcase-section.component'

@Component({
  selector: 'app-navigation-section',
  imports: [
    NgFor,
    ShowcaseSectionComponent,
    ...BalAccordionBundle,
    BalBadge,
    BalButton,
    BalButtonGroup,
    ...BalCardBundle,
    BalCheckbox,
    BalContent,
    BalIcon,
    BalLabel,
    ...BalListBundle,
    ...BalNavbarBundle,
    BalPagination,
    BalPopover,
    BalPopoverContent,
    BalStack,
    ...BalStepsBundle,
    ...BalTabsBundle,
    BalText,
  ],
  templateUrl: './navigation-section.component.html',
})
export class NavigationSectionComponent {
  readonly navbarInterfaces = NAVBAR_INTERFACES
  readonly tabsContexts = TABS_CONTEXTS
  readonly tabsIconPositions = TABS_ICON_POSITIONS
  readonly tabsVerticals = TABS_VERTICALS
  readonly tabsFloats = TABS_FLOATS
  readonly tabsColSizes = TABS_COL_SIZES
  readonly stepsColors = STEPS_COLORS
  readonly paginationSizes = PAGINATION_SIZES
  readonly paginationInterfaces = PAGINATION_INTERFACES
  readonly paginationAlignments = PAGINATION_ALIGNMENTS
  readonly accordionTriggerVariants = ACCORDION_TRIGGER_VARIANTS
  readonly cardColors = CARD_COLORS
  readonly cardSpaces = CARD_SPACES
  readonly cardActionPositions = CARD_ACTION_POSITIONS
  readonly brandIcons = brandIcons

  paginationValue = 2
  lastEvent = ''

  @ViewChild('showcaseAccordion') showcaseAccordion?: ElementRef<HTMLBalAccordionElement>
  @ViewChild('showcaseNavbar') showcaseNavbar?: ElementRef<HTMLBalNavbarElement>
  @ViewChild('showcaseNavbarBrand') showcaseNavbarBrand?: ElementRef<HTMLBalNavbarBrandElement>
  @ViewChild('showcaseNavbarMenu') showcaseNavbarMenu?: ElementRef<HTMLBalNavbarMenuElement>
  @ViewChild('showcaseSteps') showcaseSteps?: ElementRef<HTMLBalStepsElement>
  @ViewChild('showcaseStepItem') showcaseStepItem?: ElementRef<HTMLBalStepItemElement>
  @ViewChild('showcaseTabs') showcaseTabs?: ElementRef<HTMLBalTabsElement>
  @ViewChild('showcaseTabItem') showcaseTabItem?: ElementRef<HTMLBalTabItemElement>
  @ViewChild('showcasePagination') showcasePagination?: ElementRef<HTMLBalPaginationElement>

  onPaginationChange(event: BalEvents.BalPaginationCustomEvent<number>) {
    this.paginationValue = event.detail
  }

  onAccordionChange(event: BalEvents.BalAccordionCustomEvent<boolean>) {
    this.lastEvent = `bal-accordion balChange: ${event.detail}`
  }

  onAccordionWillAnimate(event: BalEvents.BalAccordionCustomEvent<boolean>) {
    this.lastEvent = `bal-accordion balWillAnimate: ${event.detail}`
  }

  onStepsChange(event: BalEvents.BalStepsCustomEvent<string | undefined>) {
    this.lastEvent = `bal-steps balChange: ${event.detail}`
  }

  onStepNavigate(event: BalEvents.BalStepItemCustomEvent<MouseEvent>) {
    event.detail.preventDefault()
    this.lastEvent = 'bal-step-item balNavigate'
  }

  onTabsWillAnimate(event: BalEvents.BalTabsCustomEvent<string | undefined>) {
    this.lastEvent = `bal-tabs balWillAnimate: ${event.detail}`
  }

  onBrandNavigate(event: BalEvents.BalNavbarBrandCustomEvent<MouseEvent>) {
    event.detail.preventDefault()
    this.lastEvent = 'bal-navbar-brand balNavigate'
  }

  onBrandAnimate(event: BalEvents.BalNavbarBrandCustomEvent<boolean>) {
    this.lastEvent = `bal-navbar-brand balDidAnimate: ${event.detail}`
  }

  /** Imperative methods. */
  toggleAccordion() {
    void this.showcaseAccordion?.nativeElement.toggle()
  }

  presentAccordion() {
    void this.showcaseAccordion?.nativeElement.present()
  }

  dismissAccordion() {
    void this.showcaseAccordion?.nativeElement.dismiss()
  }

  humanToggleAccordion() {
    void this.showcaseAccordion?.nativeElement.humanToggle()
  }

  toggleNavbarMenu() {
    void this.showcaseNavbar?.nativeElement.toggleMenu()
  }

  toggleNavbarBrand() {
    void this.showcaseNavbarBrand?.nativeElement.toggle()
  }

  toggleNavbarMenuElement() {
    void this.showcaseNavbarMenu?.nativeElement.toggle(true)
  }

  async selectThirdStep() {
    const option = await this.showcaseSteps?.nativeElement.getOptionByValue('c')
    if (option) {
      await this.showcaseSteps?.nativeElement.select(option)
    }
  }

  async readStepOptions() {
    const option = await this.showcaseStepItem?.nativeElement.getOptions()
    this.lastEvent = `bal-step-item getOptions(): ${option?.label}`
  }

  activateStepItem() {
    void this.showcaseStepItem?.nativeElement.setActive(true)
  }

  async selectThirdTab() {
    const option = await this.showcaseTabs?.nativeElement.getOptionByValue('c')
    if (option) {
      await this.showcaseTabs?.nativeElement.select(option)
    }
  }

  closeTabsAccordion() {
    void this.showcaseTabs?.nativeElement.closeAccordion()
  }

  async readTabOptions() {
    const option = await this.showcaseTabItem?.nativeElement.getOptions()
    this.lastEvent = `bal-tab-item getOptions(): ${option?.label}`
  }

  setTabId() {
    void this.showcaseTabItem?.nativeElement.setTabId('showcase-tabs')
  }

  nextPage() {
    void this.showcasePagination?.nativeElement.next()
  }

  previousPage() {
    void this.showcasePagination?.nativeElement.previous()
  }
}
