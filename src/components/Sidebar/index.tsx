import * as React from 'react';
import { KeyCodes } from '../../utils/keyCodes';
import { SidebarPopup } from './SidebarPopup.part';
import { SidebarActivatorContainer } from './SidebarActivatorContainer.part';

type PositionType = 'top' | 'left' | 'bottom' | 'right';

export interface SidebarProps {
  /**
   * Element which triggers sidebar showing by click.
   */
  activator: React.ReactChild;
  /**
   * Determines where to show a sidebar. Valid positions are: left, right, top, bottom.
   * @default right
   */
  position?: PositionType;
  /**
   * Size in valid css units.
   * @default 275px
   */
  size?: string;
  /**
   * Determines if sidebar is opened or closed. Puts sidebar in controlled mode.
   */
  open?: boolean;
  /**
   * Fires this event after trigger element was clicked.
   */
  onShow?(): void;
  /**
   * Fires this event when sidebar should be closed.
   */
  onClose?(): void;
}

interface SidebarState {
  open: boolean;
}

export class Sidebar extends React.Component<SidebarProps, SidebarState> {
  private controlled: boolean;
  constructor(props: SidebarProps) {
    super(props);
    const { open } = this.props;
    this.controlled = open !== undefined;
    this.state = {
      open: open !== undefined ? open : false,
    };
  }

  componentWillReceiveProps(props: SidebarProps) {
    if (this.controlled) {
      this.setState({ open: Boolean(props.open) });
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress);
  }

  private show = () => {
    if (!this.controlled) {
      this.setState({ open: true });
    }

    typeof this.props.onShow === 'function' && this.props.onShow();
  };

  private hide = () => {
    if (!this.controlled) {
      this.setState({ open: false });
    }

    typeof this.props.onClose === 'function' && this.props.onClose();
  };

  private onKeyPress = (e: KeyboardEvent) => {
    if (e.keyCode === KeyCodes.escape) {
      this.hide();
    }
  };

  render() {
    const { onShow: _0, activator, size = '275px', ...props } = this.props;
    const { open } = this.state;
    return (
      <>
        <SidebarActivatorContainer onClick={this.show}>{activator}</SidebarActivatorContainer>
        <SidebarPopup {...props} open={open} onClose={this.hide} size={size} />
      </>
    );
  }
}
