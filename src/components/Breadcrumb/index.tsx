import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { Anchor, AnchorProps } from '../Anchor';
import { dark } from '../../colors';

export interface BreadcrumbProps extends AnchorProps {
  /**
   * The required title of the breadcrumb link.
   */
  title: string;
  /**
   * @ignore
   */
  children?: void;
}

const StyledLink = styled(Anchor)`
  text-decoration: none;
  color: ${themed(props => props.theme.ui0)};
  display: inline-block;
  font-size: inherit;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledText = styled.span`
  display: inline-block;
  color: ${dark};
`;

/**
 * Represents a single Breadcrumb which is a special version of a link.
 */
export const Breadcrumb: React.SFC<BreadcrumbProps> = props => {
  const { title, to, href, onClick, ...rest } = props;

  if (!to && !href && !onClick) {
    return <StyledText {...rest}>{title}</StyledText>;
  }

  return <StyledLink {...props}>{title}</StyledLink>;
};
Breadcrumb.displayName = 'Breadcrumb';
