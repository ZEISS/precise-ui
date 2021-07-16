import { StandardProps } from '../../common';
import { ResponsiveComponentProps } from '../../hoc/withResponsive';
import { TabControlHolderProps } from '../TabControl';

export type ContentSwitchOrientation = 'vertical' | 'horizontal';

export interface ContentSwitchPropsInt extends StandardProps, ResponsiveComponentProps, TabControlHolderProps {
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
