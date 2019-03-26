import * as React from 'react';
import { IconLink } from '../../src';

interface TabButtonRendererProps {
  name: string;
  onClick(): void;
  active: boolean;
  children: React.ReactNode;
}

const TabButtonRenderer: React.SFC<TabButtonRendererProps> = ({ onClick, active, children }) => {
  return (
    <IconLink onClick={onClick} icon={active ? 'KeyboardArrowUp' : 'KeyboardArrowDown'}>
      {children}
    </IconLink>
  );
};

export default TabButtonRenderer;
