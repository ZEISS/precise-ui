import * as React from 'react';
import { AccordionProps } from './Accordion.types.part';
import { AccordionBasic } from './AccordionBasic.part';
import { AccordionCard } from './AccordionCard.part';

export class AccordionInt extends React.PureComponent<AccordionProps> {
  render() {
    const { mode, openLabel, closeLabel, innerRef, ...props } = this.props;

    return (
      <div ref={innerRef}>
        {mode === 'accordion' ? (
          <AccordionBasic {...props} />
        ) : mode === 'card' ? (
          <AccordionCard openLabel={openLabel} closeLabel={closeLabel} {...props} />
        ) : (
          false
        )}
      </div>
    );
  }
}
