import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { Anchor, AnchorProps } from '../Anchor';
import * as colors from '../../colors';

export interface ActionLinkProps extends AnchorProps {
  /**
   * Sets the action link as active.
   */
  active?: boolean;
  /**
   * Sets the action link as a block.
   */
  block?: boolean;
}

export interface StyledActionLink {
  disabled?: boolean;
  block?: boolean;
}

const PseudoLinkStyle = css`
  &:hover {
    color: ${themed(props => props.theme.actionLinkHoverBackground)};
  }
  &:focus {
    color: ${colors.midnight};
    outline: none;
  }
`;

const StyledActionLink = styled(Anchor)`
  font-weight: 500;
  text-decoration: none;
  color: ${themed(props => (props.disabled ? props.theme.actionLinkDisabledText : props.theme.fill))};
  display: ${(props: StyledActionLink) => (props.block ? 'block' : 'inline-block')};
  cursor: ${(props: StyledActionLink) => (props.disabled ? 'default' : 'pointer')};
  ${(props: StyledActionLink) => (!props.disabled ? PseudoLinkStyle : '')};
`;

/**
 * The action link component gives a simple text link to be used in call for action scenarios.
 */
export const ActionLink: React.SFC<ActionLinkProps> = props => <StyledActionLink {...props} />;
ActionLink.displayName = 'ActionLink';
