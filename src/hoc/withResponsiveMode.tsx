import * as React from 'react';
import { withResponsive, ResponsiveComponentProps } from './withResponsive';

export interface GetModeType<Modes> {
  (width?: number): Modes;
}

export interface ModeTypeEvent<Modes> {
  mode: Modes;
}

export interface ModeProviderProps<Modes> extends ResponsiveComponentProps {
  mode?: Modes;
  onModeChange?(e: ModeTypeEvent<Modes>): void;
}

export interface ModeProviderState<Modes> {
  controlled: boolean;
  mode: Modes;
}

const getWidth = (dimensions?: { width: number }) => (dimensions !== undefined ? dimensions.width : undefined);

/*
  Provides `mode` prop (if it's not passed manually) to the component depending on the container width.
  When mode switches, HOC calls `onModeChange` prop if it is defined.

  Usage:

  export const Table = withResponsiveMode<'table' | 'default' | 'card'>(
    width => (!width || width > breakpoints.medium ? 'default' : 'card'),
  )(TableInt);
*/

export function withResponsiveMode<Modes>(getMode: GetModeType<Modes>) {
  return <ComponentType extends React.ComponentType<ModeProviderProps<Modes>>>(
    Component: ComponentType,
  ): ComponentType => {
    class ModeProvider extends React.Component<ModeProviderProps<Modes>, ModeProviderState<Modes>> {
      constructor(props: ModeProviderProps<Modes>) {
        super(props);

        this.state = {
          controlled: props.mode !== undefined,
          mode: props.mode || getMode(getWidth(props.dimensions)),
        };
      }

      static getDerivedStateFromProps(props: ModeProviderProps<Modes>, state: ModeProviderState<Modes>) {
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
          const width = getWidth(dimensions);
          const nextMode = getMode(width);

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

        if (typeof onModeChange === 'function' && mode) {
          onModeChange({ mode });
        }
      }

      render() {
        const { mode } = this.state;
        const props = {
          ...this.props,
          mode,
        } as any;
        return <Component {...props} />;
      }
    }

    return withResponsive(ModeProvider) as any;
  };
}
