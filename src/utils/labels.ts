interface Labels {
  [key: string]: string;
}

export interface UploadProgressDetailsLabels {
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

export interface UploaderProgressBarLabels {
  /**
   * Optionally sets the label for showing multiple files in progress.
   */
  itemPluralLabel?: string;
  /**
   * Optionally sets the label for showing a single files in progress.
   */
  itemSingularLabel?: string;
  /**
   * Optionally sets the label for scanning.
   */
  uploadScanningLabel?: string;
  /**
   * Optionally sets the label for standard progress.
   */
  uploadProgressLabel?: string;
  /**
   * Optionally sets the label for a successful upload.
   */
  uploadSuccessLabel?: string;
  /**
   * Optionally sets the label for an upload error.
   */
  uploadErrorLabel?: string;
  /**
   * Optionally sets the label for the view details button.
   */
  viewDetailsLabel?: string;
}

export interface PaginationBarLabels {
  /**
   * The items per page label.
   * @default 'Items per page:'
   */
  itemsPerPageLabel?: string;
}

export interface AccordionCardLabels {
  /**
   * The label for opening details.
   */
  openLabel?: string;
  /**
   * The label for closing details.
   */
  closeLabel?: string;
}

export type LabelOverwrite = UploadProgressDetailsLabels &
  UploaderProgressBarLabels &
  PaginationBarLabels &
  AccordionCardLabels;

const defaultLabels: Labels = {};

export function setLabels(labels: LabelOverwrite) {
  Object.assign(defaultLabels, labels);
}

export function getLabel(key: string) {
  return defaultLabels[key] || '';
}

export function getPropLabel<TProps, TKey extends keyof TProps>(
  props: TProps,
  name: TKey & string,
): Required<TProps>[TKey] | string {
  const value = props[name];

  if (value === undefined) {
    return getLabel(name);
  }

  return value;
}

export interface LabelInfo {
  type: 'info' | 'error';
  data: any;
}

export interface GetLabel {
  getLabel?(info: LabelInfo): string;
}

export function buildGetLabels<TProps extends GetLabel, TKey extends keyof TProps>(props: TProps) {
  const { getLabel } = props;
  return (info: ({ type: 'info' | 'error'; data: TKey & string }) | (TKey & string)) => {
    if (typeof info === 'string') {
      return (getLabel && getLabel({ type: 'info', data: info })) || getPropLabel(props, info) || info;
    }
    if (typeof info === 'object' && info.data) {
      return (getLabel && getLabel(info)) || getPropLabel(props, info.data) || info.data;
    }

    return '';
  };
}
