import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { TextStyles, TextStylings } from '../../textStyles';
import { StandardProps } from '../../common';
import { distance } from '../../distance';

export type HeadlineSize = 'small' | 'medium';

export interface HeadlineProps extends StandardProps {
  /**
   * Represent 5 levels of headings (1-5)
   * Default is 3
   */
  level?: 1 | 2 | 3 | 4 | 5;
  /**
   * Currently supports 2 different sizes, SMALL and MEDIUM,
   * which could be used for ex. responsive layouts
   */
  size?: HeadlineSize;
  /**
   * When specified headline will have muted text color
   */
  subheader?: boolean;
  /**
   * When specified will select provided text style
   */
  textStyle?: TextStyles;
  /**
   * The text of the headline.
   */
  children?: React.ReactNode;
}

const sizeMapping = {
  medium: {
    h1: TextStyles.giga,
    h2: TextStyles.mega,
    h3: TextStyles.alpha,
    h4: TextStyles.beta,
    h5: TextStyles.gamma,
    h6: TextStyles.delta,
  },
  small: {
    h1: TextStyles.alpha,
    h2: TextStyles.beta,
    h3: TextStyles.gamma,
    h4: TextStyles.delta,
    h5: TextStyles.epsilon,
    h6: TextStyles.zeta,
  },
};

export interface StyledHeadlineProps {
  size: HeadlineSize;
  level: number;
  theme?: any;
  subheader?: boolean;
  textStyle?: TextStyles;
}

interface HeadlineCache {
  [key: string]: any;
}

const Headlines: HeadlineCache = {};

function getComponentName(level: number) {
  return `h${level >= 1 && level <= 6 ? level : 3}`;
}

function getTextStyling(props: StyledHeadlineProps, key: string): string {
  const { size, level } = props;
  const component = getComponentName(level);
  const textStyling = props.textStyle ? TextStylings[props.textStyle] : TextStylings[sizeMapping[size][component]];
  return textStyling[key];
}

function getStyledHeadline(level: number) {
  const component = getComponentName(level);
  const Headline = Headlines[component];

  if (!Headline) {
    const NewHeadline = styled[component]`
      margin: 0;
      font-weight: inherit;
      font-size: inherit;
    `;
    Headlines[component] = NewHeadline;
    return NewHeadline;
  }

  return Headline;
}

const HeadlineContainer = styled<StyledHeadlineProps, 'div'>('div')`
  padding: ${themed(props => props.theme.headingsPadding || `0 ${distance.small} 0 0`)};
  font-size: ${props => getTextStyling(props, 'fontSize')};
  font-weight: ${props => getTextStyling(props, 'fontWeight')};
  text-transform: ${props => getTextStyling(props, 'textTransform')};
  font-family: ${themed(props => props.theme.fontFamily || 'inherit')};
  line-height: ${props => getTextStyling(props, 'lineHeight')};
  letter-spacing: ${props => getTextStyling(props, 'letterSpacing')};
  color: ${themed(props => (props.subheader ? props.theme.text5 : 'inherit'))};
`;

const defaultSize: HeadlineSize = 'medium';
/**
 * Headline component with styles for all headline levels.
 */
export const Headline: React.SFC<HeadlineProps> = ({ level = 3, size = defaultSize, children, ...rest }) => {
  const StyledHeadline = getStyledHeadline(level);
  return (
    <HeadlineContainer level={level} size={size} {...rest}>
      <StyledHeadline>{children}</StyledHeadline>
    </HeadlineContainer>
  );
};
Headline.displayName = 'Headline';
