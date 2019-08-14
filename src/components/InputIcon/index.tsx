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
}

export const InputIcon: React.SFC<InputIconProps> = ({
  disabled,
  clearable,
  hasValue,
  error,
  theme,
  defaultIcon,
  onClear,
}) =>
  !disabled && clearable && hasValue ? (
    <StyledIconContainer onClick={onClear}>
      <IconLink icon="Close" />
    </StyledIconContainer>
  ) : error ? (
    <StyledIconContainer>
      <Icon name="Error" color={theme ? theme.inputError : purpleRed} size="22px" />
    </StyledIconContainer>
  ) : defaultIcon ? (
    <StyledIconContainer>{defaultIcon}</StyledIconContainer>
  ) : //tslint:disable-next-line
  null;
