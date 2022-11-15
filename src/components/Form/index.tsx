import * as React from 'react';
import styled from '../../utils/styled';
import { Prompt } from '../Prompt';
import { FormContext, FormContextType, FormValueNotifier, FormValueChange } from '../../contexts';
import { StandardProps } from '../../common';
import { ReactComponentDefaultProps } from '../../utils/react-18-compat';

export interface FormSubmitEvent {
  /**
   * The data to be submitted.
   */
  data: FormValuesData;
  /**
   * Validation errors
   */
  errors?: Array<FormValidationError>;
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

export interface FormValidateEvent {
  /**
   * The current values of the form fields.
   */
  value: FormValuesData;
  /**
   * Validation errors
   */
  errors?: Array<FormValidationError>;
}

export interface FormValuesData {
  [name: string]: any;
}

export interface FormValidationError {
  field: string;
  error: React.ReactChild;
}

export interface FormProps<FormValues> extends StandardProps, ReactComponentDefaultProps {
  /**
   * Shows the given message if the user wants to navigate
   * with changes being made or renders custom component with message if provided.
   */
  prompt?: ((changed: boolean) => React.ReactChild) | string;
  /**
   * The value of the form to be used in controlled mode.
   */
  value?: FormValues;
  /**
   * The initial value of the form to be used in managed mode.
   */
  defaultValue?: FormValues;
  /**
   * Rules for validating fields values.
   */
  validationRules?: { [T in keyof FormValues]?: (value: any, formValues: FormValues) => React.ReactChild | true };
  /**
   * Event emitted when a field of the form changed.
   */
  onChange?(e: FormChangeEvent): void;
  /**
   * Event emitted when the form is submitted.
   */
  onSubmit?(e: FormSubmitEvent): void;
  /**
   * Event emitted when form errors are set or cleared
   */
  onValidate?(e: FormValidateEvent): void;
  /**
   * Disables the form in case of invalid input. Effectively
   * disables the possibility of submitting forms.
   * @default false
   */
  disabled?: boolean;
}

export interface FormState<FormValues> {
  changed: boolean;
  initial: FormValues;
  controlled: boolean;
  current: FormValues;
  errors: Partial<{ [T in keyof FormValues]: React.ReactChild }>;
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
export class Form<Values extends FormValuesData> extends React.Component<FormProps<Values>, FormState<Values>> {
  private readonly fields: Array<FormValueNotifier> = [];
  private readonly ctx: FormContextType = this.createContext();

  constructor(props: FormProps<Values>) {
    super(props);
    const data = props.value || props.defaultValue || {};
    this.state = {
      changed: false,
      controlled: props.value !== undefined,
      initial: data as Values,
      current: data as Values,
      errors: {},
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: FormProps<Values>) {
    const { controlled, initial } = this.state;

    if (controlled) {
      const { value = {} } = nextProps as Values;
      const changed = isChanged(initial, value);
      this.setValues(value, changed);
    }
  }

  componentDidUpdate(_: FormProps<Values>, prevState: FormState<Values>) {
    const { onValidate } = this.props;
    const { errors, current } = this.state;

    if (typeof onValidate === 'function' && JSON.stringify(prevState.errors) !== JSON.stringify(errors)) {
      const arrayErrors = this.getErrorsAsArray(errors);
      onValidate({ errors: arrayErrors, value: current });
    }
  }

  private getErrorsAsArray(errors: FormState<Values>['errors']) {
    return Object.keys(errors).reduce<Array<FormValidationError>>((arrayErrors, field) => {
      const error = errors[field];
      if (error) {
        arrayErrors.push({ field, error });
      }
      return arrayErrors;
    }, []);
  }

  private setValues(current: Values, changed: boolean) {
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

  private getError(name: string, value: any, current: Values) {
    const validator = this.props.validationRules && this.props.validationRules[name];
    const validationResult = validator ? validator(value, current) : true;
    const error = validationResult === true ? undefined : validationResult;
    return error;
  }

  private setFieldError(name: keyof Values, error?: React.ReactChild) {
    for (const fieldEntity of this.fields) {
      if (fieldEntity.props.name === name) {
        fieldEntity.setState({ error });
        return;
      }
    }
  }

  private setError({ name, value }: FormValueChange, current: Values) {
    const error = this.getError(name, value, current);
    this.setFieldError(name, error);

    this.setState({ errors: { ...this.state.errors, [name]: error } });
  }

  private setErrors(current: Values) {
    const keys = Object.keys(current);
    const errors = { ...this.state.errors };

    for (const key of keys as Array<Extract<keyof Values, string>>) {
      const value = current[key];
      const error = this.getError(key, value, current);
      errors[key] = error;
      this.setFieldError(key, error);
    }

    this.setState({ errors });
    return errors;
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

        this.setError(field, proposed);

        (field.validateWith || []).forEach((fieldName: string) => {
          return this.setError({ name: fieldName, value: proposed[fieldName] }, proposed);
        });

        if (typeof onChange === 'function') {
          onChange({
            changed,
            value: proposed,
          });
        }
      },
      subscribe: (field: FormValueNotifier) => {
        const { current, errors = {} } = this.state;
        const { name } = field.props;

        if (name) {
          this.fields.push(field);

          let error: React.ReactChild | undefined;
          if (name in current) {
            const value = current[name];
            error = this.getError(name, value, current);
            field.setState({
              value,
            });
          } else {
            const value = field.state.value;
            current[name as Extract<keyof Values, string>] = value;
            error = this.getError(name, value, current);
          }

          if (error) {
            this.setState(({ errors }) => ({ errors: { ...errors, [name]: error } }));
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

    const errors = this.setErrors(current);

    if (!disabled && typeof onSubmit === 'function') {
      const arrayErrors = this.getErrorsAsArray(errors);

      this.setState(
        {
          changed: false,
          initial: current,
        },
        () =>
          onSubmit({
            data: current,
            errors: arrayErrors,
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
        {prompt && (typeof prompt === 'function' ? prompt(changed) : <Prompt when={changed} message={prompt} />)}
        <FormContext.Provider value={this.ctx}>{children}</FormContext.Provider>
      </StyledForm>
    );
  }
}
