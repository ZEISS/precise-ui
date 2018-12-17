import * as React from 'react';
import { AccordionInt } from './AccordionInt.part';
import { AccordionProps, AccordionMode } from './Accordion.types.part';
import { withResponsiveMode, ModeProviderState } from '../../hoc/withResponsiveMode';
import { breakpoints } from '../../themes';

export {
  AccordionMode,
  AccordionProps,
  AccordionChangeEvent,
  AccordionCardRendererEvent,
} from './Accordion.types.part';

/**
 * The accordion component displays a toggling list of content. It features a
 * list of headers that makes selecting different parts of content possible.
 */
export const Accordion = withResponsiveMode<AccordionMode>(width =>
  !width || width > breakpoints.medium ? 'accordion' : 'card',
)(AccordionInt);
