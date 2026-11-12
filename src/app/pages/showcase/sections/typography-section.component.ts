import { Component, ChangeDetectionStrategy } from '@angular/core'

import { BalHeading, BalLabel, BalText } from '@baloise/ds-angular'

import {
  HEADING_COLORS,
  HEADING_LEVELS,
  HEADING_SPACES,
  HEADING_VISUAL_LEVELS,
  LABEL_SIZES,
  LABEL_WEIGHTS,
  TEXT_COLORS,
  TEXT_SIZES,
  TEXT_SPACES,
} from '../../../data/showcase.data'
import { ShowcaseSectionComponent } from './showcase-section.component'

@Component({
  selector: 'app-typography-section',
  imports: [ShowcaseSectionComponent, BalHeading, BalLabel, BalText],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './typography-section.component.html',
})
export class TypographySectionComponent {
  readonly headingLevels = HEADING_LEVELS
  readonly headingVisualLevels = HEADING_VISUAL_LEVELS
  readonly headingColors = HEADING_COLORS
  readonly headingSpaces = HEADING_SPACES

  readonly textSizes = TEXT_SIZES
  readonly textSpaces = TEXT_SPACES
  readonly textColors = TEXT_COLORS

  readonly labelWeights = LABEL_WEIGHTS
  readonly labelSizes = LABEL_SIZES
}
