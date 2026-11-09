import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
import {
  BalButton,
  BalButtonGroup,
  BalModalBundle,
  BalNotification,
  BalModalService,
  BalStack,
  BalText,
} from '@baloise/ds-angular'

/**
 * Rendered by BalModalService.create({ component: ClaimConfirmModalComponent }).
 * The service attaches this Angular component into a bal-modal through the
 * AngularDelegate, so it is a normal standalone component with @Input()s.
 */
@Component({
  selector: 'app-claim-confirm-modal',
  imports: [NgIf, BalButton, BalButtonGroup, ...BalModalBundle, BalNotification, BalStack, BalText],
  template: `
    <bal-modal-header>Schadenmeldung bestätigen</bal-modal-header>
    <bal-modal-body>
      <bal-stack layout="vertical" space="small">
        <bal-text>
          Sie melden einen Schaden für die Police <strong>{{ contract }}</strong
          >.
        </bal-text>
        <!--
          The conditional lives inside a plain wrapper so that bal-stack only ever
          sees static children — see docs/FINDINGS.md.
        -->
        <div>
          <bal-notification *ngIf="fileCount === 0" color="warning" [light]="true">
            <span>Es sind noch keine Belege hochgeladen.</span>
          </bal-notification>
        </div>
        <bal-text size="small" color="grey">
          Mit dem Bestätigen übermitteln Sie die Meldung an die Schadenabteilung.
        </bal-text>
        <bal-button-group position="right" [reverse]="true">
          <bal-button color="text" (balClick)="dismiss('cancel')">Abbrechen</bal-button>
          <bal-button color="primary" (balClick)="dismiss('confirm')">Bestätigen</bal-button>
        </bal-button-group>
      </bal-stack>
    </bal-modal-body>
  `,
})
export class ClaimConfirmModalComponent {
  @Input() contract = ''
  @Input() fileCount = 0

  constructor(private readonly modalService: BalModalService) {}

  dismiss(role: string) {
    this.modalService.dismiss(undefined, role)
  }
}
