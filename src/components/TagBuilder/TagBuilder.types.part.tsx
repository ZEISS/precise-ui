import { LabeledInputProps } from '../../common';

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
   * @ignore
   */
  children?: void;
  /**
   * Event fired allowing user to control tag adding process.
   */
  shouldFinishTag?(e: TagBuilderKeyboardChangeEvent): boolean;
  /**
   * Custom tag renderer for the component.
   */
  tagRenderer?(e: TagBuilderRenderEvent): React.ReactChild;
}
