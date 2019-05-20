import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { FormContextProps } from '../../hoc/withFormContext';
import { InteractiveListWrapperProps, InteractiveListDirection } from '../InteractiveList';
import { InputChangeEvent } from '../../common';
import { AutoTagBuilderProps, AutoTagBuilderState } from './AutoTagBuilder.types.part';
import { debounce } from '../../utils';
import { TagBuilder } from '../TagBuilder';
import { Autocomplete, AutocompleteInputProps, AutosuggestSelectEvent } from '../Autocomplete';

interface StyledAutoTagBuilderWrapperProps {
  direction: InteractiveListDirection;
}

const StyledAutoTagBuilderWrapper = styled.ul<StyledAutoTagBuilderWrapperProps>(
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

// tslint:disable-next-line
const NotOpenComponent = null;

const InteractiveListWrapper: React.SFC<InteractiveListWrapperProps> = ({ border: _0, open, ...props }) =>
  open ? <StyledAutoTagBuilderWrapper {...props} /> : NotOpenComponent;
InteractiveListWrapper.displayName = 'InteractiveListWrapper';

export class AutoTagBuilderInt<T> extends React.Component<
  AutoTagBuilderProps<T> & FormContextProps,
  AutoTagBuilderState<T>
> {
  private _fireOnInputChange: (q: string) => void;
  private _enableInputChange: boolean;
  private _inputNode: HTMLElement | null;

  public constructor(props: AutoTagBuilderProps<T>) {
    super(props);

    const { value: nullableValue, defaultValue, onInputChange, delay = 0 } = this.props;
    const value = nullableValue || defaultValue || [];
    const valueMap = this.mapItemArray(value);

    this.state = {
      value: valueMap,
      tagValue: value.map(x => this.getSuggestionValue(x)),
      inputValue: '',
      open: false,
      listFocused: false,
      focused: false,
      controlled: props.value !== undefined,
    };

    if (typeof onInputChange === 'function') {
      this._enableInputChange = true;

      this._fireOnInputChange = debounce((value: string) => {
        onInputChange({ value });
      }, delay);
    }
  }

  public componentWillReceiveProps(nextProps: AutoTagBuilderProps<T>) {
    if (this.state.controlled) {
      const valueMap = this.mapItemArray(nextProps.value);
      this.setState({
        value: valueMap,
        tagValue: Array.from(valueMap.values()).map(x => this.getSuggestionValue(x)),
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

    if (!value.has(key)) {
      const newValue = new Map(value);
      newValue.set(key, suggestion);
      this.updateValue(newValue);

      this.changeInputValue('');
    }
  }

  private removeValueByIndex = (index: number) => {
    const { value } = this.state;
    const keys = Array.from(value.keys());
    index = index >= 0 ? index : keys.length + index;

    if (index >= 0 && index < keys.length) {
      const key = keys[index];
      const newValue = new Map(value);
      newValue.delete(key);
      this.updateValue(newValue);
    }
  };

  private updateValue(value: Map<string, T>) {
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
          tagValue: Array.from(value.values()).map(x => this.getSuggestionValue(x)),
        });
      }
    }

    if (this._inputNode) {
      this._inputNode.focus();
    }
    if (typeof onChange === 'function') {
      onChange({ value: Array.from(value.values()) });
    }
  }

  private changeInputValue(newValue: string) {
    if (this._enableInputChange) {
      this.setState({
        inputValue: newValue,
      });

      this._fireOnInputChange(newValue);
    }
  }

  private mapItemArray(value?: Array<T>): Map<string, T> {
    const valueMap = new Map();

    value &&
      value.forEach(x => {
        const key = this.getSuggestionKey(x);
        valueMap.set(key, x);
      });

    return valueMap;
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
    const { disabled } = this.props;
    const { tagValue } = this.state;
    const { onChange, value: inputValue, ...restProps } = inputProps;

    return (
      <TagBuilder
        {...restProps}
        value={tagValue}
        disabled={disabled}
        inputValue={inputValue}
        onInput={onChange}
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
      />
    );
  }
}
