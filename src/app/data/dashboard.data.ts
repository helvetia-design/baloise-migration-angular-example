import { brandIcons } from './icons'

export interface Contract {
  readonly id: string
  readonly product: string
  readonly policyNumber: string
  readonly premium: number
  readonly status: 'aktiv' | 'in Bearbeitung' | 'gekündigt'
  readonly statusColor: 'green' | 'yellow' | 'red'
  readonly cardColor: 'purple-light' | 'green-light' | 'yellow-light' | 'red-light'
  readonly svg: string
  readonly coverage: number
}

export const CONTRACTS: readonly Contract[] = [
  {
    id: 'auto',
    product: 'Motorfahrzeug Kasko',
    policyNumber: '70/2.937.458',
    premium: 892,
    status: 'aktiv',
    statusColor: 'green',
    cardColor: 'green-light',
    svg: brandIcons.car,
    coverage: 100,
  },
  {
    id: 'household',
    product: 'Hausrat & Haftpflicht',
    policyNumber: '70/3.118.002',
    premium: 348,
    status: 'aktiv',
    statusColor: 'green',
    cardColor: 'purple-light',
    svg: brandIcons.household,
    coverage: 80,
  },
  {
    id: 'building',
    product: 'Gebäudeversicherung',
    policyNumber: '70/4.552.771',
    premium: 1240,
    status: 'in Bearbeitung',
    statusColor: 'yellow',
    cardColor: 'yellow-light',
    svg: brandIcons.building,
    coverage: 45,
  },
]

export interface PortfolioFact {
  readonly label: string
  readonly value: string
  readonly multiline: boolean
  readonly editable: boolean
}

export const PORTFOLIO_FACTS: readonly PortfolioFact[] = [
  { label: 'Versicherungsnehmer', value: 'Andrea Baumgartner', multiline: false, editable: true },
  { label: 'Kundennummer', value: '8 123 456', multiline: false, editable: false },
  { label: 'Hauptadresse', value: 'Aeschengraben 21, 4051 Basel', multiline: true, editable: true },
  { label: 'Betreuung', value: 'Agentur Basel-Stadt', multiline: false, editable: true },
]

export interface DocumentEntry {
  readonly id: string
  readonly title: string
  readonly meta: string
  readonly icon: string
  readonly disabled: boolean
}

export const DOCUMENTS: readonly DocumentEntry[] = [
  { id: 'police', title: 'Police 2026', meta: 'PDF — 98 KB', icon: 'file', disabled: false },
  { id: 'invoice', title: 'Prämienrechnung', meta: 'PDF — 54 KB', icon: 'document', disabled: false },
  { id: 'photo', title: 'Fotodokumentation', meta: 'PNG — 1.4 MB', icon: 'picture', disabled: false },
  { id: 'archive', title: 'Archiv 2019', meta: 'ZIP — 12 MB', icon: 'file', disabled: true },
]

export interface ProductTeaser {
  readonly id: string
  readonly label: string
  readonly color: 'white' | 'green' | 'yellow' | 'red' | 'purple'
  readonly description: string
}

/** Source for the loop generated carousel items on the dashboard. */
export const PRODUCT_TEASERS: readonly ProductTeaser[] = [
  { id: 'travel', label: 'Reisen', color: 'green', description: 'Weltweiter Schutz ab CHF 8.– pro Monat.' },
  { id: 'legal', label: 'Rechtsschutz', color: 'purple', description: 'Juristische Unterstützung im Alltag.' },
  { id: 'pension', label: 'Vorsorge', color: 'yellow', description: 'Säule 3a mit Steuervorteil.' },
  { id: 'cyber', label: 'Cyber', color: 'red', description: 'Schutz vor digitalen Risiken.' },
  { id: 'pet', label: 'Tierhalter', color: 'green', description: 'Haftpflicht für Hund und Katze.' },
]

export interface ActivityEntry {
  readonly id: string
  readonly title: string
  readonly subtitle: string
  readonly badge: string
  readonly badgeColor: 'green' | 'yellow' | 'purple' | 'grey'
}

export const ACTIVITIES: readonly ActivityEntry[] = [
  { id: 'a1', title: 'Schadenmeldung erfasst', subtitle: '12. Januar 2026', badge: '1', badgeColor: 'green' },
  { id: 'a2', title: 'Police angepasst', subtitle: '3. Januar 2026', badge: '2', badgeColor: 'purple' },
  { id: 'a3', title: 'Rechnung beglichen', subtitle: '28. Dezember 2025', badge: '3', badgeColor: 'yellow' },
  { id: 'a4', title: 'Archiviert', subtitle: '2. Dezember 2025', badge: '4', badgeColor: 'grey' },
]
