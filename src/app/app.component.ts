import { Component, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core'
import { UpperCasePipe } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router'
import { filter } from 'rxjs/operators'
import {
  BalApp,
  BalButton,
  BalButtonGroup,
  BalFooter,
  BalList,
  BalListItem,
  BalListItemContent,
  BalListItemTitle,
  BalLogo,
  BalNavbar,
  BalNavbarBrand,
  BalNavbarMenu,
  BalNavbarMenuEnd,
  BalNavbarMenuStart,
  BalPopover,
  BalPopoverContent,
  BalTabItem,
  BalTabs,
  BalText,
} from '@baloise/ds-angular'
import { BalLanguage, updateBalLanguage } from '@baloise/ds-core'

import { MAIN_NAVIGATION, NavigationItem, PORTAL_LANGUAGES, PortalLanguage } from './data/navigation.data'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    UpperCasePipe,
    BalApp,
    BalButton,
    BalButtonGroup,
    BalFooter,
    BalList,
    BalListItem,
    BalListItemContent,
    BalListItemTitle,
    BalLogo,
    BalNavbar,
    BalNavbarBrand,
    BalNavbarMenu,
    BalNavbarMenuEnd,
    BalNavbarMenuStart,
    BalPopover,
    BalPopoverContent,
    BalTabItem,
    BalTabs,
    BalText
],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  /**
   * Shape 2 of the tabs contract: the items are a pure navigation strip generated
   * from a data source with `@for`. They carry no content of their own — the page
   * below is rendered by the router, not by the tab items.
   */
  readonly navigation = MAIN_NAVIGATION
  readonly languages = PORTAL_LANGUAGES

  activeRoute = '/'
  activeLanguage: BalLanguage = 'de'
  appIsReady = false

  @ViewChild('shell', { static: true, read: ElementRef }) shell?: ElementRef<HTMLBalAppElement>
  @ViewChild('navbar', { static: true, read: ElementRef }) navbar?: ElementRef<HTMLBalNavbarElement>
  @ViewChild('languagePopover', { read: ElementRef }) languagePopover?: ElementRef<HTMLBalPopoverElement>
  @ViewChild('skipTarget', { static: true }) skipTarget?: ElementRef<HTMLElement>

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        const [path] = event.urlAfterRedirects.split('?')
        this.activeRoute = path === '' ? '/' : path
      })
  }

  trackNavigationItem = (_index: number, item: NavigationItem) => item.route
  trackLanguage = (_index: number, language: PortalLanguage) => language.code

  /** bal-app event handler. */
  onAppReady(_event: BalEvents.BalAppCustomEvent<void>) {
    this.appIsReady = true
  }

  /** bal-tabs event handler — the strip only drives the router. */
  onNavigationChange(event: BalEvents.BalTabsCustomEvent<string | undefined>) {
    if (event.detail && event.detail !== this.activeRoute) {
      this.router.navigateByUrl(event.detail)
    }
  }

  /** bal-tab-item event handler. */
  onNavigationItemNavigate(event: BalEvents.BalTabItemCustomEvent<MouseEvent>) {
    event.detail.preventDefault()
  }

  /** bal-navbar imperative method. */
  toggleNavbarMenu() {
    this.navbar?.nativeElement.toggleMenu()
  }

  /** bal-navbar-brand event handler. */
  onBrandNavigate(event: BalEvents.BalNavbarBrandCustomEvent<MouseEvent>) {
    event.detail.preventDefault()
    this.router.navigateByUrl('/')
  }

  /** bal-app imperative method — moves focus into the routed content. */
  skipToContent() {
    const target = this.skipTarget?.nativeElement
    if (target) {
      this.shell?.nativeElement.setFocus([target])
    }
  }

  /** bal-popover imperative method. */
  toggleLanguageMenu() {
    this.languagePopover?.nativeElement.toggle()
  }

  selectLanguage(language: BalLanguage) {
    this.activeLanguage = language
    updateBalLanguage(language)
    this.languagePopover?.nativeElement.dismiss()
  }
}
