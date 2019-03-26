import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { colorCycle } from '../../utils/colorCycle';
import { remCalc } from '../../utils/remCalc';

export type AvatarSize = 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface AvatarProps extends StandardProps {
  /**
   * The size of the avatar, where medium is the default size.
   */
  size?: AvatarSize;
  /**
   * The initials of the user - at most two letters are being shown.
   */
  initials?: string;
  /**
   * Option to override the automatic color pick if no image was provided.
   */
  color?: string;
  /**
   * The image URL to be used as Avatar icon.
   */
  image?: string;
  /**
   * The optional description to show for the Avatar.
   */
  description?: string;
  /**
   * The content of the optional badge.
   */
  children?: React.ReactNode;
}

export interface SizeProp {
  size: AvatarSize;
}

interface AvatarInitialsBaseProps {
  color?: string;
  initials?: string;
  theme?: any;
}

const avatarSize = {
  'xx-small': '16px',
  'x-small': '24px',
  small: '32px',
  medium: '40px',
  large: '48px',
  'x-large': '72px',
};

const avatarFontSize = {
  'xx-small': remCalc('9px'),
  'x-small': remCalc('11px'),
  small: remCalc('14px'),
  medium: remCalc('14px'),
  large: remCalc('17px'),
  'x-large': remCalc('28px'),
};

const AvatarContainer = styled('div')<SizeProp>`
  position: relative;
  overflow: hidden;
  ${({ size }) => `
    width: ${avatarSize[size]};
    height: ${avatarSize[size]}
  `};
`;

const AvatarContent = styled('div')<SizeProp>`
  border: 0;
  perspective: 1px;

  color: ${themed(props => props.theme.text7)};
  border-radius: 50%;
  overflow: hidden;

  ${({ size }) => `
    width: ${avatarSize[size]};
    height: ${avatarSize[size]};
  `};
`;

const AvatarInitials = styled('div')<SizeProp & AvatarInitialsBaseProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  background-color: ${themed(props => props.color || colorCycle(props.theme.colorCycle, props.initials))};
  ${({ size }) => `
    height: ${avatarSize[size]};
    width: ${avatarSize[size]};
    font-size: ${avatarFontSize[size]};
  `};
`;

const AvatarImage = styled.img`
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
  left: 50%;
  opacity: 1;
  position: relative;
  top: 50%;
  display: block;
`;

const avatarBadgeSize = {
  'xx-small': '6px',
  'x-small': '8px',
  small: '10px',
  medium: '12px',
  large: '16px',
  'x-large': '20px',
};

const avatarBadgeFontSize = {
  'xx-small': '0',
  'x-small': '0',
  small: '0',
  medium: '8px',
  large: '10px',
  'x-large': '10px',
};

const AvatarBadge = styled('div')<SizeProp>`
  position: absolute;
  overflow: hidden;
  border-radius: 50%;
  border: solid 2px ${themed(props => props.theme.ui1)};
  color: ${themed(props => props.theme.text7)};
  bottom: -2px;
  right: -2px;

  ${({ size }) => `
    width: ${avatarBadgeSize[size]};
    height: ${avatarBadgeSize[size]};
    line-height: ${avatarBadgeSize[size]};
    font-size: ${avatarBadgeFontSize[size]}
  `};
`;

const defaultSize: AvatarSize = 'medium';
/**
 * The avatar component renders an avatar sticker with an optional badge.
 *
 * We must provide either an `image` or an `initials` prop for the Avatar component to work correctly.
 */
export const Avatar: React.SFC<AvatarProps> = ({ image, description, children, size = defaultSize, ...props }) => (
  <AvatarContainer {...props} title={description} size={size}>
    <AvatarContent size={size} theme={props.theme}>
      {image ? (
        <AvatarImage src={image} alt={description} />
      ) : (
        <AvatarInitials size={size} theme={props.theme} color={props.color}>
          {(props.initials || '').substr(0, 2)}
        </AvatarInitials>
      )}
    </AvatarContent>
    {children && (
      <AvatarBadge theme={props.theme} size={size}>
        {children}
      </AvatarBadge>
    )}
  </AvatarContainer>
);
Avatar.displayName = 'Avatar';
