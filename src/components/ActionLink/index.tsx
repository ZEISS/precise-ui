import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { Anchor, AnchorProps } from '../Anchor';
import { getFontStyle } from '../../textStyles';

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
    color: ${themed(props => props.theme.ui6)};
  }
  &:focus {
    color: ${themed(props => props.theme.ui7)};
    outline: none;
  }
`;

const StyledActionLink = styled(Anchor)<StyledActionLink>`
  ${getFontStyle({ weight: 'medium' })}
  text-decoration: none;
  color: ${themed(props => (props.disabled ? props.theme.text3 : props.theme.ui0))};
  display: ${props => (props.block ? 'block' : 'inline-block')};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  ${props => (!props.disabled ? PseudoLinkStyle : '')};
`;

/**
 * The action link component gives a simple text link to be used in call for action scenarios.
 */
export const ActionLink: React.SFC<ActionLinkProps> = props => <StyledActionLink {...props} />;
ActionLink.displayName = 'ActionLink';
