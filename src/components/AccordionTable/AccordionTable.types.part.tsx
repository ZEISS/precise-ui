import { TableProps, TableCardRendererEvent, TableRowEvent } from '../Table';
import { AccordionCardLabels } from '../../utils/labels';

/**
 * Custom card renderer for event.
 */
export interface AccordionTableCardRendererEvent<T> extends TableCardRendererEvent<T>, AccordionCardLabels {
  /**
   * Determines if details is open for the card.
   */
  open: boolean;
}

export interface AccordionGroupRenderEvent<T> {
  /**
   * Determines if the group is currently expanded.
   */
  expanded: boolean;
  /**
   * The associated group.
   */
  group: any;
  /**
   * The entries of the group.
   */
  items: Array<T>;
}

export interface AccordionDetailsRenderEvent<T> {
  /**
   * The index of the row to render details for.
   */
  index: number;
  /**
   * The associated data entry to render the details for.
   */
  data: T;
}

export interface AccordionGroupToggleEvent<T> {
  /**
   * The associated group.
   */
  group: any;
  /**
   * The type of the group toggle.
   */
  type: 'expand' | 'collapse';
  /**
   * The entries of the group.
   */
  items: Array<T>;
}

export interface AccordionTableChangeEvent<T> {
  /**
   * The index of the row that was clicked.
   */
  selectedIndex: number | Array<number>;
  /**
   * The index of the row that was previously expanded.
   */
  previousIndex: number | Array<number>;
  /**
   * The associated data row, if any.
   */
  data: T;
}

export interface AccordionTableProps<T> extends TableProps<T>, AccordionCardLabels {
  /**
   * The currently selected index - used in the controlled mode.
   */
  selectedIndex?: number | Array<number>;
  /**
   * Renders the details given at the notified data.
   */
  detailsRenderer(e: AccordionDetailsRenderEvent<T>): React.ReactChild;
  /**
   * Notification callback if the selected content index should change.
   */
  onChange?(e: AccordionTableChangeEvent<T>): void;
  /**
   * Specifies to toggle only on the arrow, not on the row.
   */
  arrowToggle?: boolean;
  /**
   * Custom card renderer for component for `AccordionTableMode.card` mode.
   */
  cardRenderer?(e: AccordionTableCardRendererEvent<T>): React.ReactChild;
  /**
   * Custom group renderer for the group header.
   */
  groupRenderer?(e: AccordionGroupRenderEvent<T>): React.ReactChild;
  /**
   * This attribute indicates that multiple rows can be expanded.
   * If it is not specified, then only one row can be expanded at a time.
   * Default value is `false`.
   */
  multiple?: boolean;
  /**
   * The values of the groups to expand. If set the component enters the
   * controlled mode for groups expansion, otherwise the component remains
   * in managed mode.
   */
  expandedGroups?: Array<any>;
  /**
   * Notification callback if a group is expanded or collapsed.
   */
  onToggleGroup?(e: AccordionGroupToggleEvent<T>): void;

  /**
   * A label to be used for the group of those items which have no value for the 'groupBy' column.
   *
   * @default '—'
   */
  noValueGroupLabel?: string;
}

export interface AccordionTableRowEvent<T> extends TableRowEvent<T> {
  active?: boolean;
}
