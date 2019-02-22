import * as React from 'react';
import StyleGuideRenderer from './StyleGuideRenderer';
import { RouteComponentProps, Route, Switch } from 'react-router';
import { SectionEntity, ConfigType, Dict, PathParams } from '../types';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './HomePage';
import { themes, ThemeProvider } from '../../src';
import { AppState } from './context';
import { ErrorBoundary } from './ErrorBoundary';
import ContextProvider from './ContextProvider';
import slots from './slots';

// @ts-ignore
import TableOfContents from 'react-styleguidist/lib/rsg-components/TableOfContents';
// @ts-ignore
import Sections from 'react-styleguidist/lib/rsg-components/Sections';
// @ts-ignore
import Welcome from 'react-styleguidist/lib/rsg-components/Welcome';
// @ts-ignore
import NotFound from 'react-styleguidist/lib/rsg-components/NotFound';
// @ts-ignore
import { DisplayModes, DisplayModesType } from 'react-styleguidist/lib/consts';

const HOMEPAGE = 'https://precise-ui.io/';

function getDisplayMode(params: PathParams) {
  const { section, component, example } = params;
  if (section && component && example) {
    return 'example';
  }

  return 'all';
}

function getSections(sections: Array<SectionEntity>, params: PathParams) {
  const { section, component, example } = params;
  if (section) {
    const filteredSections = sections.filter(({ slug }) => slug === section);

    if (component) {
      const filteredSectionsComponents = filteredSections.map(({ components, ...section }) => ({
        ...section,
        components: components.filter(({ slug }) => slug === component),
      }));

      if (example !== undefined) {
        return filteredSectionsComponents.map(({ components, ...section }) => ({
          ...section,
          components: components.map(({ props, ...component }) => ({
            ...component,
            props: {
              ...props,
              examples: props.examples && props.examples[example] ? [props.examples[example]] : [],
            },
          })),
        }));
      }

      return filteredSectionsComponents;
    }
    return filteredSections;
  }

  return sections;
}

function getTheme() {
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

function hasSidebar(displayMode: keyof DisplayModesType, showSidebar: boolean) {
  return displayMode === DisplayModes.notFound || (showSidebar && displayMode === DisplayModes.all);
}

interface StyleGuideProps {
  codeRevision: number;
  config: ConfigType;
  slots: Dict;
  sections: Array<SectionEntity>;
  welcomeScreen?: boolean;
  patterns: Array<any>;
  displayMode?: keyof DisplayModesType;
  allSections: Array<SectionEntity>;
  pagePerSection?: string;
}

const StyleGuide: React.SFC<StyleGuideProps> = ({ config, welcomeScreen, patterns, allSections, codeRevision }) => (
  <ErrorBoundary>
    <ThemeProvider theme={getTheme()}>
      <BrowserRouter>
        <Route
          path="/:section?/:component?/:example?"
          render={({ match: { params } }: RouteComponentProps<PathParams>) => {
            const displayMode = getDisplayMode(params);
            const sections = getSections(allSections, params);

            if (welcomeScreen) {
              return <Welcome patterns={patterns} />;
            }

            return (
              <ContextProvider
                codeRevision={codeRevision}
                config={config}
                slots={slots()}
                displayMode={displayMode}
                allSections={allSections}>
                <StyleGuideRenderer
                  title={config.title}
                  version={config.version}
                  homepageUrl={HOMEPAGE}
                  toc={<TableOfContents sections={allSections} useRouterLinks={false} />}
                  hasSidebar={hasSidebar(displayMode, config.showSidebar)}>
                  <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route
                      render={() => (sections.length ? <Sections sections={sections} depth={1} /> : <NotFound />)}
                    />
                  </Switch>
                </StyleGuideRenderer>
              </ContextProvider>
            );
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  </ErrorBoundary>
);

export default StyleGuide;
