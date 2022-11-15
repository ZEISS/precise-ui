import * as React from 'react';

/**
 * This interface is a replacement for React.FC type to make it compatible with React 18 consumers.
 *
 * With React 18, the React.FC interface was changed to not include the children by default.
 */
export interface ReactFC<G = {}> extends React.FC<G> {
  children?: React.ReactNode | undefined;
}
