import * as React from 'react';

interface SectionsRendererProps {
  children: React.ReactNode;
}

const SectionsRenderer: React.SFC<SectionsRendererProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default SectionsRenderer;
