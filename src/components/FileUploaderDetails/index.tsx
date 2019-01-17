import * as React from 'react';
import styled from '../../utils/styled';
import { UploadProgressDetailsLabels, UploaderProgressBarLabels } from '../../utils/labels';
import { EventManager, eventManagers } from '../../utils/eventManager';
import {
  FileBase,
  FileItem,
  FileProgress,
  FileUploadActions,
  FileUploaderDetailsEvent,
} from './FileUploaderDetails.types.part';
import { UploaderProgressBar } from './UploaderProgressBar.part';
import { UploaderProgressDetails } from './UploaderProgressDetails.part';
import { mergeData } from './helpers';
import { distance } from '../../distance';

export { FileUploadActions, FileItem, FileProgress, FileBase, FileUploaderDetailsEvent };

export interface FileUploaderDetailsProps extends UploadProgressDetailsLabels, UploaderProgressBarLabels {
  /**
   * Sets the event manager to use. By default a standard event manager is used.
   */
  events?: EventManager;
  /**
   * Event emitted when files to upload are selected.
   */
  onUpload(e: FileUploaderDetailsEvent<FileItem>): void;
  /**
   * Event emitted when file upload has been canceled.
   */
  onCancel?(e: FileUploaderDetailsEvent<FileProgress>): void;
  /**
   * Event emitted when file upload should be deleted.
   */
  onDelete?(e: FileUploaderDetailsEvent<FileProgress>): void;
  /**
   * Event emitted when total progress overlay is closed.
   */
  onClose?(): void;
}

export interface FileUploaderDetailsState {
  files: Array<FileProgress>;
  showDetails: boolean;
  showUploader: boolean;
}

const initialState: FileUploaderDetailsState = {
  files: [],
  showDetails: false,
  showUploader: false,
};

const StyledUploaderHost = styled.div`
  box-sizing: border-box;
  z-index: 10001;
  position: fixed;
  bottom: ${distance.large};
  left: 0;
  width: 100%;
`;

/**
 * The host element for global async file upload process. Use as a singleton only.
 */
export class FileUploaderDetails extends React.Component<FileUploaderDetailsProps, FileUploaderDetailsState> {
  private eventManager: EventManager;

  constructor(props: FileUploaderDetailsProps) {
    super(props);
    const { events } = props;
    this.eventManager = events || eventManagers[0];
    this.state = {
      ...initialState,
    };
  }

  componentDidMount() {
    const em = this.eventManager;
    em.on(FileUploadActions.startUpload, this.onStart);
    em.on(FileUploadActions.cancelUpload, this.onCancel);
    em.on(FileUploadActions.uploadProgress, this.onChange);
    em.on(FileUploadActions.uploadFailure, this.onChange);
    em.on(FileUploadActions.showUploads, this.showDetails);
    em.on(FileUploadActions.clearUploads, this.onClear);
    eventManagers.push(em);
  }

  componentWillUnmount() {
    const em = this.eventManager;
    em.off(FileUploadActions.startUpload, this.onStart);
    em.off(FileUploadActions.cancelUpload, this.onCancel);
    em.off(FileUploadActions.uploadProgress, this.onChange);
    em.off(FileUploadActions.uploadFailure, this.onChange);
    em.off(FileUploadActions.showUploads, this.showDetails);
    em.off(FileUploadActions.clearUploads, this.onClear);
    eventManagers.splice(eventManagers.lastIndexOf(em), 1);
  }

  private onStart = (e: FileUploaderDetailsEvent<FileItem>) => {
    this.props.onUpload(e);

    this.setState({
      showUploader: true,
    });
  };

  private onChange = ({ files }: FileUploaderDetailsEvent<FileProgress>) => {
    const { files: currentFiles } = this.state;

    this.setState({
      files: mergeData(files, currentFiles),
    });
  };

  private onCancel = ({ files }: FileUploaderDetailsEvent<FileProgress>) => {
    const { onCancel } = this.props;

    if (typeof onCancel === 'function') {
      onCancel({
        files: files.filter(item => item.progress < 100 && !item.canceled && !item.error),
      });
    }
  };

  private onDelete = ({ files }: FileUploaderDetailsEvent<FileProgress>) => {
    const { onDelete } = this.props;

    if (typeof onDelete === 'function') {
      onDelete({
        files: files.filter(item => item.progress >= 100 && !item.canceled && !item.error),
      });
    }
  };

  private onClear = (uploaderId: string) => {
    const { files: currentFiles } = this.state;
    const newFiles = currentFiles.filter(item => item.uploaderId !== uploaderId);
    const oldFiles = currentFiles.filter(item => item.uploaderId === uploaderId);

    this.setState(
      {
        files: newFiles,
      },
      () => {
        this.onCancel({
          files: oldFiles,
        });
      },
    );
  };

  private closeUploader = () => {
    const { onClose } = this.props;

    if (typeof onClose === 'function') {
      onClose();
    }

    this.setState({
      ...initialState,
    });
  };

  private hideDetails = () => {
    this.setState({
      showDetails: false,
    });
  };

  private showDetails = () => {
    this.setState({
      showDetails: true,
    });
  };

  render() {
    const { events, onCancel, onClose, onDelete, onUpload, ...props } = this.props;
    const { showDetails, showUploader, files } = this.state;
    const inprogressFiles = files.filter(item => !(item.canceled || item.error)).map(item => item.progress);
    const errorFiles = files.filter(item => item.canceled || item.error);
    const totalProgress =
      inprogressFiles.length > 0 ? inprogressFiles.reduce((acc, curr) => acc + curr, 0) / inprogressFiles.length : 100;
    const scanning = files.filter(item => item.scanning && !item.canceled).length > 0;
    const show = showUploader && files.length > 0;

    return (
      show && (
        <>
          <UploaderProgressDetails
            {...props}
            open={showDetails}
            files={files}
            onCancel={this.onCancel}
            onDelete={this.onDelete}
            onHide={this.hideDetails}
            progressValue={totalProgress}
          />
          {!showDetails && (
            <StyledUploaderHost>
              <UploaderProgressBar
                {...props}
                scanning={scanning}
                progressValue={totalProgress}
                inProgress={inprogressFiles.length}
                errors={errorFiles.length}
                total={files.length}
                onShow={this.showDetails}
                onClose={this.closeUploader}
              />
            </StyledUploaderHost>
          )}
        </>
      )
    );
  }
}
