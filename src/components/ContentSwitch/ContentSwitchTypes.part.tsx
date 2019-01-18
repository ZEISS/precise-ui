import { StandardProps } from '../../common';
import { ResponsiveComponentProps } from '../../hoc/withResponsive';
import { TabControlItem } from '../TabControl';

export type ContentSwitchOrientation = 'vertical' | 'horizontal';

export interface ContentSwitchProps extends StandardProps, ResponsiveComponentProps {
  items: Array<TabControlItem>;
  children?: void;
  /**
   * @default vertical
   */
  orientation?: ContentSwitchOrientation;
}

export interface HeadersProps {
  orientation: ContentSwitchOrientation;
}

export interface TabHeaderProps extends StandardProps {
  orientation?: ContentSwitchOrientation;
  active?: boolean;
}
