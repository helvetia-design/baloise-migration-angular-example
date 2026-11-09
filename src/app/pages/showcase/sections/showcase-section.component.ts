import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
import { BalHeading, BalText } from '@baloise/ds-angular'

/** Small presentational wrapper so every showcase block looks the same. */
@Component({
  selector: 'app-showcase-section',
  imports: [NgIf, BalHeading, BalText],
  template: `
    <section class="mb-x-large" [id]="anchor">
      <bal-heading level="h2" visualLevel="h4" space="none">{{ title }}</bal-heading>
      <bal-text *ngIf="subtitle" size="small" color="grey" space="bottom">{{ subtitle }}</bal-text>
      <ng-content></ng-content>
    </section>
  `,
})
export class ShowcaseSectionComponent {
  @Input({ required: true }) title = ''
  @Input() subtitle = ''
  @Input() anchor = ''
}
