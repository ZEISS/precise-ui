import * as React from 'react';
import { InputProps } from '../common';
import { FormContextType, FormContext } from '../contexts/FormContext';
import { withInner } from 'typescript-plugin-inner-jsx/withInner';

export interface FormContextProps {
  /**
   * The relevant form, if any.
   */
  form?: FormContextType;
}

/**
 * Wraps the component in a new component that dynamically places the inner part
 * in a form context depending on the use (e.g., with a `name` prop).
 * @param Component The component to place in a form context if a name is given.
 * @returns A component that can be also used together with `<Form>`.
 */
export function withFormContext<TProps extends InputProps<any>>(
  Component: React.ComponentType<TProps & FormContextProps>,
): React.SFC<TProps> {
  return withInner(
    (props: TProps) =>
      props.name ? (
        <FormContext.Consumer>{ctx => <Component form={ctx} {...props} />}</FormContext.Consumer>
      ) : (
        <Component {...props} />
      ),
    { Component },
  );
}
