import * as React from 'react';
import { StandardProps } from '../../common';
import { TabControlItem } from '../TabControl';
import { TabPageProps } from '../TabPage';
import { DropdownContainer, TabHeaderItem, SlideDownTabs, TabItem, TabContent } from './DropdownPanel.part';

export interface DropdownPanelProps extends StandardProps {
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
 * Represents the mobile layout used for a tab control.
 */
export const DropdownPanel: React.SFC<DropdownPanelProps> = ({ theme, data, children, ...props }) => {
  const pages: Array<React.ReactChild> = [];
  const slideDownTabHeaders: Array<TabHeaderItem> = [];
  let selectedIndex = -1;

  data.forEach((item, index) => {
    const element = item.element as React.ReactElement<TabPageProps>;

    if (element && React.isValidElement(element)) {
      const { header } = element.props;
      const active = item.active;

      if (active) {
        selectedIndex = index;
      }

      pages.push(
        <TabItem theme={theme} key={`item-${index}`} active={active}>
          {element}
        </TabItem>,
      );

      slideDownTabHeaders.push({
        key: `${index}`,
        content: header,
        type: 'item',
      });
    }
  });

  return (
    <DropdownContainer theme={theme} {...props}>
      <SlideDownTabs
        data={slideDownTabHeaders}
        selectedIndex={selectedIndex}
        onChange={index => {
          const item = data[index];
          item && item.onSelect();
        }}
      />
      <TabContent theme={theme}>{pages}</TabContent>
    </DropdownContainer>
  );
};
DropdownPanel.displayName = 'DropdownPanel';
