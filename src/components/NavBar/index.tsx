import * as React from 'react';
import styled, { css } from '../../utils/styled';
import { StackPanel } from '../StackPanel';
import { Anchor } from '../Anchor';
import { Icon } from '../Icon';
import { cyan, black, grey2 } from '../../colors';
import { distance } from '../../distance';
import { multiply } from '../../utils/multiply';
import { getFontStyle } from '../../textStyles';
import { displayTo } from '../../utils/displayTo';
import { remCalc } from '../../utils/remCalc';

export interface NavBarItem {
  content: React.ReactNode;
  display?: 'mobile' | 'pin' | 'lead';
  id: string;
}

export interface NavBarToggleEvent {
  shouldOpen: boolean;
}

export interface NavBarProps {
  /**
   * Sets component display mode. By default automatic mode is used,
   * which depends on the component's width.
   */
  mode?: 'hamburger' | 'full';
  /**
   * The optional logo to define. Either a string or a React element.
   * A string is interpreted as an image URL, which will displayed in
   * an 57x57 large image inside a link component.
   */
  logo?: React.ReactChild;
  /**
   * Determines if the menu is opened or closed. If the value is set the
   * control goes into controlled mode. Omitting this value will trigger
   * the managed mode.
   */
  open?: boolean;
  /**
   * Event emitted once the hamburger menu should be toggled.
   */
  onToggle?(e: NavBarToggleEvent): void;
  /**
   * Option to hide the standard menu and only display the logo, if available.
   * @default false
   */
  hidden?: boolean;
  /**
   * The menu items to show.
   */
  items: Array<NavBarItem>;
  /**
   * Optional additional content to place inside the nav bar container.
   */
  children?: React.ReactNode;
}

export interface NavBarState {
  controlledMode: boolean;
  controlledOpen: boolean;
  open: boolean;
  mode: 'hamburger' | 'full' | undefined;
}

const HeaderStackPanel = styled(StackPanel)`
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const StyledNavBar = styled(HeaderStackPanel)`
  padding-top: ${distance.xlarge};
  margin-bottom: ${distance.xxxlarge};
  flex-wrap: wrap;
`;

const StyledMenuLink = styled.a`
  ${getFontStyle({ size: 'xxLarge' })}

  position: relative;

  cursor: pointer;
  color: ${black};
  text-decoration: none;
  display: flex;
  margin-left: ${distance.medium};
  align-items: center;
  i {
    vertical-align: text-bottom;
  }
  span {
    margin-left: ${distance.small};
  }
  &:hover {
    color: ${cyan};
  }
`;

const StyledMenu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  max-height: 0;
  overflow: hidden;
  &.open {
    max-height: 500px;
  }
`;

const StyledMenuItems = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  width: 100%;
`;

const StyledMenuItem = styled.li`
  ${getFontStyle({ size: 'medium' })}

  margin: ${distance.small} 0;

  text-align: right;
  & a {
    text-decoration: none;
    color: ${grey2};
  }
  & a:hover {
    color: ${cyan};
  }
`;

const StyledLogoLink = styled(Anchor)`
  margin-left: ${distance.xlarge};
  margin-right: ${distance.medium};
  height: 57px;
`;

const StyledLinks = styled.div`
  margin-right: auto;
  margin-left: ${multiply(distance.xxxlarge, 2)};
`;

const StyledLead = styled.div`
  ${getFontStyle({ size: 'xxLarge' })}

  margin-right: ${distance.medium};
`;

const StyledPin = styled.div`
  ${getFontStyle({ size: 'xxLarge' })}
  
  margin-left: ${distance.medium};
`;

const breakPoint = 780;

function isFullMode(width: number) {
  return width > breakPoint;
}

interface DesktopHeaderProps {
  leads: Array<NavBarItem>;
  pins: Array<NavBarItem>;
}

const DesktopHeader: React.SFC<DesktopHeaderProps> = ({ leads, pins }) => (
  <>
    <StyledLinks>
      {leads.map(item => (
        <StyledLead key={item.id}>{item.content}</StyledLead>
      ))}
    </StyledLinks>
    <HeaderStackPanel>
      {pins.map(item => (
        <StyledPin key={item.id}>{item.content}</StyledPin>
      ))}
    </HeaderStackPanel>
  </>
);

interface MobileHeaderProps {
  entries: Array<NavBarItem>;
  onToggle(): void;
  open: boolean;
}

const MobileHeader: React.SFC<MobileHeaderProps> = ({ entries, onToggle, open }) => (
  <>
    <HeaderStackPanel>
      <StyledMenuLink onClick={onToggle}>
        <Icon name={open ? 'Close' : 'Menu'} />
      </StyledMenuLink>
    </HeaderStackPanel>
    <StyledMenu onClick={onToggle} className={open ? 'open' : ''}>
      <StyledMenuItems>
        {entries.map(item => (
          <StyledMenuItem key={item.id}>{item.content}</StyledMenuItem>
        ))}
      </StyledMenuItems>
    </StyledMenu>
  </>
);

/**
 * A simple navigation bar that is responsive by nature.
 */
export class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);

    this.state = {
      controlledMode: props.mode !== undefined,
      controlledOpen: props.open !== undefined,
      open: !!props.open,
      mode: props.mode,
    };
  }

  componentWillReceiveProps(nextProps: NavBarProps) {
    if (this.state.controlledMode) {
      this.setState({
        mode: nextProps.mode,
      });
    }

    if (this.state.controlledOpen) {
      this.setState({
        open: !!nextProps.open,
      });
    }
  }

  private toggle = () => {
    const { onToggle } = this.props;
    const { open, controlledOpen } = this.state;

    if (!controlledOpen) {
      this.setState({
        open: !open,
      });
    }

    if (typeof onToggle === 'function') {
      onToggle({
        shouldOpen: !open,
      });
    }
  };

  render() {
    const { logo, hidden, items, mode: _0, children, ...rest } = this.props;
    const { mode, open } = this.state;

    return (
      <StyledNavBar {...rest}>
        {logo &&
          (typeof logo === 'string' ? (
            <StyledLogoLink to="/">
              <img src={logo} width={57} height={57} />
            </StyledLogoLink>
          ) : (
            logo
          ))}
        {children}
        {!hidden &&
          (mode === 'full' ? (
            <DesktopHeader
              leads={items.filter(item => item.display === 'lead')}
              pins={items.filter(item => item.display === 'pin')}
            />
          ) : mode === 'hamburger' ? (
            <MobileHeader
              entries={items.filter(item => !item.display || item.display === 'mobile')}
              open={open}
              onToggle={this.toggle}
            />
          ) : (
            false
          ))}
      </StyledNavBar>
    );
  }
}
