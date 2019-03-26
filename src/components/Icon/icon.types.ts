import * as icons from './icons';

declare global {
  interface AdditionalIconNames {}
}

export type IconName = keyof typeof icons | keyof AdditionalIconNames;
export const IconNames = Object.keys(icons);
