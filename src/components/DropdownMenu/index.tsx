import * as React from 'react';
import * as colors from '../../colors';
import onClickOutside, { AdditionalProps } from 'react-onclickoutside';
import styled, { themed } from '../../utils/styled';
import { Icon, IconName } from '../Icon';
import { InteractiveList, InteractiveListItem, InteractiveListChangeEvent } from '../InteractiveList';
import { StandardProps } from '../../common';
import { KeyCodes } from '../../utils/keyCodes';
import { distance } from '../../distance';
import { Flyout } from '../Flyout';
import { getFontStyle } from '../../textStyles';

export interface DropdownMenuChangeEvent {
  /**
   * The indices of the items that have been selected.
   */
  indices: Array<number>;
}

export interface DropdownMenuToggleEvent {
  /**
   * The menu is currently closed or opened.
   */
  open: boolean;
}

export interface DropdownMenuProps extends StandardProps {
  /**
   * The text to display.
   */
  text?: string;
  /**
   * The optional icon (name) to use.
   */
  icon?: IconName;
  /**
   * The items of the menu.
   */
  items: Array<InteractiveListItem>;
  /**
   * Defines the size of the menu.
   * @default 'normal
   */
  menuSize?: 'normal' | 'small';
  /**
   * Should the menu be kept open when losing focus.
   */
  keepOpen?: boolean;
  /**
   * Event fired when the selected item changes.
   */
  onChange?(e: DropdownMenuChangeEvent): void;
  /**
   * The icon size to use.
   */
  iconSize?: number | string;
  /**
   * Event fired when menu opened | closed.
   */
  onToggle?(e: DropdownMenuToggleEvent): void;
  /**
   * @ignore
   */
  children?: void;
}

export interface DropdownMenuState {
  open: boolean;
}

interface DropdownButtonProps {
  open: boolean;
  menuSize: 'normal' | 'small';
}

const RootContainer = styled.div`
  position: relative;
  margin-right: ${distance.xlarge};
  &:last-child {
    margin-right: 0;
  }
`;

const StyledInteractiveList = styled(InteractiveList)`
  position: static;
  white-space: nowrap;

  ul {
    background: ${themed(props => props.theme.ui1)};
  }
`;

const DropdownButton = styled.div<DropdownButtonProps>`
  color: ${props => (props.open ? colors.cyan : colors.grey2)};
  font-size: ${({ menuSize }) => getFontStyle({ size: menuSize === 'small' ? 'small' : 'medium' })};
  cursor: pointer;
  display: flex;
  align-items: center;
  span {
    margin-left: ${distance.small};
  }
  &:hover {
    color: ${colors.cyan};
  }
`;

class DropdownMenuInt extends React.PureComponent<DropdownMenuProps, DropdownMenuState> {
  private container: HTMLDivElement | null;

  constructor(props: DropdownMenuProps) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOutside = () => {
    this.container && this.state.open && this.toggleOpen();
  };

  private setContainer = (el: HTMLDivElement) => {
    this.container = el;
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.keyCode) {
      case KeyCodes.space:
      case KeyCodes.enter:
      case KeyCodes.down:
        this.toggleOpen();
        break;
    }
  };

  private handleButtonMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    this.toggleOpen();
    e.preventDefault();
  };

  private toggleOpen(force?: boolean) {
    const { open } = this.state;
    const { items, onToggle } = this.props;
    const newState = force ? force : !open;

    this.setState(
      {
        open: newState && !!items.length,
      },
      () => {
        if (typeof onToggle === 'function') {
          onToggle({
            open: this.state.open,
          });
        }
      },
    );
  }

  private handleBlur = () => {
    this.toggleOpen(false);
  };

  private handleChange = (e: InteractiveListChangeEvent) => {
    const { onChange, keepOpen } = this.props;

    if (typeof onChange === 'function') {
      onChange({
        indices: e.value,
      });
    }

    if (!keepOpen) {
      this.toggleOpen(false);
    }
  };

  render() {
    const { items = [], text = '', icon, onChange: _0, menuSize = 'normal', iconSize = 1, ...rest } = this.props;
    const { open } = this.state;

    return (
      <RootContainer ref={this.setContainer}>
        <Flyout
          open={open}
          noGutter
          content={
            <StyledInteractiveList
              borderless
              open={open}
              data={items}
              autoFocus
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
          }>
          <DropdownButton
            tabIndex={0}
            onKeyDown={this.handleKeyDown}
            onMouseDown={this.handleButtonMouseDown}
            open={open}
            menuSize={menuSize}
            {...rest}>
            {icon && <Icon name={icon} size={iconSize} />}
            <span>{text}</span>
          </DropdownButton>
        </Flyout>
      </RootContainer>
    );
  }
}

/**
 * A dropdown menu for displaying menu items.
 */
export const DropdownMenu: React.ComponentClass<DropdownMenuProps & AdditionalProps> = onClickOutside(DropdownMenuInt);
DropdownMenu.displayName = 'DropdownMenu';
