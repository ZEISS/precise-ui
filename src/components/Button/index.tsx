import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { StandardProps, ButtonThemeSettings, PreciseFullTheme } from '../../common';
import { Anchor, AnchorProps } from '../Anchor';
import { IconName, Icon, IconProps } from '../Icon';
import { distance } from '../../distance';
import { remCalc } from '../../utils/remCalc';
import { displayTo } from '../../utils/displayTo';

/**
 * Button style name.
 */
export type ButtonStyle = 'primary' | 'secondary';

/**
 * Button type.
 */
export type ButtonType = 'submit' | 'reset' | 'button';

/**
 * Button size.
 */
export type ButtonSize = 'small' | 'medium';

export interface ButtonProps extends AnchorProps {
  /**
   * Sets the button as active.
   * @default false
   */
  active?: boolean;
  /**
   * Sets the button as a block.
   * @default false
   */
  block?: boolean;
  /**
   * Sets the button style type. By default primary.
   * @default primary
   */
  buttonStyle?: ButtonStyle;
  /**
   * Sets the button type. By default button.
   * @default button
   */
  type?: ButtonType;
  /**
   * Sets the button size. By default medium.
   * @default medium
   */
  size?: ButtonSize;
  /**
   * The name of the icon to display. By default no icon is display.
   */
  icon?: IconName;
}

export interface StyledButtonProps extends AnchorProps {
  block?: boolean;
  buttonStyle?: ButtonStyle;
  size?: ButtonSize;
}

export interface IconWrapperProps extends StandardProps {}

function getThemeSettings(theme: PreciseFullTheme, buttonStyle?: ButtonStyle) {
  switch (buttonStyle) {
    default:
    case 'primary':
      return theme.buttonPrimary;

    case 'secondary':
      return theme.buttonSecondary;
  }
}

function getButtonLineHeight(themeSettings: ButtonThemeSettings, size?: ButtonSize) {
  switch (size) {
    default:
    case 'medium':
      return themeSettings.lineHeightMedium;

    case 'small':
      return themeSettings.lineHeightSmall;
  }
}

function getButtonFontSize(size?: ButtonSize) {
  switch (size) {
    default:
    case 'medium':
      return remCalc('16px');

    case 'small':
      return remCalc('14px');
  }
}

function getIconSize(size?: ButtonSize) {
  switch (size) {
    default:
    case 'medium':
      return '22px';

    case 'small':
      return '16px';
  }
}

function getButtonPadding(size?: ButtonSize) {
  switch (size) {
    default:
    case 'medium':
      return `9px ${distance.medium} 7px`;

    case 'small':
      return `5px ${distance.small} 3px`;
  }
}

const PseudoButtonStyle = (colorTheme: ButtonThemeSettings) => css`
  &:hover {
    background-color: ${colorTheme.hoverBackground};
    border: ${colorTheme.hoverBorder};
    color: ${colorTheme.hoverText};
  }
  &:focus {
    background-color: ${colorTheme.focusBackground};
    border: ${colorTheme.focusBorder};
    color: ${colorTheme.focusText};
  }
`;

const StyledButton = styled(Anchor)<StyledButtonProps>`
  box-sizing: border-box;
  outline: none;
  border-radius: 0;
  margin: ${distance.small};
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
  border: ${themed(props =>
    props.disabled
      ? `${getThemeSettings(props.theme, props.buttonStyle).disabledBorder}`
      : `${getThemeSettings(props.theme, props.buttonStyle).border}`,
  )};
  background-color: ${themed(props =>
    props.disabled
      ? getThemeSettings(props.theme, props.buttonStyle).disabledBackground
      : getThemeSettings(props.theme, props.buttonStyle).background,
  )};
  color: ${themed(props =>
    props.disabled
      ? getThemeSettings(props.theme, props.buttonStyle).disabledText
      : getThemeSettings(props.theme, props.buttonStyle).text,
  )};
  font-family: ${themed(props => props.theme.fontFamily)};
  font-size: ${props => getButtonFontSize(props.size)};
  line-height: ${themed(props => getButtonLineHeight(getThemeSettings(props.theme, props.buttonStyle), props.size))};
  padding: ${props => getButtonPadding(props.size)};
  display: ${props => (props.block ? 'block' : 'inline-block')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  ${themed(props => (!props.disabled ? PseudoButtonStyle(getThemeSettings(props.theme, props.buttonStyle)) : ''))};
  ${displayTo('smallAndMedium')`
    width: 100%;
    margin: ${distance.small} 0;
  `};
`;

const DefaultWrapper = styled.div``;

const WithIconWrapper = styled('div')<IconWrapperProps>`
  ${props =>
    props.theme.buttonIconPosition === 'left'
      ? `padding-left: ${distance.xlarge}`
      : `padding-right: ${distance.xlarge}`};
  position: relative;
`;

const StyledIcon = styled(Icon)<IconWrapperProps & IconProps>`
  ${props => (props.theme.buttonIconPosition === 'left' ? 'left: 0' : 'right: 0')};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

/**
 * The button component renders a simple button optionally with an icon.
 */
export const Button: React.SFC<ButtonProps> = ({ children, icon, size, theme, ...rest }) => {
  const Wrapper = icon ? WithIconWrapper : DefaultWrapper;

  return (
    <StyledButton tagName="button" theme={theme} size={size} {...rest}>
      <Wrapper theme={theme}>
        {children}
        {icon && <StyledIcon name={icon} theme={theme} size={getIconSize(size)} />}
      </Wrapper>
    </StyledButton>
  );
};
Button.displayName = 'Button';
