import * as React from 'react';
import styled from '../../utils/styled';
import { StandardProps } from '../../common';

export enum StackPanelDirection {
  leftToRight = 'left',
  rightToLeft = 'right',
  topToBottom = 'top',
  bottomToTop = 'bottom',
}

export interface StackPanelProps extends StandardProps {
  /**
   * Sets the panel's children.
   */
  children?: React.ReactNode;
  /**
   * Sets the direction of the panel's items. By default left to right.
   * @default left
   */
  direction?: StackPanelDirection;
  /**
   * Determines if the stack should be wrapped. By default it is not wrapped.
   * @default false
   */
  wrap?: boolean;
  /**
   * Gets the reference to the underlying HTML DOM element.
   */
  innerRef?(instance: HTMLElement | null): void;
}

export interface StackLayoutProps {
  wrapping: string;
  dir: string;
  theme: any;
}

const StackLayout = styled.div<StackLayoutProps>`
  display: flex;
  flex-direction: ${props => props.dir};
  flex-wrap: ${props => props.wrapping};
  justify-content: flex-start;
`;

function mapFlex(direction?: StackPanelDirection) {
  switch (direction) {
    case StackPanelDirection.rightToLeft:
      return 'row-reverse';
    case StackPanelDirection.topToBottom:
      return 'column';
    case StackPanelDirection.bottomToTop:
      return 'column-reverse';
  }

  return 'row';
}

/**
 * The stack panel displays a stack of children in a given direction.
 */
export const StackPanel: React.SFC<StackPanelProps> = ({ theme, direction, wrap, innerRef, ...props }) => {
  const wrapping = wrap ? 'wrap' : 'nowrap';
  const dir = mapFlex(direction);
  return <StackLayout theme={theme} dir={dir} wrapping={wrapping} ref={innerRef} {...props} />;
};
StackPanel.displayName = 'StackPanel';
