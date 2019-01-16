import * as React from 'react';

export interface PromptMessageCallback {
  (location: any): boolean | string;
}

export interface PromptProps {
  /**
   * Determines if the prompt should be active. By default true.
   * @default true
   */
  when?: boolean;
  /**
   * Creates the message to show for the blocked route, if any.
   */
  message: string | PromptMessageCallback;
}

/**
 * Component for prompting the user before navigating away
 * from a screen with a form.
 */
export class Prompt extends React.Component<PromptProps> {
  private unblock?(): void;

  static contextTypes = {
    // tslint:disable-next-line
    router: () => null,
  };

  componentDidMount() {
    if (this.props.when) {
      this.enable(this.props.message);
    }

    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  componentWillReceiveProps(nextProps: PromptProps) {
    if (nextProps.when) {
      if (!this.props.when || this.props.message !== nextProps.message) {
        this.enable(nextProps.message);
      }
    } else {
      this.disable();
    }
  }

  componentWillUnmount() {
    this.disable();
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  private enable(message: string | PromptMessageCallback) {
    const history = this.context.router && this.context.router.history;

    if (this.unblock) {
      this.unblock();
    }

    if (history) {
      this.unblock = history.block(message);
    }
  }

  private disable() {
    if (this.unblock) {
      this.unblock();
      this.unblock = undefined;
    }
  }

  private handleBeforeUnload = (ev: BeforeUnloadEvent) => {
    const { when, message } = this.props;

    if (when) {
      const msg = typeof message === 'function' ? message(undefined) : message;
      ev.returnValue = msg;
      return msg;
    }

    return undefined;
  };

  render() {
    return false;
  }
}
