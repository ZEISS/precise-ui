import * as React from 'react';

/**
 * This interface needs to be added to a property type that is used on `React.Component`.
 *
 * With React 18, React.Component and React.FC don't include children types anymore.
 */
export interface ReactComponentDefaultProps {
  children?: React.ReactNode | undefined;
}
