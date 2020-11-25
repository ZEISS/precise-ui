import * as React from 'react';
import { StandardProps } from '../../common';
import { TabOptions, withTabControl } from '../TabControl';
import { ResponsiveSwitchPanel } from './ResponsiveSwitchPanel.part';
import { ContentSwitchOrientation } from './ContentSwitchTypes.part';
import { ContentItem } from './ContentSwitch.part';

export { ContentSwitchOrientation };

export interface ContentSwitchProps extends TabOptions, StandardProps {
  /**
   * The children, usually passed as a collection of Content switch elements.
   */
  children?: React.ReactNode;
  /**
   * Optionally sets the content switch mode to use.
   */
  orientation?: ContentSwitchOrientation;
}

const SwitchPanel = withTabControl(ResponsiveSwitchPanel);

export const ContentSwitch: React.FC<ContentSwitchProps> = ({ theme, orientation, children, ...props }) => {
  return (
    <SwitchPanel tabItemRenderer={ContentItem} theme={theme} orientation={orientation} {...props}>
      {children}
    </SwitchPanel>
  );
};

ContentSwitch.displayName = 'ContentSwitch';
