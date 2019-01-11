import * as React from 'react';
import styled from '../../utils/styled';
import { StandardProps } from '../../common';
import { Headline } from '../Headline';
import { TextStyles } from '../../textStyles';
import { white, cyan, dark, grey6 } from '../../colors';
import { remCalc } from '../../utils/remCalc';
import { Blocker } from '../Blocker';
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
   * When specified, default max-width of 500px will be overridden
   */
  width?: string;
  /**
   * Specify the minimal height for the modal container
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

const StyledModal = styled.div`
  outline: none;
  color: ${dark};
  ${({ width }: { width?: string }) => (width ? `width: ${width}` : 'max-width: 500px')};
  margin: ${distance.xlarge} auto;
  display: flex;
  align-items: center;
  min-height: calc(100% - (${distance.xlarge} * 2));

  @media screen and (max-width: ${({ width }: { width?: string }) => width || '500px'}) {
    width: 100%;
    min-height: 100%;
    margin: 0;
    align-items: stretch;
  }
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${white};
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.1);
  border-top: 4px solid ${cyan};
  width: 100%;
  ${({ minHeight }: { minHeight?: string }) => (minHeight ? `min-height: ${minHeight}` : '')};
`;

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

/**
 * A simple modal dialog for requiring user interaction.
 */
export class Modal extends React.PureComponent<ModalProps> {
  private closeFrom(origin: ModalCloseOrigin) {
    const { onClose } = this.props;

    if (typeof onClose === 'function') {
      onClose({
        origin,
      });
    }
  }

  private closeBackground = () => {
    this.closeFrom('background');
  };

  private closeButton = () => {
    this.closeFrom('button');
  };

  render() {
    const { children, onClose, open = false, minHeight, ...rest } = this.props;
    const canClose = typeof onClose === 'function';

    return (
      open && (
        <Blocker onClose={this.closeBackground}>
          <StyledModal tabIndex={0} {...rest}>
            <ModalContent minHeight={minHeight}>
              {children}
              {canClose && <CloseButton onClick={this.closeButton} />}
            </ModalContent>
          </StyledModal>
        </Blocker>
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
