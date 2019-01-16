import * as React from 'react';
import styled from '../../utils/styled';
import { getPropLabel } from '../../utils/labels';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../Modal';
import { FileProgress, FileUploaderDetailsEvent } from './FileUploaderDetails.types.part';
import { StatusTable } from './StatusTable.part';
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
  open?: boolean;
  /**
   * Uploading files with progress value.
   */
  files: Array<FileProgress>;
  /**
   * Event emitted when upload canceled for individual or all files.
   */
  onCancel(e: FileUploaderDetailsEvent<FileProgress>): void;
  /**
   * Event emitted when upload deleted for individual or all files.
   */
  onDelete(e: FileUploaderDetailsEvent<FileProgress>): void;
  /**
   * Event emitted when details should be hidden.
   */
  onHide(): void;
  /**
   * The total progress from 0 to 100.
   */
  progressValue: number;
  /**
   * Optionally sets the label for the cancel all button.
   */
  cancelAllLabel?: string;
  /**
   * Optionally sets the label for the file column.
   */
  tableHeaderFileLabel?: string;
  /**
   * Optionally sets the label for the status column.
   */
  tableHeaderStatusLabel?: string;
  /**
   * Optionally sets the labe for the title of the progress details modal.
   */
  uploadModalTitleLabel?: string;
  /**
   * Optionally sets the status for canceled in the table.
   */
  canceledTableUploadLabel?: string;
  /**
   * Optionally sets the status for scanning in the table.
   */
  scanningTableUploadLabel?: string;
  /**
   * Optionally sets the status for progress in the table.
   */
  progressTableUploadLabel?: string;
  /**
   * Optionally sets the status for success in the table.
   */
  successTableUploadLabel?: string;
  /**
   * Optionally sets the status for error in the table.
   */
  errorTableUploadLabel?: string;
}

export class UploaderProgressDetails extends React.Component<UploaderProgressDetailsProps> {
  private cancelAll = () => {
    const { files, onCancel } = this.props;

    onCancel({
      files,
    });
  };

  render() {
    const { open, files, onCancel, onDelete, onHide, progressValue, ...props } = this.props;
    const completed = progressValue >= 100;

    return (
      <StyledModal open={open} onClose={onHide} {...props}>
        <ModalHeader title={getPropLabel(props, 'uploadModalTitleLabel')} />
        <StyledModalBody>
          <StatusTable {...props} onCancel={onCancel} onDelete={onDelete} files={files} />
        </StyledModalBody>
        {!completed && (
          <ModalFooter>
            <IconLink onClick={this.cancelAll} icon="Close">
              {getPropLabel(props, 'cancelAllLabel')}
            </IconLink>
          </ModalFooter>
        )}
      </StyledModal>
    );
  }
}
