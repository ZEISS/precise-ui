import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { cyan } from '../../colors';

export interface MenuListItemProps extends StandardProps {
  /**
   * Whether the button is active.
   */
  active?: boolean;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Making a row more condensed
   */
  condensed?: boolean;
}

const ActiveStyle = css`
  &:before {
    position: absolute;
    content: '';
    width: 4px;
    height: 100%;
    background: ${cyan};
    left: 0;
  }
`;

const StyledMenuListItem = styled<MenuListItemProps, 'li'>('li')`
  display: flex;
  position: relative;
  align-items: center;
  color: ${themed(props => props.theme.text)};
  text-decoration: none;
  height: ${({ condensed }) => (condensed ? distance.xlarge : distance.xxlarge)};
  padding: 0 0 0 ${distance.large};
  ${({ active }) => (active ? ActiveStyle : '')};
`;

export const MenuListItem: React.SFC<MenuListItemProps> = ({ active = false, condensed = false, ...props }) => (
  <StyledMenuListItem {...props} condensed={condensed} active={active} />
);

MenuListItem.displayName = 'MenuListItem';
