// @ts-ignore
import Editor from 'react-styleguidist/lib/rsg-components/Editor';
// @ts-ignore
import Usage from 'react-styleguidist/lib/rsg-components/Usage';
// @ts-ignore
import CodeTabButton from 'react-styleguidist/lib/rsg-components/slots/CodeTabButton';
// @ts-ignore
import UsageTabButton from 'react-styleguidist/lib/rsg-components/slots/UsageTabButton';
import IsolateButton from './IsolateButton';

export const EXAMPLE_TAB_CODE_EDITOR = 'rsg-code-editor';
export const DOCS_TAB_USAGE = 'rsg-usage';

export default () => {
  const toolbar = [IsolateButton];

  return {
    sectionToolbar: toolbar,
    componentToolbar: toolbar,
    exampleToolbar: toolbar,
    exampleTabButtons: [
      {
        id: EXAMPLE_TAB_CODE_EDITOR,
        render: CodeTabButton,
      },
    ],
    exampleTabs: [
      {
        id: EXAMPLE_TAB_CODE_EDITOR,
        render: Editor,
      },
    ],
    docsTabButtons: [
      {
        id: DOCS_TAB_USAGE,
        render: UsageTabButton,
      },
    ],
    docsTabs: [
      {
        id: DOCS_TAB_USAGE,
        render: Usage,
      },
    ],
  };
};
