import * as React from 'react';
import { TableCellEvent, TableRowEvent, TableBodyRenderEvent } from './Table.types.part';
import styled, { themed, reStyled } from '../../utils/styled';

export const StyledTableHead = styled.thead`
  color: ${themed(({ theme }) => theme.text || theme.text1)};
  font-weight: bold;
`;

export const StyledTableFoot = styled.tfoot`
  font-size: 0.8em;
`;

export const StyledTableHeaderRow = styled.tr``;

export const StyledTableRow = reStyled.tr(
  ({ theme: { ui3, ui4, text1 } }) => `
  border-bottom: 1px solid ${ui4};
  color: ${text1};

  &:hover {
    background: ${ui3};
  }
`,
);

export interface TableHeaderProps {
  sortable?: boolean;
  width?: string;
}

export const StyledTableHeader = styled<TableHeaderProps, 'th'>('th')`
  text-align: left;
  border-bottom: 1px solid ${themed(({ theme }) => theme.ui5)};
  cursor: ${({ sortable }: TableHeaderProps) => (sortable ? 'pointer' : 'default')};
  box-sizing: border-box;
  ${({ width }) => (width && `width: ${width}`) || ''};
`;

export function defaultCellRenderer<T>({ value }: TableCellEvent<T>): React.ReactNode {
  switch (typeof value) {
    case 'boolean':
    case 'number':
    case 'string':
      return value.toString();
    case 'object':
      if (value) {
        return value.toString();
      }
      break;
  }

  return '';
}

export function defaultRowRenderer<T>({ theme, cells, index }: TableRowEvent<T>) {
  return (
    <StyledTableRow key={index} theme={theme}>
      {cells}
    </StyledTableRow>
  );
}

export function defaultBodyRenderer(e: TableBodyRenderEvent) {
  const TableBody = e.table;
  return <TableBody {...e.props}>{e.rows}</TableBody>;
}
