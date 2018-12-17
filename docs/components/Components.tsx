import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
// @ts-ignore
import ReactComponent from 'react-styleguidist/lib/rsg-components/ReactComponent';

interface ComponentDefinition {
  hasExamples: boolean;
  metadata: any;
  name: string;
  parent: string;
  pathLine: string;
  filepath: string;
  props: any;
  slug: string;
  visibleName: string;
}

interface ComponentsProps {
  usageMode: string;
  exampleMode: string;
  components: Array<ComponentDefinition>;
  depth: number;
}

const Components: React.SFC<ComponentsProps> = ({ components, exampleMode, usageMode, depth }) => {
  return (
    <Switch>
      {components.map(component => (
        <Route
          key={component.slug}
          exact
          path={`/${component.parent}/${component.slug}`}
          render={() => (
            <ReactComponent
              key={component.filepath}
              component={component}
              exampleMode={exampleMode}
              usageMode={usageMode}
              depth={depth}
            />
          )}
        />
      ))}
    </Switch>
  );
};

export default Components;
