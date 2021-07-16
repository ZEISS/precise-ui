import * as React from 'react';
import { PromptBasic } from './PromptBasic.part';
import { PromptModal } from './PromptModal.part';
import { usePrompt } from './usePrompt';
import { PromptProps } from './Prompt.types';

export { usePrompt, PromptModal };
export * from './Prompt.types';

/**
 * Component for prompting the user before navigating away
 * from a screen with a form.
 */
export class Prompt extends React.Component<PromptProps> {
  static contextTypes = {
    // tslint:disable-next-line
    router: () => null,
  };

  componentDidMount() {
    const history = this.context.router && this.context.router.history;
    if (!(history && history.block)) {
      console.warn('React Router history object is not found. Component cannot be used');
    }
  }

  render() {
    const { when = true, modalOptions } = this.props;
    const history = this.context.router && this.context.router.history;

    if (modalOptions) {
      return <PromptModal modalOptions={modalOptions} history={history} when={when} message={this.props.message} />;
    }
    return <PromptBasic history={history} when={when} message={this.props.message} />;
  }
}
