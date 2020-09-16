import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { PreciseTheme } from '../../common';
import { showInputInfo } from '../../utils/input';
import { KeyCodes } from '../../utils/keyCodes';
import { lowerize } from '../../utils/text';
import { Icon } from '../Icon';
import { InputIcon } from '../InputIcon';
import { transparent, dark, purpleRed } from '../../colors';
import { distance } from '../../distance';
import { FormContextProps, withFormContext } from '../../hoc/withFormContext';
import { TagBuilderRenderEvent, TagBuilderProps } from './TagBuilder.types.part';
import { StyledInputRow, StyledInputBox, getTextFieldBorderType, StyledTagItem } from '../../quarks';
import { getFontStyle, getFontSize } from '../../textStyles';

const finishTagKeys = [KeyCodes.enter, KeyCodes.space, KeyCodes.comma, KeyCodes.semicolon];

const StyledIcon = styled(Icon)`
  ${getFontStyle({ size: 'small' })}

  cursor: pointer;
  vertical-align: middle;
  color: ${themed(props => props.theme.ui5)};
  font-family: ${themed(props => props.theme.fontFamily)};
  margin-left: ${distance.small};
`;

const TagBuilderContainer = styled.div``;

interface StyledTagsContainerProps {
  labelShown: boolean;
  tagRenderer: boolean;
}

function getContainerPadding(props: StyledTagsContainerProps) {
  const { tagRenderer, labelShown } = props;

  if (!tagRenderer) {
    return !labelShown
      ? `${distance.medium} ${distance.medium} ${distance.small}`
      : `${distance.large} ${distance.medium} 0`;
  }

  return !labelShown ? `${distance.medium}` : `${distance.large} ${distance.medium} ${distance.small}`;
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

interface StyledInputProps {
  value: string;
  disabled?: boolean;
  theme: any;
  valid?: boolean;
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
  width: ${props => (props.value.length > 2 ? props.value.length * 10 + 'px' : '20px')};
  color: ${themed(({ disabled, theme, valid }) => (valid ? (disabled ? theme.textDisabled : dark) : purpleRed))};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'auto')};
  font-family: inherit;
`;

const RestyledTagItem = styled(StyledTagItem)`
  margin: 0 ${distance.small} ${distance.small} 0;
`;

interface InputContainerProps {
  tagRenderer: boolean;
}

const InputContainer = styled('div')<InputContainerProps>`
  display: inline;
  padding-bottom: ${({ tagRenderer }) => (!tagRenderer ? `${distance.small}` : '0')};
`;

const StyledText = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

interface CloseIconProps {
  onClick?(): void;
  onMouseDown?(event: React.MouseEvent): void;
  theme?: PreciseTheme;
}

const CloseIcon: React.SFC<CloseIconProps> = ({ theme, onClick, onMouseDown }) => (
  <StyledIcon theme={theme} name="Close" onClick={onClick} onMouseDown={onMouseDown} />
);

export interface TagBuilderState {
  inputValue: string;
  value: Array<string>;
  error?: React.ReactChild;
  focused: boolean;
  controlled: boolean;
  inputPosition?: number;
  valid?: boolean;
}

export class TagBuilderInt extends React.Component<TagBuilderProps & FormContextProps, TagBuilderState> {
  private _input: HTMLInputElement | null;

  constructor(props: TagBuilderProps) {
    super(props);
    const tags = (props.value || props.defaultValue || []).map(lowerize);

    this.state = {
      value: tags,
      inputValue: props.inputValue || '',
      controlled: props.value !== undefined || props.inputValue !== undefined,
      focused: false,
      valid: true,
      error: props.error,
    };
  }

  componentWillReceiveProps({ value, inputValue = '', error }: TagBuilderProps) {
    if (this.state.controlled && value !== undefined) {
      this.setState({
        value: [...value],
        inputValue: inputValue,
      });
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

  private fireBeforeTagRemoveEvent(index: number): void {
    const { onBeforeTagRemove } = this.props;

    if (typeof onBeforeTagRemove === 'function') {
      onBeforeTagRemove(index);
    }
  }

  private inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onInput } = this.props;
    const { controlled, value: prevTags } = this.state;
    const { value } = e.currentTarget;

    if (typeof onInput === 'function') {
      onInput({ value: value });
    }

    if (!controlled) {
      this.setState({ inputValue: value, valid: value.length > 0 ? prevTags.indexOf(value) === -1 : true });
    }
  };

  private keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { inputValue, controlled } = this.state;
    const { shouldFinishTag } = this.props;

    let isHandled = false;
    const handleKeyEvent = () => {
      e.stopPropagation();
      e.preventDefault();
      isHandled = true;
    };

    if (inputValue.length === 0) {
      switch (e.keyCode) {
        case KeyCodes.backspace:
          this.removePrevTag();
          handleKeyEvent();
          break;

        case KeyCodes.delete:
          this.removeNextTag();
          handleKeyEvent();
          break;
      }
    }

    if (!isHandled && !controlled) {
      if (typeof shouldFinishTag === 'function') {
        if (shouldFinishTag(e)) {
          this.addTag(inputValue);
          handleKeyEvent();
          return;
        }
      } else if (finishTagKeys.indexOf(e.keyCode) !== -1) {
        this.addTag(inputValue);
        handleKeyEvent();
      }

      if (inputValue.length === 0) {
        switch (e.keyCode) {
          case KeyCodes.end:
            this.inputMoveEnd();
            handleKeyEvent();
            break;

          case KeyCodes.home:
            this.inputMoveHome();
            handleKeyEvent();
            break;

          case KeyCodes.left:
            this.inputMoveLeft();
            handleKeyEvent();
            break;

          case KeyCodes.right:
            this.inputMoveRight();
            handleKeyEvent();
            break;
        }
      }
    }
  };

  private inputFocused = () => {
    const { onFocus } = this.props;

    this.setState(
      {
        focused: true,
      },
      onFocus,
    );
  };

  private inputBlurred = () => {
    const { onBlur, appendTagOnBlur } = this.props;
    if (!!appendTagOnBlur && !this.state.controlled) {
      const { inputValue } = this.state;
      if (inputValue) {
        this.addTag(inputValue);
      }
    }

    this.setState(
      {
        focused: false,
      },
      onBlur,
    );
  };

  private inputMoveLeft() {
    const { value } = this.state;
    const { inputPosition = value.length } = this.state;

    if (inputPosition > 0) {
      this.setState({ inputPosition: inputPosition - 1 });
    }
  }

  private inputMoveRight() {
    const { value, inputPosition } = this.state;

    if (inputPosition !== undefined && inputPosition < value.length) {
      this.setState({ inputPosition: inputPosition + 1 });
    }
  }

  private inputMoveEnd() {
    const { value } = this.state;
    this.setState({ inputPosition: value.length });
  }

  private inputMoveHome() {
    this.setState({ inputPosition: 0 });
  }

  private setFocus = () => {
    this._input && this._input.focus();
  };

  private addTag(inputValue: string) {
    const { value: prevTags, valid } = this.state;
    const { inputPosition = prevTags.length } = this.state;
    inputValue = inputValue.trim().toLowerCase();

    if (inputValue.length > 0 && valid) {
      const tags = [...prevTags];
      tags.splice(inputPosition, 0, inputValue);
      this.setState({ inputValue: '', inputPosition: inputPosition + 1 }, () => this.onChange(tags));
    }
  }

  private removePrevTag() {
    const { value: prevTags } = this.state;
    const { inputPosition = prevTags.length } = this.state;

    if (inputPosition > 0) {
      this.removeTag(inputPosition - 1);
      this.setState({ inputPosition: inputPosition - 1 });
    }
  }

  private removeNextTag() {
    const { value: prevTags, inputPosition } = this.state;

    if (inputPosition !== undefined && inputPosition < prevTags.length) {
      this.removeTag(inputPosition);
    }
  }

  private removeTag(index: number) {
    const { value: prevTags } = this.state;

    this.fireBeforeTagRemoveEvent(index);
    const tags = [...prevTags.slice(0, index), ...prevTags.slice(index + 1)];
    this.onChange(tags);
  }

  private onChange(value: Array<string>) {
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

    if (typeof onChange === 'function') {
      onChange({
        value,
      });
    }
  }

  private removeTagMouseDownHandler = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  private renderTag = (e: TagBuilderRenderEvent) => {
    const { theme, disabled } = this.props;

    return (
      <RestyledTagItem theme={theme} key={e.item + e.index}>
        <StyledText>{e.item}</StyledText>
        {!disabled && (
          <CloseIcon
            theme={theme}
            onMouseDown={this.removeTagMouseDownHandler}
            onClick={() => this.removeTag(e.index)}
          />
        )}
      </RestyledTagItem>
    );
  };

  private setContainer = (node: HTMLInputElement | null) => {
    this._input = node;

    const { inputRef } = this.props;
    if (typeof inputRef === 'function') {
      inputRef(node);
    }
  };

  render() {
    const { tagRenderer, info, disabled, borderless, theme, label, placeholder } = this.props;
    const { value, inputValue, focused, valid, error } = this.state;
    const { inputPosition = value.length } = this.state;
    const border = getTextFieldBorderType(borderless, !!error, focused);
    const renderer = tagRenderer || this.renderTag;
    const children = value.map((item, index) => renderer({ item, index, tags: value }));
    const hasValue = !!inputValue || value.length > 0;

    children.splice(
      inputPosition,
      0,
      <InputContainer key="input" onKeyDown={this.keyDownHandler} tagRenderer={!!tagRenderer}>
        <StyledInput
          theme={theme}
          disabled={disabled}
          ref={this.setContainer}
          type="text"
          value={inputValue}
          onChange={this.inputChanged}
          onFocus={this.inputFocused}
          onBlur={this.inputBlurred}
          valid={valid}
        />
      </InputContainer>,
    );

    return (
      <TagBuilderContainer>
        <StyledInputBox border={border} disabled={disabled} focused={focused} hasValue={hasValue}>
          <StyledInputRow
            onClick={this.setFocus}
            label={label}
            hasValue={hasValue}
            placeholder={placeholder}
            error={!!error}
            focused={focused}>
            <StyledTagsContainer labelShown={!!label} tagRenderer={!!tagRenderer}>
              {children}
            </StyledTagsContainer>
          </StyledInputRow>
          <InputIcon disabled={disabled} theme={theme} error={error} hasValue={hasValue} />
        </StyledInputBox>
        {showInputInfo(error, info)}
      </TagBuilderContainer>
    );
  }
}

export const TagBuilder = withFormContext(TagBuilderInt);
TagBuilder.displayName = 'TagBuilder';
