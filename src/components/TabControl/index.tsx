import * as React from 'react';

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

export interface TabControlProps extends TabOptions {
  /**
   * The children, usually passed as a collection of TabPage elements.
   */
  render(items: Array<TabControlItem>): React.ReactNode;
}

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

  componentWillReceiveProps(nextProps: TabControlProps) {
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
