import * as React from 'react';
import { Headline } from '../../src';

interface SectionHeadingRendererProps {
  children: React.ReactNode;
  toolbar: React.ReactNode;
  id: string;
  href: string;
  /**
   * 1-based depth, e.g., basics = 1, any component = 2
   */
  depth: number;
  deprecated: boolean;
}

const SectionHeadingRenderer: React.SFC<SectionHeadingRendererProps> = ({ children, depth }) => {
  return <Headline level={(depth + 1) as any}>{children}</Headline>;
};

export default SectionHeadingRenderer;
