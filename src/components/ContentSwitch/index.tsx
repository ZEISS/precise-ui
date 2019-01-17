import * as React from 'react';
import { StandardProps } from '../../common';
import { TabControl, TabOptions } from '../TabControl';
import { ResponsiveSwitchPanel } from './ResponsiveSwitchPanel.part';
import { ContentSwitchOrientation } from './ContentSwitchTypes.part';

export { ContentSwitchOrientation };

export interface ContentSwitchProps extends TabOptions, StandardProps {
  /**
   * The children, usually passed as a collection of Content switch elements.
   */
  children?: React.ReactNode;
  /**
   * Optionally sets the content switch mode to use.
   */
  orientation?: ContentSwitchOrientation;
}

export const ContentSwitch: React.SFC<ContentSwitchProps> = ({ theme, orientation, ...props }) => (
  <TabControl render={items => <ResponsiveSwitchPanel orientation={orientation} items={items} />} {...props} />
);

ContentSwitch.displayName = 'ContentSwitch';
