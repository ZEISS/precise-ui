import * as React from 'react';
import styled from '../../utils/styled';
import { PositionType } from './SidebarPopup.types.part';

export interface SidebarContainer {
  open: boolean;
  position?: PositionType;
  size?: string;
}

export const SidebarContainer = styled.div<SidebarContainer>(
  ({ open, position = 'right' as PositionType, size = '275px' }) => {
    return `
    transition: all 0.3s cubic-bezier(0, 0, 0.25, 1);
    user-select: none;
    position: fixed;
    background-color: white;
    z-index: 100001;
    ${
      !open
        ? `
        visibility: hidden;
        opacity: 0;
        overflow: initial;
        `
        : `
        visibility: visible;
        opacity: 1;
        overflow: auto;
        `
    }
    ${getSizeStyles(position, size)}
    ${getPositionStyles(position, open, size)}
  `;
  },
);

function getSizeStyles(position: PositionType, size: string) {
  if (position === 'top' || position === 'bottom') {
    return `
      height: ${size}; 
      width: 100%;
    `;
  } else {
    return `
      width: ${size}; 
      height: 100%;
    `;
  }
}

function getPositionStyles(position: PositionType, open: boolean, size: string) {
  const opposite = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };

  const positionValue = {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
  };

  positionValue[opposite[position]] = 'auto';
  if (!open) {
    const match = size.match(/^(\d+)(.+?)$/);
    if (match) {
      positionValue[position] = `-${parseInt(match[1], undefined) / 2}${match[2]}`;
    } else {
      positionValue[position] = `-50%`;
    }
  }

  return (
    Object.keys(positionValue)
      .map(positionName => `${positionName}: ${positionValue[positionName]}`)
      .join(';') + ';'
  );
}
