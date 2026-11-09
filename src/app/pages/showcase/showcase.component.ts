import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { BalDivider, BalHeading, BalNotification, BalStack, BalText } from '@baloise/ds-angular'

import { ActionSectionComponent } from './sections/action-section.component'
import { DataDisplaySectionComponent } from './sections/data-display-section.component'
import { FeedbackSectionComponent } from './sections/feedback-section.component'
import { FormSectionComponent } from './sections/form-section.component'
import { LayoutSectionComponent } from './sections/layout-section.component'
import { NavigationSectionComponent } from './sections/navigation-section.component'
import { TypographySectionComponent } from './sections/typography-section.component'

@Component({
  selector: 'app-showcase',
  imports: [
    RouterLink,
    BalDivider,
    BalHeading,
    BalNotification,
    BalStack,
    BalText,
    ActionSectionComponent,
    DataDisplaySectionComponent,
    FeedbackSectionComponent,
    FormSectionComponent,
    LayoutSectionComponent,
    NavigationSectionComponent,
    TypographySectionComponent,
  ],
  templateUrl: './showcase.component.html',
})
export class ShowcaseComponent {}
