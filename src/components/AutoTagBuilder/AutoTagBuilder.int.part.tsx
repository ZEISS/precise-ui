import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { FormContextProps, withFormContext } from '../../hoc/withFormContext';
import {
  InteractiveList,
  InteractiveListWrapperProps,
  InteractiveListDirection,
  InteractiveListChangeEvent,
} from '../InteractiveList';
import { KeyCodes } from '../../utils/keyCodes';
import { PreciseTheme } from '../../common';
import { StyledTagItem, StyledInputBox, StyledInputRow, getTextFieldBorderType, StyledInputProps } from '../../quarks';
import { distance } from '../../distance';
import { Icon } from '../Icon';
import { getFontStyle, getFontSize } from '../../textStyles';
import { InputIcon } from '../InputIcon';
import { showInputInfo } from '../../utils/input';
import { AutoTagBuilderProps, AutoTagBuilderState, AutoTagBuilderAutosuggestItem } from './AutoTagBuilder.types.part';
import { transparent, dark } from '../../colors';

function getContainerPadding(props: StyledTagsContainerProps) {
  const { labelShown } = props;
  return !labelShown ? `${distance.medium}` : `${distance.large} ${distance.medium} ${distance.small}`;
}

const InteractiveListContainer = styled.div`
  position: relative;
`;

const TagsInputContainer = styled.div``;

interface StyledTagsContainerProps {
  labelShown: boolean;
  tagRenderer: boolean;
}

const StyledTagsContainer = styled.div`
  padding: ${getContainerPadding};
  margin: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

interface StyledAutoTagBuilderWrapperProps {
  direction: InteractiveListDirection;
}

const StyledInput = styled('input')<StyledInputProps>`
  ${getFontSize('medium')}
  box-sizing: content-box;
  box-shadow: none;
  border: none;
  border-radius: 0;
  margin: 0;
  outline: none;
  outline-color: transparent !important;
  background: ${transparent};
  color: ${themed(({ disabled, theme }) => (disabled ? theme.textDisabled : dark))};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'auto')};
  font-family: inherit;
`;

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

const InputContainer = styled('div')`
  display: inline;
  padding-bottom: ${distance.small};
`;

const RestyledTagItem = styled(StyledTagItem)`
  margin: 0 ${distance.small} ${distance.small} 0;
`;

const StyledText = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

const StyledIcon = styled(Icon)`
  ${getFontStyle({ size: 'small' })}

  cursor: pointer;
  vertical-align: middle;
  color: ${themed(props => props.theme.ui5)};
  font-family: ${themed(props => props.theme.fontFamily)};
  margin-left: ${distance.small};
`;

interface CloseIconProps {
  onClick?(): void;
  theme?: PreciseTheme;
}

const CloseIcon: React.SFC<CloseIconProps> = ({ theme, onClick }) => (
  <StyledIcon theme={theme} name="Close" onClick={onClick} />
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
  private delayedBlur: number;
  private _element: HTMLElement | null;

  public constructor(props: AutoTagBuilderProps<T>) {
    super(props);
    const value = props.value || props.defaultValue || [];
    const valueMap = this.mapItemArray(value);

    this.state = {
      value: valueMap,
      inputValue: '',
      open: false,
      listFocused: false,
      focused: false,
      controlled: props.value !== undefined,
    };
  }

  public componentWillReceiveProps(nextProps: AutoTagBuilderProps<T>) {
    if (this.state.controlled) {
      const valueMap = this.mapItemArray(nextProps.value);
      this.setState({
        value: valueMap,
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

  private handleListChange = (e: InteractiveListChangeEvent) => {
    const { suggestions = [] } = this.props;
    const index = e.value[0];
    const suggestion = suggestions[index];
    this.addSuggestion(suggestion);
  };

  private addSuggestion(suggestion: T) {
    const { getSuggestionKey = (x: T) => String(x) } = this.props;
    const { value } = this.state;

    const key = getSuggestionKey(suggestion);

    if (!value.has(key)) {
      const newValue = new Map(value);
      newValue.set(key, suggestion);
      this.updateValue(newValue);
    }
  }

  private removeValue = (key: string) => {
    const { value } = this.state;
    if (value.has(key)) {
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
        });
      }
    }

    if (this._element) {
      this._element.focus();
    }

    if (typeof onChange === 'function') {
      onChange({ value: Array.from(value.values()) });
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

  private getSuggestionValue(item: T): string {
    const { getSuggestionValue } = this.props;
    return typeof getSuggestionValue === 'function' ? getSuggestionValue(item) : String(item);
  }

  private getSuggestionKey(item: T): string {
    const { getSuggestionKey } = this.props;
    return typeof getSuggestionKey === 'function' ? getSuggestionKey(item) : String(item);
  }

  private defaultSuggestionRenderer(suggestion: T): AutoTagBuilderAutosuggestItem {
    return {
      content: this.getSuggestionValue(suggestion),
      key: this.getSuggestionKey(suggestion),
    };
  }

  private tagRenderer = (item: T) => {
    const { theme, disabled } = this.props;
    const stringValue = this.getSuggestionValue(item);
    const key = this.getSuggestionKey(item);

    return (
      <RestyledTagItem theme={theme} key={key} onMouseDown={this.tagMouseDownHandler}>
        <StyledText>{stringValue}</StyledText>
        {!disabled && <CloseIcon theme={theme} onClick={() => this.removeValue(key)} />}
      </RestyledTagItem>
    );
  };

  private tagMouseDownHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const { keyCode } = e;

    switch (keyCode) {
      case KeyCodes.down:
      case KeyCodes.up:
        e.preventDefault();
        const { open } = this.state;
        open &&
          this.setState(() => ({
            listFocused: true,
            focused: false,
          }));
        break;
    }
  };

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
      focused: true,
      listFocused: true,
    }));
  };

  private handleBlur = () => {
    cancelAnimationFrame(this.delayedBlur);

    this.delayedBlur = requestAnimationFrame(() => {
      this.setState(
        () => ({
          focused: false,
          listFocused: false,
        }),
        this.hide,
      );
    });
  };

  private inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { onInputChange } = this.props;

    if (typeof onInputChange === 'function') {
      const newState = { ...this.state };
      newState.inputValue = e.target.value;
      this.setState(newState);
      onInputChange(newState.inputValue);
    }
  };

  private setContainer = (node: HTMLInputElement | null) => {
    this._element = node;
  };

  render() {
    const {
      suggestions = [],
      noSuggestionsMessage,
      disabled,
      renderSuggestion = (item: T) => this.defaultSuggestionRenderer(item),
    } = this.props;

    const { open, listFocused } = this.state;

    return (
      <div onKeyDown={this.handleKeyDown} onFocus={this.handleFocus} onBlur={this.handleBlur}>
        {this.renderTagsContainer()}
        <InteractiveListContainer>
          {open &&
            !disabled &&
            (suggestions.length || noSuggestionsMessage ? (
              <InteractiveList
                data={
                  suggestions.length
                    ? suggestions.map(renderSuggestion)
                    : [{ key: 'default', content: noSuggestionsMessage }]
                }
                disabled={suggestions.length === 0}
                customWrapper={InteractiveListWrapper}
                focus={listFocused}
                onChange={this.handleListChange}
                autoPosition
                open
              />
            ) : (
              undefined
            ))}
        </InteractiveListContainer>
      </div>
    );
  }

  renderTagsContainer() {
    const { error, info, disabled, theme, label, placeholder } = this.props;
    const { value, inputValue, focused } = this.state;
    const border = getTextFieldBorderType(false, !!error, focused);
    const children = new Array<React.ReactChild>();

    value.forEach(x => {
      children.push(this.tagRenderer(x));
    });

    const hasValue = !!inputValue || value.size > 0;

    children.splice(
      children.length,
      0,
      <InputContainer key="input">
        <StyledInput
          type="text"
          labelShown={!!label}
          theme={theme}
          disabled={disabled}
          value={inputValue}
          ref={this.setContainer}
          onChange={this.inputChangeHandler}
        />
      </InputContainer>,
    );

    return (
      <TagsInputContainer>
        <StyledInputBox border={border} disabled={disabled} focused={focused} hasValue={hasValue}>
          <StyledInputRow
            onClick={undefined}
            label={label}
            hasValue={hasValue}
            placeholder={placeholder}
            error={!!error}
            focused={focused}>
            <StyledTagsContainer labelShown={!!label} tagRenderer={true}>
              {children}
            </StyledTagsContainer>
          </StyledInputRow>
          <InputIcon disabled={disabled} theme={theme} error={error} hasValue={hasValue} />
        </StyledInputBox>
        {showInputInfo(error, info)}
      </TagsInputContainer>
    );
  }
}
