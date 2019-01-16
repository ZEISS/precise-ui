import onClickOutside, { OnClickOutProps } from 'react-onclickoutside';

export interface OutsideInjectedProps {
  disableOnClickOutside(): void;
  enableOnClickOutside(): void;
}

export interface OutsideAdditionalProps {
  handleClickOutside?: React.MouseEventHandler<any>;
  eventTypes?: string | Array<string>;
  outsideClickIgnoreClass?: string;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  excludeScrollbar?: boolean;
}

export interface OutsideClickOptions {
  excludeScrollbar?: boolean;
}

export type OutsideComponentProps<P> = OutsideAdditionalProps & Pick<P, Exclude<keyof P, keyof OutsideInjectedProps>>;

/**
 * Wraps the component with a helper that detects if the wrapped component
 * or its surrounding was clicked.
 * @param component The component to be notified when outside was clicked.
 * @param options The options for configuration.
 * @returns The wrapped component.
 */
export function withOutsideClick<TProps>(
  component: React.ComponentType<TProps>,
  options: OutsideClickOptions = {},
): React.ComponentClass<OutsideComponentProps<TProps>> {
  return onClickOutside(component, {
    excludeScrollbar: options.excludeScrollbar,
  });
}
