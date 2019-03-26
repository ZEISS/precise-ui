import * as React from 'react';
import onClickOutside, { AdditionalProps } from 'react-onclickoutside';
import {
  InteractiveListWrapperProps,
  InteractiveListItem,
  InteractiveList,
  InteractiveListProps,
} from '../InteractiveList';
import { Flyout, FlyoutProps } from '../Flyout';

export interface OverflowMenuProps {
  /**
   * The items to display in the menu.
   */
  items: Array<React.ReactChild>;
  /**
   * The button to display for opening the menu.
   */
  button?: React.ReactNode;
  /**
   * The properties to pass on to the flyout.
   */
  flyoutProps?: Partial<FlyoutProps>;
  /**
   * The properties to pass on the interactive list.
   */
  listProps?: Partial<InteractiveListProps>;
}

export interface OverflowMenuState {
  open: boolean;
  items: Array<InteractiveListItem>;
}

const CustomWrapper: React.SFC<InteractiveListWrapperProps> = ({ open: _0, border: _1, direction: _2, ...props }) => (
  <div {...props} />
);
CustomWrapper.displayName = 'CustomWrapper';

function getItems(group: Array<React.ReactChild>): Array<InteractiveListItem> {
  return group.map((item, index) => ({
    content: item,
    key: index.toString(),
  }));
}

class OverflowMenuInt extends React.Component<OverflowMenuProps, OverflowMenuState> {
  constructor(props: OverflowMenuProps) {
    super(props);

    this.state = {
      open: false,
      items: getItems(props.items),
    };
  }

  handleClickOutside = () => {
    this.state.open &&
      this.setState({
        open: false,
      });
  };

  componentWillReceiveProps(nextProps: OverflowMenuProps) {
    this.setState({
      items: getItems(nextProps.items),
    });
  }

  private toggleGroup = (e: React.MouseEvent) => {
    const { open } = this.state;

    this.setState({
      open: !open,
    });

    e.preventDefault();
  };

  private closeList = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { open, items } = this.state;
    const { button: toggleButton, flyoutProps, listProps: interactiveListProps } = this.props;

    return (
      <Flyout
        noGutter
        content={
          <InteractiveList
            open={open}
            autoFocus
            data={items}
            onBlur={this.closeList}
            onChange={this.closeList}
            customWrapper={CustomWrapper}
            {...interactiveListProps}
          />
        }
        {...flyoutProps}
        open={open}>
        <div onClick={this.toggleGroup}>{toggleButton || '...'}</div>
      </Flyout>
    );
  }
}

export const OverflowMenu: React.ComponentClass<AdditionalProps & OverflowMenuProps> = onClickOutside(OverflowMenuInt);
