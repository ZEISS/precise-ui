import * as React from 'react';
import { IconLink, clipboardCopy, styled } from '../../src';

interface PathlineRendererProps {
  children: React.ReactNode;
}

const StyledIconLink = styled(IconLink)`
  font-size: 0.8em;
  font-family: Consolas, 'Liberation Mono', Menlo, monospace;
`;

const PathlineRenderer: React.SFC<PathlineRendererProps> = ({ children }) => {
  return (
    <StyledIconLink icon="ContentCopy" onClick={() => clipboardCopy(children as string)}>
      {children}
    </StyledIconLink>
  );
};

export default PathlineRenderer;
