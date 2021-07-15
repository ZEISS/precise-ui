import * as React from 'react';

interface ExamplesRendererProps {
  children: React.ReactNode;
}

const ExamplesRenderer: React.FC<ExamplesRendererProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ExamplesRenderer;
