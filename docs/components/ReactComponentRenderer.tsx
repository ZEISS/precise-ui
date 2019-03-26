import * as React from 'react';
import { Tabs, TabPage, styled, Headline, distance, TabChangeEvent } from '../../src';

// @ts-ignore
import Pathline from 'react-styleguidist/lib/rsg-components/Pathline';

interface ReactComponentRendererProps {
  name: string;
  heading: React.ReactNode;
  filepath: string;
  pathLine: string;
  tabButtons: React.ReactNode;
  tabBody: React.ReactNode;
  description: React.ReactNode;
  docs: React.ReactNode;
  examples: React.ReactNode;
  isolated: boolean;
}

const ComponentName = styled.header`
  margin-bottom: ${distance.large};
`;

const ComponentTabPage = styled(TabPage)`
  padding-top: ${distance.medium};
`;

const Block = styled.div`
  margin: ${distance.medium} 0;
`;

const Content = styled.div`
  margin-top: ${distance.large};
`;

interface SingleReactComponentState {
  index: number;
}

class SingleReactComponent extends React.Component<ReactComponentRendererProps, SingleReactComponentState> {
  constructor(props: ReactComponentRendererProps) {
    super(props);
    this.state = {
      index: +(localStorage.getItem('selectedIndex') || 0),
    };
  }

  private changeTab = (e: TabChangeEvent) => {
    localStorage.setItem('selectedIndex', e.selectedIndex.toString());

    this.setState({
      index: e.selectedIndex,
    });
  };

  render() {
    const { heading, pathLine, description, docs, tabBody, examples } = this.props;
    const { index } = this.state;

    return (
      <div>
        <ComponentName>
          {heading}
          {pathLine && <Pathline>{pathLine}</Pathline>}
        </ComponentName>
        <Tabs onTabChange={this.changeTab} selectedIndex={index}>
          <ComponentTabPage header="Examples">
            <Block>
              <Headline level={5}>Usage Examples</Headline>
              <Content>{examples}</Content>
            </Block>
          </ComponentTabPage>
          <ComponentTabPage header="Details">
            {description && (
              <Block>
                <Headline level={5}>Description</Headline>
                <Content>
                  {description}
                  {docs}
                </Content>
              </Block>
            )}
            {tabBody && (
              <Block>
                <Headline level={5}>Properties & Methods</Headline>
                <Content>{tabBody}</Content>
              </Block>
            )}
          </ComponentTabPage>
        </Tabs>
      </div>
    );
  }
}

const ReactComponentRenderer: React.SFC<ReactComponentRendererProps> = props => {
  return <SingleReactComponent {...props} />;
};

export default ReactComponentRenderer;
