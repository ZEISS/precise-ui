import * as React from 'react';
import { TabPageProps } from '../TabPage';
import { Omit } from '../../common';
import { TabItemProps } from '../ContentSwitch/ContentSwitch.part';

export interface TabControlItem {
  /**
   * The element to be shown.
   */
  element: React.ReactNode;
  /**
   * Gets if the item is currently active.
   */
  active: boolean;
  /**
   * Callback to use when the item should be active.
   */
  onSelect(): void;
}

export interface TabChangeEvent {
  /**
   * The previously selected tab / index.
   */
  previousIndex: number;
  /**
   * The currently selected tab / index.
   */
  selectedIndex: number;
}

export interface TabOptions {
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
  onTabChange?(e: TabChangeEvent): void;
}

/**
 * @deprecated
 */
export interface TabControlProps extends TabOptions {
  /**
   * The children, usually passed as a collection of TabPage elements.
   */
  render(items: Array<TabControlItem>): React.ReactNode;
}

/**
 * @deprecated
 */
export interface TabControlState {
  /**
   * The currently selected index.
   */
  selectedIndex: number;
  /**
   * Determines if the tab component is controlled from the outside or not.
   */
  controlled: boolean;
}

/**
 * The functional component to handle tabs.
 * DEPRECATED: Please use `withTabControl` instead.
 * @deprecated
 */
export class TabControl extends React.PureComponent<TabControlProps, TabControlState> {
  private selects: Array<() => void> = [];

  constructor(props: TabControlProps) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex || props.defaultIndex || 0,
      controlled: props.selectedIndex !== undefined,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: TabControlProps) {
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
    const { children, render } = this.props;
    const items: Array<TabControlItem> = [];
    const selects = this.selects;

    React.Children.forEach(children, (element: React.ReactElement<any>, index) => {
      if (element && React.isValidElement(element)) {
        const active = index === selectedIndex;

        if (selects[index] === undefined) {
          selects[index] = () => this.changeIndex(index);
        }

        items.push({
          onSelect: selects[index],
          active,
          element,
        });
      }
    });

    return render(items);
  }
}

function isTabPage(child: React.ReactElement<TabPageProps>): child is React.ReactElement<TabPageProps> {
  return !!child;
}

interface UseTabSwitcherParams {
  children: React.ReactNode;
  selectedIndex?: number;
  defaultIndex?: number;
  onTabChange?(e: TabChangeEvent): void;
}

function useTabControl({ children, selectedIndex, defaultIndex, onTabChange }: UseTabSwitcherParams) {
  const [controlled] = React.useState(selectedIndex !== undefined);
  const [activeTabIndex, setActiveTabIndex] = React.useState(selectedIndex || defaultIndex || 0);

  React.useEffect(() => {
    if (controlled && typeof selectedIndex === 'number') {
      setActiveTabIndex(selectedIndex);
    }
  }, [selectedIndex]);

  const elements = React.useMemo(
    () =>
      (React.Children.map(children, child => (React.isValidElement(child) ? child : undefined)) || []).filter(
        isTabPage,
      ),
    [children],
  );
  const headers = React.useMemo(() => elements.map(child => child.props.header), [elements]);

  const onSelect = React.useCallback(
    (selectedIndex: number) => {
      setActiveTabIndex(previousIndex => {
        if (typeof onTabChange === 'function') {
          onTabChange({
            previousIndex,
            selectedIndex,
          });
        }

        return controlled ? previousIndex : selectedIndex;
      });
    },
    [onTabChange, controlled],
  );

  return {
    elements,
    headers,
    activeTabIndex,
    onSelect,
    isActive(index: number) {
      return activeTabIndex === index;
    },
  };
}

export interface TabControlHolderProps {
  headers: Array<React.ReactChild>;
  activeIndex?: number;
  onSelect(index: number): void;
}

export interface WithTabControlProps {
  tabItemRenderer: React.ElementType<TabItemProps>;
}

export function withTabControl<T extends TabControlHolderProps>(Component: React.ComponentType<T>) {
  const TabControl: React.FC<TabOptions & WithTabControlProps & Omit<T, keyof TabControlHolderProps>> = ({
    children,
    tabItemRenderer: Element,
    ...rest
  }) => {
    const { elements, headers, activeTabIndex, isActive, onSelect } = useTabControl({
      children,
      ...rest,
    });

    return (
      <Component {...rest as any} headers={headers} activeIndex={activeTabIndex} onSelect={onSelect}>
        {elements.map((child, i) => (
          <Element key={`item-${i}`} active={isActive(i)}>
            {child}
          </Element>
        ))}
      </Component>
    );
  };

  return TabControl;
}
