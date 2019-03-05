import * as React from 'react';
import styled from '../../utils/styled';
import { StandardProps } from '../../common';

export interface StackItemProps extends StandardProps {
  /**
   * Sets the items's children.
   */
  children?: React.ReactNode;
  /**
   * Sets the width of the item.
   */
  width?: string;
  /**
   * Sets the height of the item.
   */
  height?: string;
  /**
   * Determines if the item should not fill the remaining space.
   */
  nofill?: boolean;
}

const StackChild = styled.div<StackItemProps>`
  flex-grow: ${props => (props.nofill ? '0' : '1')};
  min-width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
`;

/**
 * The stack item displays a single item within a stack panel.
 */
export class StackItem extends React.PureComponent<StackItemProps> {
  render() {
    const { children, ...props } = this.props;
    return <StackChild {...props}>{children}</StackChild>;
  }
}
