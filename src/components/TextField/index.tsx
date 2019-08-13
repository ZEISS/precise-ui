import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StackPanel } from '../StackPanel';
import { purpleRed } from '../../colors';
import { InputIcon } from '../InputIcon';
import { InputChangeEvent, TextInputProps } from '../../common';
import { FormContextProps, withFormContext } from '../../hoc/withFormContext';
import { showInputInfo } from '../../utils/input';
import { distance } from '../../distance';
import { StyledInputRow, StyledInput, TextFieldBorderType, StyledInputBox, getTextFieldBorderType } from '../../quarks';
import { getFontSize } from '../../textStyles';

export type TextFieldChangeEvent = InputChangeEvent<string>;

type TextFieldInputNodeType = HTMLTextAreaElement | HTMLInputElement;

export interface TextFieldProps extends TextInputProps {
  /**
   * Allows multi-line input from the user. Either a boolean
   * or a number specifying the amount of rows to show.
   * @default false
   */
  multiline?: boolean | number;
  /**
   * Allows resizing the text field if being used as a multi-line input.
   * @default false
   */
  resizable?: boolean | 'auto' | 'vertical' | 'horizontal';
  /**
   * Shows a clearing icon which resets the input to an empty string.
   * @default false
   */
  clearable?: boolean;

  /**
   * Event emitted when the clear button was pressed. Will always be fired after
   * the onChange event, i.e., after the value was set / proposed.
   */
  onClear?(): void;

  /**
   * Gets the reference to the underlying input or textarea element.
   * @ignore
   */
  inputRef?(instance: HTMLElement | null): void;

  /**
   * @ignore
   */
  children?: void;
}

export interface TextFieldState {
  controlled: boolean;
  focused: boolean;
  reveal: boolean;
  value: string;
  error?: React.ReactChild;
}

interface TextFieldAreaProps {
  border: TextFieldBorderType;
  disabled?: boolean;
  resizable?: string;
  labelShown: boolean;
}

const TextFieldContainer = styled.div`
  position: relative;
`;

const TextFieldWrapper = styled(StackPanel)`
  display: flex;
`;

const TextFieldArea = styled.textarea<TextFieldAreaProps>`
  ::-ms-clear { display: none; }
  
  white-space: pre-wrap;
  word-break: break-all;

  ${getFontSize('medium')}
  color: ${themed(({ theme, disabled }) => (disabled ? theme.text3 : theme.text2))};
  border-radius: 0;
  font-family: inherit;
  padding: ${props => (props.labelShown ? `${distance.large} ${distance.medium} ${distance.small}` : distance.medium)};
  box-sizing: border-box;
  box-shadow: none;
  resize: ${props => props.resizable || 'none'};
  margin: 0;
  width: 100%;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'auto')};
  border: none;
  border-bottom: 1px solid
    ${themed(({ theme, border }) => (border === TextFieldBorderType.error ? purpleRed : theme.ui4))};
  background: ${themed(({ theme }) => theme.ui2)};

  &::placeholder {
    color: ${themed(({ theme, disabled }) => (disabled ? theme.text3 : theme.text2))};
    opacity: ${props => (props.labelShown ? '0' : '1')};
    transition: inherit;
  }

  &:focus {
    outline: none;

    &::placeholder {
      opacity: 1;
    }
  }
`;

const TextFieldElement = styled.div`
  ${getFontSize('medium')}

  display: flex;
  align-items: center;
  padding: ${distance.medium};
  color: ${themed(({ theme }) => theme.text2)};
  background: ${themed(({ theme }) => theme.ui3)};
`;

class TextFieldInt extends React.Component<TextFieldProps & FormContextProps, TextFieldState> {
  private _element: TextFieldInputNodeType | null;

  constructor(props: TextFieldProps) {
    super(props);
    this.state = {
      focused: false,
      reveal: false,
      controlled: props.value !== undefined,
      value: props.value || props.defaultValue || '',
      error: props.error,
    };
  }

  componentWillReceiveProps({ value = '', error }: TextFieldProps) {
    if (this.state.controlled) {
      this.setState({ value });
    }
    this.setState({ error });
  }

  componentDidMount() {
    this.changeHeight();
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

  private changeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.updateValue(e.target.value, e);
  };

  private updateValue(value: string, e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
        originalEvent: e,
      });
    }
  }

  private changeHeight = () => {
    const { resizable } = this.props;
    const element = this._element;

    if (resizable === 'auto' && element) {
      element.style.height = '1px';
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  private setTextFieldNode = (node: TextFieldInputNodeType | null) => {
    this._element = node;
    const { inputRef } = this.props;
    if (typeof inputRef === 'function') {
      inputRef(node);
    }
  };

  private setFocus = () => {
    const { onFocus } = this.props;

    this.setState(
      {
        focused: true,
      },
      onFocus,
    );
  };

  private unsetFocus = () => {
    const { onBlur } = this.props;

    this.setState(
      {
        focused: false,
      },
      onBlur,
    );
  };

  private handleReset = () => {
    const { onClear } = this.props;
    this.updateValue('');

    if (typeof onClear === 'function') {
      onClear();
    }
  };

  render() {
    const {
      theme,
      borderless,
      prefix,
      suffix,
      multiline,
      resizable = false,
      disabled,
      placeholder,
      info,
      label,
      clearable,
      onClear,
      icon,
      onChange: _0,
      defaultValue: _1,
      value: _2,
      form: _3,
      onFocus: _4,
      onBlur: _5,
      inputRef: _6,
      onInput: _7,
      ...rest
    } = this.props;
    const { focused, value, error } = this.state;
    const rows = typeof multiline === 'number' ? multiline : undefined;
    const border = getTextFieldBorderType(borderless, !!error, focused);
    const hasValue = !!value;
    const input =
      rows !== undefined || multiline ? (
        <TextFieldArea
          ref={this.setTextFieldNode}
          onInput={this.changeHeight}
          border={border}
          rows={rows}
          resizable={typeof resizable === 'string' ? resizable : resizable ? 'auto' : undefined}
          disabled={disabled}
          labelShown={label !== undefined}
          placeholder={placeholder}
          onFocus={this.setFocus}
          onBlur={this.unsetFocus}
          value={value}
          onChange={this.changeValue}
          {...rest}
        />
      ) : (
        <StyledInput
          ref={el => this.setTextFieldNode(el as TextFieldInputNodeType)}
          theme={theme}
          disabled={disabled}
          labelShown={label !== undefined}
          placeholder={placeholder}
          onFocus={this.setFocus}
          onBlur={this.unsetFocus}
          value={value}
          onChange={this.changeValue}
          {...rest}
        />
      );
    const textFieldWrapper = (
      <StyledInputRow
        error={!!error}
        focused={focused}
        hasValue={hasValue}
        label={label}
        placeholder={placeholder}
        multiline={rows !== undefined || multiline !== undefined}>
        {input}
      </StyledInputRow>
    );

    return (
      <TextFieldContainer>
        {rows !== undefined || multiline ? (
          textFieldWrapper
        ) : (
          <TextFieldWrapper>
            {prefix && <TextFieldElement>{prefix}</TextFieldElement>}
            <StyledInputBox border={border} disabled={disabled} focused={focused} hasValue={hasValue}>
              {textFieldWrapper}
              <InputIcon
                disabled={disabled}
                defaultIcon={icon}
                theme={theme}
                error={error}
                hasValue={hasValue}
                clearable={clearable}
                onClear={this.handleReset}
                onClick={() => this._element && this._element.focus()}
              />
            </StyledInputBox>
            {suffix && <TextFieldElement>{suffix}</TextFieldElement>}
          </TextFieldWrapper>
        )}
        {showInputInfo(error, info)}
      </TextFieldContainer>
    );
  }
}

/**
 * A text field for custom user input.
 */
export const TextField = withFormContext(TextFieldInt);
TextField.displayName = 'TextField';
