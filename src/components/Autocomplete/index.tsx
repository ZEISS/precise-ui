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

export interface AutosuggestItem {
  key: string;
  content?: React.ReactChild;
}

export interface AutosuggestSelectEvent<T> {
  value: T;
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
   * @ignore
   */
  inputRef?(instance: HTMLElement | null): void;
}

export interface AutocompleteState {
  controlled: boolean;
  listFocus: boolean;
  focus: boolean;
  open: boolean;
  value: string;
}

const AutocompleteWrapper = styled.div`
  position: relative;
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
      top: ${direction === InteractiveListDirection.normal ? '0' : '-100%'};
      transform: translateY(${direction === InteractiveListDirection.normal ? 0 : -100}%);
      overflow-y: auto;
      z-index: 100;
    `,
  ),
);

function defaultSuggestionRenderer<T>(suggestion: T): AutosuggestItem {
  const value = suggestion && suggestion.toString();
  return {
    content: value,
    key: value || '',
  };
}

// tslint:disable-next-line
const NotOpenComponent = null;

const AutosuggestWrapper: React.SFC<InteractiveListWrapperProps> = ({ border: _0, open, ...props }) =>
  open ? <StyledAutosuggestWrapper {...props} /> : NotOpenComponent;
AutosuggestWrapper.displayName = 'AutosuggestWrapper';

class AutocompleteInt<T> extends React.Component<AutocompleteProps<T> & FormContextProps, AutocompleteState> {
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
    };
  }

  componentWillReceiveProps(nextProps: AutocompleteProps<T>) {
    if (this.state.controlled) {
      this.setState({
        value: nextProps.value || '',
      });
    }
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
      if (form) {
        form.change({
          name,
          value,
        });
      } else {
        this.setState({
          value,
        });
      }
    }

    if (this._element) {
      this._element.focus();
    }

    suggestionSelected ? this.hide() : this.show();

    if (typeof onChange === 'function') {
      onChange({
        value,
      });
    }
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

    if (typeof onSuggestionSelected === 'function') {
      onSuggestionSelected({
        value: suggestion,
      });
    }
  }

  private show = () => {
    const { onFocus } = this.props;

    this.setState(
      () => ({
        open: true,
      }),
      onFocus,
    );
  };

  private hide = () => {
    const { onBlur } = this.props;

    this.setState(
      () => ({
        open: false,
      }),
      onBlur,
    );
  };

  private handleFocus = () => {
    cancelAnimationFrame(this.delayedBlur);
    this.show();
    this.setState(() => ({
      focus: true,
      listFocus: false,
    }));
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
  };

  render() {
    const {
      suggestions = [],
      noSuggestionsMessage,
      renderSuggestion = defaultSuggestionRenderer,
      getSuggestionValue: _1,
      onChange: _2,
      children: _3,
      onBlur: _4,
      onFocus: _5,
      defaultValue: _6,
      inputRef: _7,
      ...props
    } = this.props;
    const { open, listFocus, value } = this.state;

    return (
      <div onKeyDown={this.handleKeyDown} onFocus={this.handleFocus} onBlur={this.handleBlur}>
        <AutocompleteWrapper>
          <TextField onChange={this.changed} clearable value={value} inputRef={this.setNode} {...props} />
          {open &&
            (suggestions.length || noSuggestionsMessage ? (
              <InteractiveList
                data={
                  suggestions.length
                    ? suggestions.map(renderSuggestion)
                    : [{ key: 'default', content: noSuggestionsMessage }]
                }
                disabled={suggestions.length === 0}
                customWrapper={AutosuggestWrapper}
                focus={listFocus}
                onChange={this.handleListChange}
                autoPosition
                open
              />
            ) : (
              undefined
            ))}
        </AutocompleteWrapper>
      </div>
    );
  }
}

/**
 * Extends a TextField with autocompletion capabilities.
 */
export const Autocomplete = withFormContext(AutocompleteInt);
Autocomplete.displayName = 'Autocomplete';
