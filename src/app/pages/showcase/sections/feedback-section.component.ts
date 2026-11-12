import { Component, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core'

import {
  BalButton,
  BalButtonGroup,
  BalModalBundle,
  BalModalService,
  BalNotices,
  BalNotification,
  BalProgressBar,
  BalSheet,
  BalSnackbar,
  BalSnackbarService,
  BalSpinner,
  BalStack,
  BalText,
  BalToast,
  BalToastService,
} from '@baloise/ds-angular'

import {
  MODAL_SPACES,
  NOTIFICATION_COLORS,
  PROGRESS_BACKGROUNDS,
  PROGRESS_COLORS,
  SHEET_CONTAINERS,
  SNACKBAR_COLORS,
  SPINNER_COLORS,
  SPINNER_VARIATIONS,
  TOAST_COLORS,
} from '../../../data/showcase.data'
import { ShowcaseModalComponent } from './showcase-modal.component'
import { ShowcaseSectionComponent } from './showcase-section.component'

@Component({
  selector: 'app-feedback-section',
  imports: [
    ShowcaseSectionComponent,
    BalButton,
    BalButtonGroup,
    ...BalModalBundle,
    BalNotices,
    BalNotification,
    BalProgressBar,
    BalSheet,
    BalSnackbar,
    BalSpinner,
    BalStack,
    BalText,
    BalToast
],
  templateUrl: './feedback-section.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './feedback-section.component.scss',
})
export class FeedbackSectionComponent {
  readonly notificationColors = NOTIFICATION_COLORS
  readonly toastColors = TOAST_COLORS
  readonly snackbarColors = SNACKBAR_COLORS
  readonly modalSpaces = MODAL_SPACES
  readonly spinnerColors = SPINNER_COLORS
  readonly spinnerVariations = SPINNER_VARIATIONS
  readonly progressBackgrounds = PROGRESS_BACKGROUNDS
  readonly progressColors = PROGRESS_COLORS
  readonly sheetContainers = SHEET_CONTAINERS

  progressValue = 45
  lastEvent = ''

  @ViewChild('showcaseModal', { read: ElementRef }) showcaseModal?: ElementRef<HTMLBalModalElement>
  @ViewChild('inlineToast', { read: ElementRef }) inlineToast?: ElementRef<HTMLBalToastElement>
  @ViewChild('inlineSnackbar', { read: ElementRef }) inlineSnackbar?: ElementRef<HTMLBalSnackbarElement>

  constructor(
    private readonly toastService: BalToastService,
    private readonly snackbarService: BalSnackbarService,
    private readonly modalService: BalModalService,
  ) {}

  /** BalToastService — the documented Angular entry point. */
  showToast(color: 'info' | 'success' | 'warning' | 'danger') {
    this.toastService.create({
      color,
      message: `Toast in ${color}`,
      duration: 4000,
      closable: true,
    })
  }

  dismissToasts() {
    void this.toastService.dismissAll()
  }

  /** BalSnackbarService — the documented Angular entry point. */
  showSnackbar(color: 'info' | 'success' | 'warning' | 'danger') {
    this.snackbarService.create({
      color,
      icon: 'info-circle',
      subject: `Snackbar ${color}`,
      message: 'Eine Meldung mit Aktion.',
      action: 'Mehr',
      duration: 5000,
      actionHandler: () => {
        this.lastEvent = `Snackbar-Aktion in ${color}`
      },
    })
  }

  dismissSnackbars() {
    void this.snackbarService.dismissAll()
  }

  /** BalModalService with a space option per value. */
  async showModal(space: '' | 'small' | 'medium') {
    const modal = await this.modalService.create({
      component: ShowcaseModalComponent,
      componentProps: { space: space || 'default' },
      isClosable: true,
      hasBackdrop: true,
      backdropDismiss: true,
      space: space === '' ? undefined : space,
    })
    await modal.present()
    const result = await modal.onDidDismiss()
    this.lastEvent = `Modal (space="${space || 'default'}") geschlossen: ${result.role ?? 'dismiss'}`
  }

  openInlineModal() {
    void this.showcaseModal?.nativeElement.open()
  }

  closeInlineModal() {
    void this.showcaseModal?.nativeElement.close()
  }

  /**
   * `present()` attaches its content through a framework delegate and therefore only works
   * for modals created via `BalModalService`. A declarative modal has no delegate and the
   * call throws. `dismiss()` already falls back to `close()` in that case, so we mirror it.
   */
  async presentInlineModal() {
    const modal = this.showcaseModal?.nativeElement
    if (!modal) return
    await (modal.component ? modal.present() : modal.open())
  }

  dismissInlineModal() {
    void this.showcaseModal?.nativeElement.dismiss(undefined, 'dismiss')
  }

  onModalWillPresent() {
    this.lastEvent = 'bal-modal balModalWillPresent'
  }

  onModalDidPresent() {
    this.lastEvent = 'bal-modal balModalDidPresent'
  }

  onModalWillDismiss() {
    this.lastEvent = 'bal-modal balModalWillDismiss'
  }

  onModalDidDismiss() {
    this.lastEvent = 'bal-modal balModalDidDismiss'
  }

  /** bal-toast / bal-snackbar declarative elements and their methods. */
  onToastClose(event: BalEvents.BalToastCustomEvent<string>) {
    this.lastEvent = `bal-toast balClose: ${event.detail}`
  }

  closeInlineToast() {
    void this.inlineToast?.nativeElement.close()
  }

  closeInlineToastIn() {
    void this.inlineToast?.nativeElement.closeIn(2000)
  }

  onSnackbarClose(event: BalEvents.BalSnackbarCustomEvent<string>) {
    this.lastEvent = `bal-snackbar balClose: ${event.detail}`
  }

  onSnackbarAction(event: BalEvents.BalSnackbarCustomEvent<string>) {
    this.lastEvent = `bal-snackbar balAction: ${event.detail}`
  }

  closeInlineSnackbar() {
    void this.inlineSnackbar?.nativeElement.close()
  }

  closeInlineSnackbarIn() {
    void this.inlineSnackbar?.nativeElement.closeIn(2000)
  }

  setProgress(value: number) {
    this.progressValue = value
  }
}
