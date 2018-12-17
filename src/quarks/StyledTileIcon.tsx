import * as React from 'react';
import styled from '../utils/styled';

export interface StyledTileIconProps {
  width: string;
  height: string;
  src?: string;
}

export const StyledTileIcon: React.ComponentType<StyledTileIconProps> = styled.img`
  vertical-align: middle;
  border: none;
  max-width: ${(props: StyledTileIconProps) => props.width};
  height: ${(props: StyledTileIconProps) => props.height};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  font-size: 50px;
  line-height: 50px;
  z-index: 2;
`;
