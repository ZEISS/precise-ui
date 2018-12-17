import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import * as colors from '../../colors';
import { TabPageProps } from '../TabPage';
import { StandardProps } from '../../common';
import { TextStylings } from '../../textStyles';
import { Responsive } from '../Responsive';
import { SlideDownTabs, TabHeaderItem } from './Tabs.part';
import { distance } from '../../distance';

export interface TabsChangeEvent {
  /**
   * The previously selected tab / index.
   */
  previousIndex: number;
  /**
   * The currently selected tab / index.
   */
  selectedIndex: number;
}

export interface TabsProps extends StandardProps {
  /**
   * The default index - only set for use in automatic mode.
   */
  defaultIndex?: number;
  /**
   * The currently selected index - used in the controlled mode.
   */
  selectedIndex?: number;
  /**
   * Notification callback if the selected tab index should change.
   */
  onTabChange?(e: TabsChangeEvent): void;
  /**
   * The children, usually passed as a collection of TabPage elements.
   */
  children?: React.ReactNode;
}

export interface TabsState {
  /**
   * The currently selected index.
   */
  selectedIndex: number;
  /**
   * Determines if the tab component is controlled from the outside or not.
   */
  controlled: boolean;
}

const TabContainer = styled.div``;

const ActiveTab = css`
  color: ${themed(props => props.theme.text)};
  font-weight: 500;
  border-color: ${colors.dark};
`;

const InactiveTab = css`
  &:hover {
    color: ${colors.cyan};
    border: none;
  }
`;

const TabHeaders = styled.ul`
  margin: 0 0 ${distance.xsmall};
  padding: 0;
  display: flex;
`;

interface TabHeaderProps extends StandardProps {
  active?: boolean;
}

const TabHeader = styled<TabHeaderProps, 'li'>('li')`
  position: relative;
  z-index: 1;
  margin: 0;
  list-style: none;
  cursor: pointer;
  overflow: visible;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: ${TextStylings.delta.lineHeight};
  font-size: ${TextStylings.delta.fontSize};
  font-weight: 400;
  box-sizing: border-box;
  border-bottom: 2px solid transparent;
  margin-right: ${distance.xxlarge};
  ${props => (props.active ? ActiveTab : InactiveTab)};

  &:last-child {
    margin-right: 0;
  }
`;

interface TabItemProps {
  active?: boolean;
}

const TabItem = styled.div`
  ${(props: TabItemProps) => (props.active ? '' : 'display: none;')};
`;

const TabContent = styled.div``;

/**
 * The tabs component displays a toggling list of content. It features a
 * header that makes selecting tabs possible and a content list.
 */
export class Tabs extends React.PureComponent<TabsProps, TabsState> {
  private selects: Array<() => void> = [];

  constructor(props: TabsProps) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex || props.defaultIndex || 0,
      controlled: props.selectedIndex !== undefined,
    };
  }

  componentWillReceiveProps(nextProps: TabsProps) {
    const selectedIndex = nextProps.selectedIndex;

    if (this.state.controlled && typeof selectedIndex === 'number') {
      this.setState({
        selectedIndex,
      });
    }
  }

  private changeIndex = (target: number) => {
    const change = this.props.onTabChange;

    if (typeof change === 'function') {
      change({
        previousIndex: this.state.selectedIndex,
        selectedIndex: target,
      });
    }

    if (!this.state.controlled) {
      this.setState({
        selectedIndex: target,
      });
    }
  };

  render() {
    const selectedIndex = this.state.selectedIndex;
    const { children, theme, ...props } = this.props;
    const tabHeaders: Array<React.ReactChild> = [];
    const tabItems: Array<React.ReactChild> = [];
    const selects = this.selects;

    const slideDownTabHeaders: Array<TabHeaderItem> = [];

    React.Children.forEach(children, (element: React.ReactElement<TabPageProps>, index) => {
      if (element && React.isValidElement(element)) {
        const { header } = element.props;
        const active = index === selectedIndex;

        if (selects[index] === undefined) {
          selects[index] = () => this.changeIndex(index);
        }

        tabHeaders.push(
          <TabHeader theme={theme} key={`head-${index}`} active={active} onClick={selects[index]}>
            {header}
          </TabHeader>,
        );
        tabItems.push(
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
      <>
        <Responsive screenSize="large">
          <TabContainer theme={theme} {...props}>
            <TabHeaders theme={theme}>{tabHeaders}</TabHeaders>
            <TabContent theme={theme}>{tabItems}</TabContent>
          </TabContainer>
        </Responsive>
        <Responsive screenSize="smallAndMedium">
          <>
            <SlideDownTabs data={slideDownTabHeaders} selectedIndex={selectedIndex} onChange={this.changeIndex} />
            <TabContent theme={theme}>{tabItems}</TabContent>
          </>
        </Responsive>
      </>
    );
  }
}
