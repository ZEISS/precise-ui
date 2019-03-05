import * as React from 'react';
import styled from '../../utils/styled';
import { StandardProps } from '../../common';

export interface StickyProps extends StandardProps {
  children: React.ReactNode;
  /**
   * Property which determines where the component should stick
   * Default is bottom
   */
  position?: 'bottom' | 'top' | 'left' | 'right';
}

const StyledSticky = styled.div<StickyProps>`
  ${props => `${props.position}: 0;`} position: absolute;
  box-sizing: border-box;
  flex: 1 1 auto;
`;

export const Sticky: React.SFC<StickyProps> = props => {
  const { position = 'bottom', ...rest } = props;
  return (
    <StyledSticky position={position} {...rest}>
      {props.children}
    </StyledSticky>
  );
};

Sticky.displayName = 'Sticky';
