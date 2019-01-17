import * as React from 'react';
import { BrowserRouter, Switch, Route, Link, RouteComponentProps } from 'react-router-dom';
import { styled, distance, transparentize, colors, themes, Responsive, ThemeProvider, PreciseTheme } from '../../src';
import { MobileMenu } from './MobileMenu';
import { HomePage } from './HomePage';
// @ts-ignore
import Ribbon from 'react-styleguidist/lib/rsg-components/Ribbon';
// @ts-ignore
import Logo from 'react-styleguidist/lib/rsg-components/Logo';

const tocColumnWidth = 200;

const DesktopContainer = styled.div`
  width: 100%;
  position: relative;
`;

const MobileContainer = styled.div`
  position: relative;
  width: 100%;
`;

const TocColumn = styled.div`
  width: ${tocColumnWidth}px;
  padding-bottom: ${distance.xxlarge};
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  box-shadow: 0 2px 8px 0 ${transparentize(colors.tuna, 0.2)};
`;

const HeadLine = styled.div`
  position: relative;
  padding-top: ${distance.medium};
  display: flex;
  height: 85px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

const LogoLink = styled(Link)`
  h1 {
    cursor: pointer;
    display: block;
  }
`;

const LogoSpace = styled.div`
  width: 90px;
`;

const MobileContent = styled.div`
  padding: ${distance.medium};
  padding-top: 0;
`;

const ContentColumn = styled.div`
  flex: 1;
  padding: ${distance.xxlarge} ${distance.xlarge};
  margin-left: ${tocColumnWidth}px;
`;

const Info = styled.div`
  padding: ${distance.medium};
  margin-bottom: ${distance.medium};
`;

const Title = styled.div`
  font-weight: bold;
  margin-top: ${distance.large};
`;

const Version = styled.div`
  color: ${colors.grey3};
`;

interface StyleGuideRendererProps {
  children: React.ReactNode;
  title: string;
  version: string;
  homepageUrl: string;
  toc: React.ReactNode;
  hasSidebar: boolean;
}

class ScrollToTop extends React.Component<RouteComponentProps> {
  componentWillReceiveProps(nextProps: RouteComponentProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return false;
  }
}

declare global {
  interface Window {
    setContext: any;
    context: any;
  }
}

class App extends React.Component<StyleGuideRendererProps> {
  state = {
    theme: themes.light,
  };

  componentDidMount() {
    window.setContext = (ctx: any) =>
      this.setState(ctx, () => {
        window.context = this.state;
      });
    window.context = this.state;
  }

  componentWillUnmount() {
    window.setContext = undefined;
  }

  render() {
    const { title, version, hasSidebar, children, toc } = this.props;
    const { theme } = this.state;

    const routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route render={() => children} />
      </Switch>
    );
    const logo = (
      <LogoLink to="/">
        <Logo />
      </LogoLink>
    );
    return (
      <ThemeProvider theme={theme}>
        <Responsive
          render={size =>
            size !== 'small' ? (
              <DesktopContainer>
                <Ribbon />
                <Route component={ScrollToTop} />
                {hasSidebar && (
                  <TocColumn>
                    <Info>
                      {logo}
                      <Title>{title}</Title>
                      <Version>{version}</Version>
                    </Info>
                    {toc}
                  </TocColumn>
                )}
                <ContentColumn>{routes}</ContentColumn>
              </DesktopContainer>
            ) : (
              <MobileContainer>
                <Route component={ScrollToTop} />
                <HeadLine>
                  <MobileMenu toc={toc} />
                  <LogoSpace>{logo}</LogoSpace>
                  <Version>{version}</Version>
                </HeadLine>
                <Ribbon />
                <MobileContent>{routes}</MobileContent>
              </MobileContainer>
            )
          }
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
