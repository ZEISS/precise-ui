import * as React from 'react';
import { InputProps, InputChangeEvent } from '../../common';
import { FormContextProps, withFormContext } from '../../hoc/withFormContext';
import {
  RadioButtonGroupContext,
  RadioButtonGroupContextType,
  RadioButtonGroupNotifier,
} from '../../contexts/RadioButtonGroupContext';

export type RadioButtonGroupChangeEvent = InputChangeEvent<string>;

export interface RadioButtonGroupProps extends InputProps<string | Array<string>> {
  /**
   * Sets the group's children.
   */
  children?: React.ReactNode;
  multiple?: boolean;
}

export type StateValue = Array<string> | string | undefined;

export interface RadioButtonGroupState {
  controlled: boolean;
  value: StateValue;
}

class RadioButtonGroupInt extends React.PureComponent<RadioButtonGroupProps & FormContextProps, RadioButtonGroupState> {
  private readonly buttons: Array<RadioButtonGroupNotifier> = [];
  private readonly ctx: RadioButtonGroupContextType = this.createContext();

  constructor(props: RadioButtonGroupProps) {
    super(props);
    const controlled = props.value !== undefined;
    const { value: propValue, defaultValue } = props;
    const value = controlled ? propValue : defaultValue;

    this.state = {
      controlled,
      value,
    };
  }

  setState<K extends keyof RadioButtonGroupState>(state: Pick<RadioButtonGroupState, K>) {
    const value = (state as Pick<RadioButtonGroupState, 'value'>).value;
    if (value) {
      for (const button of this.buttons) {
        const selected =
          Array.isArray(value) && button.name ? value.indexOf(button.name) !== -1 : button.name === value;
        button.setValue(selected);
      }
      super.setState({ ...state, value });
    }
    super.setState(state);
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

  componentWillReceiveProps({ value }: RadioButtonGroupProps) {
    const { controlled } = this.state;

    if (controlled) {
      this.setState({
        value,
      });
    }
  }

  private getNextValue = (groupItemName?: string) => {
    const { multiple } = this.props;
    const { value } = this.state;
    if (value && Array.isArray(value) && groupItemName) {
      if (value.indexOf(groupItemName) !== -1) {
        return value.filter(f => f !== groupItemName);
      }
      return [...value, groupItemName];
    }

    return multiple && groupItemName ? [groupItemName] : groupItemName;
  };

  private createContext(): RadioButtonGroupContextType {
    return {
      select: (rb: RadioButtonGroupNotifier) => {
        const { onChange, form, name = '' } = this.props;
        const { controlled } = this.state;
        const value = this.getNextValue(rb.name);

        if (!controlled) {
          if (form) {
            form.change({
              name,
              value,
            });
          } else if (value) {
            this.setState({
              value,
            });
          } else {
            for (const button of this.buttons) {
              button.setValue(button === rb);
            }

            super.setState({
              value: undefined,
            });
          }
        }

        if (typeof onChange === 'function' && value) {
          onChange({
            value,
          });
        }
      },
      subscribe: (rb: RadioButtonGroupNotifier) => {
        const { value } = this.state;
        this.buttons.push(rb);

        if (value !== undefined) {
          const selected = Array.isArray(value) && rb.name ? value.indexOf(rb.name) !== -1 : rb.name === value;
          rb.setValue(selected);
        }
      },
      unsubscribe: (rb: RadioButtonGroupNotifier) => {
        const index = this.buttons.indexOf(rb);
        index >= 0 && this.buttons.splice(index, 1);
      },
    };
  }

  render() {
    return <RadioButtonGroupContext.Provider value={this.ctx}>{this.props.children}</RadioButtonGroupContext.Provider>;
  }
}

/**
 * The radio button group manages a group of radio buttons.
 */
export const RadioButtonGroup = withFormContext(RadioButtonGroupInt);
RadioButtonGroup.displayName = 'RadioButtonGroup';
