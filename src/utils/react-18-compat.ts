import * as React from 'react';

/**
 * This interface needs to be added to a property type that is used on `React.Component`.
 *
 * With React 18, React.Component doesn't include children types anymore.
 */
export interface ReactComponentDefaultProps {
  children?: React.ReactNode | undefined;
}

/**
 * This interface is a replacement for React.FC type to make it compatible with React 18 consumers.
 *
 * With React 18, React.FC doesn't include children types anymore.
 */
export interface ReactFC<G = {}> extends React.FC<G>, ReactComponentDefaultProps {}
