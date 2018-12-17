import * as React from 'react';

export interface ResponsiveComponentProps extends RefProps {
  /**
   * The dimensions values container
   */
  dimensions?: ResponsiveComponentState;
}

export interface ResponsiveComponentState {
  /**
   * The width of the container in pixels.
   */
  width: number;
  /**
   * The height of the container in pixels.
   */
  height: number;
  /**
   * The current screen rotation in degrees.
   */
  angle: number;
}

export interface RefProps {
  innerRef?(node: HTMLElement | null): void;
}

declare global {
  interface Screen {
    orientation?: {
      angle: number;
    };
  }
}

export function withResponsive<
  ComponentType extends React.ComponentType<ResponsiveComponentProps & { [key: string]: any }>
>(Component: ComponentType): ComponentType {
  class Responsive extends React.Component<ResponsiveComponentProps, ResponsiveComponentState> {
    node: HTMLElement | null;

    state = {
      width: window.innerWidth,
      height: window.innerHeight,
      angle: (screen.orientation && screen.orientation.angle) || 0,
    };

    constructor(props: ResponsiveComponentProps) {
      super(props);
    }

    componentDidMount() {
      window.addEventListener('resize', this.sizeChanged);
      window.addEventListener('orientationchange', this.orientationChanged);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.sizeChanged);
      window.removeEventListener('orientationchange', this.orientationChanged);
    }

    sizeChanged = () => {
      let width;
      let height;

      if (this.node) {
        const boundingClientRect = this.node.getBoundingClientRect();
        width = boundingClientRect.width;
        height = boundingClientRect.height;
      } else {
        const { innerWidth, innerHeight } = window;
        width = innerWidth;
        height = innerHeight;
      }

      if (width !== this.state.width || height !== this.state.height) {
        this.setState({
          width,
          height,
        });
      }
    };

    orientationChanged = () =>
      this.setState({
        angle: (screen.orientation && screen.orientation.angle) || 0,
      });

    setNode = (node: HTMLElement | null) => (this.node = node);

    render() {
      const instertedProps: ResponsiveComponentProps = {
        innerRef: this.setNode,
        dimensions: this.state,
      };

      return React.createElement(Component, {
        ...this.props,
        ...instertedProps,
      });
    }
  }

  return Responsive as any;
}
