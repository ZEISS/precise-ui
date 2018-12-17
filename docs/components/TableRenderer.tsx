import * as React from 'react';
import { Table } from '../../src';

type Row = any;

interface TableRendererProps {
  columns: Array<{
    caption: string;
    render(row: Row): React.ReactNode;
  }>;
  rows: Array<Row>;
  getRowKey(row: Row): string;
}

const TableRenderer: React.SFC<TableRendererProps> = ({ rows, columns, getRowKey }) => {
  if (rows.length) {
    const cols = {};
    const [row] = rows;
    const ids = Object.keys(row);

    for (const column of columns) {
      const caption = column.caption;
      const id = ids.shift() || caption;
      cols[id] = {
        header: caption,
        width: `${100 / columns.length}%`,
      };
    }

    return (
      <Table
        data={rows}
        condensed
        borderless
        getRowKey={e => getRowKey(rows[e.index])}
        cellRenderer={e => {
          const col = columns[e.column];
          const row = rows[e.row];
          return col.render(row);
        }}
        columns={cols}
      />
    );
  }

  //tslint:disable-next-line
  return null;
};

export default TableRenderer;
