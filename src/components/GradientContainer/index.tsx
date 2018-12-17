import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { transparent } from '../../colors';

const StyledContainer = styled.div`
  overflow: hidden;
  position: relative;

  :before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to bottom, ${transparent}, ${themed(({ theme }) => theme.ui1)});
  }
`;

export const GradientContainer: React.SFC<StandardProps> = props => <StyledContainer {...props} />;
GradientContainer.displayName = 'GradientContainer';
