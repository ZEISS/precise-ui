import * as React from 'react';
import styled, { themed, css } from '../utils/styled';

const IncreaseDecreaseContainer = styled.span`
  width: 4px;
  position: relative;
  &:before {
    content: ' ';
    white-space: pre;
  }
`;

const IncreaseDecreaseArrow = styled.div<{ active?: boolean }>`
  width: 8px;
  height: 4px;
  position: absolute;
  cursor: pointer;
  left: 0;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  }
`;

const getBorderStyle = (position: 'top' | 'bottom', active = false) => css`
  border-${position}: 4px solid ${themed(({ theme }) => (active ? theme.ui5 : theme.ui4))};
`;

const IncreaseDecreaseArrowUp = styled(IncreaseDecreaseArrow)`
  top: 4px;

  &:before {
    ${({ active }) => getBorderStyle('bottom', active)}
  }

  &:hover:before {
    ${getBorderStyle('bottom', true)}
  }
`;

const IncreaseDecreaseArrowDown = styled(IncreaseDecreaseArrow)`
  bottom: 4px;

  &:before {
    ${({ active }) => getBorderStyle('top', active)}
  }

  &:hover:before {
    ${getBorderStyle('top', true)}
  }
`;

export interface IncreaseDecreaseProps {
  /**
   * Event which fires when increase button was clicked.
   */
  onIncrease?(e: React.MouseEvent): void;
  /**
   * Event which fires when decrease button was clicked.
   */
  onDecrease?(e: React.MouseEvent): void;
  /**
   * Highlights increase or decrease button.
   */
  value?: 'increase' | 'decrease';
}

export const IncreaseDecrease: React.FC<IncreaseDecreaseProps> = ({ onIncrease, onDecrease, value, ...props }) => {
  return (
    <IncreaseDecreaseContainer {...props}>
      <IncreaseDecreaseArrowUp onClick={onIncrease} active={value === 'increase'} />
      <IncreaseDecreaseArrowDown onClick={onDecrease} active={value === 'decrease'} />
    </IncreaseDecreaseContainer>
  );
};
