import * as React from 'react';
import { ThemeProvider } from '../../src';

const ThemeWrapper: React.SFC = ({ children }) => {
  const { theme } = (window as any).context;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
