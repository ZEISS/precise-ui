import { LabeledInputProps, InputChangeEvent } from '../../common';

export interface AutocompleteTagBuilderAutosuggestItem {
  key: string;
  content?: React.ReactChild;
}

export interface AutocompleteTagBuilderProps<T> extends LabeledInputProps<Array<T>> {
  /**
   * The optional message to show in case tehre are no suggestions to display.
   */
  noSuggestionsMessage?: React.ReactChild;
  /**
   * The list of suggestions.
   */
  suggestions?: Array<T>;
  /**
   * How to render each suggestion in the InteractiveList.
   */
  renderSuggestion?(data: T): AutocompleteTagBuilderAutosuggestItem;
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
  onInputChange?(event: InputChangeEvent<string>): void;
  /**
   * The current value of the text field.
   */
  inputValue?: string;
  /**
   * The debounce time in milliseconds for the on input change event.
   * @default 0
   */
  delay?: number;
  /**
   * @ignore
   */
  inputRef?(instance: HTMLElement | null): void;
}

export interface AutocompleteTagBuilderState<T> {
  value: Array<T>;
  inputValue: string;
  controlled: boolean;
}
