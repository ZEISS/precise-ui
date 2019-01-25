import { StandardProps, RefProps } from '../../common';
import { ModeProviderProps } from '../../hoc/withResponsiveMode';

export type TableMode = 'card' | 'table';

/**
 * Arguments for any cell events.
 */
export interface TableCellEvent<T> {
  /**
   * The index of the row that was clicked.
   */
  row: number;
  /**
   * The index of the column that was clicked.
   */
  column: number;
  /**
   * The data key of the clicked cell.
   */
  key: string;
  /**
   * The associated value in the clicked cell, if any.
   */
  value?: any;
  /**
   * The associated data row, if any.
   */
  data?: T;
}

/**
 * Arguments for custom cell rendering events.
 */
export interface TableCellRenderEvent<T> extends TableCellEvent<T> {
  /**
   * The sorting order, if any.
   */
  sorting?: false | 'ascending' | 'descending';
  /**
   * Function to return the default representation.
   */
  render(e: TableCellRenderEvent<T>): React.ReactNode;
}

/**
 * Custom row renderer for event.
 */
export interface TableRowEvent<T> {
  /**
   * The index of the row that is rendered.
   */
  index: number;
  /**
   * Cells group to be rendered.
   */
  cells: Array<React.ReactNode>;
  /**
   * The associated data row, if any.
   */
  data: T;
  /**
   * The key used for the given row.
   */
  key: string;
  /**
   * Arbitrary state object.
   */
  state: any;
}

/**
 * Custom body renderer for event.
 */
export interface TableBodyRenderEvent {
  /**
   * The main table to be rendered.
   */
  table: React.StatelessComponent;
  /**
   * The properties that would be handled by the host.
   */
  props: any;
  /**
   * The rows of the table to be rendered.
   */
  rows: Array<React.ReactNode>;
  /**
   * Gets the used table mode.
   */
  mode: TableMode;
}

/**
 * Custom card renderer for event.
 */
export interface TableCardRendererEvent<T> {
  /**
   * Rendered item data.
   */
  item: T;
  /**
   * Rendered card index.
   */
  index: number;
  /**
   * List of data item keys.
   */
  keys: Array<string>;
}

export interface TableColumns {
  [key: string]: string | Column;
}

export interface TableCardBodyRenderEvent {
  /**
   * The rows of the Card list to be rendered.
   */
  rows: React.ReactNodeArray;
}

export interface TableProps<T> extends StandardProps, ModeProviderProps<TableMode>, RefProps {
  /**
   * The data that is being presented by the component.
   */
  data: Array<T>;
  /**
   * Optionally shows the index of the rows.
   */
  indexed?: boolean;
  /**
   * Optionally hides the header row of the table.
   */
  noHeader?: boolean;
  /**
   * Optionally makes the table paddings smaller.
   */
  condensed?: boolean;
  /**
   * Optionally removes the borders of the table.
   */
  borderless?: boolean;
  /**
   * Custom card renderer for component for `AccordionTableMode.card` mode.
   */
  cardRenderer?(e: TableCardRendererEvent<T>): React.ReactNode;
  /**
   * Optionally provides a custom way for rendering the table or card body.
   */
  bodyRenderer?(e: TableBodyRenderEvent): React.ReactNode;
  /**
   * Optionally provides a custom way for rendering a cell.
   */
  cellRenderer?(e: TableCellRenderEvent<T>): React.ReactNode;
  /**
   * Optionally provides a custom way for rendering a row.
   */
  rowRenderer?(e: TableRowEvent<T>): React.ReactNode;
  /**
   * Optionally provides a custom way for rendering a table header.
   */
  headRenderer?(e: TableSectionRenderEvent<T>): React.ReactNode;
  /**
   * Optionally provides a custom way for rendering a header cell.
   */
  headerCellRenderer?(e: TableCellRenderEvent<T>): React.ReactNode;
  /**
   * Optionally provides a custom way for rendering a table footer.
   */
  footRenderer?(e: TableSectionRenderEvent<T>): React.ReactNode;
  /**
   * Optionally provides a custom way for rendering a footer cell.
   */
  footerCellRenderer?(e: TableCellRenderEvent<T>): React.ReactNode;
  /**
   * Handler that is being called when a header cell has been clicked.
   */
  onHeaderClick?(e: TableCellEvent<T>): void;
  /**
   * Handler that is being called when a footer cell has been clicked.
   */
  onFooterClick?(e: TableCellEvent<T>): void;
  /**
   * Handler that is being called when a data cell has been clicked.
   */
  onDataClick?(e: TableCellEvent<T>): void;
  /**
   * Optionally provides a custom way for computing the row key.
   */
  getRowKey?(e: TableRowEvent<T>): string;
  /**
   * Information text when no data is given.
   */
  placeholder?: React.ReactChild;
  /**
   * Optionally determines the sort order and column by which the table should be sorted.
   * String format:
   * - for ascending order: "columnName"
   * - for descending order "-columnName"
   */
  sortBy?: TableSorting | string;
  /**
   * Optionally specifies the key of the column to use for grouping.
   */
  groupBy?: keyof T;
  /**
   * @ignore
   */
  children?: void;
  /**
   * The columns being considered by the component.
   */
  columns?: TableColumns;
}

export interface Column {
  /**
   * The header to display for the column.
   */
  header: React.ReactChild;
  /**
   * The optional footer to display for the column.
   */
  footer?: React.ReactChild;
  /**
   * Determines if the column should be sortable.
   */
  sortable?: boolean;
  /**
   * Determines if the column should be hidden.
   */
  hidden?: boolean;
  /**
   * Sets the width of the column explicitly.
   */
  width?: string;
}

export interface TableSorting {
  /**
   * The key of column by which should the table be sorted
   */
  columnKey: string;
  /**
   * Sort order, if any. If not given then default sorting will be applied.
   * @default 'ascending'
   */
  order?: 'ascending' | 'descending';
}

export interface TableSectionRenderEvent<T> {
  /**
   * The columns used by the table.
   */
  columns: TableColumns;
  /**
   * The currently used sorting.
   */
  sortBy: TableSorting | undefined;
  /**
   * The currently defined grouping.
   */
  groupBy: keyof T | undefined;
  /**
   * The column keys.
   */
  keys: Array<string>;
  /**
   * The data to render in the table's body.
   */
  data: Array<T>;
}
