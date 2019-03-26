import * as React from 'react';
import styled from '../utils/styled';

export interface StyledTileIconProps {
  width: string;
  height: string;
  src?: string;
}

export const StyledTileIcon = styled('img')<StyledTileIconProps>`
  vertical-align: middle;
  border: none;
  max-width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  font-size: 50px;
  line-height: 50px;
  z-index: 2;
`;
