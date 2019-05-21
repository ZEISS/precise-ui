import * as React from 'react';
import { KeyCodes } from '../../utils/keyCodes';
// import { SidebarPopup } from './SidebarPopup.part';

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
}

interface SidebarState {
  open: boolean;
}

export class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress);
  }

  private show = () => {
    this.setState({ open: true });
  };

  private hide = () => {
    this.setState({ open: false });
  };

  private onKeyPress = (e: KeyboardEvent) => {
    if (e.keyCode === KeyCodes.escape) {
      this.hide();
    }
  };

  render() {
    const { activator, size = '275px', ...props } = this.props;
    const { open } = this.state;
    return (
      <>
        <div onClick={this.show}>{activator}</div>
        {/* <SidebarPopup {...props} open={open} onClose={this.hide} size={size} /> */}
      </>
    );
  }
}
