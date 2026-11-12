import { Component, ElementRef, ViewChild } from '@angular/core'
import { DecimalPipe, NgFor, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import {
  BalBadge,
  BalButton,
  BalButtonGroup,
  BalCardBundle,
  BalCheckboxBundle,
  BalContent,
  BalDataBundle,
  BalDivider,
  BalDropdownBundle,
  BalFieldBundle,
  BalHeading,
  BalIcon,
  BalLabel,
  BalNotification,
  BalPagination,
  BalRadioBundle,
  BalSegmentBundle,
  BalSnackbarService,
  BalStack,
  BalTable,
  BalTabsBundle,
  BalTagBundle,
  BalText,
} from '@baloise/ds-angular'

import {
  CORRESPONDENCE_OPTIONS,
  CorrespondenceOption,
  NOTIFICATION_TOPICS,
  NotificationTopic,
  PAYMENT_ROWS,
  POLICIES_PER_PAGE,
  POLICY_ROWS,
  PROFILE_TABS,
  PaymentRow,
  PolicyRow,
  ProfileTab,
  SORT_OPTIONS,
} from '../../data/profile.data'

@Component({
  selector: 'app-profile',
  imports: [
    DecimalPipe,
    NgFor,
    NgIf,
    FormsModule,
    RouterLink,
    BalBadge,
    BalButton,
    BalButtonGroup,
    ...BalCardBundle,
    ...BalCheckboxBundle,
    BalContent,
    ...BalDataBundle,
    BalDivider,
    ...BalDropdownBundle,
    ...BalFieldBundle,
    BalHeading,
    BalIcon,
    BalLabel,
    BalNotification,
    BalPagination,
    ...BalRadioBundle,
    ...BalSegmentBundle,
    BalStack,
    BalTable,
    ...BalTabsBundle,
    ...BalTagBundle,
    BalText,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  readonly tabs = PROFILE_TABS
  readonly policies = POLICY_ROWS
  readonly payments = PAYMENT_ROWS
  readonly topics = NOTIFICATION_TOPICS
  readonly correspondenceOptions = CORRESPONDENCE_OPTIONS
  readonly sortOptions = SORT_OPTIONS
  readonly pageSize = POLICIES_PER_PAGE

  /**
   * Shape 2 again, this time on the tabs family: a loop generated strip whose
   * items hold no content. The panel below is rendered from `activeTab`.
   */
  activeTab = 'contracts'

  /** Drives the paginated table below. */
  currentPage = 1
  statusFilter = 'all'
  sortBy = 'product'
  density: 'comfortable' | 'compact' = 'comfortable'
  selectedTopics: string[] = ['invoices', 'claims']
  correspondence = 'digital'
  lastEvent = ''

  @ViewChild('profileTabs', { read: ElementRef }) profileTabs?: ElementRef<HTMLBalTabsElement>
  @ViewChild('firstTab', { read: ElementRef }) firstTab?: ElementRef<HTMLBalTabItemElement>
  @ViewChild('policyPagination', { read: ElementRef }) policyPagination?: ElementRef<HTMLBalPaginationElement>
  @ViewChild('sortDropdown', { read: ElementRef }) sortDropdown?: ElementRef<HTMLBalDropdownElement>
  @ViewChild('firstSortOption', { read: ElementRef }) firstSortOption?: ElementRef<HTMLBalOptionElement>
  @ViewChild('topicGroup', { read: ElementRef }) topicGroup?: ElementRef<HTMLBalCheckboxGroupElement>
  @ViewChild('correspondenceGroup', { read: ElementRef }) correspondenceGroup?: ElementRef<HTMLBalRadioGroupElement>
  @ViewChild('densitySegment', { read: ElementRef }) densitySegment?: ElementRef<HTMLBalSegmentElement>

  constructor(private readonly snackbar: BalSnackbarService) {}

  get filteredPolicies(): readonly PolicyRow[] {
    const filtered =
      this.statusFilter === 'all'
        ? [...this.policies]
        : this.policies.filter(policy => policy.status.toLowerCase() === this.statusFilter)

    return [...filtered].sort((a, b) => {
      if (this.sortBy === 'premium') {
        return b.premium - a.premium
      }
      if (this.sortBy === 'start') {
        return a.start.localeCompare(b.start)
      }
      return a.product.localeCompare(b.product)
    })
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredPolicies.length / this.pageSize))
  }

  get pagedPolicies(): readonly PolicyRow[] {
    const start = (this.currentPage - 1) * this.pageSize
    return this.filteredPolicies.slice(start, start + this.pageSize)
  }

  get openPayments(): number {
    return this.payments.filter(payment => !payment.paid).length
  }

  trackTab = (_index: number, tab: ProfileTab) => tab.value
  trackPolicy = (_index: number, policy: PolicyRow) => policy.id
  trackPayment = (_index: number, payment: PaymentRow) => payment.id
  trackTopic = (_index: number, topic: NotificationTopic) => topic.value
  trackCorrespondence = (_index: number, option: CorrespondenceOption) => option.value

  /** bal-tabs event handlers. */
  onTabsChange(event: BalEvents.BalTabsCustomEvent<string | undefined>) {
    if (event.detail) {
      this.activeTab = event.detail
    }
  }

  onTabsAnimate(event: BalEvents.BalTabsCustomEvent<string | undefined>) {
    this.lastEvent = `Tab-Animation beendet: ${event.detail ?? ''}`
  }

  /** bal-tab-item event handlers. */
  onTabNavigate(event: BalEvents.BalTabItemCustomEvent<MouseEvent>) {
    event.detail.preventDefault()
  }

  onTabKeyDown(event: BalEvents.BalTabItemCustomEvent<KeyboardEvent>) {
    this.lastEvent = `Taste im Tab: ${event.detail.key}`
  }

  /** bal-tabs imperative methods. */
  async selectSettingsTab() {
    const option = await this.profileTabs?.nativeElement.getOptionByValue('settings')
    if (option) {
      await this.profileTabs?.nativeElement.select(option)
    }
  }

  redrawTabLine() {
    void this.profileTabs?.nativeElement.renderLine()
  }

  /** bal-tab-item imperative method. */
  activateFirstTab() {
    void this.firstTab?.nativeElement.setActive(true)
  }

  /** bal-pagination event handler + imperative methods. */
  onPageChange(event: BalEvents.BalPaginationCustomEvent<number>) {
    this.currentPage = event.detail
  }

  nextPage() {
    void this.policyPagination?.nativeElement.next()
  }

  previousPage() {
    void this.policyPagination?.nativeElement.previous()
  }

  /** bal-dropdown event handler + imperative methods. */
  onSortChange(event: BalEvents.BalDropdownCustomEvent<string | string[] | undefined>) {
    this.lastEvent = `Sortierung: ${event.detail}`
    this.currentPage = 1
  }

  openSortDropdown() {
    void this.sortDropdown?.nativeElement.open()
  }

  clearSortDropdown() {
    void this.sortDropdown?.nativeElement.clear()
  }

  /** bal-option event handler + imperative method. */
  onSortOptionChange(event: BalEvents.BalOptionCustomEvent<BalEvents.BalOption>) {
    this.lastEvent = `Option ${event.detail.label} ${event.detail.selected ? 'gewählt' : 'abgewählt'}`
  }

  selectFirstSortOption() {
    void this.firstSortOption?.nativeElement.select(true)
  }

  /** bal-segment event handler + imperative state. */
  onDensityChange(event: BalEvents.BalSegmentCustomEvent<BalProps.BalSegmentValue>) {
    this.density = event.detail === 'compact' ? 'compact' : 'comfortable'
  }

  /** bal-checkbox-group event handler + imperative method. */
  onTopicsChange(event: BalEvents.BalCheckboxCustomEvent<boolean>) {
    this.selectedTopics = (event.detail as unknown as string[]) ?? []
  }

  selectAllTopics() {
    void this.topicGroup?.nativeElement.setValue(this.topics.map(topic => topic.value))
  }

  /** bal-radio-group event handler + imperative method. */
  onCorrespondenceChange(event: BalEvents.BalRadioGroupCustomEvent<number | string | boolean>) {
    this.lastEvent = `Korrespondenz: ${event.detail}`
  }

  resetCorrespondence() {
    void this.correspondenceGroup?.nativeElement.setValue('digital')
  }

  setStatusFilter(value: string) {
    this.statusFilter = value
    this.currentPage = 1
  }

  saveSettings() {
    this.snackbar.create({
      color: 'success',
      icon: 'check',
      subject: 'Gespeichert',
      message: `${this.selectedTopics.length} Benachrichtigungen aktiv.`,
      duration: 4000,
    })
  }
}
