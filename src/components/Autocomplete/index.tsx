import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { TextField, TextFieldProps, TextFieldChangeEvent } from '../TextField';
import { FormContextProps, withFormContext } from '../../hoc/withFormContext';
import {
  InteractiveList,
  InteractiveListWrapperProps,
  InteractiveListDirection,
  InteractiveListChangeEvent,
} from '../InteractiveList';
import { KeyCodes } from '../../utils/keyCodes';
import { InputChangeEvent, Omit } from '../../common';

export interface AutosuggestItem {
  key: string;
  content?: React.ReactChild;
}

export interface AutosuggestSelectEvent<T> {
  value: T;
}

export interface AutocompleteInputProps {
  onChange(e: InputChangeEvent<string>): void;
  clearable: boolean;
  inputRef?(instance: HTMLElement | null): void;
  value: string;
  error: any;
  [index: string]: any;
}

export interface AutocompleteProps<T> extends TextFieldProps {
  /**
   * The optional message to show in case tehre are no suggestions to display.
   */
  noSuggestionsMessage?: React.ReactChild;
  /**
   * The current value of the text field, leading to a controlled text field.
   */
  suggestions?: Array<T>;
  /**
   * How to render each suggestion in the InteractiveList
   */
  renderSuggestion?(data: T): AutosuggestItem;
  /**
   * Event emitted every time suggestion is selected via mouse or keyboard.
   */
  onSuggestionSelected?(e: AutosuggestSelectEvent<T>): void;
  /**
   * Gets the suggestion value.
   */
  getSuggestionValue?(item: T): string;
  /**
   * The renderer of input field.
   */
  inputRenderer?(props: AutocompleteInputProps): JSX.Element;
  /**
   * Always `true` on Autocomplete components.
   * @ignore
   */
  clearable?: boolean;
  /**
   * @ignore
   */
  inputRef?(instance: HTMLElement | null): void;
}

export type SupportedAutocompleteProps<T> = Omit<AutocompleteProps<T>, 'clearable'>;

export interface AutocompleteState {
  controlled: boolean;
  listFocus: boolean;
  focus: boolean;
  open: boolean;
  value: string;
  error?: React.ReactChild;
}

const AutocompleteWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInteractiveList = styled(InteractiveList)`
  position: static;
`;

interface StyledAutosuggestWrapperProps {
  direction: InteractiveListDirection;
}

const StyledAutosuggestWrapper = styled.ul<StyledAutosuggestWrapperProps>(
  themed(
    ({ direction, theme: { ui1, ui4 } }) => css`
      list-style: none;
      width: 100%;
      box-sizing: border-box;
      box-shadow: none;
      margin: 0;
      padding: 0;
      background: ${ui1};
      border: 1px solid ${ui4};
      ${direction === InteractiveListDirection.normal
        ? 'border-top-color: transparent'
        : 'border-bottom-color: transparent'};
      max-height: 50vh;
      position: absolute;
      top: ${direction === InteractiveListDirection.normal ? '100%' : '0px'};
      transform: translateY(${direction === InteractiveListDirection.normal ? 0 : -100}%);
      overflow-y: auto;
      z-index: 100;
    `,
  ),
);

function defaultSuggestionRenderer<T>(suggestion: T): AutosuggestItem {
  const value = String(suggestion);
  return {
    content: value,
    key: value,
  };
}

function defaultInputRenderer(props: AutocompleteInputProps): JSX.Element {
  return <TextField {...props} />;
}

const NotOpenComponent = <></>;

const AutosuggestWrapper: React.FC<InteractiveListWrapperProps> = ({ border: _0, open, ...props }) =>
  open ? <StyledAutosuggestWrapper {...props} /> : NotOpenComponent;
AutosuggestWrapper.displayName = 'AutosuggestWrapper';

class AutocompleteInt<T> extends React.Component<SupportedAutocompleteProps<T> & FormContextProps, AutocompleteState> {
  private delayedBlur: number;
  private _element: HTMLElement | null;

  constructor(props: AutocompleteProps<T>) {
    super(props);
    this.state = {
      controlled: props.value !== undefined,
      value: props.value || props.defaultValue || '',
      open: false,
      listFocus: false,
      focus: false,
      error: props.error,
    };
  }

  componentWillReceiveProps({ value = '', error }: AutocompleteProps<T>) {
    if (this.state.controlled) {
      this.setState({ value });
    }
    this.setState({ error });
  }

  componentDidMount() {
    const { form } = this.props;
    const { controlled } = this.state;

    if (!controlled && form) {
      form.subscribe(this);
    }
  }

  componentWillUnmount() {
    const { form } = this.props;
    const { controlled } = this.state;

    if (!controlled && form) {
      form.unsubscribe(this);
    }
  }

  private updateValue(value: string, suggestionSelected: boolean = false) {
    const { onChange, name = '', form } = this.props;

    if (!this.state.controlled) {
      form ? form.change({ name, value }) : this.setState({ value });
    }

    suggestionSelected ? this.hide() : this.show();
    typeof onChange === 'function' && onChange({ value });
  }

  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const { keyCode } = e;

    switch (keyCode) {
      case KeyCodes.down:
      case KeyCodes.up:
        e.preventDefault();
        const { open } = this.state;
        open &&
          this.setState(() => ({
            listFocus: true,
            focus: false,
          }));
        break;
    }
  };

  private handleListChange = (e: InteractiveListChangeEvent) => {
    const { suggestions = [] } = this.props;
    const index = e.value[0];
    const suggestion = suggestions[index];
    this.handle(suggestion);
  };

  private handle(suggestion: T) {
    const { getSuggestionValue, onSuggestionSelected } = this.props;

    if (typeof getSuggestionValue === 'function') {
      const value = getSuggestionValue(suggestion);
      this.updateValue(value, true);
    } else if (typeof suggestion === 'string') {
      this.updateValue(suggestion, true);
    }

    typeof onSuggestionSelected === 'function' && onSuggestionSelected({ value: suggestion });
  }

  private show = () => {
    this.setState({ open: true });
  };

  private hide = () => {
    this.setState(() => ({ open: false }), this.props.onBlur);
  };

  private handleFocus = () => {
    const { onFocus } = this.props;
    cancelAnimationFrame(this.delayedBlur);

    this.show();
    this.setState(() => ({ focus: true, listFocus: false }));

    typeof onFocus === 'function' && onFocus();
  };

  private handleBlur = () => {
    cancelAnimationFrame(this.delayedBlur);

    this.delayedBlur = requestAnimationFrame(() => {
      this.setState(
        () => ({
          focus: false,
          listFocus: false,
        }),
        this.hide,
      );
    });
  };

  private changed = (e: TextFieldChangeEvent) => {
    this.updateValue(e.value);
  };

  private setNode = (node: HTMLElement | null) => {
    this._element = node;
    const { inputRef } = this.props;

    typeof inputRef === 'function' && inputRef(node);
  };

  render() {
    const {
      suggestions = [],
      noSuggestionsMessage,
      renderSuggestion = defaultSuggestionRenderer,
      inputRenderer = defaultInputRenderer,
      getSuggestionValue: _1,
      onChange: _2,
      children: _3,
      onBlur: _4,
      onFocus: _5,
      defaultValue: _6,
      inputRef: _7,
      onSuggestionSelected: _8,
      info,
      ...props
    } = this.props;
    const { open, listFocus, value, error } = this.state;
    const isListOpen = open && (!!suggestions.length || !!noSuggestionsMessage);
    return (
      <AutocompleteWrapper onKeyDown={this.handleKeyDown} onFocus={this.handleFocus} onBlur={this.handleBlur}>
        {inputRenderer({
          ...props,
          clearable: true,
          info: isListOpen ? undefined : info,
          onChange: this.changed,
          inputRef: this.setNode,
          value,
          error,
        })}
        <StyledInteractiveList
          data={
            suggestions.length ? suggestions.map(renderSuggestion) : [{ key: 'default', content: noSuggestionsMessage }]
          }
          disabled={suggestions.length === 0}
          customWrapper={AutosuggestWrapper}
          focus={listFocus}
          onChange={this.handleListChange}
          autoPosition
          open={isListOpen}
        />
        {isListOpen && info && <div>{info}</div>}
      </AutocompleteWrapper>
    );
  }
}

/**
 * Extends a TextField with autocompletion capabilities.
 */
export const Autocomplete = withFormContext(AutocompleteInt);
Autocomplete.displayName = 'Autocomplete';
