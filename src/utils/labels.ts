export type ComponentLabel = string | { (input: any): string };

interface Labels {
  [key: string]: ComponentLabel;
}

export interface UploadProgressDetailsLabels extends StatusTableLabels {
  /**
   * Optionally sets the label for the cancel all button.
   */
  cancelAllLabel?: ComponentLabel;
  /**
   * Optionally sets the labe for the title of the progress details modal.
   */
  uploadModalTitleLabel?: ComponentLabel;
}

export interface UploaderProgressBarLabels {
  /**
   * Optionally sets the label for showing multiple files in progress.
   */
  itemPluralLabel?: ComponentLabel;
  /**
   * Optionally sets the label for showing a single files in progress.
   */
  itemSingularLabel?: ComponentLabel;
  /**
   * Optionally sets the label for scanning.
   */
  uploadScanningLabel?: ComponentLabel;
  /**
   * Optionally sets the label for standard progress.
   */
  uploadProgressLabel?: ComponentLabel;
  /**
   * Optionally sets the label for a successful upload.
   */
  uploadSuccessLabel?: ComponentLabel;
  /**
   * Optionally sets the label for an upload error.
   */
  uploadErrorLabel?: ComponentLabel;
  /**
   * Optionally sets the label for the view details button.
   */
  viewDetailsLabel?: ComponentLabel;
}

export interface StatusTableLabels {
  /**
   * Optionally sets the label for the file column.
   */
  tableHeaderFileLabel?: ComponentLabel;
  /**
   * Optionally sets the label for the status column.
   */
  tableHeaderStatusLabel?: ComponentLabel;
  /**
   * Optionally sets the status for canceled in the table.
   */
  canceledTableUploadLabel?: ComponentLabel;
  /**
   * Optionally sets the status for scanning in the table.
   */
  scanningTableUploadLabel?: ComponentLabel;
  /**
   * Optionally sets the status for progress in the table.
   */
  progressTableUploadLabel?: ComponentLabel;
  /**
   * Optionally sets the status for success in the table.
   */
  successTableUploadLabel?: ComponentLabel;
  /**
   * Optionally sets the status for error in the table.
   */
  errorTableUploadLabel?: ComponentLabel;
}

export interface PaginationBarLabels {
  /**
   * The items per page label.
   * @default 'Items per page:'
   */
  itemsPerPageLabel?: ComponentLabel;
}

export interface AccordionCardLabels {
  /**
   * The label for opening details.
   */
  openLabel?: ComponentLabel;
  /**
   * The label for closing details.
   */
  closeLabel?: ComponentLabel;
}

export type LabelOverwrite = UploadProgressDetailsLabels &
  UploaderProgressBarLabels &
  PaginationBarLabels &
  AccordionCardLabels;

const defaultLabels: Labels = {};

export function setLabels(labels: LabelOverwrite) {
  Object.assign(defaultLabels, labels);
}

export function getLabel(key: string, args?: any) {
  const label = typeof defaultLabels[key] === 'function' ? (defaultLabels[key] as Function)(args) : defaultLabels[key];

  return (typeof label === 'string' && label) || '';
}

export function getPropLabel<TProps, TKey extends keyof TProps>(props: TProps, name: TKey & string, value?: any) {
  const label = typeof props[name] === 'function' ? (props[name] as any)(value) : props[name];

  if (typeof label === 'string' && label) {
    return label;
  }

  return getLabel(name);
}
