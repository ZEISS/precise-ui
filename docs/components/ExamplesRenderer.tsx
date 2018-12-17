import * as React from 'react';

interface ExamplesRendererProps {
  children: React.ReactNode;
}

const ExamplesRenderer: React.SFC<ExamplesRendererProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ExamplesRenderer;
