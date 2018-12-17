import * as React from 'react';
import styled from '../../utils/styled';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../Modal';
import { FileProgress, FileUploaderDetailsEvent, TranslationLabels } from './FileUploaderDetails.types.part';
import { StatusTable } from './StatusTable.part';
import { defaultLabels } from './helpers';
import { IconLink } from '../IconLink';

const StyledModalBody = styled(ModalBody)`
  max-height: 480px;
  overflow: auto;
`;

const StyledModal = styled(Modal)`
  max-width: 600px;
`;

export interface UploaderProgressDetailsProps {
  /**
   * Determines if the details are shown or not.
   */
  open: boolean;
  /**
   * Uploading files with progress value.
   */
  files: Array<FileProgress>;
  /**
   * Object with translations. By default standard labels are used.
   */
  labels?: Partial<TranslationLabels>;
  /**
   * Event emitted when upload canceled for individual or all files.
   */
  onCancel(event: FileUploaderDetailsEvent<FileProgress>): void;
  /**
   * Event emitted when upload deleted for individual or all files.
   */
  onDelete(event: FileUploaderDetailsEvent<FileProgress>): void;
  /**
   * Event emitted when details should be hidden.
   */
  onHide(): void;
  /**
   * The total progress from 0 to 100.
   */
  progressValue: number;
}

export class UploaderProgressDetails extends React.Component<UploaderProgressDetailsProps> {
  private cancelAll = () => {
    const { files, onCancel } = this.props;

    onCancel({
      files,
    });
  };

  render() {
    const { open, files, labels = defaultLabels, onCancel, onDelete, onHide, progressValue } = this.props;
    const completed = progressValue >= 100;

    return (
      <StyledModal open={open} onClose={onHide}>
        <ModalHeader title={labels.uploadModalTitle || defaultLabels.uploadModalTitle} />
        <StyledModalBody>
          <StatusTable labels={labels} files={files} onCancel={onCancel} onDelete={onDelete} />
        </StyledModalBody>
        {!completed && (
          <ModalFooter>
            <IconLink onClick={this.cancelAll} icon="Close">
              {labels.cancelAll || defaultLabels.cancelAll}
            </IconLink>
          </ModalFooter>
        )}
      </StyledModal>
    );
  }
}
