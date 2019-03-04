import * as React from 'react';
import styled from '../../utils/styled';

export interface ExpanderProps {
  /**
   * The timeout to be used for transitioning.
   * @default 0
   */
  timeout?: number;
  /**
   * If `true`, the component will transition in.
   * @default false
   */
  expand?: boolean;
  /**
   * The height of the container when collapsed.
   * @default `0px`
   */
  collapsedHeight?: string;
  /**
   * Optionally unmount the expandable container
   * @default false
   */
  unmountOnExit?: boolean;
}

export type TransitionStatus = 'unmounted' | 'mounted' | 'exited' | 'entering' | 'entered' | 'exiting' | 'exitingStart';

export interface ExpanderState {
  status?: TransitionStatus;
}

export interface ExpandingContainerProps {
  expandedHeight?: number;
  collapsedHeight?: string;
  status?: TransitionStatus;
  timeout: number;
}

function getExpandingContainerHeight(status?: TransitionStatus, expandedHeight?: number, collapsedHeight?: string) {
  if (!expandedHeight) {
    return '0';
  }

  switch (status) {
    case 'entering':
      return `${expandedHeight}px`;
    case 'entered':
      return 'auto';
    case 'exitingStart':
      return `${expandedHeight}px`;
    case 'exiting':
    default:
      return `${collapsedHeight || '0'}`;
  }
}

const ExpandingContainer = styled('div')<ExpandingContainerProps>(
  ({ status, expandedHeight, collapsedHeight, timeout }) => `
    overflow: hidden;
    transition-duration: ${timeout}ms;
    height: ${getExpandingContainerHeight(status, expandedHeight, collapsedHeight)}
  `,
);

/**
 * A functional expander component for expanding / collapsing content.
 */
export class Expander extends React.Component<ExpanderProps, ExpanderState> {
  private wrapperRef = React.createRef<HTMLDivElement>();
  private rootContainer: HTMLDivElement | null;
  private timer: any;

  constructor(props: ExpanderProps) {
    super(props);

    this.state = {
      status: 'unmounted',
    };
  }

  componentDidMount() {
    this.handleChange();
  }

  componentDidUpdate(prevProps: ExpanderProps, prevState: ExpanderState) {
    const { expand } = this.props;
    const { status } = this.state;

    if (prevProps.expand !== expand || prevState.status !== status) {
      this.handleChange();
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  private handleChange() {
    const { expand } = this.props;
    const { status } = this.state;

    if (expand) {
      if (status === 'unmounted') {
        this.setState({
          status: 'mounted',
        });
      } else if (status !== 'entering' && status !== 'entered') {
        this.performEnter();
      }
    } else {
      if (status === 'entering' || status === 'entered') {
        this.performExit();
      }
    }
  }

  private performEnter() {
    this.setState(
      {
        status: 'entering',
      },
      () => this.setDelayedStatus('entered'),
    );
  }

  private performExit() {
    const { unmountOnExit } = this.props;

    this.setState({ status: 'exitingStart' }, () =>
      this.setState({ status: 'exiting' }, () => this.setDelayedStatus(unmountOnExit ? 'unmounted' : 'exited')),
    );
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private setContainer = (ref: HTMLDivElement | null) => {
    this.rootContainer = ref;
  };

  private setDelayedStatus(status: TransitionStatus) {
    const { timeout = 0 } = this.props;
    this.clearTimer();

    this.timer = setTimeout(() => {
      this.setState({
        status,
      });
    }, timeout);
  }

  render() {
    const { status } = this.state;
    const { children, collapsedHeight, timeout = 0 } = this.props;
    const contentRef = this.wrapperRef.current;

    if (status !== 'unmounted') {
      return (
        <ExpandingContainer
          ref={this.setContainer}
          expandedHeight={contentRef ? contentRef.clientHeight : undefined}
          collapsedHeight={collapsedHeight}
          status={status}
          timeout={timeout}
          style={{ minHeight: collapsedHeight }}>
          <div ref={this.wrapperRef}>{children}</div>
        </ExpandingContainer>
      );
    }

    return false;
  }
}
