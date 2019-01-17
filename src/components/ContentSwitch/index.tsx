import * as React from 'react';
import { StandardProps } from '../../common';
import { TabControl, TabOptions } from '../TabControl';
import { ResponsiveContentSwitch, ContentSwitchOrientation } from './ResponsiveContentSwitchPanel';

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
  <TabControl render={items => <ResponsiveContentSwitch orientation={orientation} items={items} />} {...props} />
);

ContentSwitch.displayName = 'ContentSwitch';
