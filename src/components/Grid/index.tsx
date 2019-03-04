import * as React from 'react';
import styled from '../../utils/styled';
import { StandardProps } from '../../common';
import { GridAreaProps } from '../GridArea';
import { calcLayout, GridAllocation } from '../../utils/gridLayout';
import { isIE } from '../../utils/browser';

export interface EmptyCellRenderer {
  (row: number, col: number): JSX.Element;
}

export interface GridProps extends StandardProps {
  /**
   * Sets the number of rows in the grid, otherwise either 1
   * (columns not fixed) or dynamic (columns fixed).
   * A string indicates the height of rows in a dynamic setting.
   * @default 1
   */
  rows?: number | string | Array<string>;
  /**
   * Sets the number of columns in the grid, otherwise either
   * 1 (rows not fixed) or dynamic (rows fixed).
   * A string indicates the width of columns in a dynamic setting.
   * @default 1
   */
  columns?: number | string | Array<string>;
  /**
   * Optionally sets the spacing between the grid cells.
   * By default 0, otherwise a single value sets the
   * spacing between rows and columns, while two values
   * set the spacing between the rows and columns
   * respectively.
   * @default 0
   */
  spacing?: number | string | [string, string];
  /**
   * Sets the grid's children.
   */
  children?: React.ReactNode;
  /**
   * By providing the show empty cell property, the grid will automatically
   * render the empty (i.e., unused) cells and populate them using this
   * component.
   * @default false
   */
  showEmptyCells?: JSX.Element | EmptyCellRenderer | boolean;
  /**
   * Event fired once the layout has been computed.
   */
  onLayout?(e: GridLayoutEvent): void;
  /**
   * Gets the reference to the underlying HTML DOM element.
   */
  innerRef?(instance: HTMLElement | null): void;
}

export interface GridLayoutEvent {
  layout: GridLayout;
}

export interface GridLayout {
  allocation: Array<GridAllocation>;
  cells: Array<JSX.Element | undefined>;
  rows: Array<string>;
  columns: Array<string>;
}

export interface GridState {
  layout: GridLayout;
  unused: Array<JSX.Element>;
}

interface GridLayoutProps {
  rows: Array<string>;
  columns: Array<string>;
  spacing: [string, string];
}

const StyledGridWrapper = styled.div`
  position: relative;
`;

function addPx(original: string, space: number) {
  if (original.endsWith('px')) {
    const dim = +original.replace('px', '');
    return `${dim + space}px`;
  }

  return original;
}

function computeIeRows(rows: Array<string>, spacing: [string, string]) {
  if (isIE === 'IE11') {
    const [, rowSpace] = spacing;

    if (rowSpace && rowSpace.endsWith('px')) {
      const space = +rowSpace.replace('px', '');

      if (space) {
        const end = rows.length - 1;
        return rows.map((row, i) => (i !== end ? addPx(row, space) : row)).join(' ');
      }
    }
  }

  return rows.join(' ');
}

const BasicGridLayout = styled.div<GridLayoutProps>`
  height: 100%;
  width: 100%;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: ${props => props.columns.join(' ')};
  grid-template-columns: ${props => props.columns.join(' ')};
  -ms-grid-rows: ${props => computeIeRows(props.rows, props.spacing)};
  grid-template-rows: ${props => props.rows.join(' ')};
  grid-gap: ${props => props.spacing.join(' ')};
`;

const GridLayout = styled(BasicGridLayout)`
  opacity: 0.9999;
`;

const ShadowGrid = styled(BasicGridLayout)`
  position: absolute;
`;

const DefaultUnusedCell = styled.div`
  width: 100%;
  height: 100%;
  background: #f1f1f1;
`;

interface GridCellProps {
  ri: number;
  rf: number;
  ci: number;
  cf: number;
}

const GridCell = styled.div<GridCellProps>`
  -ms-grid-row: ${props => props.ri + 1};
  -ms-grid-row-span: ${props => props.rf - props.ri};
  grid-row: ${props => props.ri + 1} / span ${props => props.rf - props.ri};
  -ms-grid-column: ${props => props.ci + 1};
  -ms-grid-column-span: ${props => props.cf - props.ci};
  grid-column: ${props => props.ci + 1} / span ${props => props.cf - props.ci};
  max-width: 100%;
`;

const HiddenGridCell = styled.div`
  width: 0;
  height: 0;
  overflow: hidden;
`;

function repeat(n: number | Array<string> | undefined, dim = '1fr') {
  if (typeof n === 'number') {
    const arr: Array<string> = [];

    for (let i = 0; i < n; i++) {
      arr.push(dim);
    }

    return arr;
  } else if (!n) {
    return [dim];
  }

  return n;
}

function period(unit: string | [string, string] | undefined): [string, string] {
  if (typeof unit === 'string') {
    return [unit, unit];
  } else if (!unit) {
    return ['0', '0'];
  }

  return unit;
}

function getEmptyComponent(showEmptyCells: JSX.Element | EmptyCellRenderer | true): EmptyCellRenderer {
  if (showEmptyCells === true) {
    return (row, col) => <DefaultUnusedCell key={`uc-${row}-${col}`} />;
  } else if (typeof showEmptyCells === 'object') {
    return (row, col) => React.cloneElement(showEmptyCells, { key: `uc-${row}-${col}` });
  } else {
    return showEmptyCells;
  }
}

type GridChild = React.ReactElement<GridAreaProps> & {
  type: string;
};

function computeAllocations(props: GridProps): GridLayout {
  const { children, rows, columns } = props;
  const allocation: Array<GridAllocation> = [];

  const layout = calcLayout(children, {
    rows: typeof rows !== 'string' ? rows : undefined,
    columns: typeof columns !== 'string' ? columns : undefined,
  });

  const cells = React.Children.map(children, (child: GridChild, index) => {
    const position = layout.cells[index];

    if (child && position) {
      allocation.push(position);
      const { colSpan, column, row, rowSpan } = position;

      if (!colSpan || !rowSpan) {
        return <HiddenGridCell>{child}</HiddenGridCell>;
      }

      return (
        <GridCell ci={column} cf={column + colSpan} ri={row} rf={row + rowSpan} key={index}>
          {child}
        </GridCell>
      );
    }

    return undefined;
  });

  return {
    allocation,
    cells,
    rows: typeof rows === 'string' ? repeat(layout.rows, rows) : repeat(rows || layout.rows),
    columns: typeof columns === 'string' ? repeat(layout.columns, columns) : repeat(columns || layout.columns),
  };
}

function computeUnused(props: GridProps, layout: GridLayout) {
  const { showEmptyCells } = props;
  const { rows, columns } = layout;
  const unusedCells: Array<JSX.Element> = [];

  if (showEmptyCells) {
    const renderer = getEmptyComponent(showEmptyCells);
    const rowCount = rows.length;
    const colCount = columns.length;

    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < colCount; j++) {
        const cell = renderer(i, j);
        unusedCells.push(cell);
      }
    }
  }

  return unusedCells;
}

/**
 * The `Grid` component represents a uniform grid, i.e., a grid that does not change its column layout from row to row.
 */
export class Grid extends React.PureComponent<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props);
    const layout = computeAllocations(props);
    this.state = {
      layout,
      unused: computeUnused(props, layout),
    };
  }

  componentWillReceiveProps(nextProps: GridProps) {
    const currLayout = this.state.layout;
    const nextLayout = computeAllocations(nextProps);

    this.setState({
      layout: nextLayout,
    });

    if (
      nextProps.showEmptyCells !== this.props.showEmptyCells ||
      nextLayout.rows !== currLayout.rows ||
      nextLayout.columns !== currLayout.columns
    ) {
      this.setState({
        unused: computeUnused(nextProps, nextLayout),
      });
    }
  }

  render() {
    const { rows: _0, columns: _1, spacing = 0, showEmptyCells: _2, onLayout, innerRef, ...props } = this.props;
    const { layout, unused } = this.state;
    const space = typeof spacing === 'number' ? `${spacing}px` : spacing;
    const selectedSpacing = period(space);

    if (typeof onLayout === 'function') {
      onLayout({
        layout,
      });
    }

    return (
      <StyledGridWrapper ref={innerRef}>
        {!!unused.length && (
          <ShadowGrid rows={layout.rows} columns={layout.columns} spacing={selectedSpacing}>
            {unused}
          </ShadowGrid>
        )}
        <GridLayout rows={layout.rows} columns={layout.columns} spacing={selectedSpacing} {...props}>
          {layout.cells}
        </GridLayout>
      </StyledGridWrapper>
    );
  }
}
