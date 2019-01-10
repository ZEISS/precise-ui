import * as React from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import { styled, distance, transparentize, colors, themes } from '../../src';
import { ThemeProvider } from '../../src/utils/styled';
// @ts-ignore
import Ribbon from 'react-styleguidist/lib/rsg-components/Ribbon';
// @ts-ignore
import Logo from 'react-styleguidist/lib/rsg-components/Logo';

const tocColumnWidth = 200;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
  position: relative;
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
        <Container>
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
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default StyleGuideRenderer;
