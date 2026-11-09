import { Component } from '@angular/core'
import { NgFor, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {
  BalButton,
  BalCheckboxBundle,
  BalContent,
  BalDate,
  BalDateCalendar,
  BalDropdownBundle,
  BalFieldBundle,
  BalFileUpload,
  BalForm,
  BalFormGridBundle,
  BalIcon,
  BalInput,
  BalInputGroup,
  BalInputSlider,
  BalInputStepper,
  BalLabel,
  BalNumberInput,
  BalRadioBundle,
  BalSegmentBundle,
  BalSelectBundle,
  BalStack,
  BalTagBundle,
  BalText,
  BalTextarea,
  BalTimeInput,
} from '@baloise/ds-angular'

import { brandIcons } from '../../../data/icons'
import {
  CHECKBOX_INTERFACES,
  CHECKBOX_TILE_COLORS,
  DROPDOWN_SIZES,
  DROPDOWN_THEMES,
  FIELD_LABEL_SIZES,
  FIELD_LABEL_WEIGHTS,
  FIELD_MESSAGE_COLORS,
  FORM_COL_SIZES,
  GROUP_COLUMNS,
  INPUT_AUTOCORRECTS,
  INPUT_MASKS,
  INPUT_MODES,
  INPUT_TEXT_ALIGNS,
  INPUT_TYPES,
  OPTION_LIST_FILTERS,
  RADIO_INTERFACES,
  RADIO_TILE_COLORS,
  SELECT_FILTERS,
  SHOWCASE_OPTIONS,
  TEXTAREA_WRAPS,
} from '../../../data/showcase.data'
import { ShowcaseSectionComponent } from './showcase-section.component'

@Component({
  selector: 'app-form-section',
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    ShowcaseSectionComponent,
    BalButton,
    ...BalCheckboxBundle,
    BalContent,
    BalDate,
    BalDateCalendar,
    ...BalDropdownBundle,
    ...BalFieldBundle,
    BalFileUpload,
    BalForm,
    ...BalFormGridBundle,
    BalIcon,
    BalInput,
    BalInputGroup,
    BalInputSlider,
    BalInputStepper,
    BalLabel,
    BalNumberInput,
    ...BalRadioBundle,
    ...BalSegmentBundle,
    ...BalSelectBundle,
    BalStack,
    ...BalTagBundle,
    BalText,
    BalTextarea,
    BalTimeInput,
  ],
  templateUrl: './form-section.component.html',
})
export class FormSectionComponent {
  readonly fieldLabelWeights = FIELD_LABEL_WEIGHTS
  readonly fieldLabelSizes = FIELD_LABEL_SIZES
  readonly fieldMessageColors = FIELD_MESSAGE_COLORS
  readonly formColSizes = FORM_COL_SIZES
  readonly inputTypes = INPUT_TYPES
  readonly inputModes = INPUT_MODES
  readonly inputMasks = INPUT_MASKS
  readonly inputTextAligns = INPUT_TEXT_ALIGNS
  readonly inputAutocorrects = INPUT_AUTOCORRECTS
  readonly textareaWraps = TEXTAREA_WRAPS
  readonly selectFilters = SELECT_FILTERS
  readonly dropdownSizes = DROPDOWN_SIZES
  readonly dropdownThemes = DROPDOWN_THEMES
  readonly optionListFilters = OPTION_LIST_FILTERS
  readonly checkboxInterfaces = CHECKBOX_INTERFACES
  readonly checkboxTileColors = CHECKBOX_TILE_COLORS
  readonly radioInterfaces = RADIO_INTERFACES
  readonly radioTileColors = RADIO_TILE_COLORS
  readonly groupColumns = GROUP_COLUMNS
  readonly options = SHOWCASE_OPTIONS
  readonly brandIcons = brandIcons

  selectValue = 'bs'
  dropdownValue = 'bs'
  radioValue = '1'
  checkboxValues: string[] = ['1']
  segmentValue = 'a'
  dateValue = '2026-03-18'
  timeValue = '09:30'
  sliderValue = 60
  stepperValue = 2
  numberValue = 1234.5
  textValue = 'Beispieltext'
  textareaValue = 'Mehrzeiliger Beispieltext'
  lastEvent = ''

  onInput(name: string, value: unknown) {
    this.lastEvent = `${name}: ${value}`
  }

  onFormControlDidLoad(event: BalEvents.BalFieldCustomEvent<HTMLElement>) {
    this.lastEvent = `bal-field balFormControlDidLoad: ${event.detail.tagName.toLowerCase()}`
  }

  onTimeChange(event: BalEvents.BalTimeInputCustomEvent<string | undefined>) {
    this.lastEvent = `bal-time-input balChange: ${event.detail}`
  }

  onCalendarChange(event: BalEvents.BalDateCalendarCustomEvent<string | undefined>) {
    this.lastEvent = `bal-date-calendar balChange: ${event.detail}`
  }

  onUploadChange(event: BalEvents.BalFileUploadCustomEvent<File[]>) {
    this.lastEvent = `bal-file-upload balChange: ${(event.detail ?? []).length} Datei(en)`
  }
}
