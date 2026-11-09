import { Component, ElementRef, ViewChild } from '@angular/core'
import { DecimalPipe, NgFor, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import {
  BalBadge,
  BalButton,
  BalButtonGroup,
  BalCardBundle,
  BalCarouselBundle,
  BalClose,
  BalContent,
  BalDataBundle,
  BalDivider,
  BalHeading,
  BalHintBundle,
  BalIcon,
  BalStack,
  BalListBundle,
  BalNotification,
  BalPopup,
  BalProgressBar,
  BalSnackbarService,
  BalTagBundle,
  BalText,
  BalTooltip,
} from '@baloise/ds-angular'

import {
  ACTIVITIES,
  ActivityEntry,
  CONTRACTS,
  Contract,
  DOCUMENTS,
  DocumentEntry,
  PORTFOLIO_FACTS,
  PRODUCT_TEASERS,
  PortfolioFact,
  ProductTeaser,
} from '../../data/dashboard.data'
import { brandIcons } from '../../data/icons'

@Component({
  selector: 'app-dashboard',
  imports: [
    DecimalPipe,
    NgFor,
    NgIf,
    RouterLink,
    BalBadge,
    BalButton,
    BalButtonGroup,
    ...BalCardBundle,
    ...BalCarouselBundle,
    BalClose,
    BalContent,
    ...BalDataBundle,
    BalDivider,
    BalHeading,
    ...BalHintBundle,
    BalIcon,
    BalStack,
    ...BalListBundle,
    BalNotification,
    BalPopup,
    BalProgressBar,
    ...BalTagBundle,
    BalText,
    BalTooltip,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  readonly contracts = CONTRACTS
  readonly facts = PORTFOLIO_FACTS
  readonly documents = DOCUMENTS
  readonly teasers = PRODUCT_TEASERS
  readonly activities = ACTIVITIES
  readonly claimIcon = brandIcons.carCrashWithAnimal

  /** Drives `bal-carousel`'s `value` from state — the literal counterpart sits on /showcase. */
  carouselIndex = 0
  highlightedTeaser = PRODUCT_TEASERS[0].label

  noticeDismissed = false
  lastActivity = ''
  openedDocument = ''
  editedFact = ''
  tooltipShown = false

  @ViewChild('teaserCarousel') teaserCarousel?: ElementRef<HTMLBalCarouselElement>
  @ViewChild('firstTeaserItem') firstTeaserItem?: ElementRef<HTMLBalCarouselItemElement>
  @ViewChild('contactPopup') contactPopup?: ElementRef<HTMLBalPopupElement>
  @ViewChild('coverageTooltip') coverageTooltip?: ElementRef<HTMLBalTooltipElement>
  @ViewChild('coverageHint') coverageHint?: ElementRef<HTMLBalHintElement>
  @ViewChild('archiveItem') archiveItem?: ElementRef<HTMLBalListItemElement>

  constructor(private readonly snackbar: BalSnackbarService) {}

  get totalPremium(): number {
    return this.contracts.reduce((sum, contract) => sum + contract.premium, 0)
  }

  /** Mixed literal/expression usage of `bal-tag`'s color: here it comes from data. */
  statusColor(contract: Contract): 'green' | 'yellow' | 'red' {
    return contract.statusColor
  }

  /** bal-carousel event handler. */
  onCarouselChange(event: BalEvents.BalCarouselCustomEvent<number | undefined>) {
    this.carouselIndex = event.detail ?? 0
    this.highlightedTeaser = this.teasers[this.carouselIndex]?.label ?? ''
  }

  /** bal-carousel-item event handler. */
  onTeaserNavigate(event: BalEvents.BalCarouselItemCustomEvent<MouseEvent>, teaser: string) {
    event.detail.preventDefault()
    this.highlightedTeaser = teaser
  }

  /** bal-carousel imperative methods. */
  nextTeaser() {
    this.teaserCarousel?.nativeElement.next(1)
  }

  previousTeaser() {
    this.teaserCarousel?.nativeElement.previous(1)
  }

  /** bal-carousel-item imperative method. */
  focusFirstTeaser() {
    this.firstTeaserItem?.nativeElement.setFocus()
  }

  /** bal-list-item event handler. */
  onDocumentNavigate(event: BalEvents.BalListItemCustomEvent<MouseEvent>, entry: DocumentEntry) {
    event.detail.preventDefault()
    this.openedDocument = entry.title
  }

  /** bal-list-item imperative methods. */
  revealArchive() {
    this.archiveItem?.nativeElement.present()
  }

  hideArchive() {
    this.archiveItem?.nativeElement.dismiss()
  }

  /** bal-data-value event handler. */
  onFactClick(label: string) {
    this.editedFact = label
  }

  /** bal-popup event handler and imperative method. */
  onContactPopupChange(event: BalEvents.BalPopupCustomEvent<boolean>) {
    this.lastActivity = event.detail ? 'Kontaktfenster geöffnet' : 'Kontaktfenster geschlossen'
  }

  openContactPopup() {
    this.contactPopup?.nativeElement.present()
  }

  closeContactPopup() {
    this.contactPopup?.nativeElement.dismiss()
  }

  /** bal-tooltip event handler and imperative methods. */
  onTooltipAnimate(event: BalEvents.BalTooltipCustomEvent<boolean>) {
    this.tooltipShown = event.detail
  }

  showCoverageTooltip() {
    this.coverageTooltip?.nativeElement.present()
  }

  hideCoverageTooltip() {
    this.coverageTooltip?.nativeElement.dismiss()
  }

  /** bal-hint imperative method. */
  toggleCoverageHint() {
    this.coverageHint?.nativeElement.toggle()
  }

  /** bal-tag event handler. */
  dismissNotice() {
    this.noticeDismissed = true
  }

  trackContract = (_index: number, contract: Contract) => contract.id
  trackFact = (_index: number, fact: PortfolioFact) => fact.label
  trackDocument = (_index: number, entry: DocumentEntry) => entry.id
  trackTeaser = (_index: number, teaser: ProductTeaser) => teaser.id
  trackActivity = (_index: number, activity: ActivityEntry) => activity.id

  /** bal-list-item-accordion-head event handler. */
  onArchiveAccordionChange(event: BalEvents.BalListItemAccordionHeadCustomEvent<boolean>) {
    this.lastActivity = event.detail ? 'Archiv geöffnet' : 'Archiv geschlossen'
  }

  /** BalSnackbarService — the documented Angular entry point. */
  notifyAdvisor() {
    this.snackbar.create({
      color: 'info',
      icon: 'help-customer-support',
      subject: 'Beratung angefragt',
      message: 'Ihre Agentur meldet sich innerhalb von zwei Arbeitstagen.',
      action: 'Rückruf',
      duration: 4000,
      actionHandler: () => {
        this.lastActivity = 'Rückruf angefordert'
      },
    })
  }
}
