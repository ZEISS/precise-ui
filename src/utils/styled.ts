/* tslint:disable:import-blacklist */
import * as React from 'react';
import * as styledComponents from 'styled-components';
import {
  ThemedStyledComponentsModule,
  ThemedCssFunction,
  StyledFunction,
  ThemedStyledProps,
  InterpolationFunction,
  StyledComponentClass,
} from 'styled-components';
import { light } from './../themes';
import { PreciseTheme, PreciseFullTheme, Omit, Component } from '../common';

const {
  default: styled,
  css,
  keyframes,
  injectGlobal,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<PreciseTheme>;

export type WithOptionalTheme<P extends { theme?: T }, T> = Omit<P, 'theme'> & { theme?: T };

export interface WithTheme {
  <P extends { theme?: PreciseTheme }>(component: Component<P>): React.ComponentClass<
    WithOptionalTheme<P, PreciseTheme>
  >;
}

export type PreciseInterpolationFunc<Props, Theme> = InterpolationFunction<
  ThemedStyledProps<WithOptionalTheme<Props, Theme>, Theme>
>;

export type ThemedStyledFactories<FullTheme, PropsTheme> = {
  [TTag in keyof JSX.IntrinsicElements]: <P>(
    interpolation: PreciseInterpolationFunc<P, FullTheme>,
  ) => StyledComponentClass<P, PropsTheme>
};

export interface ThemedStyled<FullTheme, PropsTheme> extends ThemedStyledFactories<FullTheme, PropsTheme> {
  <P, TTag extends keyof JSX.IntrinsicElements>(tag: TTag): (
    interpolation: PreciseInterpolationFunc<P, FullTheme>,
  ) => StyledComponentClass<P, PropsTheme>;

  <P, O>(component: StyledComponentClass<P, PropsTheme, O>): (
    interpolation: PreciseInterpolationFunc<P, FullTheme>,
  ) => StyledComponentClass<P, PropsTheme, O>;

  <P extends { theme: PropsTheme }>(component: React.ComponentClass<P>): (
    interpolation: PreciseInterpolationFunc<P, FullTheme>,
  ) => StyledComponentClass<P, PropsTheme>;

  <P>(component: React.ComponentClass<P>): (
    interpolation: PreciseInterpolationFunc<P, FullTheme>,
  ) => StyledComponentClass<P, PropsTheme>;

  <P extends { [prop: string]: any; theme?: PropsTheme }>(component: React.StatelessComponent<P>): (
    interpolation: PreciseInterpolationFunc<P, FullTheme>,
  ) => StyledComponentClass<P, PropsTheme>;
}

export const withTheme = styledComponents.withTheme as WithTheme;

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

/* Helper function which allows instead of:
  styled<{ isActive: boolean }>(Component)`
    color: ${themed(({ theme }) => theme.color)};
    background: ${themed(({ theme }) => theme.background)};
    border-color: ${themed(({ theme, isActive }) => (isActive ? theme.ui3 : theme.ui2))};
  `;

  to write:

  reStyled<{ isActive: boolean }>(Component)(
      ({ theme, isActive }) => `
      color: ${theme.color};
      background: ${theme.background};
      border-color: ${isActive ? theme.ui3 : theme.ui2};
    `,
  );
*/
export const reStyled = <ThemedStyled<PreciseFullTheme, PreciseTheme>>function(component: any) {
  return (interpolation: any) => styled(component)`
    ${themed(interpolation)};
  `;
};

for (const domElement of Object.keys(styled)) {
  reStyled[domElement] = reStyled(domElement as keyof JSX.IntrinsicElements);
}

export { css, keyframes, injectGlobal, ThemeProvider, ThemedCssFunction, StyledFunction, StyledComponentClass };
export default styled;
