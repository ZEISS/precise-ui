import * as React from 'react';
import { usePrompt } from './usePrompt';
import { PromptDefaultModalProps, PromptModalProps } from './Prompt.types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../Modal';
import { Button } from '../Button';
import { getMessage } from './PromptBasic.part';
import { ActionLink } from '../ActionLink';
import { styled } from '../../utils';
import { distance } from '../../distance';

export const PromptModal: React.FC<PromptModalProps> = ({ history, when, message, modalOptions }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [handleContinue] = usePrompt(
    () => {
      setShowModal(true);
      return false;
    },
    () => getMessage(message),
    history,
    when,
  );
  return (
    <DefaultModal
      {...modalOptions}
      message={getMessage(message)}
      open={when && showModal}
      onConfirm={() => {
        setShowModal(false);
        handleContinue();
        modalOptions.onConfirm && modalOptions.onConfirm();
      }}
      onCancel={() => {
        setShowModal(false);
        modalOptions.onConfirm && modalOptions.onCancel();
      }}
    />
  );
};

const StyledActionLink = styled(ActionLink)`
  padding: 0 ${distance.large};
`;

const DefaultModal: React.FC<PromptDefaultModalProps> = ({
  title,
  message,
  confirmText = 'Ok',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  open,
}) => {
  return (
    <Modal open={open}>
      <ModalHeader title={title} />
      {typeof message === 'string' && <ModalBody>{message}</ModalBody>}
      <ModalFooter>
        <StyledActionLink onClick={onCancel}>{cancelText}</StyledActionLink>
        <Button onClick={onConfirm}>{confirmText}</Button>
      </ModalFooter>
    </Modal>
  );
};
