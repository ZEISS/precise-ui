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
  tableHeaderFile: 'File',
  tableHeaderStatus: 'Status',
  errorTableUpload: 'Upload failed',
  canceledTableUpload: 'Upload canceled',
  progressTableUpload: 'Uploading...',
  successTableUpload: 'Upload successful',
  scanningTableUpload: 'Scanning for viruses...',
  uploadModalTitle: 'Upload Details',
  uploadProgress: 'Uploading...',
  uploadSuccess: 'Upload successful',
  uploadError: 'Upload not successful',
  uploadScanning: 'Scanning for viruses',
  viewDetails: 'View Details',
  itemPlural: 'Files',
  itemSingular: 'File',
  cancelAll: 'Cancel all Uploads',
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
