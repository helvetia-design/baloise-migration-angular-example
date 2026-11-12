import { Component, ElementRef, ViewChild } from '@angular/core'
import { DecimalPipe, NgFor, NgIf } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import {
  BalAccordionBundle,
  BalButton,
  BalButtonGroup,
  BalCardBundle,
  BalCheckboxBundle,
  BalContent,
  BalDataBundle,
  BalDate,
  BalDivider,
  BalFieldBundle,
  BalForm,
  BalFormGridBundle,
  BalHeading,
  BalHintBundle,
  BalIcon,
  BalInput,
  BalInputSlider,
  BalInputStepper,
  BalLabel,
  BalListBundle,
  BalNotification,
  BalNumberInput,
  BalProgressBar,
  BalRadioBundle,
  BalSegmentBundle,
  BalSelectBundle,
  BalStack,
  BalStepsBundle,
  BalText,
} from '@baloise/ds-angular'

import {
  APPLICATION_FAQ,
  BUILDING_TYPES,
  BuildingType,
  CANTONS,
  COVERAGE_OPTIONS,
  Canton,
  CoverageOption,
  DEDUCTIBLES,
  FaqEntry,
  PAYMENT_INTERVALS,
  WIZARD_STEPS,
  WizardStep,
} from '../../data/application.data'

@Component({
  selector: 'app-application',
  imports: [
    DecimalPipe,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    // NOTE: BalFormBundle is deliberately not used here — it contains
    // BalNgErrorComponent, the one directive in this package that is not
    // standalone, which makes the whole bundle unusable without an NgModule.
    // See docs/FINDINGS.md.
    ...BalAccordionBundle,
    BalButton,
    BalButtonGroup,
    ...BalCardBundle,
    ...BalCheckboxBundle,
    BalContent,
    ...BalDataBundle,
    BalDate,
    BalDivider,
    ...BalFieldBundle,
    BalForm,
    ...BalFormGridBundle,
    BalHeading,
    ...BalHintBundle,
    BalIcon,
    BalInput,
    BalInputSlider,
    BalInputStepper,
    BalLabel,
    ...BalListBundle,
    BalNotification,
    BalNumberInput,
    BalProgressBar,
    ...BalRadioBundle,
    ...BalSegmentBundle,
    ...BalSelectBundle,
    BalStack,
    ...BalStepsBundle,
    BalText,
  ],
  templateUrl: './application.component.html',
})
export class ApplicationComponent {
  readonly steps = WIZARD_STEPS
  readonly cantons = CANTONS
  readonly buildingTypes = BUILDING_TYPES
  readonly coverageOptions = COVERAGE_OPTIONS
  readonly deductibles = DEDUCTIBLES
  readonly paymentIntervals = PAYMENT_INTERVALS
  readonly faq = APPLICATION_FAQ

  /**
   * Shape 2 of the steps contract: the bal-step-item elements are a selection strip
   * without content of their own. The panel below is rendered by this component
   * from `activeStep`.
   */
  activeStep = 'person'

  submitted = false
  lastEvent = ''
  accordionOpen = false

  readonly form: FormGroup

  @ViewChild('wizardSteps', { read: ElementRef }) wizardSteps?: ElementRef<HTMLBalStepsElement>
  @ViewChild('firstStepItem', { read: ElementRef }) firstStepItem?: ElementRef<HTMLBalStepItemElement>
  @ViewChild('wizardForm', { read: ElementRef }) wizardForm?: ElementRef<HTMLBalFormElement>
  @ViewChild('emailInput', { read: ElementRef }) emailInput?: ElementRef<HTMLBalInputElement>
  @ViewChild('livingSpace', { read: ElementRef }) livingSpace?: ElementRef<HTMLBalNumberInputElement>
  @ViewChild('roomStepper', { read: ElementRef }) roomStepper?: ElementRef<HTMLBalInputStepperElement>
  @ViewChild('sumSlider', { read: ElementRef }) sumSlider?: ElementRef<HTMLBalInputSliderElement>
  @ViewChild('cantonSelect', { read: ElementRef }) cantonSelect?: ElementRef<HTMLBalSelectElement>
  @ViewChild('buildingTypeGroup', { read: ElementRef }) buildingTypeGroup?: ElementRef<HTMLBalRadioGroupElement>
  @ViewChild('coverageGroup', { read: ElementRef }) coverageGroup?: ElementRef<HTMLBalCheckboxGroupElement>
  @ViewChild('newsletterCheckbox', { read: ElementRef }) newsletterCheckbox?: ElementRef<HTMLBalCheckboxElement>
  @ViewChild('salutationRadio', { read: ElementRef }) salutationRadio?: ElementRef<HTMLBalRadioElement>
  @ViewChild('birthDate', { read: ElementRef }) birthDate?: ElementRef<HTMLBalDateElement>
  @ViewChild('summaryAccordion', { read: ElementRef }) summaryAccordion?: ElementRef<HTMLBalAccordionElement>
  @ViewChild('sumHint', { read: ElementRef }) sumHint?: ElementRef<HTMLBalHintElement>
  @ViewChild('deductibleSegment', { read: ElementRef }) deductibleSegment?: ElementRef<HTMLBalSegmentElement>
  @ViewChild('firstDeductibleItem', { read: ElementRef }) firstDeductibleItem?: ElementRef<HTMLBalSegmentItemElement>

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      salutation: ['ms', Validators.required],
      firstName: ['Andrea', [Validators.required, Validators.minLength(2)]],
      lastName: ['Baumgartner', Validators.required],
      email: ['andrea.baumgartner@example.ch', [Validators.required, Validators.email]],
      phone: ['079 123 45 67'],
      birthDate: ['1986-04-12'],
      street: ['Aeschengraben 21', Validators.required],
      postalCode: ['4051', Validators.required],
      city: ['Basel', Validators.required],
      canton: ['BS', Validators.required],
      livingSpace: [96],
      rooms: [3.5],
      insuredSum: [120000],
      buildingType: ['apartment', Validators.required],
      coverages: [['household', 'liability']],
      newsletter: [false],
      deductible: ['500'],
      paymentInterval: ['yearly'],
    })
  }

  get stepIndex(): number {
    return Math.max(
      0,
      this.steps.findIndex(step => step.value === this.activeStep),
    )
  }

  get progress(): number {
    return Math.round(((this.stepIndex + 1) / this.steps.length) * 100)
  }

  get selectedCoverages(): readonly CoverageOption[] {
    const values: string[] = this.form.value.coverages ?? []
    return this.coverageOptions.filter(option => values.includes(option.value))
  }

  get estimatedPremium(): number {
    const base = this.selectedCoverages.reduce((sum, option) => sum + option.premium, 0)
    const factor = this.form.value.deductible === '1000' ? 0.9 : this.form.value.deductible === '200' ? 1.15 : 1
    return Math.round(base * factor)
  }

  get selectedBuildingType(): BuildingType | undefined {
    return this.buildingTypes.find(type => type.value === this.form.value.buildingType)
  }

  get selectedCanton(): Canton | undefined {
    return this.cantons.find(canton => canton.value === this.form.value.canton)
  }

  /**
   * Plain Angular validation state. `bal-ng-error`, the documented helper for this,
   * is the one non-standalone directive in the package and cannot be imported into
   * a standalone component — see docs/FINDINGS.md.
   */
  hasError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName)
    return !!control && control.touched && control.hasError(error)
  }

  trackStep = (_index: number, step: WizardStep) => step.value
  trackCanton = (_index: number, canton: Canton) => canton.value
  trackBuildingType = (_index: number, type: BuildingType) => type.value
  trackCoverage = (_index: number, option: CoverageOption) => option.value
  trackFaq = (_index: number, entry: FaqEntry) => entry.id

  /** bal-steps event handler. */
  onStepsChange(event: BalEvents.BalStepsCustomEvent<string | undefined>) {
    if (event.detail) {
      this.activeStep = event.detail
    }
  }

  /** bal-step-item event handler. */
  onStepNavigate(event: BalEvents.BalStepItemCustomEvent<MouseEvent>) {
    event.detail.preventDefault()
  }

  goToStep(value: string) {
    this.activeStep = value
  }

  next() {
    const nextStep = this.steps[Math.min(this.stepIndex + 1, this.steps.length - 1)]
    this.activeStep = nextStep.value
  }

  previous() {
    const previousStep = this.steps[Math.max(this.stepIndex - 1, 0)]
    this.activeStep = previousStep.value
  }

  /** bal-steps imperative methods. */
  async selectSummaryStep() {
    const option = await this.wizardSteps?.nativeElement.getOptionByValue('summary')
    if (option) {
      await this.wizardSteps?.nativeElement.select(option)
    }
  }

  /** bal-step-item imperative method. */
  markFirstStepActive() {
    this.firstStepItem?.nativeElement.setActive(true)
  }

  /** bal-input event handler. */
  onEmailInput(event: BalEvents.BalInputCustomEvent<string | undefined>) {
    this.lastEvent = `E-Mail geändert: ${event.detail ?? ''}`
  }

  /** bal-input imperative method. */
  focusEmail() {
    this.emailInput?.nativeElement.setFocus()
  }

  /** bal-number-input event handler + imperative method. */
  onLivingSpaceChange(event: BalEvents.BalNumberInputCustomEvent<number | undefined>) {
    this.lastEvent = `Wohnfläche: ${event.detail ?? 0} m²`
  }

  focusLivingSpace() {
    this.livingSpace?.nativeElement.setFocus()
  }

  /** bal-input-stepper event handlers. */
  onRoomsIncrease(event: BalEvents.BalInputStepperCustomEvent<number | undefined>) {
    this.lastEvent = `Zimmer erhöht auf ${event.detail ?? 0}`
  }

  onRoomsDecrease(event: BalEvents.BalInputStepperCustomEvent<number | undefined>) {
    this.lastEvent = `Zimmer reduziert auf ${event.detail ?? 0}`
  }

  /** bal-input-stepper imperative method. */
  async blurRoomStepper() {
    const input = await this.roomStepper?.nativeElement.getInputElement()
    input?.blur()
  }

  /** bal-input-slider event handler + imperative method. */
  onSumChange(event: BalEvents.BalInputSliderCustomEvent<string | number | null>) {
    this.lastEvent = `Versicherungssumme: CHF ${event.detail ?? 0}`
  }

  focusSumSlider() {
    this.sumSlider?.nativeElement.setFocus()
  }

  /** bal-select event handler + imperative methods. */
  onCantonChange(event: BalEvents.BalSelectCustomEvent<string | string[] | undefined>) {
    this.lastEvent = `Kanton: ${event.detail}`
  }

  openCantonSelect() {
    this.cantonSelect?.nativeElement.open()
  }

  clearCantonSelect() {
    this.cantonSelect?.nativeElement.clear()
  }

  /** bal-radio-group / bal-radio event handlers. */
  onBuildingTypeChange(event: BalEvents.BalRadioGroupCustomEvent<number | string | boolean>) {
    this.lastEvent = `Objekttyp: ${event.detail}`
  }

  onSalutationRadioChange(event: BalEvents.BalRadioCustomEvent<boolean>) {
    this.lastEvent = event.detail ? 'Anrede gewählt' : 'Anrede abgewählt'
  }

  /** bal-radio-group imperative method. */
  resetBuildingType() {
    this.buildingTypeGroup?.nativeElement.setValue('apartment')
  }

  /** bal-radio imperative method. */
  focusSalutation() {
    this.salutationRadio?.nativeElement.setFocus()
  }

  /** bal-checkbox-group / bal-checkbox event handlers. */
  // NOTE: bal-checkbox-group's balChange is declared as BalCheckboxCustomEvent<boolean>
  // in the package types, but at runtime it carries the selected values array.
  onCoveragesChange(event: BalEvents.BalCheckboxCustomEvent<boolean>) {
    const values = event.detail as unknown as string[]
    this.lastEvent = `Deckungen: ${(values ?? []).join(', ')}`
  }

  onNewsletterChange(event: BalEvents.BalCheckboxCustomEvent<boolean>) {
    this.lastEvent = event.detail ? 'Newsletter abonniert' : 'Newsletter abbestellt'
  }

  /** bal-checkbox-group imperative method. */
  selectAllCoverages() {
    this.coverageGroup?.nativeElement.setValue(this.coverageOptions.map(option => option.value))
  }

  /** bal-checkbox imperative method. */
  focusNewsletter() {
    this.newsletterCheckbox?.nativeElement.setFocus()
  }

  /** bal-date event handler + imperative methods. */
  onBirthDateChange(event: BalEvents.BalDateCustomEvent<string | undefined>) {
    this.lastEvent = `Geburtsdatum: ${event.detail ?? ''}`
  }

  toggleBirthDate() {
    this.birthDate?.nativeElement.toggle()
  }

  /** bal-segment event handler + bal-segment-item imperative method. */
  onDeductibleChange(event: BalEvents.BalSegmentCustomEvent<BalProps.BalSegmentValue>) {
    this.lastEvent = `Selbstbehalt: ${event.detail}`
  }

  focusFirstDeductible() {
    this.firstDeductibleItem?.nativeElement.setFocus()
  }

  /** bal-accordion event handler + imperative method. */
  onAccordionChange(event: BalEvents.BalAccordionCustomEvent<boolean>) {
    this.accordionOpen = event.detail
  }

  toggleSummaryAccordion() {
    this.summaryAccordion?.nativeElement.toggle()
  }

  /** bal-hint imperative method. */
  presentSumHint() {
    this.sumHint?.nativeElement.present()
  }

  /** bal-form imperative method. */
  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      this.wizardForm?.nativeElement.scrollToFirstInvalidField()
      return
    }
    this.submitted = true
  }
}
