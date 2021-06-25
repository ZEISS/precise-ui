import * as React from 'react';
import { StandardProps } from '../../common';
import { TabOptions, withTabControl } from '../TabControl';
import { ResponsiveTabs, TabsMode } from './Tabs.part';
import { TabItem } from '../TabPanel/TabPanel.part';

export { TabsMode };

const TabControl = withTabControl(ResponsiveTabs);

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
export const Tabs: React.FC<TabsProps> = ({ theme, mode, children, ...props }) => {
  return (
    <TabControl tabItemRenderer={TabItem} mode={mode} theme={theme} {...props}>
      {children}
    </TabControl>
  );
};
Tabs.displayName = 'Tabs';
