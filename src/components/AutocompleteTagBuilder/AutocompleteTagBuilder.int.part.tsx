import * as React from 'react';
import memoize from 'memoize-one';
import { FormContextProps } from '../../hoc/withFormContext';
import { InputChangeEvent } from '../../common';
import { AutocompleteTagBuilderProps, AutocompleteTagBuilderState } from './AutocompleteTagBuilder.types.part';
import { debounce } from '../../utils';
import { TagBuilder } from '../TagBuilder';
import { Autocomplete, AutocompleteInputProps, AutosuggestSelectEvent } from '../Autocomplete';

export class AutocompleteTagBuilderInt<T> extends React.Component<
  AutocompleteTagBuilderProps<T> & FormContextProps,
  AutocompleteTagBuilderState<T>
> {
  private _fireOnInputChange: (q: string) => void;
  private _inputNode: HTMLElement | null;

  public constructor(props: AutocompleteTagBuilderProps<T>) {
    super(props);

    const { value: nullableValue, defaultValue, onInputChange, inputValue, delay = 0 } = this.props;
    const value = nullableValue || defaultValue || [];

    this.state = {
      value: value,
      inputValue: inputValue || '',
      controlled: props.value !== undefined || inputValue !== undefined,
    };

    this._fireOnInputChange = debounce((value: string) => {
      onInputChange && onInputChange({ value });
    }, delay);
  }

  public componentWillReceiveProps(nextProps: AutocompleteTagBuilderProps<T>) {
    if (this.state.controlled) {
      const { value, inputValue } = nextProps;
      this.setState({
        value: value || [],
        inputValue: inputValue || '',
      });
    }
  }

  public componentDidMount() {
    const { form } = this.props;
    const { controlled } = this.state;
    if (!controlled && form) {
      form.subscribe(this);
    }
  }

  public componentWillUnmount() {
    const { form } = this.props;
    const { controlled } = this.state;

    if (!controlled && form) {
      form.unsubscribe(this);
    }
  }

  private addSuggestion(suggestion: T) {
    const { value } = this.state;
    const key = this.getSuggestionKey(suggestion);

    const suggestionAlreadyAdded = value.some(x => this.getSuggestionKey(x) === key);
    if (!suggestionAlreadyAdded) {
      const newValue = [...value];
      newValue.push(suggestion);
      this.updateValue(newValue);
    }

    this.changeInputValue('');
  }

  private removeValueByIndex = (index: number) => {
    const { value } = this.state;
    const keys = Array.from(value.keys());
    index = index >= 0 ? index : keys.length + index;

    if (index >= 0 && index < keys.length) {
      value.splice(index, 1);
      const newValue = [...value];
      this.updateValue(newValue);
    }
  };

  private updateValue(newValue: Array<T>) {
    const { onChange, name = '', form } = this.props;

    if (!this.state.controlled) {
      if (form) {
        form.change({
          name,
          value: newValue,
        });
      } else {
        this.setState({
          value: newValue,
        });
      }
    }

    if (this._inputNode) {
      this._inputNode.focus();
    }
    if (typeof onChange === 'function') {
      onChange({ value: newValue });
    }
  }

  private changeInputValue(newValue: string) {
    if (!this.state.controlled) {
      this.setState({
        inputValue: newValue,
      });
    }

    this._fireOnInputChange(newValue);
  }

  private getSuggestionValue(item: T) {
    const { getSuggestionValue } = this.props;
    if (typeof item === 'string') {
      return item;
    } else if (typeof getSuggestionValue === 'function') {
      return getSuggestionValue(item);
    } else {
      throw new Error('Get suggestion value should be specified');
    }
  }

  private getSuggestionKey(item: T) {
    const { getSuggestionKey } = this.props;

    if (typeof item === 'string') {
      return item;
    } else if (typeof getSuggestionKey === 'function') {
      return getSuggestionKey(item);
    } else {
      throw new Error('Get suggestion key should be specified');
    }
  }

  private getTagsArray = memoize((value: Array<T>) => {
    return value.map(x => this.getSuggestionValue(x));
  });

  private defaultSuggestionRenderer(suggestion: T) {
    return {
      content: this.getSuggestionValue(suggestion),
      key: this.getSuggestionKey(suggestion),
    };
  }

  private tagRemoveHandler = (index: number) => {
    this.removeValueByIndex(index);
  };

  private suggestionSelectedHandler = (e: AutosuggestSelectEvent<T>) => {
    this.addSuggestion(e.value);
  };

  private inputChangeHandler = (e: InputChangeEvent<string>) => {
    this.changeInputValue(e.value);
  };

  private inputRefHandler = (node: HTMLElement | null) => {
    this._inputNode = node;
  };

  private tagBuilderRenderer = (inputProps: AutocompleteInputProps) => {
    const { disabled, tagRenderer, borderless = false } = this.props;
    const { value } = this.state;
    const { onChange, value: inputValue, ...restProps } = inputProps;

    const tagBuilderValue = this.getTagsArray(value);

    return (
      <TagBuilder
        {...restProps}
        disabled={disabled}
        inputValue={inputValue}
        onInput={onChange}
        value={tagBuilderValue}
        tagRenderer={tagRenderer}
        borderless={borderless}
        onBeforeTagRemove={this.tagRemoveHandler}
      />
    );
  };

  public render() {
    const {
      suggestions = [],
      noSuggestionsMessage,
      disabled,
      renderSuggestion = (item: T) => this.defaultSuggestionRenderer(item),
      label,
      placeholder,
      info,
      borderless = false,
      error,
    } = this.props;

    const { inputValue } = this.state;

    return (
      <Autocomplete
        noSuggestionsMessage={noSuggestionsMessage}
        suggestions={suggestions}
        inputRenderer={this.tagBuilderRenderer}
        renderSuggestion={renderSuggestion}
        disabled={disabled}
        value={inputValue}
        onChange={this.inputChangeHandler}
        onSuggestionSelected={this.suggestionSelectedHandler}
        inputRef={this.inputRefHandler}
        label={label}
        placeholder={placeholder}
        info={info}
        error={error}
        borderless={borderless}
      />
    );
  }
}
