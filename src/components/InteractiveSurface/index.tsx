import * as React from 'react';
import styled from '../../utils/styled';
import { StandardProps } from '../../common';
import { trackMouse, trackTouch } from '../../utils/interactivity';

export interface InteractiveSurfaceChangeEvent {
  /**
   * Relative horizontal coordinate (0 to 1).
   */
  x: number;
  /**
   * Relative vertical coordinate (0 to 1).
   */
  y: number;
  /**
   * Gets if the dragging is currently active.
   */
  active: boolean;
  /**
   * Gets if any move was detected up until now.
   */
  moved: boolean;
  /**
   * Gets the associated absolute dimensions.
   */
  rect: ClientRect;
  /**
   * Releases the drag handler from the surface.
   */
  release(): void;
}

export interface InteractiveSurfaceProps extends StandardProps {
  /**
   * Event that is fired once interaction with the component is happening.
   */
  onChange?(e: InteractiveSurfaceChangeEvent): void;
  /**
   * Determines if interactivity is disabled, i.e., touch etc. behaves as a scroll.
   */
  disabled?: boolean;
  /**
   * Passes the event capturing on to children, such that links etc. can be clicked.
   */
  opaque?: boolean;
  /**
   * The content of the container.
   */
  children?: React.ReactNode;
}

const Container = styled.div<InteractiveSurfaceProps>`
  position: relative;
  touch-action: ${props => (props.disabled ? 'auto' : 'none')};
  user-select: ${props => (props.disabled ? 'auto' : 'none')};
`;

/**
 * The interactive surface provides a component that reacts on touch (or click) interactivity.
 */
export class InteractiveSurface extends React.Component<InteractiveSurfaceProps> {
  private mounted = false;
  private moved = false;

  componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  private updateValue = (x: number, y: number, active: boolean, rect: ClientRect, moved: boolean) => {
    let canceled = true;

    if (this.mounted) {
      const { onChange } = this.props;
      this.moved = this.moved || moved;

      if (typeof onChange === 'function') {
        onChange({
          x,
          y,
          moved: this.moved,
          active,
          rect,
          release() {
            canceled = false;
          },
        });
      }
    }

    return canceled;
  };

  private changeValue = (e: React.MouseEvent<HTMLDivElement>) => {
    const { disabled } = this.props;
    this.moved = false;

    if (!disabled) {
      trackMouse(e, this.updateValue);
    }
  };

  private preventValue = (e: React.MouseEvent<HTMLDivElement>) => {
    const { disabled, opaque } = this.props;

    if (!disabled && !opaque && this.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  private changeTouchValue = (e: React.TouchEvent<HTMLDivElement>) => {
    const { disabled } = this.props;
    this.moved = false;

    if (!disabled) {
      trackTouch(e, this.updateValue);
    }
  };

  render() {
    const { children, onChange: _0, opaque: _1, ...props } = this.props;
    return (
      <Container
        {...props}
        onMouseDownCapture={this.changeValue}
        onClickCapture={this.preventValue}
        onTouchStartCapture={this.changeTouchValue}>
        {children}
      </Container>
    );
  }
}
