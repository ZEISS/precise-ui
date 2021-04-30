import onClickOutside, {
  OnClickOutProps,
  AdditionalProps,
  ConfigObject,
  InjectedOnClickOutProps,
  WrapperClass,
} from 'react-onclickoutside';
import { withInner } from 'typescript-plugin-inner-jsx/withInner';

export type OutsideInjectedProps = InjectedOnClickOutProps;

export type OutsideAdditionalProps = AdditionalProps;

export type OutsideClickOptions = Pick<ConfigObject, 'excludeScrollbar'>;

export type OutsideComponentProps<P> = OnClickOutProps<P>;

/**
 * Wraps the component with a helper that detects if the wrapped component
 * or its surrounding was clicked.
 * @param component The component to be notified when outside was clicked.
 * @param options The options for configuration.
 * @returns The wrapped component.
 */
export function withOutsideClick<TProps>(Component: React.ComponentType<TProps>, options: OutsideClickOptions = {}) {
  return withInner(
    onClickOutside(Component, {
      excludeScrollbar: options.excludeScrollbar,
    }),
    { Component },
  );
}
