import * as React from 'react';
import { getMediaQueries } from '../../utils/displayTo';
import { PreciseTheme, ScreenSize } from '../../common';
import { light, breakpoints } from '../../themes';

export interface ResponsiveProps {
  /**
   * Sets the screen size for which to show the children.
   *
   * One of 'small' | 'smallAndMedium' | 'medium' | 'mediumAndLarge' | 'large'
   */
  screenSize?: ScreenSize;
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
  private allMediaQueries: { [size: string]: string } = {};

  constructor(props: ResponsiveProps) {
    super(props);

    const { theme = light, screenSize, render } = this.props;
    this.allMediaQueries = getMediaQueries({ ...breakpoints, ...theme.breakpoints });

    if (typeof render !== 'function' && (!screenSize || Object.keys(this.allMediaQueries).indexOf(screenSize) === -1)) {
      console.error('`render` callback method or valid `screenSize` should be defined');
    } else {
      const screenSizesListenTo = screenSize ? [screenSize] : ['small', 'medium', 'large'];

      for (const screenSizeListenTo of screenSizesListenTo) {
        this.mediaQueriesToListen[screenSizeListenTo] = window.matchMedia(this.allMediaQueries[screenSizeListenTo]);
      }
    }

    this.state = {
      matchesTo: undefined,
    };
  }

  private currentlyMatches() {
    const mediaQueries = this.mediaQueriesToListen;

    for (const sceenSize of Object.keys(mediaQueries)) {
      if (mediaQueries[sceenSize].matches) {
        return sceenSize as ScreenSize;
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
    const { screenSize } = this.props;
    const screenSizesListenTo = screenSize ? [screenSize] : ['small', 'medium', 'large'];

    for (const screenSizeListenTo of screenSizesListenTo) {
      this.mediaQueriesToListen[screenSizeListenTo] = window.matchMedia(this.allMediaQueries[screenSizeListenTo]);
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
