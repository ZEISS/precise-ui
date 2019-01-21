import * as React from 'react';
import { AccordionInt } from './AccordionInt.part';
import { AccordionProps, AccordionMode } from './Accordion.types.part';
import { withResponsiveMode } from '../../hoc/withResponsiveMode';
import { breakpoints } from '../../themes';

export {
  AccordionMode,
  AccordionProps,
  AccordionChangeEvent,
  AccordionCardRendererEvent,
} from './Accordion.types.part';

export interface AccordionType extends React.SFC<AccordionProps> {
  (props: AccordionProps & { children?: React.ReactNode }, context?: any): JSX.Element;
}

/**
 * The accordion component displays a toggling list of content. It features a
 * list of headers that makes selecting different parts of content possible.
 */
export const Accordion: AccordionType = withResponsiveMode<AccordionMode>(width =>
  !width || width > breakpoints.medium ? 'accordion' : 'card',
)(AccordionInt) as any;
