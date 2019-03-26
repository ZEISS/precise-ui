import * as React from 'react';
import { StandardProps } from '../../common';

export interface AnchorUrlLocator {
  pathname?: string;
  search?: string;
  state?: any;
  hash?: string;
  key?: string;
}

export interface AnchorProps extends StandardProps {
  /**
   * Sets the component as disabled.
   */
  disabled?: boolean;
  /**
   * Redirects to the given URL if clicked.
   */
  href?: string;
  /**
   * Redirects to the given internal URL if clicked.
   */
  to?: string | AnchorUrlLocator;
  /**
   * The tagName to use, e.g., a or button.
   * @default a
   */
  tagName?: string;
  /**
   * Used to notify once clicked.
   */
  onClick?(e: React.MouseEvent<HTMLElement>): void;
  /**
   * Sets the action link children.
   */
  children?: React.ReactNode | void;
  /**
   * Specifies where to display the linked URL.
   * Applies only in case of `a` tag
   * Default is `_self`
   * @default _self
   */
  target?: '_self' | '_blank' | '_parent' | '_top';
}

function getHref(link: string | AnchorUrlLocator | undefined) {
  if (link !== undefined) {
    if (typeof link !== 'string') {
      const { pathname, search, hash } = link;
      const parts: Array<string> = [];

      if (pathname) {
        parts.push(pathname);
      }

      if (search) {
        parts.push('?');
        parts.push(search);
      }

      if (hash) {
        parts.push('#');
        parts.push(hash);
      }

      return parts.join('');
    }

    return link;
  }

  return undefined;
}

export class Anchor extends React.PureComponent<AnchorProps> {
  static contextTypes = {
    // tslint:disable-next-line
    router: () => null,
  };

  private clicked = (e: React.MouseEvent<HTMLElement>) => {
    const { tagName = 'a', disabled = false, target = '_self', href, to, onClick } = this.props;

    if (!disabled) {
      if (typeof onClick === 'function') {
        onClick(e);

        if (e.defaultPrevented) {
          return;
        }
      }

      if (to !== undefined) {
        const ctx = this.context;
        const history = ctx && ctx.router && ctx.router.history;

        if (history) {
          history.push(to);
        }
      } else if (typeof href === 'string') {
        if (tagName !== 'a') {
          window.open(href, target);
        }

        return;
      } else if (tagName === 'button') {
        return;
      }
    }

    e.preventDefault();
  };

  render() {
    const { tagName = 'a', theme: _0, to, disabled, target, ...props } = this.props;

    if (tagName === 'a' && target) {
      (props as any).target = target;
    }

    return React.createElement(tagName, {
      href: getHref(to) || (props.onClick ? '#' : undefined),
      ...props,
      onClick: this.clicked,
    });
  }
}
