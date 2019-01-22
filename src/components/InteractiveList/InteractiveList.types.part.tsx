import { StandardProps } from '../../common';

export interface InteractiveListItemObject {
  key: string;
  content?: React.ReactChild;
  searchText?: string;
  type?: 'item' | 'divider' | 'header';
}

export type InteractiveListItem = InteractiveListItemObject | string;

export interface InteractiveListChangeEvent {
  /**
   * The changed value if any.
   */
  value: Array<number>;
}

export interface InteractiveListProps extends StandardProps {
  /**
   * The data to be displayed as selection basis.
   */
  data: Array<string | InteractiveListItem | undefined>;
  /**
   * Determines if the list should be open or not.
   */
  open?: boolean;
  /**
   * Determines if interactivity is disabled, i.e., touch etc. behaves as a scroll.
   */
  disabled?: boolean;
  /**
   * This Boolean attribute indicates that multiple options can be selected in the list.
   * If it is not specified, then only one option can be selected at a time.
   * Default value is `false`.
   */
  multiple?: boolean;
  /**
   * Optionally makes the accordion paddings smaller.
   */
  condensed?: boolean;
  /**
   * Switches the default to render a border on each list item.
   * Default value is `false`.
   */
  borderless?: boolean;
  /**
   * Removes the tick that is shown for the selected list item.
   * Default value is `false`.
   */
  showTick?: boolean;
  /**
   * The currently selected value, either a single one or multiple.
   * If used will go into controlled mode.
   */
  value?: string | Array<string>;
  /**
   * The initially selected value, either a single one or multiple.
   * Should be used to remain in managed mode.
   */
  defaultValue?: string | Array<string>;
  /**
   * Event triggered once the selected value changes.
   */
  onChange?(e: InteractiveListChangeEvent): void;
  /**
   * Event triggered once interactive list loses the focus.
   */
  onBlur?(): void;
  /**
   * Event triggered when a key was pressed.
   */
  onKeyDown?(e: React.KeyboardEvent<HTMLElement>): void;
  /**
   * The custom wrapper for rendering the list.
   */
  customWrapper?: React.ComponentType<InteractiveListWrapperProps>;
  /**
   * The content to consider for the interactive list.
   */
  children?: React.ReactNode;
  /**
   * @ignore
   */
  indices?: Array<number>;
  /**
   * Whether to position the list automatically based on screen size.
   */
  autoPosition?: boolean;
  /**
   * Whether to autofocus the list when it opens.
   */
  autoFocus?: boolean;
  /**
   * Set to true to focus the list.
   */
  focus?: boolean;
  /**
   * Set to false for the list to be visible as a shown block element.
   * Default value is `true`.
   */
  flyout?: boolean;
  /**
   * Event transported from the wrapper in case of a click somewhere inside.
   */
  onClick?(e: React.MouseEvent<HTMLElement>): void;
}

export interface InteractiveListState {
  value: Array<number>;
  controlled: boolean;
  selected: number | undefined;
  direction: InteractiveListDirection;
}

export const enum InteractiveListBorderType {
  none = 0,
  normal = 1,
  focus = 2,
  error = 3,
}

export enum InteractiveListDirection {
  normal = 0,
  reverse = 1,
}

export interface InteractiveListWrapperProps {
  open: boolean;
  border: InteractiveListBorderType;
  direction: InteractiveListDirection;
  onClick?(e: React.MouseEvent<HTMLElement>): void;
}
