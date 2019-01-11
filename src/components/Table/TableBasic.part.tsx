import * as React from 'react';
import memoize from 'memoize-one';
import styled, { themed, css, reStyled } from '../../utils/styled';
import { remCalc } from '../../utils/remCalc';
import { sortObjectList } from '../../utils/sort';
import { distance } from '../../distance';
import { RefProps } from '../../hoc/withResponsive';
import {
  TableCellEvent,
  TableRowEvent,
  TableBodyRenderEvent,
  TableProps,
  SortingObject,
  SortingString,
  Column,
} from './Table.types.part';

export interface TableBasicState {
  sorting?: SortingObject;
  controlledSorting: boolean;
}

interface TableHeaderProps {
  sortable?: boolean;
  width?: string;
}

interface StyledTableProps {
  condensed?: boolean;
  borderless?: boolean;
}

interface SortIconProps {
  currentDirection?: 'ArrowDropDown' | 'ArrowDropUp' | false;
  sortable?: boolean;
}

const StyledTable = reStyled.table<StyledTableProps>(
  ({ theme, borderless, condensed }) => `
    table-layout: ${theme.tableLayout};
    border-collapse: collapse;
    width: 100%;
    color: ${theme.text};
    border: ${borderless ? 'none' : theme.tableBorder};
    font-size: ${remCalc('14px')};

    > thead > tr > th,
    > tbody > tr > td {
      padding: ${condensed ? `${distance.small} ${distance.large}` : theme.tableHeadPadding};

      &:not(:last-child) {
        padding-right: 0;
      }
    }
  `,
);

const StyledTableBody = styled.tbody``;

const HiddenCell = styled.td`
  display: none;
`;

const StyledTableHead = styled.thead`
  color: ${themed(({ theme }) => theme.text || theme.text1)};
  font-weight: bold;
`;

const StyledTableFoot = styled.tfoot`
  font-size: 0.8em;
`;

const StyledTableHeaderRow = styled.tr``;

const StyledTableRow = reStyled.tr(
  ({ theme: { ui3, ui4, text1 } }) => `
  border-bottom: 1px solid ${ui4};
  color: ${text1};

  &:hover {
    background: ${ui3};
  }
`,
);

const StyledTableHeader = styled<TableHeaderProps, 'th'>('th')`
  text-align: left;
  border-bottom: 1px solid ${themed(({ theme }) => theme.ui5)};
  cursor: ${({ sortable }: TableHeaderProps) => (sortable ? 'pointer' : 'default')};
  ${({ width }) => (width && `width: ${width}`) || ''};
`;

const HeaderLabel = styled.div`
  font-size: 0;
  white-space: nowrap;

  > span {
    display: inline-block;
    vertical-align: middle;
    font-size: ${remCalc('14px')};
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

const SortIcon = styled<SortIconProps, 'span'>('span')`
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

const StyledTableCell = styled.td`
  text-align: left;
`;

const StyledPlaceholderCell = StyledTableCell.extend`
  text-align: center;
`;

export function defaultCellRenderer<T>({ value }: TableCellEvent<T>): React.ReactChild {
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

function defaultRowKeyGetter<T>({ key }: TableRowEvent<T>) {
  return key;
}

function defaultRowRenderer<T>({ theme, cells, index }: TableRowEvent<T>) {
  return (
    <StyledTableRow key={index} theme={theme}>
      {cells}
    </StyledTableRow>
  );
}

function defaultBodyRenderer(e: TableBodyRenderEvent) {
  const TableBody = e.table;
  return <TableBody>{e.rows}</TableBody>;
}

function normalizeSortBy(sortBy?: SortingObject | SortingString): SortingObject | undefined {
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

    // tslint:disable-next-line
    return null;
  }

  private getIndices = memoize((data, sorting) =>
    sorting ? sortObjectList(data, sorting.columnKey, sorting.order) : sortObjectList(data),
  );

  private isSortable(key: string) {
    const { sortBy } = this.props;
    const columns = this.getColumns();
    const col = columns[key];
    return !sortBy && (!col || (typeof col !== 'string' && col.sortable));
  }

  private headerClicked(e: React.MouseEvent<HTMLTableCellElement>, column: number, key: string) {
    const { onHeaderClick } = this.props;
    e.preventDefault();

    if (typeof onHeaderClick === 'function') {
      onHeaderClick({
        column,
        key,
        row: -1,
      });
    } else if (this.isSortable(key)) {
      const { sorting } = this.state;
      const isAscending = sorting && sorting.order === 'descending' && sorting.columnKey === key;

      if (!isAscending && column !== -1) {
        this.setState({
          sorting: {
            columnKey: key,
            order: sorting && sorting.columnKey === key ? 'descending' : 'ascending',
          },
        });
      } else {
        this.setState({
          sorting: undefined,
        });
      }
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

  private dataClicked(e: React.MouseEvent<HTMLTableCellElement>, row: number, column: number, key: string) {
    const { onDataClick, data } = this.props;
    e.preventDefault();

    if (typeof onDataClick === 'function') {
      const d = data[row];
      onDataClick({
        row,
        column,
        key,
        data: d,
        value: d && (column === -1 ? row + 1 : d[key]),
      });
    }
  }

  private defaultHeadRenderer(keys: Array<string>) {
    const { indexed, theme } = this.props;
    const columns = this.getColumns();
    const { sorting } = this.state;
    const sortDir = sorting && sorting.order === 'descending' ? 'ArrowDropDown' : 'ArrowDropUp';
    const sortColumn = sorting ? sorting.columnKey : undefined;

    return (
      <StyledTableHead theme={theme}>
        <StyledTableHeaderRow theme={theme}>
          {indexed && (
            <StyledTableHeader onClick={e => this.headerClicked(e, -1, '#')} theme={theme}>
              #
            </StyledTableHeader>
          )}
          {keys.map((key, cell) => {
            const column = columns[key];
            const hidden = typeof column !== 'string' && column.hidden;

            if (!hidden) {
              const name = typeof column === 'string' ? column : column.header;
              const width = typeof column === 'string' ? undefined : column.width;
              const direction = sortColumn === key && sortDir;
              const isSortable = this.isSortable(key);
              return (
                <StyledTableHeader
                  sortable={isSortable}
                  width={width}
                  key={key}
                  onClick={e => this.headerClicked(e, cell, key)}
                  theme={theme}>
                  <HeaderLabel>
                    <span>{name}</span>
                    {isSortable && <SortIcon currentDirection={direction} />}
                  </HeaderLabel>
                </StyledTableHeader>
              );
            }

            return <HiddenCell key={key} />;
          })}
        </StyledTableHeaderRow>
      </StyledTableHead>
    );
  }

  private renderHead(keys: Array<string>) {
    const { headRenderer, sortBy } = this.props;
    const columns = this.getColumns();

    if (typeof headRenderer === 'function') {
      return headRenderer({
        columns: columns,
        sortBy,
      });
    } else {
      return this.defaultHeadRenderer(keys);
    }
  }

  private renderCells(keys: Array<string>, rowIndex: number) {
    const { data, cellRenderer, indexed, theme } = this.props;
    const columns = this.getColumns();
    const cellRender = typeof cellRenderer === 'function' ? cellRenderer : defaultCellRenderer;
    const cells = keys.map((key, cell) => {
      const column = columns[key];
      const hidden = typeof column !== 'string' && column.hidden;

      if (!hidden) {
        const row = data[rowIndex];
        const value = cellRender({
          column: cell,
          key,
          data: row,
          row: rowIndex,
          value: row[key],
        });
        return (
          <StyledTableCell key={key} onClick={e => this.dataClicked(e, rowIndex, cell, key)} theme={theme}>
            {value}
          </StyledTableCell>
        );
      }

      return <HiddenCell key={key} />;
    });

    if (indexed) {
      cells.unshift(
        <StyledTableCell key="index#" onClick={e => this.dataClicked(e, rowIndex, -1, '__indexed')} theme={theme}>
          {rowIndex + 1}
        </StyledTableCell>,
      );
    }

    return cells;
  }

  private renderRows(keys: Array<string>) {
    const {
      data,
      indexed,
      placeholder,
      rowRenderer = defaultRowRenderer,
      getRowKey = defaultRowKeyGetter,
      theme,
    } = this.props;
    const indices = this.getIndices(data, this.state.sorting);
    const cols = keys.length + (indexed ? 1 : 0);

    if (indices.length === 0) {
      return (
        placeholder && (
          <StyledTableRow theme={theme}>
            <StyledPlaceholderCell colSpan={cols} theme={theme}>
              {placeholder}
            </StyledPlaceholderCell>
          </StyledTableRow>
        )
      );
    } else {
      return indices.map(index => {
        const cells = this.renderCells(keys, index);
        const renderData = { theme, index, cells, data: data[index], key: index.toString() };
        renderData.key = getRowKey(renderData);
        return rowRenderer(renderData);
      });
    }
  }

  private getColumns() {
    const { columns, data = [] } = this.props;
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

  private renderFoot(keys: Array<string>) {
    const { indexed, theme } = this.props;
    const columns = this.getColumns();

    return (
      <StyledTableFoot theme={theme}>
        <StyledTableRow theme={theme}>
          {indexed && <StyledTableCell theme={theme} onClick={e => this.footerClicked(e, -1, '#')} />}
          {keys.map(key => {
            const column = columns[key];
            const hidden = typeof column !== 'string' && column.hidden;

            if (!hidden) {
              const name = typeof column === 'string' ? undefined : column.footer;
              return (
                <StyledTableCell key={key} theme={theme} onClick={e => this.footerClicked(e, -1, key)}>
                  {name}
                </StyledTableCell>
              );
            }

            return <HiddenCell key={key} />;
          })}
        </StyledTableRow>
      </StyledTableFoot>
    );
  }

  render() {
    const {
      data = [],
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
      ...props
    } = this.props;
    const columns = this.getColumns();
    const keys = Object.keys(columns);
    const showFooter = !!keys.filter(key => {
      const col = columns[key];
      return typeof col === 'object' && !!col.footer && !col.hidden;
    }).length;
    const rows = this.renderRows(keys);

    return bodyRenderer({
      table: ({ children }) => (
        <StyledTable theme={theme} {...props}>
          {!noHeader && this.renderHead(keys)}
          <StyledTableBody theme={theme}>{children}</StyledTableBody>
          {showFooter && this.renderFoot(keys)}
        </StyledTable>
      ),
      rows,
    });
  }
}
