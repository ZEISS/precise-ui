import * as React from 'react';
import { StandardProps } from '../../common';

export interface AccordionTabProps extends StandardProps {
  /**
   * The title of the tab in the accordion selection.
   */
  header: React.ReactChild;
  /**
   * The content of the tab to be rendered if open.
   */
  children?: React.ReactNode;
}

/**
 * The accordion tab is used to define a single tab within a accordion component.
 */
export const AccordionTab: React.SFC<AccordionTabProps> = ({ header: _0, ...props }) => <div {...props} />;
AccordionTab.displayName = 'AccordionTab';
