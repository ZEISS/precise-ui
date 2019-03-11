import * as React from 'react';
import { Responsive, themes, ThemeProvider } from '../../src';
import { MobileLayout, DesktopLayout } from './Layout';
import { HomePage } from './HomePage';
import { AppState } from './context';

// @ts-ignore
import Ribbon from 'react-styleguidist/lib/rsg-components/Ribbon';
// @ts-ignore
import Logo from 'react-styleguidist/lib/rsg-components/Logo';
import { createGlobalStyle } from '../../src';

interface StyleGuideRendererProps {
  title: string;
  version: string;
  homepageUrl: string;
  toc: React.ReactNode;
  hasSidebar: boolean;
}

function useTheme() {
  const [state, setState] = React.useState<AppState>({ theme: themes.light });

  React.useEffect(() => {
    window.setContext = ctx => {
      const nextState = { ...state, ...ctx };
      setState(nextState);
      window.context = nextState;
    };

    window.context = state;

    return () => {
      window.setContext = undefined;
    };
  }, []);

  return state.theme;
}

/*
  CSS animations should be disabled to ensure that animations don't 
  affect `react-styleguidist-visual` screenshots
*/
const GlobalStyle = createGlobalStyle`
  *, :before, :after {
    transition-property: none !important;
    transform: none !important;
    animation: none !important;
    font-family: sans-serif;
  }

  body {
    overflow: hidden;
  }
`;

const StyleGuideRenderer: React.SFC<StyleGuideRendererProps> = ({ children, hasSidebar, ...props }) => {
  const theme = useTheme();
  const isTest = process.env.NODE_ENV === 'test';

  return (
    <>
      {isTest && <GlobalStyle />}
      <ThemeProvider theme={theme}>
        <Responsive
          render={size => {
            const Layout = size !== 'small' ? DesktopLayout : MobileLayout;
            return (
              <Layout logo={<Logo />} ribbon={<Ribbon />} {...props} hasSidebar={!isTest && hasSidebar}>
                {!window.location.hash ? <HomePage /> : children}
              </Layout>
            );
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default StyleGuideRenderer;
