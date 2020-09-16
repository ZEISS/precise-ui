import * as React from 'react';

export interface FormValueNotifier {
  state: {
    value: any;
  };
  props: {
    name?: string;
  };
  setState(state: { value: any; error?: React.ReactChild }): void;
  setState(state: { error?: React.ReactChild }): void;
}

export interface FormValueChange {
  name: string;
  value: any;
}

export interface FormContextType {
  change(data: FormValueChange): void;
  subscribe(field: FormValueNotifier): void;
  unsubscribe(field: FormValueNotifier): void;
}

export const FormContext = React.createContext<FormContextType | undefined>(undefined);
