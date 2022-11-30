import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

export type HeadlineSize = 'small' | 'medium';

export type HeadlineLevel = keyof typeof styledHeadlines;

export interface HeadlineProps extends StandardProps {
  /**
   * Represent 5 levels of headings (1-5)
   * Default is 3
   */
  level?: HeadlineLevel;
  /**
   * When specified headline will have muted text color
   */
  subheader?: boolean;
  /**
   * The text of the headline.
   */
  children?: React.ReactNode;
}

export interface StyledHeadlineProps {
  size: HeadlineSize;
  level: HeadlineLevel;
  theme?: any;
  subheader?: boolean;
}

/**
 * A common style for all headline levels.
 */
const baseStyle = themed<StyledHeadlineProps>(
  props => css`
    margin: 0;
    padding: ${props.theme.headingsPadding || `0 ${distance.small} 0 0`};
    font-family: ${props.theme.fontFamily || 'inherit'};
    color: ${props.subheader ? props.theme.text5 : 'inherit'};
  `,
);

/**
 * A map of styled components for each headline level.
 */
const styledHeadlines = {
  1: styled.h1`
    ${getFontStyle({ size: 'xxxLarge', weight: 'light' })}
    ${baseStyle}
  `,
  2: styled.h2`
    ${getFontStyle({ size: 'xxLarge', weight: 'light' })}
    ${baseStyle}
  `,
  3: styled.h3`
    ${getFontStyle({ size: 'xLarge', weight: 'medium' })}
    ${baseStyle}
  `,
  4: styled.h4`
    ${getFontStyle({ size: 'large', weight: 'regular' })}
    ${baseStyle}
  `,
  5: styled.h5`
    ${getFontStyle({ size: 'medium', weight: 'medium' })}
    ${baseStyle}
  `,
};

/**
 * Headline component with styles for all headline levels.
 */
export const Headline: React.SFC<HeadlineProps> = ({ level = 3, children, ...rest }) => {
  const StyledHeadline = styledHeadlines[level] || styledHeadlines[3];

  return (
    <StyledHeadline level={level} {...rest}>
      {children}
    </StyledHeadline>
  );
};

Headline.displayName = 'Headline';
