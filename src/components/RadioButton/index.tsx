import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { Label } from '../Label';
import { StandardProps } from '../../common';
import { InputError } from '../InputError';
import { FormContext, RadioButtonGroupContext, RadioButtonGroupContextType } from '../../contexts';
import { FormContextProps } from '../../hoc';
import { KeyCodes } from '../../utils';
import { distance } from '../../distance';
import { InputNotification } from '../InputNotification';
import { PaddedContainer } from '../PaddedContainer';

export interface RadioButtonChangeEvent {
  /**
   * The current selected state of the radio button.
   */
  value: boolean;
}

export interface RadioButtonProps extends StandardProps {
  /**
   * The content of the radio button.
   */
  children?: React.ReactNode;
  /**
   * Event emitted once the radio button selection changes.
   */
  onChange?(e: RadioButtonChangeEvent): void;
  /**
   * Sets the radio button as disabled.
   */
  disabled?: boolean;
  /**
   * Displays the error message below the radio button.
   */
  error?: React.ReactChild;
  /**
   * Sets the selected and enters the controlled mode.
   */
  value?: boolean;
  /**
   * Sets the initial selected. Does not enter the controlled mode.
   */
  defaultValue?: boolean;
  /**
   * Name of the radio button within a radio button group.
   */
  name?: string;
}

export interface RadioButtonIntProps extends RadioButtonProps {
  group?: RadioButtonGroupContextType;
}

export interface RadioButtonIntState {
  value: boolean;
  error?: React.ReactChild;
  controlled: boolean;
}

interface RadioButtonContainerProps {
  disabled?: boolean;
}

interface RadioButtonCircleProps {
  selected: boolean;
  disabled: boolean;
  theme: any;
}

const RadioButtonContainer = styled('div')<RadioButtonContainerProps>`
  position: relative;
  display: inline-block;
  opacity: ${props => (props.disabled ? '0.5' : '1.0')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  + div {
    margin-left: ${distance.large};
  }
`;

const RadioButtonCircle = styled.div(
  ({ theme: { ui0, ui5 } }) => `
  outline: 0;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  overflow: hidden;
  flex: 0 0 0.5em;
  padding: 0.1875em;
  border: 2px solid ${ui5};
  border-radius: 100%;

  &:focus {
    box-shadow: 0px 0px 0px 2px ${ui0};
  }

  + label {
    vertical-align: middle;
  }
`,
);

const SelectMark = styled('div')<RadioButtonCircleProps>`
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  outline: 0;
  background: ${themed(({ theme }) => theme.ui5)};
  transition: all 0.2s;
  opacity: ${props => (props.selected ? '1' : '0')};
  transform: ${props => (props.selected ? 'scale(1)' : 'scale(0)')};
`;

const FlexContainer = styled.div<{ withError?: boolean }>`
  display: flex;
  align-items: ${({ withError }) => (withError ? 'start' : 'center')};
`;

/**
 * The RadioButton input.
 */
export class RadioButton extends React.PureComponent<RadioButtonProps> {
  render() {
    const { children, ...props } = this.props;
    return (
      <FormContext.Consumer>
        {form => (
          <RadioButtonGroupContext.Consumer>
            {ctx => (
              <RadioButtonInt group={ctx} form={form} {...props}>
                {children}
              </RadioButtonInt>
            )}
          </RadioButtonGroupContext.Consumer>
        )}
      </FormContext.Consumer>
    );
  }
}

export class RadioButtonInt extends React.PureComponent<RadioButtonIntProps & FormContextProps, RadioButtonIntState> {
  readonly name?: string;

  constructor(props: RadioButtonIntProps) {
    super(props);
    this.name = props.name;
    this.state = {
      controlled: props.value !== undefined,
      value: props.value || props.defaultValue || false,
      error: props.error,
    };
  }

  componentWillReceiveProps({ value = false, error }: RadioButtonIntProps) {
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

  private select = () => {
    const { onChange, disabled, group, form, name = '' } = this.props;
    const { controlled, value } = this.state;

    if (!disabled && !value) {
      if (!controlled) {
        if (group) {
          group.select(this);
        } else if (form) {
          form.change({
            name,
            value,
          });
        } else {
          this.setState({
            value: true,
          });
        }
      }

      if (typeof onChange === 'function') {
        onChange({
          value: true,
        });
      }
    }
  };

  private onSelected = (e: React.MouseEvent<HTMLDivElement>) => {
    this.select();
    e.preventDefault();
  };

  private control = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.keyCode) {
      case KeyCodes.enter:
      case KeyCodes.space:
        this.select();
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
      group: _3,
      form: _4,
      name: _5,
      ...props
    } = this.props;
    const { value, error } = this.state;
    const containerProps = {
      ...props,
      theme,
      onClick: this.onSelected,
      disabled,
    };
    const circleProps = {
      selected: value,
      disabled: !!disabled,
      onKeyDown: this.control,
      theme,
      tabIndex: disabled ? undefined : 0,
    };

    const Error = error && (
      <PaddedContainer top="xsmall" bottom="xsmall">
        <InputError>{error}</InputError>
      </PaddedContainer>
    );

    return (
      <RadioButtonContainer {...containerProps}>
        <FlexContainer withError={!!error}>
          <RadioButtonCircle {...circleProps}>
            <SelectMark {...circleProps} />
          </RadioButtonCircle>
          {children && (
            <Label attached theme={theme}>
              {children}
              {Error}
            </Label>
          )}
        </FlexContainer>
        {!children && Error}
      </RadioButtonContainer>
    );
  }
}
