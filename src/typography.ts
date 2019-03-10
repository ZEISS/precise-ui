import { css } from './utils/styled';
import { remCalc } from './utils/remCalc';
import { displayTo } from './utils/displayTo';

export type FontSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';
export type LineHeight = FontSize;

export const fontLineHeight = {
  xxxLarge: `${displayTo('large')`line-height: ${remCalc('56px')};`}
    ${displayTo('smallAndMedium')`line-height: ${remCalc('36px')};`}
  `,

  xxLarge: `${displayTo('large')`line-height: ${remCalc('36px')};`}
    ${displayTo('smallAndMedium')`line-height: ${remCalc('28px')};`}
  `,

  xLarge: `line-height: ${remCalc('28px')};
  `,

  large: `${displayTo('large')`line-height: ${remCalc('24px')};`}
    ${displayTo('smallAndMedium')`line-height: ${remCalc('22px')};`}
  `,

  medium: `line-height: ${remCalc('22px')};
  `,

  small: `line-height: ${remCalc('18px')};
  `,

  xSmall: `line-height: ${remCalc('14px')};
  `,
};

export const fontSize = {
  xxxLarge: `${displayTo('large')`font-size: ${remCalc('44px')};`}
    ${displayTo('smallAndMedium')`font-size: ${remCalc('32px')};`}

 	letter-spacing: 0.5px;
  `,

  xxLarge: `${displayTo('large')`font-size: ${remCalc('32px')};`}
    ${displayTo('smallAndMedium')`font-size: ${remCalc('24px')};`}

 	letter-spacing: 0.5px;
  `,

  xLarge: `font-size: ${remCalc('24px')};
    letter-spacing: 0.5px;
  `,

  large: `${displayTo('large')`font-size: ${remCalc('19px')};`}
    ${displayTo('smallAndMedium')`font-size: ${remCalc('16px')};`}
  `,

  medium: `font-size: ${remCalc('16px')};
  `,

  small: `font-size: ${remCalc('14px')};
  `,

  xSmall: `font-size: ${remCalc('12px')};
  `,
};

export type FontWeight = 'light' | 'regular' | 'medium' | 'bold';
export const fontWeight = {
  light: `font-weight: 300;
  `,
  regular: `font-weight: 400;
  `,
  medium: `font-weight: 500;
  `,
  bold: `font-weight: 700;
  `,
};

export interface FontStyleProps {
  size?: FontSize;
  weight?: FontWeight;
  lineHeight?: LineHeight;
}

export function getFontStyle({ size, weight, lineHeight = size }: FontStyleProps) {
  return `${size && fontSize[size] ? fontSize[size] : ''}
		${lineHeight && fontLineHeight[lineHeight] ? fontLineHeight[lineHeight] : ''}
		${weight && fontWeight[weight] ? fontWeight[weight] : ''}
	`;
}
