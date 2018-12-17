import * as React from 'react';
import { StandardProps } from '../../common';

export interface TabPageProps extends StandardProps {
  /**
   * The title of the tab in the tabs selection.
   */
  header: React.ReactChild;
  /**
   * The content of the tab to be rendered if active.
   */
  children?: React.ReactNode;
}

/**
 * The tab page component to define a single tab within a tabs component.
 */
export const TabPage: React.SFC<TabPageProps> = ({ header: _0, ...props }) => <div {...props} />;
TabPage.displayName = 'TabPage';
