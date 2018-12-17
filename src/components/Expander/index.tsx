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

export type TransitionStatus = 'unmounted' | 'mounted' | 'exited' | 'entering' | 'entered' | 'exiting';

export interface ExpanderState {
  status?: TransitionStatus;
}

const ExpandingContainer = styled.div`
  height: 0;
  overflow: hidden;
`;

const defaultCollapsedHeight = '0px';

/**
 * A functional expander component for expanding / collapsing content.
 */
export class Expander extends React.Component<ExpanderProps, ExpanderState> {
  private wrapperRef: React.RefObject<HTMLDivElement>;
  private rootContainer: HTMLDivElement | null;
  private timer: any;

  constructor(props: ExpanderProps) {
    super(props);

    this.wrapperRef = React.createRef();

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
    const { timeout } = this.props;
    const rootRef = this.rootContainer;
    const contentRef = this.wrapperRef.current;

    if (rootRef && contentRef) {
      rootRef.style.transitionDuration = `${timeout}ms`;
      rootRef.style.height = `${contentRef.clientHeight}px`;
    }

    this.setState(
      {
        status: 'entering',
      },
      () => this.setDelayedStatus('entered'),
    );
  }

  private performExit() {
    const { timeout = 0, unmountOnExit, collapsedHeight } = this.props;
    const rootRef = this.rootContainer;
    const contentRef = this.wrapperRef.current;

    if (rootRef && contentRef) {
      rootRef.style.transitionDuration = `${timeout}ms`;
      rootRef.style.height = collapsedHeight || defaultCollapsedHeight;
    }

    this.setState(
      {
        status: 'exiting',
      },
      () => this.setDelayedStatus(unmountOnExit ? 'unmounted' : 'exited'),
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
    const { children, collapsedHeight = defaultCollapsedHeight } = this.props;

    if (status !== 'unmounted') {
      return (
        <ExpandingContainer innerRef={this.setContainer} style={{ minHeight: collapsedHeight }}>
          <div ref={this.wrapperRef}>{children}</div>
        </ExpandingContainer>
      );
    }

    return false;
  }
}
