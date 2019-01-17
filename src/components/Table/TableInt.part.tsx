import * as React from 'react';
import { TableProps } from './Table.types.part';
import { TableBasic } from './TableBasic.part';
import { TableCard } from './TableCard.part';

export class TableInt<T> extends React.PureComponent<TableProps<T>> {
  render() {
    const { mode, innerRef, ...props } = this.props;

    return (
      <div ref={innerRef}>
        {mode === 'table' ? <TableBasic {...props} /> : mode === 'card' ? <TableCard {...props} /> : false}
      </div>
    );
  }
}
