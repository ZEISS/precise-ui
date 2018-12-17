import * as React from 'react';
import styled, { themed } from '../utils/styled';
import { distance } from '../distance';
import { PreciseTheme } from '../common';

export interface StyledTagItemProps {
  theme?: PreciseTheme;
}

export const StyledTagItem: React.ComponentType<StyledTagItemProps> = styled.span`
  margin: 0 ${distance.small} 0 0;
  padding: ${distance.xsmall} ${distance.small};
  background-color: ${themed(props => props.theme.ui4)};
  color: ${themed(props => props.theme.tagColor)};
  display: inline-block;
  border-radius: 3px;
  font-size: 0.8em;
  line-height: 0.8em;
  border: 0;
`;
