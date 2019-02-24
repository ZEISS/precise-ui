import * as React from 'react';
import { Responsive, themes, ThemeProvider } from '../../src';
import { MobileLayout, DesktopLayout } from './Layout';
import { HomePage } from './HomePage';
import { AppState } from './context';

// @ts-ignore
import Ribbon from 'react-styleguidist/lib/rsg-components/Ribbon';
// @ts-ignore
import Logo from 'react-styleguidist/lib/rsg-components/Logo';
import { injectGlobal } from '../../src';

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
if (window.location.port === '6061') {
  injectGlobal`
  *, :before, :after {
    /*CSS transitions*/
    transition-property: none !important;
    /*CSS transforms*/
    transform: none !important;
    /*CSS animations*/
    animation: none !important;
  }
`;
}

const StyleGuideRenderer: React.SFC<StyleGuideRendererProps> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Responsive
        render={size => {
          const Layout = size !== 'small' ? DesktopLayout : MobileLayout;
          return (
            <Layout logo={<Logo />} ribbon={<Ribbon />} {...props}>
              {!window.location.hash ? <HomePage /> : children}
            </Layout>
          );
        }}
      />
    </ThemeProvider>
  );
};

export default StyleGuideRenderer;
