import * as React from 'react';
import { StandardProps } from '../../common';
import { TabControlItem } from '../TabControl';
import { TabPageProps } from '../TabPage';
import { TabContainer, TabHeaders, TabHeader, TabItem, TabContent } from './TabPanel.part';

export interface TabPanelProps extends StandardProps {
  /**
   * The tab items that should be shown.
   */
  data: Array<TabControlItem>;
  /**
   * @ignore
   */
  children?: void;
}

/**
 * Represents the default layout used for a tab control.
 */
export const TabPanel: React.SFC<TabPanelProps> = ({ theme, data, children, ...props }) => {
  const headers: Array<React.ReactChild> = [];
  const pages: Array<React.ReactChild> = [];

  data.forEach((item, index) => {
    const element = item.element as React.ReactElement<TabPageProps>;

    if (element && React.isValidElement(element)) {
      const { header } = element.props;
      const active = item.active;

      headers.push(
        <TabHeader theme={theme} key={`head-${index}`} active={active} onClick={item.onSelect}>
          {header}
        </TabHeader>,
      );
      pages.push(
        <TabItem theme={theme} key={`item-${index}`} active={active}>
          {element}
        </TabItem>,
      );
    }
  });

  return (
    <TabContainer theme={theme} {...props}>
      <TabHeaders theme={theme}>{headers}</TabHeaders>
      <TabContent theme={theme}>{pages}</TabContent>
    </TabContainer>
  );
};
TabPanel.displayName = 'TabPanel';
