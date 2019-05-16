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
   * Input value.
   */
  inputValue?: string;
  /**
   * The event fires on an attempt of adding value to the input field.
   */
  onInputValueChange?(e: InputChangeEvent<string>): void;
  /**
   * The event fires on an attempt of tag removing.
   */
  onBeforeTagRemove?(index: number): void;
  /**
   * @ignore
   */
  inputRef?(instance: HTMLElement | null): void;
}
