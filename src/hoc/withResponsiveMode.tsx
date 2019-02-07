import * as React from 'react';
import { withResponsive, ResponsiveComponentProps } from './withResponsive';
import { withInner } from 'typescript-plugin-inner-jsx/withInner';

export interface GetModeType<TModes> {
  (width?: number): TModes;
}

export interface ModeChangedEvent<TModes> {
  mode: TModes;
}

export interface ModeProviderProps<TModes> extends ResponsiveComponentProps {
  mode?: TModes;
  onModeChange?(e: ModeChangedEvent<TModes>): void;
}

export interface ModeProviderState<TModes> {
  controlled: boolean;
  mode: TModes;
}

/**
 * Provides `mode` prop (if it's not passed manually) to the component depending on
 * the container width. When mode switches, HOC calls `onModeChange` prop if it is
 * defined.
 * @param getMode The function to determine the mode from the given width.
 * @returns A constructor function to wrap a component with the `mode` prop determined
 * by the getMode function.
 */
export function withResponsiveMode<TModes>(getMode: GetModeType<TModes>) {
  return <TProps extends ModeProviderProps<TModes>>(Component: React.ComponentType<TProps>) => {
    return withInner(
      withResponsive(
        class ModeProvider extends React.Component<TProps, ModeProviderState<TModes>> {
          constructor(props: TProps) {
            super(props);
            this.state = {
              controlled: props.mode !== undefined,
              mode: props.mode || getMode(props.dimensions && props.dimensions.width),
            };
          }

          static getDerivedStateFromProps(props: TProps, state: ModeProviderState<TModes>) {
            const change = props.onModeChange;

            if (state.controlled) {
              const mode = props.mode || getMode();

              if (state.mode !== mode) {
                if (typeof change === 'function') {
                  change({ mode });
                }

                return {
                  mode,
                };
              }
            } else {
              const { dimensions } = props;
              const { mode } = state;
              const nextMode = getMode(dimensions && dimensions.width);

              if (mode !== nextMode) {
                if (typeof change === 'function') {
                  change({ mode: nextMode });
                }

                return {
                  mode: nextMode,
                };
              }
            }

            return {};
          }

          componentDidMount() {
            const { mode } = this.state;
            const { onModeChange } = this.props;

            if (mode && typeof onModeChange === 'function') {
              onModeChange({ mode });
            }
          }

          render() {
            const { mode } = this.state;
            const props = {
              ...this.props,
              mode,
            };
            return <Component {...props} />;
          }
        },
      ),
      { Component },
    );
  };
}
