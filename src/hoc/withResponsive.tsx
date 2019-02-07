import * as React from 'react';
import { RefProps } from '../common';
import { withInner } from 'typescript-plugin-inner-jsx/withInner';

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

/**
 * Wraps the component in a responsive construct that is sensitive to the size changes of its
 * container.
 * @param Component The component to be sensitive to its container dimensions.
 * @returns A component that can use the `dimensions` prop.
 */
export function withResponsive<TProps extends ResponsiveComponentProps>(
  Component: React.ComponentType<TProps>,
): React.ComponentClass<TProps> {
  return withInner(
    class Responsive extends React.Component<TProps, ResponsiveComponentState> {
      node: HTMLElement | null;

      constructor(props: TProps) {
        super(props);
        const screenWithOrientaion = screen as {
          orientation?: {
            angle: number;
          };
        };

        this.state = {
          width: window.innerWidth,
          height: window.innerHeight,
          angle: (screenWithOrientaion.orientation && screenWithOrientaion.orientation.angle) || 0,
        };
      }

      componentDidMount() {
        window.addEventListener('resize', this.sizeChanged);
        window.addEventListener('orientationchange', this.orientationChanged);
      }

      componentWillUnmount() {
        window.removeEventListener('resize', this.sizeChanged);
        window.removeEventListener('orientationchange', this.orientationChanged);
      }

      getDimension() {
        if (this.node) {
          const boundingClientRect = this.node.getBoundingClientRect();
          return {
            width: boundingClientRect.width,
            height: boundingClientRect.height,
          };
        } else {
          const { innerWidth, innerHeight } = window;
          return {
            width: innerWidth,
            height: innerHeight,
          };
        }
      }

      sizeChanged = () => {
        const { width, height } = this.getDimension();

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
        const additionalProps: ResponsiveComponentProps = {
          innerRef: this.setNode,
          dimensions: this.state,
        };

        const props = { ...this.props, ...additionalProps };
        return <Component {...props} />;
      }
    },
    { Component },
  );
}
