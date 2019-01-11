import * as React from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import { styled, distance, transparentize, colors, themes, Responsive } from '../../src';
import { ThemeProvider } from '../../src/utils/styled';
// @ts-ignore
import Ribbon from 'react-styleguidist/lib/rsg-components/Ribbon';
// @ts-ignore
import Logo from 'react-styleguidist/lib/rsg-components/Logo';

const tocColumnWidth = 200;

const DesktopContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
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
  padding-top: ${distance.medium};
  display: flex;
  height: 85px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
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
`;

const Title = styled.div`
  font-weight: bold;
  margin-top: ${distance.large};
`;

const Version = styled.div`
  margin-bottom: ${distance.medium};
`;

interface StyleGuideRendererProps {
  children: React.ReactNode;
  title: string;
  version: string;
  homepageUrl: string;
  toc: React.ReactNode;
  hasSidebar: boolean;
}

const ScrollToTop: React.SFC = () => {
  window.scrollTo(0, 0);
  //tslint:disable-next-line
  return null;
};

const StyleGuideRenderer: React.SFC<StyleGuideRendererProps> = ({ title, version, hasSidebar, children, toc }) => {
  return (
    <ThemeProvider theme={themes.light}>
      <BrowserRouter>
        <Responsive
          render={size =>
            size !== 'small' ? (
              <DesktopContainer>
                <Ribbon />
                <Route component={ScrollToTop} />
                {hasSidebar && (
                  <TocColumn>
                    <Info>
                      <Logo />
                      <Title>{title}</Title>
                      <Version>{version}</Version>
                    </Info>
                    {toc}
                  </TocColumn>
                )}
                <ContentColumn>
                  <Switch>
                    <Redirect exact from="/" to="/basics" />
                    <Route render={() => children} />
                  </Switch>
                </ContentColumn>
              </DesktopContainer>
            ) : (
              <MobileContainer>
                <Ribbon />
                <Route component={ScrollToTop} />
                <HeadLine>
                  <LogoSpace>
                    <Logo />
                  </LogoSpace>
                  <span>{version}</span>
                </HeadLine>
                <MobileContent>
                  <Switch>
                    <Redirect exact from="/" to="/basics" />
                    <Route render={() => children} />
                  </Switch>
                </MobileContent>
              </MobileContainer>
            )
          }
        />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default StyleGuideRenderer;
