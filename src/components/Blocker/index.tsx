import * as React from 'react';
import styled from '../../utils/styled';
import { StandardProps } from '../../common';
import { transparentize } from '../../utils/colors';
import { KeyCodes } from '../../utils/keyCodes';
import { dark } from '../../colors';

export interface BlockerProps extends StandardProps {
  /**
   * Event emitted when the user wants to remove the blocker.
   */
  onClose?(e: React.SyntheticEvent<HTMLElement>): void;
}

const FixedContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 10000;
  overflow-x: hidden;
  overflow-y: auto;
`;

const FocusKeeper = styled.a`
  height: 0;
  width: 0;
  overflow: hidden;
`;

const StyledModalBackground = styled(FixedContainer)`
  overflow: hidden;
  z-index: 9999;
  background: ${transparentize(dark, 0.4)};
`;

/**
 * Defines a generic content blocking overlay element, e.g., for a modal dialog.
 */
export class Blocker extends React.Component<BlockerProps> {
  private modalNode: HTMLDivElement | null;

  private getFocusables(): NodeListOf<Element> | undefined {
    if (this.modalNode) {
      return this.modalNode.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]',
      );
    }

    return undefined;
  }

  componentDidMount() {
    this.changeBodyOverflow(true);
  }

  componentWillUnmount() {
    this.changeBodyOverflow(false);
  }

  private changeBodyOverflow(open: boolean) {
    const body = document.querySelector('body');

    if (body) {
      if (open) {
        body.style.setProperty('overflow', 'hidden');
      } else {
        body.style.removeProperty('overflow');
      }
    }
  }

  private keepFocus(position: 'first' | 'last') {
    const focusables = this.getFocusables();

    if (focusables && focusables.length > 2) {
      const nextElement = (position === 'first' ? focusables[1] : focusables[focusables.length - 2]) as HTMLElement;
      nextElement.focus();
    }
  }

  private keepFirstFocus = () => {
    this.keepFocus('first');
  };

  private keepLastFocus = () => {
    this.keepFocus('last');
  };

  private setElement = (node: HTMLDivElement | null) => {
    if (node && node !== this.modalNode) {
      const el = node.querySelector('*[tabindex]') as HTMLElement;
      (el || node).focus();
    }

    this.modalNode = node;
  };

  private notifyClose(e: React.SyntheticEvent<HTMLElement>) {
    const { onClose } = this.props;

    if (typeof onClose === 'function') {
      onClose(e);
    }
  }

  private onContainerClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    if (e.target === e.currentTarget) {
      this.notifyClose(e);
    }
  };

  private onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === KeyCodes.escape) {
      this.notifyClose(e);
    }
  };

  render() {
    const { children, onClose, ...props } = this.props;

    return (
      <>
        <FixedContainer ref={this.setElement} onClick={this.onContainerClick} onKeyDown={this.onKeyPress} {...props}>
          <FocusKeeper href="#" onFocus={this.keepLastFocus} />
          {children}
          <FocusKeeper href="#" onFocus={this.keepFirstFocus} />
        </FixedContainer>
        <StyledModalBackground {...props} />
      </>
    );
  }
}
