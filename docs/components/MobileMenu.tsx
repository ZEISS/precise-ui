import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Icon, WindowPopup, styled, distance, colors } from '../../src';

const Hamburger = styled.div`
  font-size: 30px;
  cursor: pointer;
  margin-left: 1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  i {
    vertical-align: text-bottom;
  }
  span {
    margin-left: ${distance.small};
  }
  &:hover {
    color: ${colors.cyan};
  }
`;

export interface MobileMenuProps extends RouteComponentProps {
  toc?: React.ReactNode;
}

export const MobileMenu = withRouter(
  class extends React.Component<MobileMenuProps> {
    private unregister = () => {};
    state = {
      open: false,
    };

    private toggle = () => {
      const { open } = this.state;

      this.setState({
        open: !open,
      });
    };

    componentDidMount() {
      const { history } = this.props;
      this.unregister = history.listen(() => {
        this.setState({
          open: false,
        });
      });
    }

    componentWillUnmount() {
      this.unregister();
    }

    render() {
      const { open } = this.state;
      const { toc } = this.props;

      return (
        <>
          {open && <WindowPopup onClose={this.toggle}>{toc}</WindowPopup>}
          <Hamburger onClick={this.toggle}>
            <Icon name="Menu" />
          </Hamburger>
        </>
      );
    }
  },
);
