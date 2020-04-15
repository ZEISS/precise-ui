export interface PromptProps {
  /**
   * Determines if the prompt should be active. By default true.
   * @default true
   */
  when?: boolean;
  /**
   * Creates the message to show for the blocked route, if any.
   */
  message: string | PromptMessageCallback;
  /**
   * Additional options for Modal Dialog. If options are not passed, browser's system dialog is used
   */
  modalOptions?: PromptDefaultModalOptions;
}

export interface PromptBasicProps extends PromptProps {
  /**
   * `history` object of react-router
   */
  history?: PromptHistory;
  /**
   * Determines if the prompt should be active.
   */
  when: boolean;
}

export interface PromptModalProps extends Required<PromptProps> {
  /**
   * `history` object of react-router
   */
  history?: PromptHistory;
}

export interface PromptMessageCallback {
  (location: any): boolean | string;
}

export interface PromptLocation {
  pathname: string;
  search: string;
  hash: string;
}

export interface PromptHistory {
  location: PromptLocation;
  block: PromptHistoryBlockCallback;
  push(path: string, state?: any): void;
}

export interface PromptHistoryBlockCallback {
  (cb: (location: Location) => any): PromptCallback;
}

export interface PromptCallback {
  (): boolean | string;
}

export interface PromptDefaultModalOptions {
  /**
   * Title in the modal
   */
  title: string;
  /**
   * Text on confirm button
   */
  confirmText?: string;
  /**
   * Text on cancel button
   */
  cancelText?: string;
  /**
   * Callback called after user confirms
   */
  onConfirm(): void;
  /**
   * Callback called after user cancels
   */
  onCancel(): void;
}

export interface PromptDefaultModalProps extends PromptDefaultModalOptions {
  open: boolean;
  message: string | boolean;
}
