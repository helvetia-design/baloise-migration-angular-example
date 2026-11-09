import { brandIcons } from './icons'

export interface WizardStep {
  readonly value: string
  readonly label: string
}

/** Source of the *ngFor generated bal-step-item navigation strip. */
export const WIZARD_STEPS: readonly WizardStep[] = [
  { value: 'person', label: 'Person' },
  { value: 'object', label: 'Objekt' },
  { value: 'coverage', label: 'Deckung' },
  { value: 'summary', label: 'Übersicht' },
]

export interface Canton {
  readonly value: string
  readonly label: string
}

export const CANTONS: readonly Canton[] = [
  { value: 'BS', label: 'Basel-Stadt' },
  { value: 'BL', label: 'Basel-Landschaft' },
  { value: 'AG', label: 'Aargau' },
  { value: 'SO', label: 'Solothurn' },
  { value: 'ZH', label: 'Zürich' },
]

export interface BuildingType {
  readonly value: string
  readonly label: string
  readonly description: string
  readonly svg: string
}

/** Source of the *ngFor generated bal-radio tiles. */
export const BUILDING_TYPES: readonly BuildingType[] = [
  {
    value: 'apartment',
    label: 'Wohnung',
    description: 'Eigentums- oder Mietwohnung in einem Mehrfamilienhaus.',
    svg: brandIcons.household,
  },
  {
    value: 'house',
    label: 'Einfamilienhaus',
    description: 'Freistehendes Haus oder Reiheneinfamilienhaus.',
    svg: brandIcons.building,
  },
  {
    value: 'garage',
    label: 'Garage',
    description: 'Einstellhalle oder separate Garage auf dem Grundstück.',
    svg: brandIcons.car,
  },
]

export interface CoverageOption {
  readonly value: string
  readonly label: string
  readonly premium: number
}

/** Source of the *ngFor generated bal-checkbox group. */
export const COVERAGE_OPTIONS: readonly CoverageOption[] = [
  { value: 'household', label: 'Hausrat', premium: 180 },
  { value: 'liability', label: 'Privathaftpflicht', premium: 96 },
  { value: 'glass', label: 'Glasbruch', premium: 48 },
  { value: 'theft', label: 'Einbruchdiebstahl auswärts', premium: 72 },
]

export const DEDUCTIBLES = [
  { value: '200', label: 'CHF 200', hint: 'Höhere Prämie, tiefer Selbstbehalt' },
  { value: '500', label: 'CHF 500', hint: 'Empfohlen für Familien' },
  { value: '1000', label: 'CHF 1’000', hint: 'Tiefste Prämie' },
] as const

export const PAYMENT_INTERVALS = [
  { value: 'yearly', label: 'Jährlich' },
  { value: 'half', label: 'Halbjährlich' },
  { value: 'quarterly', label: 'Vierteljährlich' },
] as const

export interface FaqEntry {
  readonly id: string
  readonly question: string
  readonly answer: string
}

export const APPLICATION_FAQ: readonly FaqEntry[] = [
  {
    id: 'sum',
    question: 'Wie ermittle ich die Versicherungssumme meines Hausrats?',
    answer:
      'Die Versicherungssumme hängt von der Anzahl Zimmer, der Anzahl Personen im Haushalt und dem Einrichtungsstandard ab. Der Prämienrechner schlägt anhand von Durchschnittswerten eine passende Summe vor.',
  },
  {
    id: 'scope',
    question: 'Was deckt die Haushaltversicherung?',
    answer:
      'Gedeckt sind Schäden an Ihren persönlichen beweglichen Sachen sowie Schäden, die Sie Drittpersonen zufügen. Mit Zusatzdeckungen runden Sie den Schutz ab.',
  },
]
