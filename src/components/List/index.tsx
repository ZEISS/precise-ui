import * as React from 'react';
import styled, { css } from '../../utils/styled';
import { StandardProps } from '../../common';

export interface ListProps extends StandardProps {
  /**
   * Index of the active item.
   */
  activeItem?: number;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Switches the default to render a border on each list item.
   */
  borderless?: boolean;
  /**
   * If `true`, padding will be removed from the children list.
   * Used to remove padding from the child components.
   */
  disablePadding?: boolean;
  /**
   * Shows the given bullet style.
   * @default 'none'
   */
  bullets?: 'none' | 'disc' | 'square';
}

const Bulleted = css`
  padding: 0;
`;

const StyledList = styled.ul<ListProps>`
  flex: 1 1 auto;
  flex-direction: column;
  margin: 0;
  position: relative;
  overflow-x: hidden;
  list-style: ${props => props.bullets || 'none'};
  ${props => (props.bullets && props.bullets !== 'none' ? '' : Bulleted)};
`;

/**
 * General purpose list component which can be used for rendering list items.
 */
export const List: React.SFC<ListProps> = ({ disablePadding, borderless, children, activeItem, ...props }) => {
  const listItems = React.Children.map(children, (child: React.ReactElement<any>, index) =>
    React.cloneElement(child, {
      ...(disablePadding !== undefined ? { disablePadding } : undefined),
      ...(borderless !== undefined ? { border: !borderless } : undefined),
      ...child.props,
      ...(activeItem !== undefined ? { active: index === activeItem } : {}),
    }),
  );

  return <StyledList {...props}>{listItems}</StyledList>;
};
List.displayName = 'List';
