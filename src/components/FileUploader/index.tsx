import * as React from 'react';
import { EventManager, eventManagers } from '../../utils/eventManager';
import { Dropzone, DropzoneOpenEvent, DropzoneChangeEvent } from '../Dropzone';
import { FileUploadActions, FileItem, FileProgress, FileUploaderDetailsEvent } from '../FileUploaderDetails';
import { generateId, getSimpleStatus } from './helpers';

export type UploadFileState = 'new' | 'active' | 'canceled' | 'complete';

export interface UploadFileStatus {
  /**
   * The id of the file for identification.
   */
  id: string;
  /**
   * The name of the file.
   */
  name: string;
  /**
   * The content-type of the file.
   */
  type: string;
  /**
   * The current progress of the file.
   */
  progress: number;
  /**
   * The current state of the file.
   */
  state: UploadFileState;
  /**
   * Arbitrary data associated with the file, which is set by the upload host.
   */
  data: any;
}

export interface FileUploaderChangeEvent {
  /**
   * The files that changed.
   */
  files: Array<UploadFileStatus>;
  /**
   * The total number of selected files.
   */
  total: number;
  /**
   * Status if the selected files are all uploaded and verified.
   */
  ready: boolean;
}

export interface FileUploaderProps {
  /**
   * Allow selecting multiple files.
   */
  multiple?: boolean;
  /**
   * Event emitted when file upload changes.
   */
  onChange?(e: FileUploaderChangeEvent): void;
  /**
   * Optionally uses an explicit upload data connector.
   */
  data?: UploadData;
  /**
   * Message for dragging files to show on drop area.
   * @default "Drop files here to upload"
   */
  message?: string;
}

export interface UploadFile {
  id: string;
  name: string;
  type: string;
  progress: number;
  data: any;
  added: Date;
  status: UploadFileState;
}

export type UploadDataEventType = 'change' | 'ready';

export interface UploadDataEventListener {
  (): void;
}

interface UploadDataNotification {
  type: UploadDataEventType;
  cb: UploadDataEventListener;
}

export class UploadData {
  readonly id: string;
  readonly events: EventManager;
  readonly files: Array<UploadFile>;
  private readonly notifications: Array<UploadDataNotification>;

  constructor(events?: EventManager) {
    this.id = generateId();
    this.events = events || eventManagers[0];
    this.files = [];
    this.notifications = [];
  }

  get completedFiles() {
    return this.files.filter(m => m.status === 'complete');
  }

  get ready() {
    return this.files.reduce((prev, curr) => prev && (curr.status === 'complete' || curr.status === 'canceled'), true);
  }

  get total() {
    return this.files.filter(file => file.status !== 'canceled').length;
  }

  commit(cb: (completedFiles: Array<UploadFile>) => void) {
    const handler = () => cb(this.completedFiles);

    if (this.ready) {
      handler();
    } else {
      this.once('ready', handler);
    }
  }

  once(type: UploadDataEventType, cb: UploadDataEventListener) {
    const handler = () => {
      this.off(type, handler);
      cb();
    };
    this.on(type, handler);
  }

  on(type: UploadDataEventType, cb: UploadDataEventListener) {
    if (this.notifications.length === 0) {
      this.connect();
    }

    this.notifications.push({ type, cb });
  }

  off(type: UploadDataEventType, cb: UploadDataEventListener) {
    for (let i = this.notifications.length; i--; ) {
      const notification = this.notifications[i];

      if (notification.type === type && notification.cb === cb) {
        this.notifications.splice(i, 1);
      }
    }

    if (this.notifications.length === 0) {
      this.disconnect();
    }
  }

  private connect() {
    const em = this.events;
    em.on(FileUploadActions.uploadProgress, this.filesChanged);
    em.on(FileUploadActions.uploadFailure, this.filesChanged);
    em.on(FileUploadActions.uploadSuccess, this.filesChanged);
  }

  private disconnect() {
    const em = this.events;
    em.off(FileUploadActions.uploadProgress, this.filesChanged);
    em.off(FileUploadActions.uploadFailure, this.filesChanged);
    em.off(FileUploadActions.uploadSuccess, this.filesChanged);
    em.emit(FileUploadActions.clearUploads, this.id);
  }

  private emit(type: UploadDataEventType) {
    for (const notification of this.notifications) {
      if (notification.type === type) {
        notification.cb();
      }
    }
  }

  private filesChanged = ({ files }: FileUploaderDetailsEvent<FileProgress>) => {
    const filteredFiles = files.filter(item => item.uploaderId === this.id);

    if (filteredFiles.length > 0) {
      const ids = filteredFiles.map(item => item.fileId);
      let changed = false;

      for (const file of this.files) {
        const index = ids.indexOf(file.id);

        if (index !== -1) {
          const updatedFile = filteredFiles[index];
          const updatedStatus = getSimpleStatus(updatedFile);
          const hasChanged =
            updatedFile.data !== file.data || updatedFile.progress !== file.progress || file.status !== updatedStatus;

          if (hasChanged) {
            changed = true;
            file.data = updatedFile.data;
            file.progress = updatedFile.progress;
            file.status = updatedStatus;
          }
        }
      }

      if (changed) {
        this.emit('change');

        if (this.ready) {
          this.emit('ready');
        }
      }
    }
  };

  push(files: Array<File>) {
    /**
     * TODO:
     * Update `FileSelect` component to assign generated id
     * to a file to enable multiple selection of the same file
     */
    const names = this.files.map(item => (item.status !== 'canceled' ? item.name : ''));
    const newUploadFiles: Array<FileItem> = [];

    for (const file of files) {
      if (names.indexOf(file.name) === -1) {
        const id = generateId();
        const added = new Date();
        const data = {};

        newUploadFiles.push({
          name: file.name,
          fileId: id,
          content: file,
          type: file.type,
          uploaderId: this.id,
          timestamp: added,
          data,
        });

        this.files.push({
          id,
          added,
          status: 'new',
          data,
          name: file.name,
          progress: 0,
          type: file.type,
        });
      }
    }

    if (newUploadFiles.length) {
      this.emit('change');
      this.events.emit(FileUploadActions.startUpload, { files: newUploadFiles });
    }
  }
}

/**
 * The file uploader component that passes selected files to global uploader. Should be used with `FileUploaderDetails` component.
 */
export class FileUploader extends React.Component<FileUploaderProps> {
  private readonly data: UploadData;

  constructor(props: FileUploaderProps) {
    super(props);
    const { data = new UploadData() } = props;
    this.data = data;
  }

  componentDidMount() {
    this.data.on('change', this.emitChange);
  }

  componentWillUnmount() {
    this.data.off('change', this.emitChange);
  }

  private emitChange = () => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      const { files, ready, total } = this.data;
      onChange({
        files: files.map<UploadFileStatus>(file => ({
          data: file.data,
          id: file.id,
          name: file.name,
          progress: file.progress,
          state: file.status,
          type: file.type,
        })),
        ready,
        total,
      });
    }
  };

  private filesAdded = (e: DropzoneChangeEvent) => {
    this.data.push(e.value);
  };

  private fileSelect = (e: DropzoneOpenEvent) => {
    const { multiple } = this.props;
    const { files, events } = this.data;

    if (!multiple && files.length === 1) {
      e.preventDefault();
      events.emit(FileUploadActions.showUploads, {});
    }
  };

  render() {
    const { multiple, message, children } = this.props;

    return (
      <Dropzone multiple={multiple} value={[]} onChange={this.filesAdded} onOpen={this.fileSelect} message={message}>
        {children}
      </Dropzone>
    );
  }
}
