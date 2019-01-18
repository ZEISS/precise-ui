import * as React from 'react';
import { TableCellEvent } from './Table.types.part';

export function defaultCellRenderer<T>({ value }: TableCellEvent<T>): React.ReactNode {
  switch (typeof value) {
    case 'boolean':
    case 'number':
    case 'string':
      return value.toString();
    case 'object':
      if (value) {
        return value.toString();
      }
      break;
  }

  return '';
}
