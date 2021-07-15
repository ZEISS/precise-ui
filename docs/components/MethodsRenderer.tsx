import * as React from 'react';

interface MethodsRendererProps {
  methods: Array<{
    name: string;
    description: string;
    returns: any;
    params: Array<any>;
    tags: any;
  }>;
}

const MethodsRenderer: React.FC<MethodsRendererProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default MethodsRenderer;
