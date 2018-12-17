import * as React from 'react';
import { TableInt } from './TableInt.part';
import { TableProps, TableMode } from './Table.types.part';
import { withResponsiveMode, ModeProviderState } from '../../hoc/withResponsiveMode';
import { breakpoints } from '../../themes';

export {
  TableMode,
  TableCellEvent,
  TableRowEvent,
  TableBodyRenderEvent,
  TableCardRendererEvent,
  TableProps,
} from './Table.types.part';

/**
 * The table component shows a set of data in a tabular view. The data must be an array of JS objects,
 * where the shape of the objects has no constraints other than it must be same for each element of the
 * array.
 */
export const Table = withResponsiveMode<TableMode>(width => (!width || width > breakpoints.medium ? 'table' : 'card'))(
  TableInt,
);
