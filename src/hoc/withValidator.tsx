import * as React from 'react';

export interface BaseInputProps<TEventArgs> {
  /**
   * Event emitted once the value changes.
   */
  onChange?(e: TEventArgs): void;
  /**
   * The currently displayed error message.
   */
  error?: React.ReactChild;
}

export interface ValidatorProps {
  onSuccess?(): void;
  onError?(): void;
}

export interface ValidatorState {
  error: React.ReactChild | undefined;
}

export function withValidator<TEventArgs, TProps extends BaseInputProps<TEventArgs>>(
  Component: React.ComponentType<TProps>,
  validate: (e: TEventArgs) => React.ReactChild | undefined,
) {
  return class Response extends React.PureComponent<TProps & ValidatorProps, ValidatorState> {
    constructor(props: TProps & ValidatorProps) {
      super(props);
      this.state = {
        error: undefined,
      };
    }

    validate = (e: TEventArgs) => {
      const { onChange, onError, onSuccess } = this.props;
      const error = validate(e);

      if (error !== this.state.error) {
        const notify = error ? onError : onSuccess;

        this.setState({
          error,
        });

        if (typeof notify === 'function') {
          notify();
        }
      }

      if (typeof onChange === 'function') {
        onChange(e);
      }
    };

    render() {
      const { error } = this.state;
      return <Component {...this.props} error={error || this.props.error} onChange={this.validate} />;
    }
  };
}
