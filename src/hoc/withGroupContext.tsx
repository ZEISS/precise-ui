import * as React from 'react';
import { RadioButtonGroupContext, RadioButtonGroupContextType } from '../contexts/RadioButtonGroupContext';
import { withInner } from 'typescript-plugin-inner-jsx/withInner';
import { InputProps } from '../common';

export interface GroupContextProps {
  group?: RadioButtonGroupContextType;
}

export function withGroupContext<TProps extends InputProps<any>>(
  Component: React.ComponentType<TProps & GroupContextProps>,
): React.SFC<TProps> {
  return withInner(
    (props: TProps) =>
      props.name ? (
        <RadioButtonGroupContext.Consumer>
          {ctx => <Component group={ctx} {...props} />}
        </RadioButtonGroupContext.Consumer>
      ) : (
        <Component {...props} />
      ),
    { Component },
  );
}
