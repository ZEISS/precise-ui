import { IconName } from '../Icon';
import { FileProgress, ProgressStatus } from './FileUploaderDetails.types.part';
import { setLabels } from '../../utils/labels';

export function mergeData(newData: Array<FileProgress>, currentData: Array<FileProgress>): Array<FileProgress> {
  const all = {};

  for (const file of currentData) {
    all[file.fileId] = file;
  }

  for (const file of newData) {
    if (file.deleted) {
      delete all[file.fileId];
    } else if (!file.canceled || all[file.fileId]) {
      all[file.fileId] = file;
    }
  }

  return Object.keys(all).map(key => all[key]);
}

export const iconNames: { [x: string]: IconName } = {
  error: 'Error',
  canceled: 'Error',
  progress: 'Sync',
  scanning: 'Sync',
  success: 'CheckCircle',
};

setLabels({
  tableHeaderFileLabel: 'File',
  tableHeaderStatusLabel: 'Status',
  errorTableUploadLabel: 'Upload failed',
  canceledTableUploadLabel: 'Upload canceled',
  progressTableUploadLabel: 'Uploading...',
  successTableUploadLabel: 'Upload successful',
  scanningTableUploadLabel: 'Scanning for viruses...',
  uploadModalTitleLabel: 'Upload Details',
  uploadProgressLabel: 'Uploading...',
  uploadSuccessLabel: 'Upload successful',
  uploadErrorLabel: 'Upload not successful',
  uploadScanningLabel: 'Scanning for viruses',
  viewDetailsLabel: 'View Details',
  itemPluralLabel: 'Files',
  itemSingularLabel: 'File',
  cancelAllLabel: 'Cancel all uploads',
});

export function getStatus(file: FileProgress): ProgressStatus {
  if (file.error) {
    return 'error';
  } else if (file.canceled || file.deleted) {
    return 'canceled';
  } else if (file.progress < 100) {
    return 'progress';
  } else if (file.scanning) {
    return 'scanning';
  }

  return 'success';
}
