import * as React from 'react';
import styled, { themed } from '../utils/styled';
import { distance } from '../distance';
import { PreciseTheme } from '../common';

export interface StyledTagItemProps {
  theme?: PreciseTheme;
}

export const StyledTagItem = styled('span')<StyledTagItemProps>`
  padding: ${distance.xsmall} ${distance.small};
  background-color: ${themed(props => props.theme.ui4)};
  color: ${themed(props => props.theme.tagColor)};
  display: inline-block;
  font-size: 0.8em;
  line-height: 0.8em;
  border: 0;
`;
