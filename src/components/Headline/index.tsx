import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

export type HeadlineSize = 'small' | 'medium';

export interface HeadlineProps extends StandardProps {
  /**
   * Represent 5 levels of headings (1-5)
   * Default is 3
   */
  level?: 1 | 2 | 3 | 4 | 5;
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
  level: number;
  theme?: any;
  subheader?: boolean;
}

interface HeadlineCache {
  [key: string]: any;
}

const Headlines: HeadlineCache = {};

function getComponentName(level: number) {
  return `h${level >= 1 && level <= 5 ? level : 3}`;
}

function getHeadlineStyle(level: StyledHeadlineProps['level']) {
  switch (level) {
    case 1:
      return getFontStyle({ size: 'xxxLarge', weight: 'light' });
    case 2:
      return getFontStyle({ size: 'xxLarge', weight: 'light' });
    case 3:
      return getFontStyle({ size: 'xLarge', weight: 'medium' });
    case 4:
      return getFontStyle({ size: 'large', weight: 'regular' });
    case 5:
      return getFontStyle({ size: 'medium', weight: 'medium' });
    default:
      return '';
  }
}

function getStyledHeadline(level: number) {
  const component = getComponentName(level);
  const Headline = Headlines[component];

  if (!Headline) {
    const NewHeadline = styled(component as 'h1')<StyledHeadlineProps>(
      themed(
        props => css`
          ${getHeadlineStyle(props.level)}

          margin: 0;
          padding: ${props.theme.headingsPadding || `0 ${distance.small} 0 0`};
          font-family: ${props.theme.fontFamily || 'inherit'};
          color: ${props.subheader ? props.theme.text5 : 'inherit'};
        `,
      ),
    );
    Headlines[component] = NewHeadline;
    return NewHeadline;
  }

  return Headline;
}

/**
 * Headline component with styles for all headline levels.
 */
export const Headline: React.SFC<HeadlineProps> = ({ level = 3, children, ...rest }) => {
  const StyledHeadline = getStyledHeadline(level);
  return (
    <StyledHeadline level={level} {...rest}>
      {children}
    </StyledHeadline>
  );
};

Headline.displayName = 'Headline';
