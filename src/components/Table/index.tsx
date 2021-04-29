import * as React from 'react';
import { TableInt } from './TableInt.part';
import { TableProps, TableMode } from './Table.types.part';
import { withResponsiveMode } from '../../hoc/withResponsiveMode';
import { breakpoints } from '../../themes';

export {
  TableMode,
  TableCellEvent,
  TableSortEvent,
  TableRowEvent,
  TableBodyRenderEvent,
  TableCardRendererEvent,
  TableProps,
} from './Table.types.part';

export interface TableType extends React.FC<TableProps<any>> {
  <T = Record<string, unknown>>(props: TableProps<T> & { children?: React.ReactNode }, context?: unknown): JSX.Element;
}

/**
 * The table component shows a set of data in a tabular view. The data must be an array of JS objects,
 * where the shape of the objects has no constraints other than it must be same for each element of the
 * array.
 */
export const Table: TableType = (withResponsiveMode<TableMode>((width) =>
  !width || width > breakpoints.medium ? 'table' : 'card',
)<any>(TableInt) as unknown) as TableType;
