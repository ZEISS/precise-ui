import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { Anchor, AnchorProps } from '../Anchor';
import { IconName, Icon, IconProps } from '../Icon';
import { ocean, midnight } from '../../colors';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

export interface IconLinkProps extends AnchorProps {
  /**
   * Sets the icon link as a block.
   */
  block?: boolean;
  /**
   * The name of the icon to display.
   */
  icon: IconName;
}

export interface StyledAnchorProps {
  disabled?: boolean;
  display?: 'block' | 'inline-block';
}

export interface StyledIconProps {
  disabled?: boolean;
  iconOnly?: boolean;
}

const StyledAnchor = styled(Anchor)<StyledAnchorProps>(
  themed(
    ({ display, disabled, theme: { ui0, ui4 } }) => css`
      outline: none;
      text-decoration: none;
      color: ${disabled ? ui4 : ui0};
      display: ${display};
      font-size: 0;
      vertical-align: middle;
      cursor: ${disabled ? 'default' : 'pointer'};

      &:hover,
      &:hover * {
        color: ${disabled ? ui4 : ocean};
      }

      &:focus,
      &:focus * {
        color: ${disabled ? ui4 : midnight};
      }
    `,
  ),
);

const StyledIcon = styled(Icon)<StyledIconProps & IconProps>`
  color: ${themed(({ disabled, iconOnly, theme: { ui0, ui4, ui5 } }) => (disabled ? ui4 : iconOnly ? ui5 : ui0))};
  display: inline-block;
  vertical-align: middle;
`;

const AnchorText = styled.span`
  ${getFontStyle({ size: 'medium' })}

  display: inline-block;
  vertical-align: middle;
  margin-left: ${distance.xsmall};
`;

/**
 * The icon link component shows an icon with optional text.
 */
export const IconLink: React.SFC<IconLinkProps> = ({ icon, theme, disabled, children, block, ...other }) => {
  return (
    <StyledAnchor disabled={disabled} display={block ? 'block' : 'inline-block'} {...other}>
      {icon && (
        <StyledIcon disabled={disabled} iconOnly={children ? false : true} name={icon} theme={theme} size={'22px'} />
      )}
      {children && <AnchorText>{children}</AnchorText>}
    </StyledAnchor>
  );
};
IconLink.displayName = 'IconLink';
