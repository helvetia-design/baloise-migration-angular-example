import { Component, ChangeDetectionStrategy } from '@angular/core'

import {
  BalContent,
  BalDivider,
  BalHeading,
  BalLogo,
  BalShape,
  BalStack,
  BalText,
} from '@baloise/ds-angular'

import {
  CONTENT_ALIGNMENTS,
  CONTENT_DIRECTIONS,
  CONTENT_LAYOUTS,
  CONTENT_SPACES,
  DIVIDER_BORDER_STYLES,
  DIVIDER_COLORS,
  DIVIDER_LAYOUTS,
  DIVIDER_SPACES,
  LOGO_BRANDS,
  LOGO_COLORS,
  LOGO_SIZES,
  SHAPE_COLORS,
  SHAPE_ROTATIONS,
  SHAPE_VARIATIONS,
  STACK_ALIGNMENTS,
  STACK_DIRECTIONS,
  STACK_LAYOUTS,
  STACK_PADDINGS,
  STACK_SPACES,
} from '../../../data/showcase.data'
import { ShowcaseSectionComponent } from './showcase-section.component'

@Component({
  selector: 'app-layout-section',
  imports: [
    ShowcaseSectionComponent,
    BalContent,
    BalDivider,
    BalHeading,
    BalLogo,
    BalShape,
    BalStack,
    BalText
],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './layout-section.component.html',
})
export class LayoutSectionComponent {
  readonly stackLayouts = STACK_LAYOUTS
  readonly stackSpaces = STACK_SPACES
  readonly stackPaddings = STACK_PADDINGS
  readonly stackAlignments = STACK_ALIGNMENTS
  readonly stackDirections = STACK_DIRECTIONS

  readonly contentLayouts = CONTENT_LAYOUTS
  readonly contentDirections = CONTENT_DIRECTIONS
  readonly contentSpaces = CONTENT_SPACES
  readonly contentAlignments = CONTENT_ALIGNMENTS

  readonly dividerLayouts = DIVIDER_LAYOUTS
  readonly dividerBorderStyles = DIVIDER_BORDER_STYLES
  readonly dividerColors = DIVIDER_COLORS
  readonly dividerSpaces = DIVIDER_SPACES

  readonly shapeVariations = SHAPE_VARIATIONS
  readonly shapeColors = SHAPE_COLORS
  readonly shapeRotations = SHAPE_ROTATIONS

  readonly logoColors = LOGO_COLORS
  readonly logoSizes = LOGO_SIZES
  readonly logoBrands = LOGO_BRANDS
}
