import { StandardProps, PreciseTheme } from '../../common';
import { ModeProviderProps } from '../../hoc/withResponsiveMode';
import { RefProps } from '../../hoc/withResponsive';

export type TableMode = 'card' | 'table';

/**
 * Custom cell renderer for event.
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
 * Custom row renderer for event.
 */
export interface TableRowEvent<T> {
  /**
   * Theme object used for the component.
   */
  theme?: PreciseTheme;
  /**
   * The index of the row that is rendered.
   */
  index: number;
  /**
   * Cells group to be rendered.
   */
  cells: React.ReactNode;
  /**
   * The associated data row, if any.
   */
  data: T;
  /**
   * The key used for the given row.
   */
  key: string;
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
   * The rows of the table to be rendered.
   */
  rows: React.ReactNode;
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
  cardRenderer?: (e: TableCardRendererEvent<T>) => React.ReactNode;
  /**
   * Optionally provides a custom way for rendering the table body.
   */
  bodyRenderer?(e: TableBodyRenderEvent): React.ReactNode;
  /**
   * Optionally provides a custom way for rendering the cards list body.
   */
  cardBodyRenderer?(e: TableCardBodyRenderEvent): React.ReactNode;
  /**
   * Optionally provides a custom way for rendering a cell.
   */
  cellRenderer?(e: TableCellEvent<T>): React.ReactNode;
  /**
   * Optionally provides a custom way for rendering a row.
   */
  rowRenderer?(e: TableRowEvent<T>): React.ReactNode;
  /**
   * Optionally provides a custom way for rendering a table header.
   */
  headRenderer?(e: TableHeadRenderEvent<T>): React.ReactNode;
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
  sortBy?: SortingObject | SortingString;
  /**
   * @ignore
   */
  children?: void;
  /**
   * The columns being considered by the component.
   */
  columns?: {
    [key: string]: string | Column;
  };
}

export interface Column {
  header: React.ReactChild;
  footer?: React.ReactChild;
  sortable?: boolean;
  hidden?: boolean;
  width?: string;
}

export interface SortingObject {
  /**
   * The key of column by which should the table be sorted
   */
  columnKey: string;
  /**
   * Sort order
   * @default ASC
   */
  order?: 'ascending' | 'descending';
}

/**
 * @deprecated Use object for defining sorting parameters
 */
export type SortingString = string;

export interface TableHeadRenderEvent<T> {
  columns: TableProps<T>['columns'];
  sortBy: TableProps<T>['sortBy'];
}
