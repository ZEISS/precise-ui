import * as React from 'react';
import styled, { css, themed } from '../../utils/styled';
import { light } from '../../themes';
import { Label } from '../Label';
import { Icon } from '../Icon';
import { InputChangeEvent, InputProps } from '../../common';
import { FormContextProps, withFormContext } from '../../hoc';
import { GroupContextProps, withGroupContext } from '../../hoc/withGroupContext';
import { KeyCodes } from '../../utils';
import { InputNotification } from '../InputNotification';
import { PaddedContainer } from '../PaddedContainer';

export type CheckboxChangeEvent = InputChangeEvent<boolean>;

export interface CheckboxProps extends InputProps<boolean>, FormContextProps, GroupContextProps {
  /**
   * The content of the checkbox.
   */
  children?: React.ReactNode;
}

export interface CheckboxState {
  value: boolean;
  error?: React.ReactChild;
  controlled: boolean;
}

interface CheckboxContainerProps {
  disabled?: boolean;
}

interface CheckboxBoxProps {
  checked: boolean;
  disabled: boolean;
  theme: any;
}

const CheckboxContainer = styled('div')<CheckboxContainerProps>`
  position: relative;
  display: inline-block;
  opacity: ${props => (props.disabled ? '0.5' : '1.0')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const CheckboxBox = styled('div')<CheckboxBoxProps>(
  themed(
    ({ disabled, checked, theme: { ui0, ui1, ui4, ui5 } }) => css`
      outline: 0;
      flex: 0 0 1.0625em;
      max-width: 1.0625em;
      height: 1.0625em;
      position: relative;
      background: ${checked ? ui5 : ui1};
      transition: all 0.2s cubic-bezier(0, 0, 0.25, 1);
      overflow: hidden;
      border-radius: 2px;
      border: 2px solid ${disabled ? (checked ? ui5 : ui4) : ui5};
      box-sizing: border-box;

      &:focus {
        outline: ${ui0} solid 2px;
      }

      > i {
        position: relative;
        top: -2px;
        left: -2px;
        transition: all 0.2s;
        opacity: ${checked ? '1' : '0'};
        transform: ${checked ? 'scale(1)' : 'scale(0)'};
      }
    `,
  ),
);

const RealCheckbox = styled.input`
  display: none;
`;

const FlexContainer = styled.div<{ withInputInfo?: boolean }>`
  display: flex;
  padding-right: 0.25em;
  align-items: ${({ withInputInfo }) => (withInputInfo ? 'start' : 'center')};
`;

export class CheckboxInt extends React.PureComponent<CheckboxProps, CheckboxState> {
  readonly name?: string;

  constructor(props: CheckboxProps) {
    super(props);
    this.name = props.name;
    this.state = {
      controlled: typeof props.value !== 'undefined',
      value: props.value || props.defaultValue || false,
      error: props.error,
    };
  }

  componentWillReceiveProps({ value = false, error }: CheckboxProps) {
    if (this.state.controlled) {
      this.setState({ value });
    }
    this.setState({ error });
  }

  componentDidMount() {
    const { group, form } = this.props;
    const { controlled } = this.state;

    if (!controlled) {
      if (group) {
        group.subscribe(this);
      } else if (form) {
        form.subscribe(this);
      }
    }
  }

  componentWillUnmount() {
    const { group, form } = this.props;
    const { controlled } = this.state;

    if (!controlled) {
      if (group) {
        group.unsubscribe(this);
      } else if (form) {
        form.unsubscribe(this);
      }
    }
  }

  setValue = (value: boolean) => {
    const { onChange } = this.props;

    this.setState({
      value,
    });

    if (typeof onChange === 'function') {
      onChange({
        value,
      });
    }
  };

  private toggle = () => {
    const { onChange, disabled, form, group, name = '' } = this.props;

    if (!disabled) {
      const { controlled, value } = this.state;
      const checked = !value;

      if (!controlled) {
        if (group) {
          group.select(this);
        } else if (form) {
          form.change({
            name,
            value: checked,
          });
        } else {
          this.setState({
            value: checked,
          });
        }
      }

      if (typeof onChange === 'function') {
        onChange({
          value: checked,
        });
      }
    }
  };

  private changeValue = (e: React.MouseEvent<HTMLDivElement>) => {
    this.toggle();
    e.preventDefault();
  };

  private control = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.keyCode) {
      case KeyCodes.enter:
      case KeyCodes.space:
        this.toggle();
        break;
      default:
        return;
    }

    e.stopPropagation();
    e.preventDefault();
  };

  render() {
    const {
      children,
      disabled,
      theme,
      value: _0,
      defaultValue: _1,
      onChange: _2,
      onInput: _3,
      info,
      ...props
    } = this.props;
    const { value, error } = this.state;
    const containerProps = {
      ...props,
      theme,
      onClick: this.changeValue,
      disabled,
    };
    const boxProps = {
      checked: value,
      disabled: !!disabled,
      onKeyDown: this.control,
      theme,
      tabIndex: disabled ? undefined : 0,
    };

    const InputInfo = (error || info) && (
      <PaddedContainer top="xsmall" bottom="xsmall">
        <InputNotification error={error} info={info} />
      </PaddedContainer>
    );

    return (
      <CheckboxContainer {...containerProps}>
        <RealCheckbox type="checkbox" defaultChecked={value} />
        <FlexContainer withInputInfo={!!(error || info)}>
          <CheckboxBox {...boxProps}>
            <Icon name="Check" color={theme ? theme.ui1 : light.ui1} size={1.0625} />
          </CheckboxBox>
          {children && (
            <Label attached theme={theme}>
              {children}
              {InputInfo}
            </Label>
          )}
        </FlexContainer>
        {!children && InputInfo}
      </CheckboxContainer>
    );
  }
}

/**
 * The checkbox input field.
 */
export const Checkbox = withFormContext(withGroupContext(CheckboxInt));
Checkbox.displayName = 'Checkbox';
