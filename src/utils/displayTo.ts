import { css, ThemedCssFunction } from './styled';
import { ScreenSize, Breakpoints, ScreenSizeList } from '../common';
import { breakpoints } from '../themes';

export type WidthBreakpoints = { min?: number; max?: number };

export function getMediaQueries(breakpoints: Breakpoints) {
  return ScreenSizeList.map(x => ({ screen: x, breakpoints: getScreenSizeBreakpoints(x, breakpoints) })).reduce(
    (acc, next) => (next.breakpoints ? { ...acc, [next.screen]: getWidthBreakpointsQuery(next.breakpoints) } : acc),
    {},
  );
}

// create max-width media query including screen size
export function displayUpTo(screen: ScreenSize) {
  const screenBreakpoints = getScreenSizeBreakpoints(screen, breakpoints);
  if (!screenBreakpoints) {
    throw new Error('Invalid screen size');
  }
  const query = getWidthBreakpointsQuery({ max: screenBreakpoints.max });
  return getMediaQuery(query);
}

// create min-width media query including screen size
export function displayFrom(screen: ScreenSize) {
  const screenBreakpoints = getScreenSizeBreakpoints(screen, breakpoints);
  if (!screenBreakpoints) {
    throw new Error('Invalid screen size');
  }
  const query = getWidthBreakpointsQuery({ min: screenBreakpoints.min });
  return getMediaQuery(query);
}

export function displayTo(screen: ScreenSize | string): ThemedCssFunction<any> {
  const screenBreakpoints = getScreenSizeBreakpoints(screen as ScreenSize, breakpoints);
  const query = screenBreakpoints ? getWidthBreakpointsQuery(screenBreakpoints) : screen;
  return getMediaQuery(query);
}

// create media query based on previous and next breakpoints
export function getWidthBreakpointsQuery({ max, min }: WidthBreakpoints) {
  if (min === undefined && max === undefined) {
    throw new Error('Both breakpoints cannot be `undefined`');
  }
  if (min !== undefined && max != undefined && max < min) {
    throw new Error(`The min(${min}) breakpoint must be less than max(${max})`);
  }

  const queries = [];
  if (min !== undefined) {
    queries.push(`(min-width: ${min}px)`);
  }
  if (max !== undefined) {
    queries.push(`(max-width: ${max - 1}px)`);
  }
  return `${queries.join(' and ')}`;
}

export function getScreenSizeBreakpoints(screen: ScreenSize, breakpoints: Breakpoints): WidthBreakpoints | undefined {
  switch (screen) {
    case 'small':
      return { max: breakpoints.medium };
    case 'medium':
      return { min: breakpoints.medium, max: breakpoints.large };
    case 'large':
      return { min: breakpoints.large, max: breakpoints.xLarge };
    case 'xLarge':
      return { min: breakpoints.xLarge, max: breakpoints.max };
    case 'max':
      return { min: breakpoints.max };
    default:
      return undefined;
  }
}

function getMediaQuery(query: string): ThemedCssFunction<any> {
  return (strings: any, ...interpolations: Array<any>) =>
    css`
      @media ${query} {
        ${css(strings, ...interpolations)};
      }
    `;
}
