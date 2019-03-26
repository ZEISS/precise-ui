import * as React from 'react';
import styled from '../../utils/styled';
import { Prompt } from '../Prompt';
import { FormContext, FormContextType, FormValueNotifier, FormValueChange } from '../../contexts';
import { StandardProps } from '../../common';

export interface FormSubmitEvent {
  /**
   * The data to be submitted.
   */
  data: FormValuesData;
  /**
   * Indicates whether the data has changed from the initial state.
   */
  changed: boolean;
}

export interface FormChangeEvent {
  /**
   * The current values of the form fields.
   */
  value: FormValuesData;
  /**
   * Indicates whether the data has changed from the initial state.
   */
  changed: boolean;
}

export interface FormValuesData {
  [name: string]: any;
}

export interface FormProps extends StandardProps {
  /**
   * Shows the given message if the user wants to navigate
   * with changes being made.
   */
  prompt?: string;
  /**
   * The value of the form to be used in controlled mode.
   */
  value?: FormValuesData;
  /**
   * The initial value of the form to be used in managed mode.
   */
  defaultValue?: FormValuesData;
  /**
   * Event emitted when a field of the form changed.
   */
  onChange?(e: FormChangeEvent): void;
  /**
   * Event emitted when the form is submitted.
   */
  onSubmit?(e: FormSubmitEvent): void;
  /**
   * Disables the form in case of invalid input. Effectively
   * disables the possibility of submitting forms.
   * @default false
   */
  disabled?: boolean;
}

export interface FormState {
  changed: boolean;
  initial: FormValuesData;
  controlled: boolean;
  current: FormValuesData;
}

const StyledForm = styled.form`
  margin: 0;
`;

function isDifferent(a: any, b: any) {
  if (a !== b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length === b.length) {
        for (let i = 0; i < a.length; i++) {
          if (isDifferent(a[i], b[i])) {
            return true;
          }
        }

        return false;
      }
    } else if (typeof a === 'object' && typeof b === 'object') {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      if (keysA.length === keysB.length) {
        for (const key of keysA) {
          if (isDifferent(a[key], b[key])) {
            return true;
          }
        }

        return false;
      }
    }

    return true;
  }

  return false;
}

function isChanged(initial: FormValuesData, current: FormValuesData) {
  const keys = Object.keys(current);

  for (const key of keys) {
    if (isDifferent(current[key], initial[key])) {
      return true;
    }
  }

  return false;
}

/**
 * Represents a field aggregator that enables easily creating forms.
 */
export class Form extends React.Component<FormProps, FormState> {
  private readonly fields: Array<FormValueNotifier> = [];
  private readonly ctx: FormContextType = this.createContext();

  constructor(props: FormProps) {
    super(props);
    const data = props.value || props.defaultValue || {};
    this.state = {
      changed: false,
      controlled: props.value !== undefined,
      initial: data,
      current: data,
    };
  }

  componentWillReceiveProps(nextProps: FormProps) {
    const { controlled, initial } = this.state;

    if (controlled) {
      const { value = {} } = nextProps;
      const changed = isChanged(initial, value);
      this.setValues(value, changed);
    }
  }

  private setValues(current: FormValuesData, changed: boolean) {
    const keys = Object.keys(current);

    this.setState({
      current,
      changed,
    });

    for (const key of keys) {
      const value = current[key];

      for (const field of this.fields) {
        if (field.props.name === key && field.state.value !== value) {
          field.setState({
            value,
          });
        }
      }
    }
  }

  private createContext(): FormContextType {
    return {
      change: (field: FormValueChange) => {
        const { onChange } = this.props;
        const { controlled, current, initial } = this.state;
        const proposed = {
          ...current,
          [field.name]: field.value,
        };
        const changed = isChanged(initial, proposed);

        if (!controlled) {
          this.setValues(proposed, changed);
        }

        if (typeof onChange === 'function') {
          onChange({
            changed,
            value: proposed,
          });
        }
      },
      subscribe: (field: FormValueNotifier) => {
        const { current } = this.state;
        const { name } = field.props;

        if (name) {
          this.fields.push(field);

          if (name in current) {
            const value = current[name];
            field.setState({
              value,
            });
          } else {
            const value = field.state.value;
            current[name] = value;
          }
        }
      },
      unsubscribe: (field: FormValueNotifier) => {
        const index = this.fields.indexOf(field);
        index >= 0 && this.fields.splice(index, 1);
      },
    };
  }

  private submit = (e: React.FormEvent<HTMLFormElement>) => {
    const { onSubmit, disabled } = this.props;
    const { current, changed } = this.state;

    if (!disabled && typeof onSubmit === 'function') {
      this.setState(
        {
          changed: false,
          initial: current,
        },
        () =>
          onSubmit({
            data: current,
            changed,
          }),
      );
    }

    e.preventDefault();
    return false;
  };

  render() {
    const {
      value: _0,
      defaultValue: _1,
      onChange: _2,
      onSubmit: _3,
      disabled: _4,
      children,
      prompt,
      ...rest
    } = this.props;
    const { changed } = this.state;
    return (
      <StyledForm {...rest} onSubmit={this.submit}>
        {prompt && <Prompt when={changed} message={prompt} />}
        <FormContext.Provider value={this.ctx}>{children}</FormContext.Provider>
      </StyledForm>
    );
  }
}
