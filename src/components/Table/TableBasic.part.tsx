import * as React from 'react';
import memoize from 'memoize-one';
import styled, { themed, css } from '../../utils/styled';
import { sortObjectList } from '../../utils/sort';
import { distance } from '../../distance';
import { RefProps, StandardProps } from '../../common';
import { TableRowEvent, TableProps, TableSorting, TableColumns, TableSectionRenderEvent } from './Table.types.part';
import {
  defaultCellRenderer,
  StyledTableHead,
  StyledTableHeaderRow,
  StyledTableHeader,
  StyledTableRow,
  StyledTableFoot,
  defaultBodyRenderer,
  getColumns,
  getDefaultHeaderCellRenderer,
  handleDataClickedEvent,
} from './TableShared.part';

import { getFontStyle } from '../../textStyles';

export interface TableBasicState {
  sorting?: TableSorting;
  controlledSorting: boolean;
}

interface StyledTableProps {
  condensed?: boolean;
  borderless?: boolean;
}

const StyledTable = styled.table<StyledTableProps>(
  themed(
    ({ theme, borderless, condensed }) => css`
    ${getFontStyle({ size: 'small', lineHeight: 'xSmall' })}

    table-layout: ${theme.tableLayout};
    border-collapse: collapse;
    width: 100%;
    color: ${theme.text6};
    border: ${borderless ? 'none' : theme.tableBorder};

    > thead > tr > th,
    > tbody > tr > td {
      padding: ${condensed ? `${distance.small} ${distance.large}` : theme.tableHeadPadding};

      &:not(:last-child) {
        padding-right: 0;
      }
    }
    `,
  ),
);

const StyledTableBody = styled.tbody``;

interface TableHostProps extends StandardProps {
  head: React.ReactNode;
  foot: React.ReactNode;
}

const TableHost: React.SFC<TableHostProps> = ({ head, foot, theme, children, ...props }) => (
  <StyledTable theme={theme} {...props}>
    {head}
    <StyledTableBody theme={theme}>{children}</StyledTableBody>
    {foot}
  </StyledTable>
);

const HiddenCell = styled.td`
  display: none;
`;

const StyledTableCell = styled.td`
  text-align: left;
`;

const StyledPlaceholderCell = styled(StyledTableCell)`
  text-align: center;
`;

function defaultRowKeyGetter<T>({ key }: TableRowEvent<T>) {
  return key;
}

function normalizeSortBy(sortBy?: TableSorting | string): TableSorting | undefined {
  if (!sortBy) {
    return undefined;
  }

  if (typeof sortBy === 'string') {
    if (sortBy[0] === '-') {
      return {
        columnKey: sortBy.substr(1),
        order: 'descending',
      };
    } else {
      return {
        columnKey: sortBy,
        order: 'ascending',
      };
    }
  }

  return {
    columnKey: sortBy.columnKey,
    order: sortBy.order || 'ascending',
  };
}

export class TableBasic<T> extends React.Component<TableProps<T> & RefProps, TableBasicState> {
  constructor(props: TableProps<T> & RefProps) {
    super(props);
    this.state = {
      controlledSorting: false,
    };
  }

  static getDerivedStateFromProps(props: TableProps<any>, state: TableBasicState) {
    const controlledSorting = props.sortBy !== undefined || state.controlledSorting;

    if (controlledSorting) {
      return {
        sorting: normalizeSortBy(props.sortBy),
        controlledSorting,
      };
    }

    return state;
  }

  private getIndices = memoize((data: Array<T>, grouping?: keyof T, sorting?: TableSorting) =>
    sorting
      ? sortObjectList(data, sorting.columnKey as keyof T, sorting.order, grouping)
      : sortObjectList(data, undefined, undefined, grouping),
  );

  private isSortable(key: string, cols: TableColumns) {
    const { sortBy } = this.props;
    const col = cols[key];
    return !sortBy && (!col || (typeof col !== 'string' && col.sortable));
  }

  private headerClicked(e: React.MouseEvent<HTMLTableCellElement>, column: number, key: string) {
    const { onHeaderClick, onSort, data = [], columns } = this.props;
    e.preventDefault();

    if (typeof onHeaderClick === 'function') {
      onHeaderClick({
        column,
        key,
        row: -1,
      });
    } else if (this.isSortable(key, getColumns(data, columns))) {
      this.setState(
        ({ sorting }) => {
          const isAscending = sorting && sorting.order === 'descending' && sorting.columnKey === key;
          const order = sorting && sorting.columnKey === key ? 'descending' : 'ascending';
          let newSortingValue: TableSorting | undefined = undefined;

          if (!isAscending && column !== -1) {
            newSortingValue = {
              columnKey: key,
              order,
            };
          }

          return { sorting: newSortingValue };
        },
        () => {
          if (typeof onSort === 'function') {
            onSort({
              column,
              key,
              order: this.state.sorting && this.state.sorting.order,
            });
          }
        },
      );
    }
  }

  private footerClicked(e: React.MouseEvent<HTMLTableCellElement>, column: number, key: string) {
    e.preventDefault();

    const { onFooterClick } = this.props;

    if (typeof onFooterClick === 'function') {
      onFooterClick({
        column,
        key,
        row: -1,
      });
    }
  }

  private defaultHeadRenderer = ({ columns, sortBy, keys }: TableSectionRenderEvent<T>) => {
    const { onSort } = this.props;

    const defaultHeaderCellRenderer = getDefaultHeaderCellRenderer((columnKey, order) => {
      this.setState(
        {
          sorting: {
            columnKey,
            order,
          },
        },
        () => {
          if (typeof onSort === 'function') {
            onSort({
              column: keys.indexOf(columnKey),
              key: columnKey,
              order,
            });
          }
        },
      );
    });

    const { indexed, theme, headerCellRenderer = defaultHeaderCellRenderer } = this.props;

    return (
      <StyledTableHead theme={theme}>
        <StyledTableHeaderRow theme={theme}>
          {indexed && (
            <StyledTableHeader onClick={e => this.headerClicked(e, -1, '#')} theme={theme}>
              {headerCellRenderer({
                column: -1,
                key: '',
                row: -1,
                value: '#',
                render: defaultHeaderCellRenderer,
              })}
            </StyledTableHeader>
          )}
          {keys.map((key, cell) => {
            const column = columns[key];
            const hidden = typeof column !== 'string' && column.hidden;

            if (!hidden) {
              const name = typeof column === 'string' ? column : column.header;
              const width = typeof column === 'string' ? undefined : column.width;
              const sortable = this.isSortable(key, columns);
              const direction = sortable && sortBy && (sortBy.columnKey !== key ? undefined : sortBy.order);
              return (
                <StyledTableHeader
                  sortable={sortable}
                  width={width}
                  key={key}
                  onClick={e => this.headerClicked(e, cell, key)}
                  theme={theme}>
                  {headerCellRenderer({
                    column: cell,
                    key,
                    row: -1,
                    sorting: direction,
                    value: name,
                    render: defaultHeaderCellRenderer,
                  })}
                </StyledTableHeader>
              );
            }

            return <HiddenCell key={key} />;
          })}
        </StyledTableHeaderRow>
      </StyledTableHead>
    );
  };

  private defaultFootRenderer = ({ columns, keys, sortBy }: TableSectionRenderEvent<T>) => {
    const { indexed, theme, footerCellRenderer = defaultCellRenderer } = this.props;

    return (
      <StyledTableFoot theme={theme}>
        <StyledTableRow theme={theme}>
          {indexed && (
            <StyledTableCell onClick={e => this.footerClicked(e, -1, '#')} theme={theme}>
              {footerCellRenderer({
                column: -1,
                key: '',
                row: -1,
                value: '',
                render: defaultCellRenderer,
              })}
            </StyledTableCell>
          )}
          {keys.map((key, i) => {
            const column = columns[key];
            const sortable = this.isSortable(key, columns);
            const direction = sortable && sortBy && (sortBy.columnKey !== key ? undefined : sortBy.order);
            const hidden = typeof column !== 'string' && column.hidden;

            if (!hidden) {
              const name = typeof column === 'string' ? undefined : column.footer;
              return (
                <StyledTableCell key={key} theme={theme} onClick={e => this.footerClicked(e, i, key)}>
                  {footerCellRenderer({
                    column: i,
                    key,
                    row: -1,
                    value: name,
                    sorting: direction,
                    render: defaultCellRenderer,
                  })}
                </StyledTableCell>
              );
            }

            return <HiddenCell key={key} />;
          })}
        </StyledTableRow>
      </StyledTableFoot>
    );
  };

  private defaultRowRenderer = ({ cells, index }: TableRowEvent<T>) => {
    const { theme } = this.props;

    return (
      <StyledTableRow key={index} theme={theme}>
        {cells}
      </StyledTableRow>
    );
  };

  private renderCells(keys: Array<string>, rowIndex: number) {
    const { data = [], cellRenderer = defaultCellRenderer, indexed, theme, columns, onDataClick } = this.props;
    const cols = getColumns(data, columns);
    const row = data[rowIndex];
    const cells = keys.map((key, cell) => {
      const column = cols[key];
      const hidden = typeof column !== 'string' && column.hidden;

      if (!hidden) {
        return (
          <StyledTableCell
            key={key}
            onClick={handleDataClickedEvent({ row: rowIndex, column: cell, key, data: row }, onDataClick)}
            theme={theme}>
            {cellRenderer({
              column: cell,
              key,
              data: row,
              row: rowIndex,
              value: row[key],
              render: defaultCellRenderer,
            })}
          </StyledTableCell>
        );
      }

      return <HiddenCell key={key} />;
    });

    if (indexed) {
      cells.unshift(
        <StyledTableCell
          key="index#"
          onClick={handleDataClickedEvent({ row: rowIndex, column: -1, key: '__indexed', data: row }, onDataClick)}
          theme={theme}>
          {rowIndex + 1}
        </StyledTableCell>,
      );
    }

    return cells;
  }

  private renderRows(keys: Array<string>) {
    const {
      data,
      groupBy,
      indexed,
      placeholder,
      rowRenderer = this.defaultRowRenderer,
      getRowKey = defaultRowKeyGetter,
      theme,
    } = this.props;
    const indices = this.getIndices(data, groupBy, this.state.sorting);
    const cols = keys.length + (indexed ? 1 : 0);
    const state = {};

    if (indices.length === 0) {
      return placeholder
        ? [
            <StyledTableRow theme={theme} key="placeholder">
              <StyledPlaceholderCell colSpan={cols} theme={theme}>
                {placeholder}
              </StyledPlaceholderCell>
            </StyledTableRow>,
          ]
        : [];
    } else {
      return indices.map(index => {
        const cells = this.renderCells(keys, index);
        const renderData = { theme, index, cells, data: data[index], key: index.toString(), state };
        renderData.key = getRowKey(renderData);
        return rowRenderer(renderData);
      });
    }
  }

  private renderHead(keys: Array<string>) {
    const { headRenderer = this.defaultHeadRenderer, groupBy, data = [], columns } = this.props;
    const { sorting } = this.state;

    return headRenderer({
      columns: getColumns(data, columns),
      sortBy: sorting,
      groupBy,
      data,
      keys,
    });
  }

  private renderFoot(keys: Array<string>) {
    const { footRenderer = this.defaultFootRenderer, groupBy, data = [], columns } = this.props;
    const { sorting } = this.state;

    return footRenderer({
      columns: getColumns(data, columns),
      sortBy: sorting,
      groupBy,
      data,
      keys,
    });
  }

  render() {
    const {
      data = [],
      columns,
      noHeader,
      theme,
      bodyRenderer = defaultBodyRenderer,
      cellRenderer: _1,
      indexed: _2,
      sortBy: _3,
      onDataClick: _4,
      onFooterClick: _5,
      onHeaderClick: _6,
      placeholder: _7,
      columns: _8,
      groupBy: _9,
      headRenderer: _10,
      footRenderer: _11,
      headerCellRenderer: _12,
      footerCellRenderer: _13,
      onSort: _14,
      ...props
    } = this.props;
    const cols = getColumns(data, columns);
    const keys = Object.keys(cols);
    const showFooter =
      keys.filter(key => {
        const col = cols[key];
        return typeof col === 'object' && !!col.footer && !col.hidden;
      }).length > 0;
    const rows = this.renderRows(keys);

    return bodyRenderer({
      table: TableHost,
      props: {
        theme,
        head: !noHeader && this.renderHead(keys),
        foot: showFooter && this.renderFoot(keys),
        ...props,
      },
      rows,
      mode: 'table',
    });
  }
}
