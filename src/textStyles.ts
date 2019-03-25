import { remCalc } from './utils/remCalc';
import { displayTo } from './utils/displayTo';
import { css } from './utils/styled';

export type FontSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';
export type LineHeight = FontSize;

export function getFontLineHeight(size?: LineHeight) {
  switch (size) {
    case 'xxxLarge':
      return css`
        ${displayTo('large')`line-height: ${remCalc('56px')};`}
        ${displayTo('smallAndMedium')`line-height: ${remCalc('36px')};`}
      `;
    case 'xxLarge':
      return css`
        ${displayTo('large')`line-height: ${remCalc('36px')};`}
        ${displayTo('smallAndMedium')`line-height: ${remCalc('28px')};`}
      `;
    case 'xLarge':
      return `
        line-height: ${remCalc('28px')};
      `;
    case 'large':
      return css`
        ${displayTo('large')`line-height: ${remCalc('24px')};`}
        ${displayTo('smallAndMedium')`line-height: ${remCalc('22px')};`}
      `;
    case 'medium':
      return `line-height: ${remCalc('22px')};
  `;
    case 'small':
      return `line-height: ${remCalc('18px')};
  `;
    case 'xSmall':
      return `line-height: ${remCalc('14px')};
  `;
    default:
      return '';
  }
}

export function getFontSize(size?: FontSize) {
  switch (size) {
    case 'xxxLarge':
      return css`
        ${displayTo('large')`font-size: ${remCalc('44px')};`}
        ${displayTo('smallAndMedium')`font-size: ${remCalc('32px')};`}

 	      letter-spacing: 0.5px;
      `;
    case 'xxLarge':
      return css`
        ${displayTo('large')`font-size: ${remCalc('32px')};`}
        ${displayTo('smallAndMedium')`font-size: ${remCalc('24px')};`}

 	      letter-spacing: 0.5px;
      `;
    case 'xLarge':
      return `
        font-size: ${remCalc('24px')};
        letter-spacing: 0.5px;
      `;
    case 'large':
      return css`
        ${displayTo('large')`font-size: ${remCalc('19px')};`}
        ${displayTo('smallAndMedium')`font-size: ${remCalc('16px')};`}
      `;
    case 'medium':
      return `font-size: ${remCalc('16px')};
  `;
    case 'small':
      return `font-size: ${remCalc('14px')};
  `;
    case 'xSmall':
      return `font-size: ${remCalc('12px')};
  `;
    default:
      return '';
  }
}

export type FontWeight = 'light' | 'regular' | 'medium' | 'bold';
export function getFontWeight(type?: FontWeight) {
  switch (type) {
    case 'light':
      return `font-weight: 300;`;
    case 'regular':
      return `font-weight: 400;`;
    case 'medium':
      return `font-weight: 500;`;
    case 'bold':
      return `font-weight: 700;`;
    default:
      return '';
  }
}

export interface FontStyleProps {
  size?: FontSize;
  weight?: FontWeight;
  lineHeight?: LineHeight;
}

export function getFontStyle({ size, weight, lineHeight = size }: FontStyleProps) {
  return css`
    ${getFontSize(size)}
    ${getFontLineHeight(lineHeight)}
    ${getFontWeight(weight)}
  `;
}
