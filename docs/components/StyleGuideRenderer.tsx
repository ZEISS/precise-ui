import * as React from 'react';
import { Responsive } from '../../src';
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

const StyleGuideRenderer: React.SFC<StyleGuideRendererProps> = ({ children, ...props }) => (
  <Responsive
    render={size => {
      const Layout = size !== 'small' ? DesktopLayout : MobileLayout;
      return (
        <Layout logo={<Logo />} ribbon={<Ribbon />} {...props}>
          {children}
        </Layout>
      );
    }}
  />
);

export default StyleGuideRenderer;
