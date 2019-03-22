import { remCalc } from '../../utils/remCalc';

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
