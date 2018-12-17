import { StandardProps } from '../../common';

export interface TooltipChangeEvent {
  /**
   * The current open state.
   */
  open: boolean;
}

export interface TooltipProps extends StandardProps {
  /**
   * Tooltip content.
   */
  content: React.ReactNode;
  /**
   * Tooltip target.
   */
  children?: React.ReactNode;
  /**
   * Determines if the tooltip should be open or not.
   */
  open?: boolean;
  /**
   * Fired once the open state changes.
   */
  onChange?(e: TooltipChangeEvent): void;
  /**
   * Tooltip position to appear relatively to the control.
   * @default bottom
   */
  position?: TooltipPosition;
  /**
   * Tooltip offset from the content in pixels
   * @default 5px
   */
  offset?: number;
}

export type BasicPosition = 'top' | 'right' | 'bottom' | 'left';

export type TooltipPosition =
  | BasicPosition
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'right-top'
  | 'right-bottom'
  | 'left-top'
  | 'left-bottom';
