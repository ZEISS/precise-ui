export interface FileBase {
  /**
   * Name of the file.
   */
  name: string;
  /**
   * Gives the file unique identifier.
   */
  fileId: string;
  /**
   * Yields the content-type of the file.
   */
  type: string;
  /**
   * Gives the uploader component unique identifier.
   */
  uploaderId: string;
  /**
   * Timestamp when user selected a file.
   */
  timestamp: Date;
  /**
   * Additional arbitrary data associated with the file.
   */
  data: any;
}

export interface FileItem extends FileBase {
  /**
   * Selected file.
   */
  content: File;
}

export interface FileProgress extends FileBase {
  /**
   * Progress value of uploading file.
   */
  progress: number;
  /**
   * Indicates file upload cancelation.
   */
  canceled: boolean;
  /**
   * Indicates file upload deletion.
   */
  deleted: boolean;
  /**
   * Error message in case of file upload failure.
   */
  error?: string;
  /**
   * Indicates file upload virus scanning.
   */
  scanning: boolean;
}

export type ProgressStatus = 'progress' | 'scanning' | 'error' | 'success' | 'canceled';

export const FileUploadActions = {
  startUpload: 'uploader/start_upload',
  cancelUpload: 'uploader/cancel_upload',
  showUploads: 'uploader/show_uploads',
  clearUploads: 'uploader/clear_uploads',
  deleteUploads: 'uploader/delete_uploads',
  uploadProgress: 'uploader/upload_progress',
  uploadSuccess: 'uploader/upload_success',
  uploadFailure: 'uploader/upload_failure',
};

export interface FileUploaderDetailsEvent<T> {
  /**
   * Files passed on emitted events.
   */
  files: Array<T>;
}
