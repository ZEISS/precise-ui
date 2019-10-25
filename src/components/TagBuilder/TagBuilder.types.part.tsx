import { LabeledInputProps, InputChangeEvent } from '../../common';

/**
 * Event for tracking user input.
 */
export interface TagBuilderKeyboardChangeEvent {
  /**
   * Input key.
   */
  key: string;
  /**
   * Input key code.
   */
  keyCode: number;
}

/**
 * Event for custom tag renderer.
 */
export interface TagBuilderRenderEvent {
  /**
   * Rendered item data.
   */
  item: string;
  /**
   * Rendered card index.
   */
  index: number;
  /**
   * List of data tags.
   */
  tags: Array<string>;
}

export interface TagBuilderProps extends LabeledInputProps<Array<string>> {
  /**
   * Removes the border of the tag builder.
   * @default false
   */
  borderless?: boolean;
  /**
   * Event fired allowing user to control tag adding process.
   */
  shouldFinishTag?(e: TagBuilderKeyboardChangeEvent): boolean;
  /**
   * Custom tag renderer for the component.
   */
  tagRenderer?(e: TagBuilderRenderEvent): React.ReactChild;
  /**
   * The event fires on an attempt of tag removing.
   * @ignore
   */
  onBeforeTagRemove?(index: number): void;
  /**
   * Input value.
   * @ignore
   */
  inputValue?: string;
  /**
   * @ignore
   */
  inputRef?(instance: HTMLElement | null): void;
  /**
   * If set, the current input value will be added as a tag on blur.
   */
  appendTagOnBlur?: boolean;
}
