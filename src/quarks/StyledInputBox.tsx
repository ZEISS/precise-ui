import * as React from 'react';
import { purpleRed } from '../colors';
import { PreciseTheme } from '../common';
import styled, { themed } from '../utils/styled';

export const enum TextFieldBorderType {
  none = 0,
  normal = 1,
  focus = 2,
  error = 3,
}

export function getTextFieldBorderType(borderless?: boolean, error?: boolean, focused?: boolean) {
  return borderless
    ? TextFieldBorderType.none
    : error
    ? TextFieldBorderType.error
    : focused
    ? TextFieldBorderType.focus
    : TextFieldBorderType.normal;
}

export interface StyledInputBoxProps {
  border: TextFieldBorderType;
  disabled?: boolean;
  onClear?: void;
  focused?: boolean;
  hasValue?: boolean;
  theme?: PreciseTheme;
}

export const StyledInputBox = styled('div')<StyledInputBoxProps>(
  themed(
    ({ border, disabled, focused, hasValue, theme: { ui0, ui2, ui3, ui5 } }) => `
      box-sizing: border-box;
      box-shadow: none;
      margin: 0;
      display: flex;
      align-items: center;
      flex: 1;
      background: ${ui2};
      min-height: 54px;
      max-height: 112px;
      border-bottom: 1px solid ${
        border === TextFieldBorderType.error ? purpleRed : focused ? ui0 : hasValue ? ui5 : ui3
      };
      cursor: ${disabled ? 'not-allowed' : 'auto'};
      overflow-y: auto;

      &:hover {
        border-bottom-color: ${disabled ? ui3 : ui0};
      }
    `,
  ),
);
