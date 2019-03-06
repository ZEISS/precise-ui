import * as React from 'react';
import styled from '../../utils/styled';
import { StackPanel, StackPanelDirection } from '../StackPanel';
import { StandardProps } from '../../common';

export interface CardProps extends StandardProps {
  /**
   * Direction of the card is determining whether the card should be
   * layed-out from top to bottom (vertical) or from left to right (horizontal)
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Layout property lets the consumer to determine spacing distribution of th children
   * Default is 1 for ever child, meaning that all the child elements
   * will be distributed in a way that they share space equally
   */
  layout?: Array<number>;
  /**
   * Sets the children of the card to render.
   */
  children?: React.ReactNode;
}

export interface StyledCardChildProps {
  grow?: number;
}

const StyledCard = styled(StackPanel)`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;

const StyledCardChildWrapper = styled.div<StyledCardChildProps>`
  box-sizing: border-box;
  overflow: auto;
  transition: flex-grow 0.4s;
  ${props =>
    props.grow
      ? `
    flex-grow: ${props.grow};
    flex-basis: 0;`
      : ''};
`;

export const Card: React.SFC<CardProps> = ({ orientation = 'vertical', children, layout: propsLayout, ...rest }) => {
  const layout = propsLayout || React.Children.map(children, _ => 0);
  const cardChildComponents: Array<any> = [];
  React.Children.forEach(children, (child: React.ComponentElement<any, any>, index) => {
    if (!child) {
      return;
    }
    const { children: grandChildren, ...childProps } = child.props;
    const sticky = children && child.type && child.type.displayName === 'Sticky';
    cardChildComponents.push(
      sticky ? (
        <child.type key={index} {...childProps}>
          {grandChildren}
        </child.type>
      ) : (
        <StyledCardChildWrapper key={index} grow={layout[index]}>
          <child.type {...childProps}>{grandChildren}</child.type>
        </StyledCardChildWrapper>
      ),
    );
  });

  return (
    <StyledCard
      direction={orientation === 'vertical' ? StackPanelDirection.topToBottom : StackPanelDirection.leftToRight}
      {...rest}>
      {cardChildComponents}
    </StyledCard>
  );
};
Card.displayName = 'Card';
