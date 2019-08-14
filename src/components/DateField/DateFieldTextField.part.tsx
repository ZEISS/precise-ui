import * as React from 'react';
import { TextFieldProps, TextField } from '../TextField';
import { tuna } from '../../colors';
import { Icon } from '../Icon';
import { Omit } from '../../common';

export interface DatePickerTextFieldProps extends Omit<TextFieldProps, 'onChange'> {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const DatePickerTextField: React.FC<DatePickerTextFieldProps> = ({ onChange, ...props }) => (
  <TextField
    {...props}
    onChange={({ originalEvent }) => originalEvent && onChange && onChange(originalEvent)}
    icon={<Icon name="DateRange" color={tuna} size="22px" />}
  />
);
