import * as React from 'react';
import styled from '../../utils/styled';
import { Button } from '../Button';
import { Spinner } from '../Spinner';
import { distance } from '../../distance';

export interface InfiniteScrollProps {
  /**
   * @ignore
   */
  children?: void;
  /**
   * Method to load more items.
   */
  loadItems(offset: number): void;
  /**
   * Sets the button mode. If true the component will render the default
   * 'Show More' button. In case a string is supplied the default button
   * will be rendered with the given string. Otherwise, if a React component
   * is provided it will render the provided component.
   */
  button?: boolean | string | React.ComponentType<LoaderButtonProps>;
  /**
   * Pixels left to bottom of the page, at which loadItems() function will
   * be called. Used 'scroll' mode.
   * @default 0px
   */
  edgeOffset?: number;
  /**
   * The height of the scrolling container in pixels. This is a required
   * prop if useWindow is not set to true.
   * @default 0px
   */
  containerHeight?: number;
  /**
   * This option allows the window to be used as the scroll container, instead
   * of an arbitrary div created by this component, when it is set to true.
   * @default false
   */
  useWindow?: boolean;
  /**
   * The optional host element to be used.
   */
  host?: string | React.ComponentClass | React.StatelessComponent;
  /**
   * This prop receives data that is displayed in this component.
   */
  data: React.ReactNodeArray;
  /**
   * This prop let's component know if there is more data to load and call loadItems function on scroll or to display the button.
   */
  hasMore: boolean;
  /**
   * Custom loading indicator
   */
  loadingIndicator?: React.ReactNode;
}

export interface InfiniteScrollState {
  isButtonMode: boolean;
  isLoading: boolean;
}

interface StyledContainerProps {
  height?: number;
}

export interface LoaderButtonProps {
  onClick(): void;
}

const Container = styled.div<StyledContainerProps>`
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  overflow: ${({ height }) => (height ? 'auto' : 'visible')};
`;

const Footer = styled.div`
  margin-top: ${distance.small};
`;

const DefaultButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export class InfiniteScroll extends React.Component<InfiniteScrollProps, InfiniteScrollState> {
  private node: HTMLDivElement | null;

  constructor(props: InfiniteScrollProps) {
    super(props);
    this.state = {
      isButtonMode: !!this.props.button,
      isLoading: false,
    };
  }

  componentDidMount() {
    const { isButtonMode } = this.state;

    if (!isButtonMode) {
      const { useWindow } = this.props;

      if (useWindow) {
        window.addEventListener('scroll', this.handleOnScroll);
      }
    }
  }

  componentWillUnmount() {
    const { isButtonMode } = this.state;

    if (!isButtonMode) {
      const { useWindow } = this.props;

      if (useWindow) {
        window.removeEventListener('scroll', this.handleOnScroll);
      } else if (this.node && !useWindow) {
        this.node.removeEventListener('scroll', this.handleOnScroll);
      }
    }
  }

  componentWillReceiveProps(nextProps: InfiniteScrollProps) {
    if (nextProps.data.length !== this.props.data.length || nextProps.hasMore !== this.props.hasMore) {
      this.setState({
        isLoading: false,
      });
    }
  }

  private handleOnScroll = () => {
    const scrolledToBottom = this.reachedBottom();

    if (scrolledToBottom && this.props.hasMore) {
      this.loadItems();
    }
  };

  private reachedBottom() {
    const edgeOffset = this.props.edgeOffset || 0;
    const { documentElement, body } = document;
    const { useWindow } = this.props;

    const scrollTop = useWindow
      ? (documentElement && documentElement.scrollTop) || body.scrollTop
      : (this.node && this.node.scrollTop) || 0;

    const scrollHeight = useWindow
      ? (documentElement && documentElement.scrollHeight) || body.scrollHeight
      : (this.node && this.node.scrollHeight) || 0;

    const innerHeight = useWindow ? window.innerHeight : (this.node && this.node.clientHeight) || 0;
    const scrolledToBottom = Math.ceil(scrollTop + innerHeight + edgeOffset) >= scrollHeight;

    return scrolledToBottom;
  }

  private loadItems = () => {
    const { data } = this.props;
    this.setState({ isLoading: true });

    return this.props.loadItems(data.length);
  };

  private renderButton() {
    const { data, button: CustomButton, hasMore } = this.props;
    const { isLoading } = this.state;

    if (!hasMore || data.length === 0 || isLoading) {
      return undefined;
    }

    if (CustomButton && typeof CustomButton !== 'boolean' && typeof CustomButton !== 'string') {
      return <CustomButton onClick={this.loadItems} />;
    }

    return (
      <DefaultButton buttonStyle="secondary" onClick={this.loadItems} theme={{ buttonIconPosition: 'left' }} icon="Add">
        {typeof CustomButton === 'string' ? CustomButton : 'Show more'}
      </DefaultButton>
    );
  }

  private setContainer = (node: HTMLDivElement | null) => {
    this.node = node;

    if (this.node) {
      this.node.removeEventListener('scroll', this.handleOnScroll);
    }

    if (node && !this.props.useWindow) {
      node.addEventListener('scroll', this.handleOnScroll);
    }

    this.node = node;
  };

  render() {
    const { host: Host = 'div', data, containerHeight, loadingIndicator } = this.props;
    const { isButtonMode, isLoading } = this.state;

    return (
      <Container ref={this.setContainer} height={containerHeight}>
        <Host>{data}</Host>
        <Footer>
          {isLoading && (loadingIndicator || <Spinner size="x-small" />)}
          {isButtonMode && this.renderButton()}
        </Footer>
      </Container>
    );
  }
}
