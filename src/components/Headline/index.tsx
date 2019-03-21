import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { remCalc } from '../../utils/remCalc';

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
  textStyle?: HeadlineTextStyles;
  /**
   * The text of the headline.
   */
  children?: React.ReactNode;
}

export enum HeadlineTextTransform {
  none = 'none',
  upperCase = 'uppercase',
  lowerCase = 'lowercase',
  capitalize = 'capitalize',
  unset = 'unset',
  initial = 'initial',
  inherit = 'inherit',
}

export enum HeadlineTextStyles {
  giga = 'giga',
  mega = 'mega',
  alpha = 'alpha',
  beta = 'beta',
  gamma = 'gamma',
  delta = 'delta',
  epsilon = 'epsilon',
  zeta = 'zeta',
  omega = 'omega',
  caption = 'caption',
  legal = 'legal',
  regular = 'regular',
}

export const HeadlineTextStylings = {
  [HeadlineTextStyles.giga]: {
    fontSize: remCalc('76px'),
    lineHeight: remCalc('95px'),
    fontWeight: 300,
    letterSpacing: 'initial',
    textTransform: HeadlineTextTransform.none,
  },
  [HeadlineTextStyles.mega]: {
    fontSize: remCalc('54px'),
    lineHeight: remCalc('68px'),
    fontWeight: 300,
    letterSpacing: 'initial',
    textTransform: HeadlineTextTransform.none,
  },
  [HeadlineTextStyles.alpha]: {
    fontSize: remCalc('48px'),
    lineHeight: remCalc('60px'),
    fontWeight: 300,
    letterSpacing: '0.87px',
    textTransform: HeadlineTextTransform.none,
  },
  [HeadlineTextStyles.beta]: {
    fontSize: remCalc('28px'),
    lineHeight: remCalc('35px'),
    fontWeight: 300,
    letterSpacing: 'initial',
    textTransform: HeadlineTextTransform.none,
  },
  [HeadlineTextStyles.gamma]: {
    fontSize: remCalc('22px'),
    lineHeight: remCalc('28px'),
    fontWeight: 700,
    letterSpacing: 'initial',
    textTransform: HeadlineTextTransform.upperCase,
  },
  [HeadlineTextStyles.delta]: {
    fontSize: remCalc('18px'),
    lineHeight: remCalc('23px'),
    fontWeight: 500,
    letterSpacing: 'initial',
    textTransform: HeadlineTextTransform.none,
  },
  [HeadlineTextStyles.epsilon]: {
    fontSize: remCalc('16px'),
    lineHeight: remCalc('20px'),
    fontWeight: 500,
    letterSpacing: 'initial',
    textTransform: HeadlineTextTransform.none,
  },
  [HeadlineTextStyles.zeta]: {
    fontSize: remCalc('14px'),
    lineHeight: remCalc('18px'),
    fontWeight: 300,
    letterSpacing: 'initial',
    textTransform: HeadlineTextTransform.none,
  },
  [HeadlineTextStyles.omega]: {
    fontSize: remCalc('14px'),
    lineHeight: remCalc('18px'),
    fontWeight: 700,
    letterSpacing: 'initial',
    textTransform: HeadlineTextTransform.none,
  },
  [HeadlineTextStyles.caption]: {
    fontSize: remCalc('12px'),
    lineHeight: remCalc('18px'),
    fontWeight: 400,
    letterSpacing: 'initial',
    textTransform: HeadlineTextTransform.none,
  },
  [HeadlineTextStyles.legal]: {
    fontSize: remCalc('11px'),
    lineHeight: remCalc('17px'),
    fontWeight: 400,
    letterSpacing: 'initial',
    textTransform: HeadlineTextTransform.none,
  },
  [HeadlineTextStyles.regular]: {
    fontSize: remCalc('16px'),
    lineHeight: remCalc('24px'),
    fontWeight: 400,
    letterSpacing: 'initial',
    textTransform: HeadlineTextTransform.none,
  },
};

/**
 * @deprecated
 * Use `HeadlineTextStylings` instead, or `getFontLineHeight`, `getFontSize`, `getFontWeight`, `getFontStyle`.
 */
export const TextStylings = HeadlineTextStylings;

const sizeMapping = {
  medium: {
    h1: HeadlineTextStyles.giga,
    h2: HeadlineTextStyles.mega,
    h3: HeadlineTextStyles.alpha,
    h4: HeadlineTextStyles.beta,
    h5: HeadlineTextStyles.gamma,
    h6: HeadlineTextStyles.delta,
  },
  small: {
    h1: HeadlineTextStyles.alpha,
    h2: HeadlineTextStyles.beta,
    h3: HeadlineTextStyles.gamma,
    h4: HeadlineTextStyles.delta,
    h5: HeadlineTextStyles.epsilon,
    h6: HeadlineTextStyles.zeta,
  },
};

export interface StyledHeadlineProps {
  size: HeadlineSize;
  level: number;
  theme?: any;
  subheader?: boolean;
  textStyle?: HeadlineTextStyles;
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

  const textStyling = props.textStyle
    ? HeadlineTextStylings[props.textStyle]
    : HeadlineTextStylings[sizeMapping[size][component]];
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

const HeadlineContainer = styled('div')<StyledHeadlineProps>`
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
