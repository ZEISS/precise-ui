import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { styled, transparentize, distance, colors } from '../../src';
import { ScrollToTop } from './ScrollToTop';
import { MobileMenu } from './MobileMenu';

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

export interface LayoutProps {
  title: string;
  version: string;
  logo: React.ReactNode;
  ribbon: React.ReactNode;
  toc: React.ReactNode;
  hasSidebar: boolean;
}

export const MobileLayout: React.SFC<LayoutProps> = ({ toc, logo, ribbon, version, children }) => (
  <MobileContainer>
    <Route component={ScrollToTop} />
    <HeadLine>
      <MobileMenu toc={toc} />
      <LogoSpace>
        <LogoLink to="/">{logo}</LogoLink>
      </LogoSpace>
      <Version>{version}</Version>
    </HeadLine>
    {ribbon}
    <MobileContent>{children}</MobileContent>
  </MobileContainer>
);

export const DesktopLayout: React.SFC<LayoutProps> = ({ hasSidebar, title, toc, logo, ribbon, version, children }) => (
  <DesktopContainer>
    <Route component={ScrollToTop} />
    {hasSidebar && (
      <TocColumn>
        <Info>
          <LogoLink to="/">{logo}</LogoLink>
          <Title>{title}</Title>
          <Version>{version}</Version>
        </Info>
        {toc}
      </TocColumn>
    )}
    {ribbon}
    <ContentColumn>{children}</ContentColumn>
  </DesktopContainer>
);
