import { Component, Input } from '@angular/core'
import { BalButton, BalModalBundle, BalModalService, BalText } from '@baloise/ds-angular'

/** Content component for the modals presented through BalModalService on /showcase. */
@Component({
  selector: 'app-showcase-modal',
  imports: [BalButton, ...BalModalBundle, BalText],
  template: `
    <bal-modal-header>Modal space="{{ space }}"</bal-modal-header>
    <bal-modal-body>
      <bal-text size="small">
        Dieser Inhalt wurde von BalModalService über den Angular-Delegate eingehängt.
      </bal-text>
      <bal-button color="primary" size="small" (balClick)="close()">Schliessen</bal-button>
    </bal-modal-body>
  `,
})
export class ShowcaseModalComponent {
  @Input() space = 'default'

  constructor(private readonly modalService: BalModalService) {}

  close() {
    void this.modalService.dismiss(undefined, 'confirm')
  }
}
