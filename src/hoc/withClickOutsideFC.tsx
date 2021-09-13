// This HOC is an adapter allowing functional components to use 'react-clickoutside' package.
// The problem with 'react-clickoutside' is that it only supports class components, and
// the workaround, described in its README does not always work and is ugly.
// This HOC hides imperative nature of 'react-onclickoutside' and notifies the wrapped component
// about outside clicks by passing it the click event as a prop. As each event object is unique,
// the wrapped component may react on clicks with the help of 'useEffect' hook set up to listen
// changes of `props.outsideClickEvent`.

import onClickOutside, { AdditionalProps } from 'react-onclickoutside';
import * as React from 'react';

interface OutsideClickProps {
  outsideClickEvent: React.SyntheticEvent | undefined;
}

export function withClickOutsideFC<P extends object>(Component: React.FC<P>) {
  class OutsideClickAdapter extends React.Component<P, AdditionalProps & OutsideClickProps> {
    static displayName: string;
    constructor(props: P) {
      super(props);
      this.state = {
        outsideClickEvent: undefined,
      };
    }

    handleClickOutside = (e: React.SyntheticEvent) => {
      this.setState({ outsideClickEvent: e });
    };

    render() {
      const { children, ...otherProps } = this.props;
      return (
        <Component outsideClickEvent={this.state.outsideClickEvent} {...otherProps as P}>
          {children}
        </Component>
      );
    }
  }

  OutsideClickAdapter.displayName = 'withClickOutsideWrapper';

  return onClickOutside(OutsideClickAdapter);
}

export interface WithClickOutsideFCProps extends AdditionalProps, OutsideClickProps {}
