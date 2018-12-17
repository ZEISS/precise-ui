import * as React from 'react';
import { IconLink } from '../../src';

interface ToolbarButtonRendererProps {
  href: string;
  onClick(): void;
  title: string;
  small: boolean;
  children: React.ReactNode;
}

const ToolbarButtonRenderer: React.SFC<ToolbarButtonRendererProps> = ({ onClick }) => {
  return <IconLink onClick={onClick} icon="FilterNone" />;
};

export default ToolbarButtonRenderer;
