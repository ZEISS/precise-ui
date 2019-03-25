import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

export interface BadgeProps extends StandardProps {
  /**
   * The content of the badge to display.
   */
  children?: React.ReactNode;
  /**
   * Sets the mode to a filling badge. Useful together with the `Avatar`.
   * By default false.
   * @default false
   */
  fill?: boolean;
}

const BasicBadge = styled.div`
  position: relative;
  border-radius: 0.25em;
  text-align: center;
`;

const FilledBadge = styled(BasicBadge)`
  color: ${themed(({ theme }) => theme.badgeBackground)};
  background: ${themed(({ theme }) => theme.badgeColor)};
`;

const NormalBadge = styled(BasicBadge)`
  ${getFontStyle({ size: 'xSmall' })}
  display: inline-block;
  color: ${themed(({ theme }) => theme.badgeColor)};
  background: ${themed(({ theme }) => theme.badgeBackground)};
  min-width: 2em;
  padding: 0 ${distance.xsmall};
  border: solid 1px ${themed(({ theme }) => theme.badgeColor)};
`;

/**
 * The badge component is a simple informative display.
 */
export const Badge: React.SFC<BadgeProps> = ({ fill = false, ...props }) =>
  fill ? <FilledBadge {...props} /> : <NormalBadge {...props} />;
Badge.displayName = 'Badge';
