import * as React from 'react';
// @ts-ignore
import ErrorComponent from 'react-styleguidist/lib/rsg-components/Error';

interface ErrorBoundaryState {
  error?: Error;
  info: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    // tslint:disable-next-line
    this.state = { info: null };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({
      error,
      info,
    });
  }

  render() {
    const { children } = this.props;
    const { error, info } = this.state;

    if (error !== undefined) {
      return <ErrorComponent error={error} info={info} />;
    }

    return <>{children}</>;
  }
}
