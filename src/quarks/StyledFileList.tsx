import * as React from 'react';
import styled from '../utils/styled';
import { distance } from '../distance';
import { PreciseTheme } from '../common';

export interface StyledFileListProps {
  theme?: PreciseTheme;
}

export const StyledFileList = styled('ul')<StyledFileListProps>`
  list-style: none;
  margin: ${distance.large} 0 0 0;
  padding: 0;
`;
