import { StandardProps } from '../../common';

export interface FlyoutChangeEvent {
  /**
   * The current open state.
   */
  open: boolean;
}

export interface FlyoutProps extends StandardProps {
  /**
   * Flyout content.
   */
  content: React.ReactNode;
  /**
   * Flyout target.
   */
  children?: React.ReactNode;
  /**
   * Determines if the tooltip should be open or not.
   */
  open?: boolean;
  /**
   * Removes paddings on sides.
   */
  noGutter?: boolean;
  /**
   * Fired once the open state changes.
   */
  onChange?(e: FlyoutChangeEvent): void;
  /**
   * Enforced flyout position to appear relatively to the control.
   * @default bottom
   */
  position?: FlyoutPosition;
  /**
   * Default flyout position to appear relatively to the control. If not enough space for displaying with
   * defined `defaultPosition`, then flyout window will be displayed on the opposite side.
   * @default bottom
   */
  defaultPosition?: FlyoutPosition;
  /**
   * Flyout offset from the content in pixels
   * @default 4
   */
  offset?: number;
}

export type BasicPosition = 'top' | 'right' | 'bottom' | 'left';

export type FlyoutPosition =
  | BasicPosition
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'right-top'
  | 'right-bottom'
  | 'left-top'
  | 'left-bottom';
