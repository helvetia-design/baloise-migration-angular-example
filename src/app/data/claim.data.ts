import { brandIcons } from './icons'

export interface ClaimType {
  readonly value: string
  readonly label: string
  readonly description: string
  readonly svg: string
  readonly tileColor: 'purple' | 'green' | 'yellow' | 'red'
}

/** Source of the *ngFor generated bal-radio tiles on the claim page. */
export const CLAIM_TYPES: readonly ClaimType[] = [
  {
    value: 'motor',
    label: 'Motorfahrzeug',
    description: 'Kollision, Parkschaden oder Diebstahl.',
    svg: brandIcons.car,
    tileColor: 'green',
  },
  {
    value: 'animal',
    label: 'Tierkollision',
    description: 'Zusammenstoss mit einem Wildtier.',
    svg: brandIcons.carCrashWithAnimal,
    tileColor: 'purple',
  },
  {
    value: 'household',
    label: 'Hausrat',
    description: 'Wasser-, Feuer- oder Diebstahlschaden.',
    svg: brandIcons.household,
    tileColor: 'yellow',
  },
]

export const CLAIM_LOCATIONS = [
  { value: 'home', label: 'Zuhause' },
  { value: 'road', label: 'Im Strassenverkehr' },
  { value: 'abroad', label: 'Im Ausland' },
  { value: 'other', label: 'Anderer Ort' },
] as const

export const CONTACT_CHANNELS = [
  { value: 'phone', label: 'Telefon' },
  { value: 'email', label: 'E-Mail' },
  { value: 'letter', label: 'Brief' },
] as const

export interface ChecklistItem {
  readonly value: string
  readonly label: string
  readonly hint: string
}

/** Source of the *ngFor generated checkbox tiles. */
export const CLAIM_CHECKLIST: readonly ChecklistItem[] = [
  {
    value: 'police',
    label: 'Polizeirapport vorhanden',
    hint: 'Bei Diebstahl und Personenschaden zwingend.',
  },
  {
    value: 'photos',
    label: 'Fotos vom Schaden',
    hint: 'Mindestens drei Aufnahmen aus verschiedenen Winkeln.',
  },
  {
    value: 'thirdParty',
    label: 'Angaben zur Gegenpartei',
    hint: 'Name, Adresse und Versicherung der Gegenpartei.',
  },
]

export interface ClaimContract {
  readonly value: string
  readonly label: string
}

export const CLAIM_CONTRACTS: readonly ClaimContract[] = [
  { value: '70/2.937.458', label: 'Motorfahrzeug Kasko — 70/2.937.458' },
  { value: '70/3.118.002', label: 'Hausrat & Haftpflicht — 70/3.118.002' },
  { value: '70/4.552.771', label: 'Gebäudeversicherung — 70/4.552.771' },
]
