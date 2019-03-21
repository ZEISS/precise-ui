import * as React from 'react';
import * as colors from '../../colors';
import styled from '../../utils/styled';
import { distance } from '../../distance';
import { Icon } from '../Icon';
import { getFontStyle } from '../../textStyles';

const StyledCloseButton = styled.a`
  ${getFontStyle({ size: 'medium' })}

  position: absolute;
  top: ${distance.medium};
  right: ${distance.medium};
  background-color: ${colors.transparent};
  padding: 0;
  border: none;
  align-self: start;
  cursor: pointer;
  color: ${colors.black};
  opacity: 0.2;
  transition: opacity 0.2s ease-out;

  &:hover {
    opacity: 0.5;
  }
`;

/**
 * A simple close button as used in Modal dialogs.
 */
export const CloseButton: React.SFC<React.HTMLAttributes<HTMLAnchorElement>> = props => (
  <StyledCloseButton {...props}>
    <Icon name="Close" size={1.1} />
  </StyledCloseButton>
);
CloseButton.displayName = 'CloseButton';
