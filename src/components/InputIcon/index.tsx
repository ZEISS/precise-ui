import * as React from 'react';
import { PreciseTheme } from '../../common';
import { purpleRed } from '../../colors';
import { Icon } from '../Icon';
import { IconLink } from '../IconLink';
import { StyledIconContainer } from '../../quarks';

export interface InputIconProps {
  disabled?: boolean;
  clearable?: boolean;
  error?: React.ReactChild;
  hasValue?: boolean;
  theme?: PreciseTheme;
  defaultIcon?: React.ReactChild;
  onClear?(): void;
  onClick?(): void;
}

export const InputIcon: React.SFC<InputIconProps> = ({
  disabled,
  clearable,
  hasValue,
  error,
  theme,
  defaultIcon,
  onClear,
  onClick,
}) =>
  !disabled && clearable && hasValue ? (
    <StyledIconContainer
      onClick={() => {
        onClear && onClear();
        onClick && onClick();
      }}>
      <IconLink icon="Close" />
    </StyledIconContainer>
  ) : error ? (
    <StyledIconContainer onClick={onClick}>
      <Icon name="Error" color={theme ? theme.inputError : purpleRed} size="22px" />
    </StyledIconContainer>
  ) : defaultIcon ? (
    <StyledIconContainer onClick={onClick}>{defaultIcon}</StyledIconContainer>
  ) : //tslint:disable-next-line
  null;
