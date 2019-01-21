import * as React from 'react';
import { TabPanel } from '../TabPanel';
import { DropdownPanel } from '../DropdownPanel';
import { StandardProps } from '../../common';
import { breakpoints } from '../../themes';
import { TabControlItem } from '../TabControl';
import { withResponsiveMode, ModeProviderProps } from '../../hoc/withResponsiveMode';

export type TabsMode = 'tab' | 'dropdown';

interface TabIntProps extends StandardProps, ModeProviderProps<TabsMode> {
  items: Array<TabControlItem>;
  children?: void;
}

class TabInt extends React.PureComponent<TabIntProps> {
  render() {
    const { items, mode, innerRef, ...props } = this.props;

    return (
      <div ref={innerRef}>
        {mode === 'tab' ? (
          <TabPanel data={items} {...props} />
        ) : mode === 'dropdown' ? (
          <DropdownPanel data={items} {...props} />
        ) : (
          false
        )}
      </div>
    );
  }
}

export interface ResponsiveTabsType extends React.SFC<TabIntProps> {
  (props: TabIntProps & { children?: React.ReactNode }, context?: any): JSX.Element;
}

export const ResponsiveTabs: ResponsiveTabsType = withResponsiveMode<'tab' | 'dropdown'>(width =>
  !width || width > breakpoints.medium ? 'tab' : 'dropdown',
)(TabInt) as any;
