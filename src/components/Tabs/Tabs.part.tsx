import * as React from 'react';
import { TabPanel } from '../TabPanel';
import { DropdownPanel } from '../DropdownPanel';
import { StandardProps } from '../../common';
import { breakpoints } from '../../themes';
import { TabControlItem } from '../TabControl';
import { withResponsiveMode } from '../../hoc/withResponsiveMode';

export type TabsMode = 'tab' | 'dropdown';

interface TabIntProps extends StandardProps {
  items: Array<TabControlItem>;
  mode?: TabsMode;
  children?: void;
}

const TabInt: React.SFC<TabIntProps> = ({ items, mode, ...props }) =>
  mode === 'tab' ? <TabPanel data={items} {...props} /> : <DropdownPanel data={items} {...props} />;

export const ResponsiveTabs = withResponsiveMode<'tab' | 'dropdown'>(width =>
  !width || width > breakpoints.medium ? 'tab' : 'dropdown',
)(TabInt);
