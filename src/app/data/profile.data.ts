export interface ProfileTab {
  readonly value: string
  readonly label: string
  readonly icon: string
  readonly bubble: boolean
}

/** Source of the *ngFor generated bal-tab-item strip on the profile page. */
export const PROFILE_TABS: readonly ProfileTab[] = [
  { value: 'contracts', label: 'Verträge', icon: 'document', bubble: false },
  { value: 'payments', label: 'Zahlungen', icon: 'print', bubble: true },
  { value: 'settings', label: 'Einstellungen', icon: 'settings', bubble: false },
]

export interface PolicyRow {
  readonly id: string
  readonly product: string
  readonly policyNumber: string
  readonly start: string
  readonly premium: number
  readonly status: 'Aktiv' | 'Sistiert' | 'Gekündigt'
  readonly statusColor: 'green' | 'yellow' | 'red'
}

export const POLICY_ROWS: readonly PolicyRow[] = [
  { id: 'p1', product: 'Motorfahrzeug Kasko', policyNumber: '70/2.937.458', start: '01.01.2024', premium: 892, status: 'Aktiv', statusColor: 'green' },
  { id: 'p2', product: 'Hausrat & Haftpflicht', policyNumber: '70/3.118.002', start: '01.04.2022', premium: 348, status: 'Aktiv', statusColor: 'green' },
  { id: 'p3', product: 'Gebäudeversicherung', policyNumber: '70/4.552.771', start: '01.07.2021', premium: 1240, status: 'Sistiert', statusColor: 'yellow' },
  { id: 'p4', product: 'Rechtsschutz', policyNumber: '70/5.009.114', start: '01.09.2020', premium: 214, status: 'Gekündigt', statusColor: 'red' },
  { id: 'p5', product: 'Reiseversicherung', policyNumber: '70/5.772.431', start: '01.02.2023', premium: 96, status: 'Aktiv', statusColor: 'green' },
  { id: 'p6', product: 'Cyberschutz', policyNumber: '70/6.223.887', start: '01.11.2025', premium: 132, status: 'Aktiv', statusColor: 'green' },
]

export const POLICIES_PER_PAGE = 3

export interface PaymentRow {
  readonly id: string
  readonly date: string
  readonly subject: string
  readonly amount: number
  readonly paid: boolean
}

export const PAYMENT_ROWS: readonly PaymentRow[] = [
  { id: 'i1', date: '02.01.2026', subject: 'Jahresprämie 2026', amount: 2480, paid: true },
  { id: 'i2', date: '02.01.2025', subject: 'Jahresprämie 2025', amount: 2402, paid: true },
  { id: 'i3', date: '15.06.2025', subject: 'Nachtrag Cyberschutz', amount: 132, paid: false },
]

export interface NotificationTopic {
  readonly value: string
  readonly label: string
}

/** Source of the *ngFor generated checkbox group in the settings tab. */
export const NOTIFICATION_TOPICS: readonly NotificationTopic[] = [
  { value: 'invoices', label: 'Rechnungen' },
  { value: 'claims', label: 'Schadenstatus' },
  { value: 'offers', label: 'Angebote' },
  { value: 'newsletter', label: 'Newsletter' },
]

export interface CorrespondenceOption {
  readonly value: string
  readonly label: string
}

export const CORRESPONDENCE_OPTIONS: readonly CorrespondenceOption[] = [
  { value: 'digital', label: 'Nur digital' },
  { value: 'paper', label: 'Nur Post' },
  { value: 'both', label: 'Digital und Post' },
]

export const SORT_OPTIONS = [
  { value: 'product', label: 'Produkt' },
  { value: 'premium', label: 'Prämie' },
  { value: 'start', label: 'Beginn' },
] as const
