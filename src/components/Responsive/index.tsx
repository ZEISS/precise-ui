import * as React from 'react';
import { getWidthBreakpointsQuery, getScreenSizeBreakpoints, getMediaQueries } from '../../utils/displayTo';
import { PreciseTheme, ScreenSize, Breakpoints } from '../../common';
import { light, breakpoints } from '../../themes';

export type ScreenSizeCondition = 'equal' | 'from' | 'upTo';

export interface ResponsiveProps {
  /**
   * Sets the screen size for which to show the children.
   * Valid values are: 'small' | 'medium' | 'large' | 'xLarge' | 'max'
   */
  screenSize?: ScreenSize;
  /**
   * Sets the screen size check condition.
   * Valid values are: 'equal' | 'from' | 'upTo'
   * @default 'equal'
   */
  screenSizeCondition?: ScreenSizeCondition;
  /**
   * Sets the render callback. When screen size changes it's called with a new one.
   */
  render?(screenSize?: ScreenSize): React.ReactNode;
  /**
   * The content to be displayed when the query matches.
   */
  children?: React.ReactNode;
  /**
   * The theme to supply for setting the custom breakpoints, if any.
   */
  theme?: PreciseTheme;
}

export interface ResponsiveState {
  matchesTo?: ScreenSize;
}

export class Responsive extends React.Component<ResponsiveProps, ResponsiveState> {
  private mediaQueriesToListen: { [size: string]: MediaQueryList } = {};

  constructor(props: ResponsiveProps) {
    super(props);

    const { theme = light, screenSize, screenSizeCondition = 'equal', render } = this.props;
    const themedBreakpoints = { ...breakpoints, ...theme.breakpoints };

    if (screenSize) {
      const screenSizeBreakpoints = this.getBreakpoints(themedBreakpoints, screenSize, screenSizeCondition);
      if (screenSizeBreakpoints) {
        this.mediaQueriesToListen[screenSize] = window.matchMedia(getWidthBreakpointsQuery(screenSizeBreakpoints));
      }
    } else {
      const allMediaQueries = getMediaQueries(themedBreakpoints);
      for (const screenSize in allMediaQueries) {
        this.mediaQueriesToListen[screenSize] = window.matchMedia(allMediaQueries[screenSize]);
      }
    }

    if (typeof render !== 'function' && !Object.keys(this.mediaQueriesToListen).length) {
      console.error('`render` callback method or valid `screenSize` and `screenSizeCondition` should be defined');
    }

    this.state = {
      matchesTo: undefined,
    };
  }

  private getBreakpoints(breakpoints: Breakpoints, screenSize: ScreenSize, screenSizeCondition: ScreenSizeCondition) {
    const screenSizeBreakpoints = getScreenSizeBreakpoints(screenSize, breakpoints);
    if (!screenSizeBreakpoints) {
      console.error(`Invalid screen size ${screenSize}`);
      return;
    }

    switch (screenSizeCondition) {
      case 'equal':
        return { ...screenSizeBreakpoints };
      case 'from':
        return { ...screenSizeBreakpoints, max: undefined };
      case 'upTo':
        return { ...screenSizeBreakpoints, min: undefined };
      default:
        console.error(`Invalid screen size condition ${screenSizeCondition}`);
        return;
    }
  }

  private currentlyMatches() {
    const mediaQueries = this.mediaQueriesToListen;

    for (const screenSize of Object.keys(mediaQueries)) {
      if (mediaQueries[screenSize].matches) {
        return screenSize as ScreenSize;
      }
    }

    return undefined;
  }

  private updateMatches = () => {
    this.setState({
      matchesTo: this.currentlyMatches(),
    });
  };

  componentDidMount() {
    for (const screenSizeListenTo in this.mediaQueriesToListen) {
      this.mediaQueriesToListen[screenSizeListenTo].addListener(this.updateMatches);
    }

    this.updateMatches();
  }

  componentWillUnmount() {
    for (const sceenSize of Object.keys(this.mediaQueriesToListen)) {
      this.mediaQueriesToListen[sceenSize].removeListener(this.updateMatches);
    }
  }

  render() {
    const { children, render } = this.props;
    const { matchesTo } = this.state;

    if (render) {
      return render(matchesTo);
    } else {
      return children && matchesTo ? <>{children}</> : false;
    }
  }
}
