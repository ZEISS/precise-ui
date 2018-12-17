import * as React from 'react';
import { AccordionTableProps } from './AccordionTable.types.part';
import { AccordionTableBasic } from './AccordionTableBasic.part';
import { AccordionTableCard } from './AccordionTableCard.part';
import { TableMode } from '../Table/Table.types.part';
import { ModeProviderState } from '../../hoc/withResponsiveMode';

export class AccordionTableInt<T> extends React.PureComponent<AccordionTableProps<T>> {
  render() {
    const {
      children: _0,
      mode,
      cardRenderer,
      cardBodyRenderer,
      openLabel,
      closeLabel,
      innerRef,
      ...props
    } = this.props;

    return (
      <div ref={innerRef}>
        {mode === 'table' ? (
          <AccordionTableBasic {...props} />
        ) : mode === 'card' ? (
          <AccordionTableCard
            cardRenderer={cardRenderer}
            openLabel={openLabel}
            closeLabel={closeLabel}
            cardBodyRenderer={cardBodyRenderer}
            {...props}
          />
        ) : (
          false
        )}
      </div>
    );
  }
}
