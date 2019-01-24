import * as React from 'react';
import { Spinner } from '../Spinner';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';

export type Status = 'idle' | 'loading' | 'loaded' | 'error';

export interface ImageProps extends StandardProps {
  /**
   * @ignore
   */
  children?: void;
  /**
   * This attribute defines the alternative text describing the image.
   * Users will see this text displayed if the image URL is wrong,
   * the image is not in one of the supported formats, or if the image is not yet downloaded.
   */
  alt: string;
  /**
   * When specified, image will be preloaded and the preloader shown during the preloading.
   * Default is false.
   * @default false
   */
  preload?: boolean;
  /**
   * The image URL. This attribute is mandatory for the <Image> component.
   */
  src: string;
  /**
   * Custom preloader component to indicate loading.
   */
  preloader?: React.ReactChild;
  /**
   * Custom error component that is displayed when the loading fails.
   */
  error?: React.ReactChild;
}

export interface ImageState {
  status: Status;
}

// Wrapper used only in case when preloader enabled
const StyledImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  box-sizing: border-box;
`;

const StyledImage = styled.img`
  margin: 0;
  padding: 0;
  border: 0;
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  height: auto;
  border-style: none;
`;

const StyledError = styled.span`
  background: ${themed(props => props.theme.inputError)};
  color: ${themed(props => props.theme.text7)};
  font-family: inherit;
`;

/**
 * Image component is meant to be a simple wrapper for standard DOM `img` element.
 * Component is fluid by default, meaning that it has max-width: 100% and height: auto,
 * so that it scales with it's parent.
 */
export class Image extends React.Component<ImageProps, ImageState> {
  constructor(props: ImageProps) {
    super(props);
    this.state = {
      status: 'idle',
    };
  }

  componentDidMount() {
    const { preload, src } = this.props;

    if (preload) {
      const image = document.createElement('img');
      image.onload = () => this.setState({ status: 'loaded' });
      image.onerror = () => this.setState({ status: 'error' });
      image.src = src;
    }
  }

  render() {
    const { children, preload, src, alt, preloader, error, ...rest } = this.props;
    const { status } = this.state;

    return preload ? (
      <StyledImageWrapper>
        {(() => {
          switch (status) {
            case 'loaded':
              return <StyledImage src={src} alt={alt} {...rest} />;
            case 'error':
              return error || <StyledError>Error loading image from {src}.</StyledError>;
            case 'loading':
            case 'idle':
            default:
              return preloader || <Spinner />;
          }
        })()}
      </StyledImageWrapper>
    ) : (
      <StyledImage src={src} alt={alt} {...rest} />
    );
  }
}
