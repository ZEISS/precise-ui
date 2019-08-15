import { css, ThemedCssFunction } from './styled';
import { ScreenSize, Breakpoints, ScreenSizeList } from '../common';
import { breakpoints } from '../themes';

export function getMediaQueries(breakpoints: Breakpoints) {
  return ScreenSizeList.map(x => ({ screen: x, breakpoints: getScreenSizeBreakpoints(x, breakpoints) })).reduce(
    (acc, next) => (next.breakpoints ? { ...acc, [next.screen]: formatQuery(next.breakpoints) } : acc),
    {},
  );
}

// create max-width media query including screen size
export function displayUpTo(screen: ScreenSize) {
  const screenBreakpoints = getScreenSizeBreakpoints(screen, breakpoints);
  if (!screenBreakpoints) {
    throw new Error('Invalid screen size');
  }
  const query = formatQuery({ next: screenBreakpoints.next });
  return formatMedia(query);
}

// create min-width media query including screen size
export function displayFrom(screen: ScreenSize) {
  const screenBreakpoints = getScreenSizeBreakpoints(screen, breakpoints);
  if (!screenBreakpoints) {
    throw new Error('Invalid screen size');
  }
  const query = formatQuery({ prev: screenBreakpoints.prev });
  return formatMedia(query);
}

export function displayTo(screen: ScreenSize | string): ThemedCssFunction<any> {
  const screenBreakpoints = getScreenSizeBreakpoints(screen as ScreenSize, breakpoints);
  const query = screenBreakpoints ? formatQuery(screenBreakpoints) : screen;
  return formatMedia(query);
}

function formatMedia(query: string): ThemedCssFunction<any> {
  return (strings: any, ...interpolations: Array<any>) =>
    css`
      @media ${query} {
        ${css(strings, ...interpolations)};
      }
    `;
}

function getScreenSizeBreakpoints(
  screen: ScreenSize,
  breakpoints: Breakpoints,
): { next?: number; prev?: number } | undefined {
  switch (screen) {
    case 'small':
      return { next: breakpoints.medium };
    case 'smallAndMedium':
      return { next: breakpoints.large };
    case 'medium':
      return { prev: breakpoints.medium, next: breakpoints.large };
    case 'mediumAndLarge':
      return { prev: breakpoints.medium };
    case 'large':
      return { prev: breakpoints.large, next: breakpoints.xLarge };
    case 'xLarge':
      return { prev: breakpoints.xLarge, next: breakpoints.max };
    case 'max':
      return { prev: breakpoints.max };
    default:
      return undefined;
  }
}

// create media query based on previous and next breakpoints
export function formatQuery(breakpoints: { prev?: number; next?: number }) {
  const { next, prev } = breakpoints;
  if (prev === undefined && next === undefined) {
    throw new Error('Invaild breakpoints');
  }

  const queries = [];
  if (prev !== undefined) {
    queries.push(`(min-width: ${prev}px)`);
  }
  if (prev !== undefined) {
    queries.push(`(max-width: ${prev - 1}px)`);
  }
  return `${queries.join(' and ')}`;
}
