import * as React from 'react';
import { styled } from '../../src';

interface CodeRendererProps {}

const CodeBox = styled.code`
  font-family: Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: inherit;
  color: inherit;
  background: transparent;
  white-space: pre-wrap;
`;

const CodeRenderer: React.SFC<CodeRendererProps> = ({ children }) => {
  return <CodeBox dangerouslySetInnerHTML={{ __html: children as any }} />;
};

export default CodeRenderer;
