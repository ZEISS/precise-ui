import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { themes, Responsive, ThemeProvider, PreciseTheme } from '../../src';
import { HomePage } from './HomePage';
import { MobileLayout, DesktopLayout } from './Layout';
// @ts-ignore
import Ribbon from 'react-styleguidist/lib/rsg-components/Ribbon';
// @ts-ignore
import Logo from 'react-styleguidist/lib/rsg-components/Logo';

interface StyleGuideRendererProps {
  title: string;
  version: string;
  homepageUrl: string;
  toc: React.ReactNode;
  hasSidebar: boolean;
}

interface AppState {
  theme: PreciseTheme;
}

declare global {
  interface Window {
    setContext?<K extends keyof AppState>(state: Pick<AppState, K>): void;
    context: AppState;
  }
}

class App extends React.Component<StyleGuideRendererProps, AppState> {
  state = {
    theme: themes.light,
  };

  componentDidMount() {
    window.setContext = ctx => {
      this.setState(ctx, () => {
        window.context = this.state;
      });
    };
    window.context = this.state;
  }

  componentWillUnmount() {
    window.setContext = undefined;
  }

  render() {
    const { children, ...props } = this.props;
    const { theme } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Responsive
          render={size => {
            const Layout = size !== 'small' ? DesktopLayout : MobileLayout;
            return (
              <Layout logo={<Logo />} ribbon={<Ribbon />} {...props}>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route render={() => children} />
                </Switch>
              </Layout>
            );
          }}
        />
      </ThemeProvider>
    );
  }
}

const StyleGuideRenderer: React.SFC<StyleGuideRendererProps> = props => (
  <BrowserRouter>
    <App {...props} />
  </BrowserRouter>
);

export default StyleGuideRenderer;
