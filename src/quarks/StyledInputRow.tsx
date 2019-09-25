import * as React from 'react';
import styled, { themed } from '../utils/styled';
import { distance } from '../distance';
import { purpleRed } from '../colors';
import { remCalc } from '../utils/remCalc';

const TextFieldBoxWithLabelWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column-reverse;
  height: 100%;
  position: relative;
  min-width: 0;
  margin: auto;
`;

const TextFieldLabel = styled.label`
  height: 100%;
`;

export interface TextFieldLabelProps {
  active: boolean;
  filled: boolean;
  error: boolean;
  multiline: boolean;
}

const TextFieldLabelText = styled('span')<TextFieldLabelProps>`
  display: block;
  font-size: ${remCalc('12px')};
  line-height: ${remCalc('16px')};
  max-width: 66.66%;
  box-sizing: border-box;
  cursor: text;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  transform: ${props => (props.active || props.filled ? 'none' : 'translate(0, 0.85rem) scale(1.33)')};
  color: ${themed(({ theme, active, filled, error }) =>
    error ? purpleRed : active || filled ? theme.ui0 : theme.text2,
  )};
  transition: all 0.2s;
  position: absolute;
  top: 0;
  left: ${distance.medium};
  right: 0;
  padding-top: ${distance.small};
  background: ${themed(({ multiline, theme }) => (multiline ? theme.ui2 : 'transparent'))};

  > span {
    display: ${props => (props.active || props.filled ? 'none' : '')};
    transition: inherit;
  }
`;

export interface StyledInputRowProps extends React.HTMLAttributes<HTMLDivElement> {
  focused?: boolean;
  error?: boolean;
  placeholder?: string;
  label?: React.ReactChild;
  hasValue?: boolean;
  multiline?: boolean;
}

export const StyledInputRow: React.SFC<StyledInputRowProps> = ({
  children,
  label,
  focused = false,
  error = false,
  placeholder = '',
  hasValue = false,
  multiline = false,
  ...props
}) => (
  <TextFieldBoxWithLabelWrapper {...props}>
    {label !== undefined ? (
      <TextFieldLabel>
        {children}
        <TextFieldLabelText active={focused} filled={!focused && hasValue} error={error} multiline={multiline}>
          {label}
          {placeholder.length > 0 && <span> — {placeholder}</span>}
        </TextFieldLabelText>
      </TextFieldLabel>
    ) : (
      children
    )}
  </TextFieldBoxWithLabelWrapper>
);
