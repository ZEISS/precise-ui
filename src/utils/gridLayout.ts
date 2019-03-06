import * as React from 'react';

export interface GridCellDefinition {
  /**
   * The optional number of spanned columns. By default only 1 column is spanned.
   * @default 1
   */
  colSpan?: number;
  /**
   * The optional number of spanned columns. By default only 1 row is spanned.
   * @default 1
   */
  rowSpan?: number;
  /**
   * The 0-based column where the area should be displayed.
   */
  column?: number;
  /**
   * The 0-based row where the area should be displayed.
   */
  row?: number;
  /**
   * Optionally sets the tile to be hidden, so that it does not consume space.
   */
  hidden?: boolean;
}

export interface GridLayoutCell {
  ri: number;
  rf: number;
  ci: number;
  cf: number;
}

export interface GridAllocation {
  column: number;
  row: number;
  colSpan: number;
  rowSpan: number;
}

export interface GridAllocationLayout {
  allocations: Array<Array<boolean>>;
  flexRows: boolean;
  flexCols: boolean;
}

export interface GridDimension {
  rows?: number | Array<string>;
  columns?: number | Array<string>;
}

export function checkAllocation(
  layout: GridAllocationLayout,
  row: number,
  col: number,
  rowSpan: number,
  colSpan: number,
) {
  const { allocations, flexCols, flexRows } = layout;

  for (let r = row, l = row + rowSpan; r < l; r++) {
    if (r >= allocations.length && !flexRows) {
      return false;
    }

    const allocation = allocations[r];

    for (let c = col, l = col + colSpan; c < l; c++) {
      if (allocation) {
        if ((c >= allocation.length && !flexCols) || allocation[c]) {
          return false;
        }
      }
    }
  }

  return true;
}

export function findAllocation(layout: GridAllocationLayout, proposedAllocation: Partial<GridAllocation> = {}) {
  const { colSpan = 1, rowSpan = 1, row, column: col } = proposedAllocation;

  if (row === undefined || col === undefined) {
    const { allocations, flexCols, flexRows } = layout;
    const infty = Number.POSITIVE_INFINITY;
    const maxRows = flexRows ? infty : allocations.length - 1;
    const maxCols = flexCols ? infty : allocations[0].length - 1;

    for (let r = row || 0; r <= (row || maxRows); r++) {
      for (let c = col || 0; c <= (col || maxCols); c++) {
        if (checkAllocation(layout, r, c, rowSpan, colSpan)) {
          return {
            ci: c,
            cf: c + colSpan,
            ri: r,
            rf: r + rowSpan,
          };
        }
      }
    }
  } else {
    return {
      ci: col,
      cf: col + colSpan,
      ri: row,
      rf: row + rowSpan,
    };
  }

  return undefined;
}

export function updateAllocation(allocations: Array<Array<boolean>>, allocation: GridLayoutCell) {
  while (allocations.length < allocation.ri) {
    appendRow(allocations);
  }

  while (allocations[0].length < allocation.ci) {
    appendColumn(allocations);
  }

  for (let row = allocation.ri; row < allocation.rf; row++) {
    if (row === allocations.length) {
      appendRow(allocations);
    }

    for (let col = allocation.ci; col < allocation.cf; col++) {
      if (col === allocations[0].length) {
        appendColumn(allocations);
      }

      allocations[row][col] = true;
    }
  }
}

export function createAllocations(dim: GridDimension) {
  const allocations: Array<Array<boolean>> = [];
  const rows = Array.isArray(dim.rows) ? dim.rows.length : dim.rows || 1;
  const cols = Array.isArray(dim.columns) ? dim.columns.length : dim.columns || 1;

  for (let row = 0; row < rows; ++row) {
    const allocation = createRow(cols);
    allocations.push(allocation);
  }

  return {
    allocations,
    flexRows: dim.rows === undefined && dim.columns !== undefined,
    flexCols: dim.columns === undefined,
  };
}

function appendColumn(allocations: Array<Array<boolean>>) {
  for (const row of allocations) {
    row.push(false);
  }
}

function appendRow(allocations: Array<Array<boolean>>) {
  const newRow = createRow(allocations[0].length);
  allocations.push(newRow);
}

function createRow(cols: number) {
  const allocation: Array<boolean> = [];

  for (let col = 0; col < cols; ++col) {
    allocation.push(false);
  }

  return allocation;
}

function createCell(layout: GridAllocationLayout, proposed: GridCellDefinition): GridAllocation | undefined {
  if (!proposed.hidden) {
    const foundAllocation = findAllocation(layout, proposed);

    if (foundAllocation) {
      updateAllocation(layout.allocations, foundAllocation);
      return {
        column: foundAllocation.ci,
        row: foundAllocation.ri,
        colSpan: foundAllocation.cf - foundAllocation.ci,
        rowSpan: foundAllocation.rf - foundAllocation.ri,
      };
    }

    return undefined;
  }

  return {
    column: 0,
    row: 0,
    colSpan: 0,
    rowSpan: 0,
  };
}

export function calcLayout(children: React.ReactNode, dim: GridDimension) {
  const layout = createAllocations(dim);
  const cells: Array<GridAllocation | undefined> = [];

  React.Children.forEach(children, (child, index) => {
    if (typeof child === 'object' && child) {
      const { row, column } = (child as any).props;

      if (row !== undefined && column !== undefined) {
        cells[index] = createCell(layout, (child as any).props);
      }
    }
  });

  React.Children.forEach(children, (child, index) => {
    if (typeof child === 'object' && child && !cells[index]) {
      cells[index] = createCell(layout, (child as any).props);
    }
  });

  return {
    cells,
    rows: layout.allocations.length,
    columns: layout.allocations[0].length,
  };
}
