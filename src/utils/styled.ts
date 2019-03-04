/* tslint:disable:import-blacklist */
import * as React from 'react';
import * as styledComponents from 'styled-components';
import {
  ThemedStyledComponentsModule,
  ThemedCssFunction,
  StyledFunction,
  ThemedStyledProps,
  InterpolationFunction,
} from 'styled-components';
import { light } from './../themes';
import { PreciseTheme, PreciseFullTheme, Omit } from '../common';

const {
  default: styled,
  css,
  keyframes,
  createGlobalStyle,
  withTheme,
  ThemeProvider,
  ThemeConsumer,
  ThemeContext,
  isStyledComponent,
  ServerStyleSheet,
  StyleSheetManager,
} = styledComponents as ThemedStyledComponentsModule<PreciseTheme>;

export type WithOptionalTheme<P extends { theme?: T }, T> = Omit<P, 'theme'> & { theme?: T };

export type PreciseInterpolationFunc<Props, Theme> = InterpolationFunction<
  ThemedStyledProps<WithOptionalTheme<Props, Theme>, Theme>
>;

/*
  Helper function which insures that theme is always available in the interpolation callback.
*/
export const themed = <Props>(interpolation: PreciseInterpolationFunc<Props, PreciseFullTheme>) => (
  props: ThemedStyledProps<Props, PreciseTheme>,
) => {
  const { theme, ...rest } = props as ThemedStyledProps<any, PreciseTheme>;

  const hasNestedProps = (prop: object) =>
    typeof prop === 'object' && !Array.isArray(prop) && Object.keys(prop).length > 0;

  const mergedTheme = Object.keys(theme).reduce(
    (acc, prop) => (
      hasNestedProps(theme[prop]) ? (acc[prop] = { ...acc[prop], ...theme[prop] }) : (acc[prop] = theme[prop]), acc
    ),
    { ...light },
  );
  return interpolation({ theme: mergedTheme, ...rest });
};

export {
  css,
  keyframes,
  createGlobalStyle,
  withTheme,
  ThemeProvider,
  ThemeConsumer,
  ThemeContext,
  isStyledComponent,
  ServerStyleSheet,
  StyleSheetManager,
  ThemedCssFunction,
};

export default styled;
