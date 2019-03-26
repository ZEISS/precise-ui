import * as React from 'react';
import { AccordionTableProps } from './AccordionTable.types.part';
import { AccordionTableBasic } from './AccordionTableBasic.part';
import { AccordionTableCard } from './AccordionTableCard.part';

export class AccordionTableInt<T> extends React.PureComponent<AccordionTableProps<T>> {
  render() {
    const { mode, innerRef, ...props } = this.props;

    return (
      <div ref={innerRef}>
        {mode === 'table' ? (
          <AccordionTableBasic {...props} />
        ) : mode === 'card' ? (
          <AccordionTableCard {...props} />
        ) : (
          false
        )}
      </div>
    );
  }
}
