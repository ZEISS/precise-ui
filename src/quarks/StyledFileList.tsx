import * as React from 'react';
import styled, { reStyled } from '../utils/styled';
import { distance } from '../distance';
import { PreciseTheme } from '../common';

export interface StyledFileListProps {
  theme?: PreciseTheme;
}

export const StyledFileList: React.ComponentClass<StyledFileListProps> = styled.ul`
  list-style: none;
  margin: ${distance.large} 0 0 0;
  padding: 0;
`;
