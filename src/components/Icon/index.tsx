import * as React from 'react';
import * as icons from './icons';
import styled from '../../utils/styled';
import { StandardProps } from '../../common';
import { IconName, IconNames } from './icon.types';
import { getIcon, registerIcons } from './registerIcons';
export * from './icon.types';

export interface IconProps extends StandardProps {
  /**
   * The name of the icon to display.
   */
  name: IconName;
  /**
   * The CSS color of the icon, otherwise uses the theme's foreground color.
   * @default currentColor
   */
  color?: string;
  /**
   * The CSS stroke color of the icon, otherwise is not defined.
   */
  stroke?: string;
  /**
   * @ignore
   */
  children?: void;
  /**
   * The relative (number) or absolute size of the icon, where 1
   * is the default size.
   */
  size?: number | string;
  /**
   * Event emitted when the icon is clicked.
   */
  onClick?(): void;
}

const StyledIcon = styled.i`
  display: inline-block;

  > svg {
    float: left;
  }
`;

/**
 * The icon component displays an icon from the given set of icons.
 */
export const Icon: React.SFC<IconProps> = ({ size = 1, name, stroke, color, ...rest }) => {
  const dim = typeof size === 'number' ? `${size}em` : size;
  const SvgIcon = icons[name] || getIcon(name);

  if (SvgIcon) {
    return (
      <StyledIcon {...rest}>
        <SvgIcon width={dim} height={dim} style={{ fill: color || 'currentColor', stroke }} />
      </StyledIcon>
    );
  } else if (process.env.NODE_ENV === 'development') {
    console.error(`An icon with the name ${name} could not be found.`);
  }

  // tslint:disable-next-line
  return null;
};
Icon.displayName = 'Icon';

export { registerIcons } from './registerIcons';
