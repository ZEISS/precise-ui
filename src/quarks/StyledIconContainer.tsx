import * as React from 'react';
import styled from '../utils/styled';
import { distance } from '../distance';

export interface StyledIconProps extends React.HTMLAttributes<HTMLDivElement> {}

export const StyledIconContainer = styled('div')<StyledIconProps>`
  padding: 0 ${distance.medium};

  i {
    display: block;
  }

  & + & {
    padding-left: 0;
  }
`;
