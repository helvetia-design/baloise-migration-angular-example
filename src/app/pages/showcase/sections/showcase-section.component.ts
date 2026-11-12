import { Component, Input, ChangeDetectionStrategy } from '@angular/core'

import { BalHeading, BalText } from '@baloise/ds-angular'

/** Small presentational wrapper so every showcase block looks the same. */
@Component({
  selector: 'app-showcase-section',
  imports: [BalHeading, BalText],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section class="mb-x-large" [id]="anchor">
      <bal-heading level="h2" visualLevel="h4" space="none">{{ title }}</bal-heading>
      @if (subtitle) {
        <bal-text size="small" color="grey" space="bottom">{{ subtitle }}</bal-text>
      }
      <ng-content></ng-content>
    </section>
    `,
})
export class ShowcaseSectionComponent {
  @Input({ required: true }) title = ''
  @Input() subtitle = ''
  @Input() anchor = ''
}
