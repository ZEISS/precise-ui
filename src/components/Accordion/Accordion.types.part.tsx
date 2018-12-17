import { StandardProps } from '../../common';
import { ModeProviderProps } from '../../hoc/withResponsiveMode';
import { RefProps } from '../../hoc/withResponsive';

export type AccordionMode = 'card' | 'accordion';

export interface AccordionChangeEvent {
  /**
   * The previously selected content index.
   */
  previousIndex: number | Array<number>;
  /**
   * The currently selected content index.
   */
  selectedIndex: number | Array<number>;
}

/**
 * Custom card renderer for event.
 */
export interface AccordionCardRendererEvent {
  /**
   * Rendered item data.
   */
  item: React.ReactChild;
  /**
   * Rendered card index.
   */
  index: number;
  /**
   * List of data item keys.
   */
  keys: Array<string>;
  /**
   * Determines if details is open for the card.
   */
  open: boolean;
}

export interface AccordionProps extends StandardProps, ModeProviderProps<AccordionMode>, RefProps {
  /**
   * The currently selected index - used in the controlled mode.
   * This has precedence over defaultSelectedIndex
   */
  selectedIndex?: number | Array<number>;
  /**
   * The first state selected index - Accordion will remain uncontrolled by using this.
   */
  defaultSelectedIndex?: number | Array<number>;
  /**
   * Notification callback if the selected content index should change.
   */
  onChange?(e: AccordionChangeEvent): void;
  /**
   * The children, usually passed as a collection of AccordionTab elements.
   */
  children?: React.ReactNode;
  /**
   * Label for button 'Open' in card view.
   */
  openLabel?: string;
  /**
   * Label for button 'Close' in card view.
   */
  closeLabel?: string;
  /**
   * This Boolean attribute indicates that multiple items can be expanded.
   * If it is not specified, then only one item can be expanded at a time.
   * Default value is `false`.
   */
  multiple?: boolean;
}
