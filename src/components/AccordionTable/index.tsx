import * as React from 'react';
import { AccordionTableInt } from './AccordionTableInt.part';
import { AccordionTableProps } from './AccordionTable.types.part';
import { withResponsiveMode } from '../../hoc/withResponsiveMode';
import { breakpoints } from '../../themes';
import { TableMode } from '../Table/Table.types.part';

export {
  AccordionTableProps,
  AccordionTableChangeEvent,
  AccordionDetailsRenderEvent,
  AccordionTableCardRendererEvent,
  AccordionTableRowEvent,
} from './AccordionTable.types.part';

export interface AccordionTableType extends React.SFC<AccordionTableProps<any>> {
  <T = {}>(props: AccordionTableProps<T> & { children?: React.ReactNode }, context?: any): JSX.Element;
}

/**
 * The accordion table component is used to define a special table with expandable rows.
 */
export const AccordionTable: AccordionTableType = withResponsiveMode<TableMode>(width =>
  !width || width > breakpoints.medium ? 'table' : 'card',
)(AccordionTableInt) as any;
