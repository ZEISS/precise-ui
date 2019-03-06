import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { StandardProps } from '../../common';
import { remCalc } from '../../utils/remCalc';

export interface ListItemProps extends StandardProps {
  /**
   * Whether the button is active.
   */
  active?: boolean;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * If `true`, padding will be removed from the list.
   */
  disablePadding?: boolean;
  /**
   * If `true`, a border is added around the list item. Default is true.
   */
  border?: boolean;
}

const Bordered = css`
  border: 1px solid rgba(0, 0, 0, 0.125);
`;

const StyledListItem = styled('li')<ListItemProps>`
  background-color: ${themed(props => props.theme.ui1)};
  color: ${themed(props => (props.active ? props.theme.primary : props.theme.text6))};
  ${props => (props.border ? Bordered : '')};
  margin-bottom: -1px;
  padding: ${props => (props.disablePadding ? '0' : remCalc(['12', '20']))};
  position: relative;
  text-decoration: none;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ListItem: React.SFC<ListItemProps> = ({ border = true, ...props }) => (
  <StyledListItem {...props} border={border} />
);
ListItem.displayName = 'ListItem';
