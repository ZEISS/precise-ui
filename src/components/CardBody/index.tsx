import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';

export interface CardBodyProps extends StandardProps {
  /**
   * Content for the body.
   */
  children?: React.ReactNode;
}

const StyledCardBody = styled.div`
  box-sizing: border-box;
  position: relative;
  flex: 1 1 auto;
  padding: ${distance.medium} ${distance.small} ${distance.medium};
  height: 100%;

  p {
    font-family: ${themed(props => props.theme.fontFamily || 'inherit')};
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
  }
`;

/**
 * Represents a simple re-usable card body container.
 */
export const CardBody: React.SFC<CardBodyProps> = props => <StyledCardBody {...props} />;
CardBody.displayName = 'CardBody';
