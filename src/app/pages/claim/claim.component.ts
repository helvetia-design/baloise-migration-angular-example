import { Component, ElementRef, ViewChild } from '@angular/core'
import { NgFor, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import {
  BalButton,
  BalButtonGroup,
  BalCardBundle,
  BalCheckboxBundle,
  BalClose,
  BalContent,
  BalDate,
  BalDivider,
  BalFieldBundle,
  BalFileUpload,
  BalFormGridBundle,
  BalHeading,
  BalHintBundle,
  BalIcon,
  BalInput,
  BalLabel,
  BalModalBundle,
  BalModalService,
  BalNotification,
  BalRadioBundle,
  BalSelectBundle,
  BalSheet,
  BalSpinner,
  BalStack,
  BalTagBundle,
  BalText,
  BalTextarea,
  BalToastService,
} from '@baloise/ds-angular'

import {
  CLAIM_CHECKLIST,
  CLAIM_CONTRACTS,
  CLAIM_LOCATIONS,
  CLAIM_TYPES,
  CONTACT_CHANNELS,
  ChecklistItem,
  ClaimContract,
  ClaimType,
} from '../../data/claim.data'
import { ClaimConfirmModalComponent } from '../../shared/claim-confirm-modal.component'

@Component({
  selector: 'app-claim',
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    RouterLink,
    BalButton,
    BalButtonGroup,
    ...BalCardBundle,
    ...BalCheckboxBundle,
    BalClose,
    BalContent,
    BalDate,
    BalDivider,
    ...BalFieldBundle,
    BalFileUpload,
    ...BalFormGridBundle,
    BalHeading,
    ...BalHintBundle,
    BalIcon,
    BalInput,
    BalLabel,
    ...BalModalBundle,
    BalNotification,
    ...BalRadioBundle,
    ...BalSelectBundle,
    BalSheet,
    BalSpinner,
    BalStack,
    ...BalTagBundle,
    BalText,
    BalTextarea,
  ],
  templateUrl: './claim.component.html',
})
export class ClaimComponent {
  readonly claimTypes = CLAIM_TYPES
  readonly locations = CLAIM_LOCATIONS
  readonly contactChannels = CONTACT_CHANNELS
  readonly checklist = CLAIM_CHECKLIST
  readonly contracts = CLAIM_CONTRACTS

  claimType = 'motor'
  location = 'road'
  contactChannel = 'email'
  contract = '70/2.937.458'
  claimDate = '2026-01-12'
  description = 'Beim Ausparkieren touchierte ich die Säule der Einstellhalle.'
  checkedItems: string[] = ['photos']
  files: File[] = []
  rejectedFiles: string[] = []
  submitting = false
  submitted = false
  lastEvent = ''
  modalResult = ''

  @ViewChild('uploader') uploader?: ElementRef<HTMLBalFileUploadElement>
  @ViewChild('descriptionField') descriptionField?: ElementRef<HTMLBalTextareaElement>
  @ViewChild('claimDateField') claimDateField?: ElementRef<HTMLBalDateElement>
  @ViewChild('contractSelect') contractSelect?: ElementRef<HTMLBalSelectElement>
  @ViewChild('helpModal') helpModal?: ElementRef<HTMLBalModalElement>
  @ViewChild('policyInput') policyInput?: ElementRef<HTMLBalInputElement>
  @ViewChild('checklistGroup') checklistGroup?: ElementRef<HTMLBalCheckboxGroupElement>

  constructor(
    private readonly modalService: BalModalService,
    private readonly toastService: BalToastService,
  ) {}

  get selectedClaimType(): ClaimType | undefined {
    return this.claimTypes.find(type => type.value === this.claimType)
  }

  get checklistComplete(): boolean {
    return this.checkedItems.length === this.checklist.length
  }

  trackClaimType = (_index: number, type: ClaimType) => type.value
  trackChecklistItem = (_index: number, item: ChecklistItem) => item.value
  trackContract = (_index: number, entry: ClaimContract) => entry.value

  /** bal-radio-group event handler. */
  onClaimTypeChange(event: BalEvents.BalRadioGroupCustomEvent<number | string | boolean>) {
    this.lastEvent = `Schadenart: ${event.detail}`
  }

  /** bal-file-upload event handlers. */
  onFilesChange(event: BalEvents.BalFileUploadCustomEvent<File[]>) {
    this.files = event.detail ?? []
  }

  onFilesAdded(event: BalEvents.BalFileUploadCustomEvent<File[]>) {
    this.lastEvent = `${(event.detail ?? []).length} Datei(en) hinzugefügt`
  }

  onFilesRemoved(event: BalEvents.BalFileUploadCustomEvent<File[]>) {
    this.lastEvent = `${(event.detail ?? []).length} Datei(en) entfernt`
  }

  onFileRejected(event: BalEvents.BalFileUploadCustomEvent<BalEvents.FileUploadRejectedFile>) {
    const detail = event.detail
    this.rejectedFiles = [...this.rejectedFiles, `${detail.file.name}: ${detail.reasons.join(', ')}`]
    this.toastService.create({
      color: 'danger',
      message: `${detail.file.name} wurde abgelehnt`,
      duration: 4000,
    })
  }

  /** bal-file-upload imperative method. */
  clearFiles() {
    this.uploader?.nativeElement.clear()
    this.files = []
    this.rejectedFiles = []
  }

  /** bal-textarea event handler + imperative method. */
  onDescriptionChange(event: BalEvents.BalTextareaCustomEvent<string | undefined>) {
    this.lastEvent = `Beschreibung: ${(event.detail ?? '').length} Zeichen`
  }

  focusDescription() {
    this.descriptionField?.nativeElement.setFocus()
  }

  /** bal-date event handler + imperative methods. */
  onClaimDateChange(event: BalEvents.BalDateCustomEvent<string | undefined>) {
    this.lastEvent = `Schadendatum: ${event.detail ?? ''}`
  }

  openClaimDate() {
    this.claimDateField?.nativeElement.open()
  }

  closeClaimDate() {
    this.claimDateField?.nativeElement.close()
  }

  /** bal-select event handler + imperative method. */
  onContractChange(event: BalEvents.BalSelectCustomEvent<string | string[] | undefined>) {
    this.lastEvent = `Police: ${event.detail}`
  }

  async selectFirstContract() {
    await this.contractSelect?.nativeElement.select(this.contracts[0].value)
  }

  /** bal-input imperative method. */
  focusPolicyInput() {
    this.policyInput?.nativeElement.setFocus()
  }

  /** bal-checkbox-group event handler + imperative method. */
  onChecklistChange(event: BalEvents.BalCheckboxCustomEvent<boolean>) {
    const values = event.detail as unknown as string[]
    this.checkedItems = values ?? []
  }

  completeChecklist() {
    this.checklistGroup?.nativeElement.setValue(this.checklist.map(item => item.value))
  }

  /** bal-tag event handler. */
  removeRejected(entry: string) {
    this.rejectedFiles = this.rejectedFiles.filter(item => item !== entry)
  }

  /** Declarative bal-modal with its imperative open/close methods. */
  openHelpModal() {
    this.helpModal?.nativeElement.open()
  }

  closeHelpModal() {
    this.helpModal?.nativeElement.close()
  }

  /** bal-modal event handler. */
  onHelpModalDismiss(event: BalEvents.BalModalCustomEvent<unknown>) {
    this.lastEvent = 'Hilfe-Dialog geschlossen'
    void event
  }

  /** BalModalService — the documented Angular way to present a modal. */
  async submit() {
    const modal = await this.modalService.create({
      component: ClaimConfirmModalComponent,
      componentProps: {
        contract: this.contract,
        fileCount: this.files.length,
      },
      isClosable: true,
      hasBackdrop: true,
      backdropDismiss: true,
      space: 'medium',
      modalWidth: 480,
    })

    await modal.present()
    const result = await modal.onWillDismiss()
    this.modalResult = result.role ?? 'dismissed'

    if (result.role === 'confirm') {
      this.submitting = true
      this.submitted = false
      // Deterministic, synchronous state change — no timers, no randomness.
      this.submitting = false
      this.submitted = true
      this.toastService.create({
        color: 'success',
        message: 'Schadenmeldung übermittelt. Referenz 2026-0042.',
        duration: 5000,
        closable: true,
      })
    }
  }

  dismissAllToasts() {
    void this.toastService.dismissAll()
  }
}
