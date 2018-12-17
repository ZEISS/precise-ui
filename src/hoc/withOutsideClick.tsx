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

export type OutsideComponentProps<P> = OutsideAdditionalProps & Pick<P, Exclude<keyof P, keyof OutsideInjectedProps>>;

export function withOutsideClick<P>(
  component: React.ComponentType<P>,
  excludeScrollbar?: boolean,
): React.ComponentClass<OutsideComponentProps<P>> {
  return onClickOutside(component, {
    excludeScrollbar,
  });
}
