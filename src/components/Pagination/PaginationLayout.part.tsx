import * as React from 'react';
import styled from '../../utils/styled';
import { remCalc } from '../../utils/remCalc';
import { dark } from '../../colors';

const RootContainer = styled.div`
  font-size: ${remCalc('14px')};
  color: ${dark};
`;

export interface PaginationProps {
  host?: string | React.ComponentClass | React.StatelessComponent;
  controls: React.ReactChild;
  content: React.ReactNode;
}

export const PaginationLayout: React.SFC<PaginationProps> = ({ host = 'div', controls, content, ...props }) => {
  const Content = host;
  return (
    <RootContainer>
      <Content {...props}>{content}</Content>
      {controls}
    </RootContainer>
  );
};
