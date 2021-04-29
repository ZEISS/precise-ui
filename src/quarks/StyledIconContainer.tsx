import * as React from 'react';
import styled from '../utils/styled';
import { distance } from '../distance';

export type StyledIconProps = React.HTMLAttributes<HTMLDivElement>;

export const StyledIconContainer = styled('div')<StyledIconProps>`
  padding: 0 ${distance.medium};

  i {
    display: block;
  }

  & + & {
    padding-left: 0;
  }
`;
