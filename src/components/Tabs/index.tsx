import * as React from 'react';
import { StandardProps } from '../../common';
import { TabControl, TabOptions } from '../TabControl';
import { ResponsiveTabs, TabsMode } from './Tabs.part';

export { TabsMode };

export interface TabsProps extends TabOptions, StandardProps {
  /**
   * The children, usually passed as a collection of TabPage elements.
   */
  children?: React.ReactNode;
  /**
   * Optionally sets the tabs mode to use.
   */
  mode?: TabsMode;
}

/**
 * The tabs component displays a toggling list of content. It features a
 * header that makes selecting tabs possible and a content list.
 *
 * The component contains an optional automatic selection of the best view.
 */
export const Tabs: React.SFC<TabsProps> = ({ theme, mode, ...props }) => (
  <TabControl render={items => <ResponsiveTabs mode={mode} items={items} />} {...props} />
);
Tabs.displayName = 'Tabs';
