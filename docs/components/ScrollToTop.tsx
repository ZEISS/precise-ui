import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export class ScrollToTop extends React.Component<RouteComponentProps> {
  componentWillReceiveProps(nextProps: RouteComponentProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return false;
  }
}
