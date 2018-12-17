import * as React from 'react';
import styled from '../../utils/styled';
import { StandardProps } from '../../common';
import { GridCellDefinition } from '../../utils/gridLayout';

export interface GridAreaTapEvent {
  /**
   * The specific target that was tapped.
   */
  node: HTMLElement;
  /**
   * The x coordinate of the tap.
   */
  x: number;
  /**
   * The y coordinate of the tap.
   */
  y: number;
  /**
   * The width of the bounding box.
   */
  width: number;
  /**
   * The height of the bounding box.
   */
  height: number;
}

export interface GridAreaProps extends StandardProps, GridCellDefinition {
  /**
   * The children, usually passed as a collection of TabPage elements.
   */
  children?: React.ReactNode;
  /**
   * The event that is fired once the element is clicked or touched.
   */
  onTap?(e: GridAreaTapEvent): void;
}

const GridAreaContainer = styled.div`
  height: 100%;
`;

/**
 * The GridArea component to declare areas within a Grid instance.
 */
export class GridArea extends React.PureComponent<GridAreaProps> {
  private clicked = (e: React.MouseEvent<HTMLDivElement>) => {
    this.tapped(e.currentTarget, e.clientX, e.clientY);
  };

  private touched = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    this.tapped(e.currentTarget, touch.clientX, touch.clientY);
  };

  private tapped(node: HTMLElement, clientX: number, clientY: number) {
    const { onTap } = this.props;

    if (typeof onTap === 'function') {
      const r = node.getBoundingClientRect();
      onTap({
        node,
        x: clientX - r.left,
        y: clientY - r.top,
        width: r.width,
        height: r.height,
      });
    }
  }

  render() {
    const { colSpan, rowSpan, column, row, onTap, hidden, ...props } = this.props;
    return <GridAreaContainer {...props} onMouseDown={this.clicked} onTouchStartCapture={this.touched} />;
  }
}
