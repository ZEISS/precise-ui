import * as React from 'react';
import { InputProps, InputChangeEvent } from '../../common';
import { FormContextProps, withFormContext } from '../../hoc/withFormContext';
import {
  RadioButtonGroupContext,
  RadioButtonGroupContextType,
  RadioButtonGroupNotifier,
} from '../../contexts/RadioButtonGroupContext';

export type RadioButtonGroupChangeEvent = InputChangeEvent<string>;

export interface RadioButtonGroupProps extends InputProps<string> {
  /**
   * Sets the group's children.
   */
  children?: React.ReactNode;
}

export interface RadioButtonGroupState {
  controlled: boolean;
  value: string | undefined;
}

class RadioButtonGroupInt extends React.PureComponent<RadioButtonGroupProps & FormContextProps, RadioButtonGroupState> {
  private readonly buttons: Array<RadioButtonGroupNotifier> = [];
  private readonly ctx: RadioButtonGroupContextType = this.createContext();

  constructor(props: RadioButtonGroupProps) {
    super(props);
    const controlled = props.value !== undefined;

    this.state = {
      controlled,
      value: controlled ? props.value : props.defaultValue,
    };
  }

  setState<K extends keyof RadioButtonGroupState>(state: Pick<RadioButtonGroupState, K>) {
    for (const button of this.buttons) {
      const selected = button.name === (state as Pick<RadioButtonGroupState, 'value'>).value;
      button.setValue(selected);
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

  componentWillReceiveProps(nextProps: RadioButtonGroupProps) {
    const { controlled } = this.state;

    if (controlled) {
      const name = nextProps.value;

      this.setState({
        value: name,
      });
    }
  }

  private createContext(): RadioButtonGroupContextType {
    return {
      select: (rb: RadioButtonGroupNotifier) => {
        const { onChange, form, name = '' } = this.props;
        const { controlled } = this.state;
        const value = rb.name;

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

        if (typeof onChange === 'function') {
          onChange({
            value: rb.name || '',
          });
        }
      },
      subscribe: (rb: RadioButtonGroupNotifier) => {
        const { value } = this.state;
        this.buttons.push(rb);

        if (value !== undefined) {
          rb.setValue(rb.name === value);
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
