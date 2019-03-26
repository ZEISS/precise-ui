import * as React from 'react';
import styled, { themed } from '../utils/styled';
import { remCalc } from '../utils/remCalc';
import { distance } from '../distance';
import { PreciseTheme } from '../common';

export interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  block?: boolean;
  disabled?: boolean;
  labelShown: boolean;
  theme?: PreciseTheme;
  innerRef?(ref: HTMLElement): void;
}

export const StyledInput = styled('input')<StyledInputProps>`
  color: ${themed(({ theme, disabled }) => (disabled ? theme.text3 : theme.text1))};
  background: none;
  border: none;
  border-radius: 0;
  font-size: ${remCalc('16px')};
  font-family: inherit;
  padding: ${props => (props.labelShown ? `${distance.large} ${distance.medium} ${distance.small}` : distance.medium)};
  box-sizing: border-box;
  box-shadow: none;
  margin: 0;
  width: 100%;
  height: 100%;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'auto')};
  -webkit-appearance: none;
  transition: all 0.2s;

  &::placeholder {
    color: ${themed(({ theme, disabled }) => (disabled ? theme.text3 : theme.text2))};
    opacity: ${props => (props.labelShown ? '0' : '1')};
    transition: inherit;
  }

  &:focus {
    outline: none;

    &::placeholder {
      opacity: 1;
    }
  }
`;
