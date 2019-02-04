import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { PreciseTheme } from '../../common';
import { showInputInfo } from '../../utils/input';
import { KeyCodes } from '../../utils/keyCodes';
import { lowerize } from '../../utils/text';
import { Icon } from '../Icon';
import { InputIcon } from '../InputIcon';
import { transparent, dark } from '../../colors';
import { distance } from '../../distance';
import { FormContextProps, withFormContext } from '../../hoc/withFormContext';
import { TagBuilderRenderEvent, TagBuilderProps } from './TagBuilder.types.part';
import { StyledInputRow, StyledInputBox, getTextFieldBorderType, StyledTagItem } from '../../quarks';

const finishTagKeys = [KeyCodes.enter, KeyCodes.space, KeyCodes.comma, KeyCodes.semicolon];

const StyledIcon = styled(Icon)`
  cursor: pointer;
  font-size: 13px;
  vertical-align: middle;
  color: ${themed(props => props.theme.ui5)};
  font-family: ${themed(props => props.theme.fontFamily)};
  margin-left: ${distance.small};
`;

const TagBuilderContainer = styled.div``;

interface StyledTagsContainerProps {
  labelShown: boolean;
}

const StyledTagsContainer = styled.div`
  padding: ${(props: StyledTagsContainerProps) =>
    !props.labelShown ? `${distance.medium}` : `${distance.large} ${distance.medium} ${distance.small}`};
  margin: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

interface StyledInputProps {
  value: string;
  disabled?: boolean;
  theme: any;
}

const StyledInput = styled<StyledInputProps, 'input'>('input')`
  box-sizing: content-box;
  box-shadow: none;
  border: none;
  border-radius: 0;
  margin: 0;
  outline: none;
  outline-color: transparent !important;
  background: ${transparent};
  width: ${props => (props.value.length > 2 ? props.value.length * 10 + 'px' : '20px')};
  color: ${themed(props => (props.disabled ? props.theme.textDisabled : dark))};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'auto')};
  font-size: 1rem;
  font-family: inherit;
`;

const InputContainer = styled.div`
  display: inline;
`;

const StyledText = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

interface CloseIconProps {
  onClick?(): void;
  theme?: PreciseTheme;
}

const CloseIcon: React.SFC<CloseIconProps> = ({ theme, onClick }) => (
  <StyledIcon theme={theme} name="Close" onClick={onClick} />
);

export interface TagBuilderState {
  inputValue: string;
  value: Array<string>;
  focused: boolean;
  controlled: boolean;
  inputPosition?: number;
}

export class TagBuilderInt extends React.Component<TagBuilderProps & FormContextProps, TagBuilderState> {
  private input: HTMLInputElement | null;

  constructor(props: TagBuilderProps) {
    super(props);
    const tags = (props.value || props.defaultValue || []).map(lowerize);

    this.state = {
      inputValue: '',
      value: tags,
      controlled: props.value !== undefined,
      focused: false,
    };
  }

  componentWillReceiveProps(nextProps: TagBuilderProps) {
    const { value } = nextProps;
    const { controlled } = this.state;

    if (controlled && value !== undefined) {
      this.setState({
        value: [...value],
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

  private inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { controlled } = this.state;
    const { value } = e.currentTarget;

    if (!controlled) {
      this.setState({ inputValue: value });
    }
  };

  private onKeyInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { inputValue, controlled } = this.state;
    const { shouldFinishTag, onInput } = this.props;

    if (typeof onInput === 'function') {
      onInput();
    }

    if (!controlled) {
      if (typeof shouldFinishTag === 'function') {
        if (shouldFinishTag(e)) {
          this.addTag(inputValue);
          e.stopPropagation();
          e.preventDefault();
          return;
        }
      } else if (finishTagKeys.indexOf(e.keyCode) !== -1) {
        this.addTag(inputValue);
        e.stopPropagation();
        e.preventDefault();
      }

      if (inputValue.length === 0) {
        switch (e.keyCode) {
          case KeyCodes.end:
            this.inputMoveEnd();
            e.stopPropagation();
            e.preventDefault();
            break;

          case KeyCodes.home:
            this.inputMoveHome();
            e.stopPropagation();
            e.preventDefault();
            break;

          case KeyCodes.left:
            this.inputMoveLeft();
            break;

          case KeyCodes.right:
            this.inputMoveRight();
            break;

          case KeyCodes.backspace:
            this.removePrevTag();
            e.stopPropagation();
            e.preventDefault();
            break;

          case KeyCodes.delete:
            this.removeNextTag();
            e.stopPropagation();
            e.preventDefault();
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
    const { onBlur } = this.props;

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
    this.input && this.input.focus();
  };

  private addTag(inputValue: string) {
    const { value: prevTags } = this.state;
    const { inputPosition = prevTags.length } = this.state;
    inputValue = inputValue.trim().toLowerCase();

    if (inputValue.length > 0 && prevTags.indexOf(inputValue) === -1) {
      const tags = [...prevTags];
      tags.splice(inputPosition, 0, inputValue);
      this.setState({ inputValue: '', inputPosition: inputPosition + 1 }, () => this.onChange(tags));
    }
  }

  private removePrevTag() {
    const { value: prevTags } = this.state;
    const { inputPosition = prevTags.length } = this.state;

    if (inputPosition > 0) {
      const tags = [...prevTags];
      tags.splice(inputPosition - 1, 1);
      this.setState({ inputPosition: inputPosition - 1 }, () => this.onChange(tags));
    }
  }

  private removeNextTag() {
    const { value: prevTags, inputPosition } = this.state;

    if (inputPosition !== undefined && inputPosition < prevTags.length) {
      const tags = [...prevTags];
      tags.splice(inputPosition, 1);
      this.onChange(tags);
    }
  }

  private removeTag(index: number) {
    const { value: prevTags } = this.state;
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

  private renderTag = (e: TagBuilderRenderEvent) => {
    const { theme, disabled } = this.props;

    return (
      <StyledTagItem theme={theme} key={e.item + e.index}>
        <StyledText>{e.item}</StyledText>
        {!disabled && <CloseIcon theme={theme} onClick={() => this.removeTag(e.index)} />}
      </StyledTagItem>
    );
  };

  private setContainer = (node: HTMLInputElement | null) => {
    this.input = node;
  };

  render() {
    const { tagRenderer, error, info, disabled, borderless, theme, label, placeholder } = this.props;
    const { value, inputValue, focused } = this.state;
    const { inputPosition = value.length } = this.state;
    const border = getTextFieldBorderType(borderless, !!error, focused);
    const renderer = tagRenderer || this.renderTag;
    const children = value.map((item, index) => renderer({ item, index, tags: value }));
    const hasValue = !!inputValue || value.length > 0;

    children.splice(
      inputPosition,
      0,
      <InputContainer key="input" onKeyDown={this.onKeyInput}>
        <StyledInput
          theme={theme}
          disabled={disabled}
          innerRef={this.setContainer}
          type="text"
          value={inputValue}
          onChange={this.inputChanged}
          onFocus={this.inputFocused}
          onBlur={this.inputBlurred}
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
            <StyledTagsContainer labelShown={!!label}>{children}</StyledTagsContainer>
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
