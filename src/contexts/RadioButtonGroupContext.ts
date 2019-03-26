import * as React from 'react';

export interface RadioButtonGroupNotifier {
  setValue(value: boolean): void;
  name?: string;
}

export interface RadioButtonGroupContextType {
  select(rb: RadioButtonGroupNotifier): void;
  subscribe(rb: RadioButtonGroupNotifier): void;
  unsubscribe(rb: RadioButtonGroupNotifier): void;
}

export const RadioButtonGroupContext = React.createContext<RadioButtonGroupContextType | undefined>(undefined);
