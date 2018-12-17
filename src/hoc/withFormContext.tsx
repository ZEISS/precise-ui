import * as React from 'react';
import { InputProps } from '../common';
import { FormContextType, FormContext } from '../contexts/FormContext';

export interface FormContextProps {
  form?: FormContextType;
}

export function withFormContext<T extends InputProps<any>>(
  Component: React.ComponentType<T & FormContextProps>,
): React.SFC<T> {
  return (props: T) =>
    props.name ? (
      <FormContext.Consumer>{ctx => <Component form={ctx} {...props} />}</FormContext.Consumer>
    ) : (
      <Component {...props} />
    );
}
