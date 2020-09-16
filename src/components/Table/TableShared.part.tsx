import * as React from 'react';
import {
  TableBodyRenderEvent,
  Column,
  TableColumns,
  TableCellRenderEvent,
  TableCellEvent,
  TableProps,
} from './Table.types.part';
import styled, { themed, css } from '../../utils/styled';
import { getFontStyle } from '../../textStyles';
import { IncreaseDecrease } from '../IncreaseDecrease';
import { distance } from '../../distance';

const StyledIncreaseDecrease = styled(IncreaseDecrease)`
  margin-left: ${distance.xsmall};
`;

const HeaderLabel = styled.div`
  font-size: 0;
  white-space: nowrap;

  > span {
    ${getFontStyle({ size: 'small' })}

    display: inline-block;
    vertical-align: middle;
  }
`;

export const StyledTableHead = styled.thead`
  ${getFontStyle({ weight: 'bold' })}
  
  color: ${themed(({ theme }) => theme.text6 || theme.text1)};
`;

export const StyledTableFoot = styled.tfoot`
  ${getFontStyle({ size: 'xSmall' })}
`;

export const StyledTableHeaderRow = styled.tr``;

export const StyledTableRow = styled.tr(
  themed(
    ({ theme: { ui3, ui4, text1 } }) => css`
      border-bottom: 1px solid ${ui4};
      color: ${text1};

      &:hover {
        background: ${ui3};
      }
    `,
  ),
);

export interface TableHeaderProps {
  sortable?: boolean;
  width?: string;
}

export const StyledTableHeader = styled('th')<TableHeaderProps>`
  text-align: left;
  border-bottom: 1px solid ${themed(({ theme }) => theme.ui5)};
  cursor: ${({ sortable }) => (sortable ? 'pointer' : 'default')};
  box-sizing: border-box;
  ${({ width }) => (width && `width: ${width}`) || ''};
`;

export const getDefaultHeaderCellRenderer = (sort: (key: string, order: 'ascending' | 'descending') => void) => <
  T extends {}
>({
  value,
  sorting,
  column,
  key,
}: TableCellRenderEvent<T>): React.ReactNode => {
  if (column !== -1) {
    return (
      <HeaderLabel>
        <span>{value}</span>
        {sorting !== false && (
          <StyledIncreaseDecrease
            value={sorting ? (sorting === 'descending' ? 'decrease' : 'increase') : undefined}
            onIncrease={e => {
              e.stopPropagation();
              sort(key, 'ascending');
            }}
            onDecrease={e => {
              e.stopPropagation();
              sort(key, 'descending');
            }}
          />
        )}
      </HeaderLabel>
    );
  }

  return value;
};

export function defaultCellRenderer<T>({ value }: TableCellRenderEvent<T>): React.ReactNode {
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

export function defaultBodyRenderer(e: TableBodyRenderEvent) {
  const TableBody = e.table;
  return <TableBody {...e.props}>{e.rows}</TableBody>;
}

export function getColumns<T>(data: Array<T>, columns?: TableColumns) {
  return (
    columns ||
    Object.keys(data[0] || {}).reduce<{ [key: string]: Column }>((columns, key) => {
      columns[key] = {
        header: key,
        sortable: true,
      };
      return columns;
    }, {})
  );
}

export function handleDataClickedEvent<T>(tableCellEvent: TableCellEvent<T>, handler?: TableProps<T>['onDataClick']) {
  return <E extends HTMLElement = HTMLElement>(e: React.MouseEvent<E>) => {
    e.preventDefault();
    const { row, column, key, data } = tableCellEvent;

    if (typeof handler === 'function') {
      handler({
        ...tableCellEvent,
        value: data && (column === -1 ? row + 1 : data[key]),
      });
    }
  };
}
