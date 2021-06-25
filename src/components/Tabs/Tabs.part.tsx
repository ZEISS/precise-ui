import * as React from 'react';
import { StandardProps } from '../../common';
import { breakpoints } from '../../themes';
import { TabControlHolderProps } from '../TabControl';
import { ModeProviderProps, withResponsiveMode } from '../../hoc';
import { TabContent, TabHeader, TabHeaders } from '../TabPanel/TabPanel.part';
import { DropdownContainer, SlideDownTabs, TabHeaderItem } from '../DropdownPanel/DropdownPanel.part';

export type TabsMode = 'tab' | 'dropdown';

export interface TabIntProps extends StandardProps, ModeProviderProps<TabsMode>, TabControlHolderProps {}

const TabInt: React.FC<React.PropsWithChildren<TabIntProps>> = ({
  theme,
  mode,
  innerRef,
  activeIndex = 0,
  onSelect,
  headers = [],
  children,
  ...props
}) => {
  let TabHeaderHolder: React.ReactNode = false;
  if (mode === 'tab') {
    TabHeaderHolder = (
      <TabHeaders theme={theme} {...props}>
        {headers.map((text, index) => (
          <TabHeader theme={theme} key={`head-${index}`} active={index === activeIndex} onClick={() => onSelect(index)}>
            {text}
          </TabHeader>
        ))}
      </TabHeaders>
    );
  } else if (mode === 'dropdown') {
    TabHeaderHolder = (
      <DropdownContainer theme={theme} {...props}>
        <SlideDownTabs
          data={headers.map(
            (content, index) =>
              ({
                key: `${index}`,
                content,
                type: 'item',
              } as TabHeaderItem),
          )}
          selectedIndex={activeIndex}
          onChange={onSelect}
        />
      </DropdownContainer>
    );
  }

  return (
    <div ref={innerRef}>
      {TabHeaderHolder}
      <TabContent theme={theme}>{children}</TabContent>
    </div>
  );
};

export interface ResponsiveTabsType extends React.FC<TabIntProps> {
  (props: TabIntProps & { children?: React.ReactNode }, context?: any): JSX.Element;
}

export const ResponsiveTabs: ResponsiveTabsType = withResponsiveMode<'tab' | 'dropdown'>(width =>
  !width || width > breakpoints.medium ? 'tab' : 'dropdown',
)(TabInt) as any;
