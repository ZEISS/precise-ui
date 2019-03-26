import * as React from 'react';
import { TableRowEvent, TableBodyRenderEvent, Column, TableColumns, TableCellRenderEvent } from './Table.types.part';
import styled, { themed, css } from '../../utils/styled';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

const HeaderLabel = styled.div`
  font-size: 0;
  white-space: nowrap;

  > span {
    ${getFontStyle({ size: 'small' })}

    display: inline-block;
    vertical-align: middle;
  }
`;

const WithArrowUp = css`
  &:after {
    border-top: 4px solid ${themed(({ theme }) => theme.ui5)};
  }
`;

const WithArrowDown = css`
  &:before {
    border-bottom: 4px solid ${themed(({ theme }) => theme.ui5)};
  }
`;

interface SortIconProps {
  currentDirection?: 'ArrowDropDown' | 'ArrowDropUp' | false;
  sortable?: boolean;
}

const SortIcon = styled('span')<SortIconProps>`
  position: relative;
  margin-left: ${distance.xsmall};
  width: 18px;
  height: 18px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    pointer-events: none;
    margin: 0 auto;
  }
  &:before {
    top: 50%;
    margin-top: -5px;
    border-bottom: 4px solid ${themed(({ theme }) => theme.ui4)};
  }
  &:after {
    bottom: 50%;
    margin-bottom: -7px;
    border-top: 4px solid ${themed(({ theme }) => theme.ui4)};
  }
  ${({ currentDirection }) =>
    currentDirection ? (currentDirection === 'ArrowDropDown' ? WithArrowUp : WithArrowDown) : ''};
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

export function defaultHeaderCellRenderer<T>({ value, sorting, column }: TableCellRenderEvent<T>): React.ReactNode {
  if (column !== -1) {
    return (
      <HeaderLabel>
        <span>{value}</span>
        {sorting !== false && (
          <SortIcon currentDirection={sorting && (sorting === 'descending' ? 'ArrowDropDown' : 'ArrowDropUp')} />
        )}
      </HeaderLabel>
    );
  }

  return value;
}

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
