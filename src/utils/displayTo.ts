import { css, ThemedCssFunction } from './styled';
import { ScreenSize, Breakpoints } from '../common';
import { breakpoints } from '../themes';

function isBreakpoint(breakpoints: Breakpoints, name: keyof Breakpoints) {
  const value = breakpoints && breakpoints[name];
  return typeof value === 'number' && value > 0;
}

export function getMediaQueries(breakpoints: Breakpoints) {
  if (!isBreakpoint(breakpoints, 'medium') || !isBreakpoint(breakpoints, 'large')) {
    throw new Error('Invaild breakpoints');
  }

  return {
    small: `(max-width: ${breakpoints.medium - 1}px)`,
    smallAndMedium: `(max-width: ${breakpoints.large - 1}px)`,
    medium: `(min-width: ${breakpoints.medium}px) and (max-width: ${breakpoints.large - 1}px)`,
    mediumAndLarge: `(min-width: ${breakpoints.medium}px)`,
    large: `(min-width: ${breakpoints.large}px)`,
  };
}

export function displayTo(screen: ScreenSize | string): ThemedCssFunction<any> {
  const query = getMediaQueries(breakpoints)[screen] || screen;
  const result: ThemedCssFunction<any> = (strings: any, ...interpolations: Array<any>) =>
    css`
      @media ${query} {
        ${css(strings, ...interpolations)};
      }
    `;
  return result;
}
