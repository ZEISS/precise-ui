import * as React from 'react';
import styled, { reStyled, keyframes } from '../../utils/styled';
import { StandardProps } from '../../common';
import { Headline } from '../Headline';
import { TextStyles } from '../../textStyles';
import { white, cyan, dark, grey6 } from '../../colors';
import { remCalc } from '../../utils/remCalc';
import { Blocker, BlockerProps } from '../Blocker';
import { CloseButton } from '../CloseButton';
import { distance } from '../../distance';

export type ModalCloseOrigin = 'button' | 'background';

export interface ModalCloseEvent {
  origin: ModalCloseOrigin;
}

export interface ModalProps extends StandardProps {
  /**
   * Sets the content of the modal dialog.
   */
  children?: React.ReactNode;
  /**
   * Determines if the modal is currently open or not.
   */
  open?: boolean;
  /**
   * Event triggered when the modal should be closed by the user.
   */
  onClose?(e: ModalCloseEvent): void;
  /**
   * Show or hide close modal button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Determines if modal should be closed when clicked outside or Esc pressed
   * @default true
   */
  closeOnOutsideClick?: boolean;
  /**
   * When specified, default max-width of 500px will be overridden
   * @deprecated Please define through styled components and ${Modal.inner.ModalContent}
   */
  width?: string;
  /**
   * Specify the minimal height for the modal container
   * @deprecated Please define through styled components and ${Modal.inner.StyledModal}
   */
  minHeight?: string;
}

export interface ModalHeaderProps extends StandardProps {
  /**
   * @ignore
   */
  children?: void;
  /**
   * The title of the modal dialog.
   */
  title?: string;
  /**
   * The label (above title) of the dialog.
   */
  label?: string;
}

const openAnimationDuration = 300;
const closeAnimationDuration = 200;
const blockerAnimationDuration = 200;

const InAnimation = (startOffset: number) => keyframes`
  from {
    opacity: 0;
    transform: translate(0, ${startOffset}px);
  }
  to {
    opacity: 1;
    transform: translate(0px);
  }
`;

const OutAnimation = () => keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const BlockerInAnimation = () => keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export interface ModalProps {
  width?: string;
}

export interface StyledModalProps extends ModalProps {
  closing: boolean;
}

const StyledModal = reStyled<StyledModalProps, 'div'>('div')(
  ({ width, closing }) => `
    outline: none;
    color: ${dark};
    ${width ? `width: ${width}` : 'max-width: 500px'};
    margin: ${distance.xlarge} auto;
    display: flex;
    align-items: center;
    min-height: calc(100% - (${distance.xlarge} * 2));
    animation: ${closing ? OutAnimation() : InAnimation(-72)} ${
    closing ? closeAnimationDuration : openAnimationDuration
  }ms cubic-bezier(0, 0, 0.25, 1);
    animation-fill-mode: forwards;

    @media screen and (max-width: ${width || '500px'}) {
      width: 100%;
      min-height: 100%;
      margin: 0;
      align-items: stretch;
    }
    `,
);

export interface StyledBlockerProps extends BlockerProps {
  closing: boolean;
}

const StyledBlocker = reStyled<StyledBlockerProps>(({ closing, ...rest }: StyledBlockerProps) => <Blocker {...rest} />)(
  ({ closing }) => `
  animation: ${
    closing ? OutAnimation() : BlockerInAnimation()
  } ${blockerAnimationDuration}ms cubic-bezier(0, 0, 0.25, 1);
    animation-fill-mode: forwards;
  `,
);

export interface ModalContentProps {
  minHeight?: string;
}

const ModalContent = reStyled.div<ModalContentProps>(
  ({ minHeight }) => `
    position: relative;
    display: flex;
    flex-direction: column;
    background: ${white};
    box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.1);
    border-top: 4px solid ${cyan};
    width: 100%;
    ${minHeight ? `min-height: ${minHeight}` : ''};
  `,
);

const StyledModalBody = styled.div`
  font-size: 1rem;
  font-weight: normal;
  text-align: left;
  line-height: ${remCalc('20px')};
  padding: 0 ${distance.xxlarge} ${distance.xxlarge};
  margin-bottom: auto;
`;

const StyledModalHeader = styled.div`
  margin-bottom: ${distance.medium};
  padding: ${distance.xxlarge} ${distance.xxlarge} 0;
`;

const StyledModalFooter = styled.div`
  background: ${grey6};
  padding: ${distance.large} ${distance.xxlarge};
  text-align: right;
`;

interface ModalState {
  closing: boolean;
}

/**
 * A simple modal dialog for requiring user interaction.
 */
export class Modal extends React.PureComponent<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
    this.state = {
      closing: false,
    };
  }

  private closeFrom(origin: ModalCloseOrigin) {
    const { onClose } = this.props;

    this.setState({ closing: true }, () =>
      setTimeout(() => {
        if (typeof onClose === 'function') {
          onClose({
            origin,
          });
        }
        this.setState({ closing: false });
      }, closeAnimationDuration),
    );
  }

  private closeBackground = () => {
    this.closeFrom('background');
  };

  private closeButton = () => {
    this.closeFrom('button');
  };

  render() {
    const { children, onClose, open = false, minHeight, showCloseButton, closeOnOutsideClick, ...rest } = this.props;
    const showClose = showCloseButton === undefined || showCloseButton;
    const closeOnOutside = closeOnOutsideClick === undefined || closeOnOutsideClick;
    const { closing } = this.state;

    return (
      open && (
        <StyledBlocker closing={closing} onClose={closeOnOutside ? this.closeBackground : undefined}>
          <StyledModal tabIndex={0} closing={closing} {...rest}>
            <ModalContent minHeight={minHeight}>
              {children}
              {showClose && <CloseButton onClick={this.closeButton} />}
            </ModalContent>
          </StyledModal>
        </StyledBlocker>
      )
    );
  }
}

/**
 * Styles the body of a modal dialog.
 */
export const ModalBody: React.SFC<StandardProps> = props => <StyledModalBody {...props} />;
ModalBody.displayName = 'ModalBody';

/**
 * Styles the header of a modal dialog
 */
export const ModalHeader: React.SFC<ModalHeaderProps> = ({ title, label, ...rest }) => (
  <StyledModalHeader {...rest}>
    {label && <Headline textStyle={TextStyles.zeta}>{label}</Headline>}
    {title && <Headline textStyle={TextStyles.beta}>{title}</Headline>}
  </StyledModalHeader>
);
ModalHeader.displayName = 'ModalHeader';

/**
 * Styles the footer of a modal dialog.
 */
export const ModalFooter: React.SFC<StandardProps> = props => <StyledModalFooter {...props} />;
ModalFooter.displayName = 'ModalFooter';
