import * as React from 'react';
import { SvgIconProps } from './icons';
import { IconNames } from './icon.types';

export interface IconDefinitions {
  [key: string]: JSX.Element;
}

export const registeredIcons: IconDefinitions = {};

/**
 * Registers subset of SVG icons.
 * @param icons  Map of icons with SVG definition.
 *
 * To be able to register icons and extend type definitions in Typescript,
 * interface `AdditionalIconNames `with registered icon names should be provided
 * in global scope for interface augmentation. Example shown below
 *
 * @example
 *
 * ```
 * declare global {
 *   interface AdditionalIconNames {
 *     Foo: string;
 *     Bar: string;
 *   }
 * }
 *
 * registerIcons({
 *   Foo: *some svg value*,
 *   Bar: *some svg value*,
 * })
 * ```
 */

export function registerIcons(icons: IconDefinitions) {
  for (const name in icons) {
    if (process.env.NODE_ENV === 'development' && (registeredIcons[name] || IconNames[name])) {
      console.error(`An icon with the name ${name} is already registered`);
    }

    registeredIcons[name] = icons[name];
  }
}

export function getIcon(name: string): React.SFC<SvgIconProps> | undefined {
  if (registeredIcons[name]) {
    return (props: SvgIconProps) => React.cloneElement(registeredIcons[name], props);
  }
  return undefined;
}
