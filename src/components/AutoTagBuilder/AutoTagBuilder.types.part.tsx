import { LabeledInputProps } from '../../common';

export interface AutoTagBuilderAutosuggestItem {
  key: string;
  content?: React.ReactChild;
}

export interface AutoTagBuilderProps<T> extends LabeledInputProps<Array<T>> {
  /**
   * The optional message to show in case tehre are no suggestions to display.
   */
  noSuggestionsMessage?: React.ReactChild;
  /**
   * The current value of the text field, leading to a controlled text field.
   */
  suggestions?: Array<T>;
  /**
   * How to render each suggestion in the InteractiveList.
   */
  renderSuggestion?(data: T): AutoTagBuilderAutosuggestItem;
  /**
   * Gets the suggestion value.
   */
  getSuggestionKey?(item: T): string;
  /**
   * Gets the suggestion key.
   */
  getSuggestionValue?(item: T): string;
  /**
   After the input change.
   */
  onInputChange?(query: string): void;
  /**
   * @ignore
   */
  inputRef?(instance: HTMLElement | null): void;
}

export interface AutoTagBuilderState<T> {
  listFocused: boolean;
  focused: boolean;
  open: boolean;
  value: Map<string, T>;
  inputValue: string;
  controlled: boolean;
}
