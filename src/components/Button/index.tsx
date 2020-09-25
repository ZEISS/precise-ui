import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { StandardProps, ButtonThemeSettings, PreciseFullTheme } from '../../common';
import { Anchor, AnchorProps } from '../Anchor';
import { IconName, Icon, IconProps } from '../Icon';
import { distance } from '../../distance';
import { displayUpTo } from '../../utils/';
import { getFontSize } from '../../textStyles';
import { ProgressBar } from '../ProgressBar';

/**
 * Button style name.
 */
export type ButtonStyle = 'primary' | 'secondary';

/**
 * Button type.
 */
export type ButtonType = 'submit' | 'reset' | 'button';

/**
 * Overall size of the button.
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
   * Sets the button type. By default "submit".
   * @see [W3C](https://www.w3.org/TR/2011/WD-html5-20110525/the-button-element.html#attr-button-type)
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
  /**
   * Disables changing the width of the button to 100% for mobile screens (narrower than 980px)
   * @default false
   */
  disableMobileFullWidth?: boolean;
  /**
   * Disables the button and shows a loading indicator
   * @default false
   */
  loading?: boolean;
}

export interface StyledButtonProps extends AnchorProps {
  block?: boolean;
  buttonStyle?: ButtonStyle;
  size?: ButtonSize;
  disableMobileFullWidth?: boolean;
}

function getThemeSettings(theme: PreciseFullTheme, buttonStyle?: ButtonStyle) {
  switch (buttonStyle) {
    default:
    case 'primary':
      return theme.buttonPrimary;

    case 'secondary':
      return theme.buttonSecondary;
  }
}

function getButtonFontStyle(themeSettings: ButtonThemeSettings, size: ButtonSize = 'medium') {
  switch (size) {
    default:
    case 'medium':
      return `
        line-height: ${themeSettings.lineHeightMedium};
        ${getFontSize('medium')};
      `;

    case 'small':
      return `
        line-height: ${themeSettings.lineHeightSmall};
        ${getFontSize('small')};
      `;
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

const AnchorInt: React.FC<StyledButtonProps> = ({ buttonStyle, ...props }) => <Anchor {...props} />;
const StyledButton = styled(AnchorInt)<StyledButtonProps>(
  themed(props => {
    const themeSettings = getThemeSettings(props.theme, props.buttonStyle);
    return css`
      display: ${props.block ? 'block' : 'inline-block'};
      box-sizing: border-box;
      padding: 0;
      margin: ${distance.small};

      outline: none;
      border-radius: 0;
      border: ${themeSettings.border};

      background-color: ${themeSettings.background};
      color: ${themeSettings.text};
      font-family: ${props.theme.fontFamily};
      ${getButtonFontStyle(themeSettings, props.size)};

      &:first-of-type {
        margin-left: 0;
      }
      &:last-of-type {
        margin-right: 0;
      }
      ${props.disabled &&
        `
          border: ${themeSettings.disabledBorder};
          background-color: ${themeSettings.disabledBackground};
          color: ${themeSettings.disabledText};
          cursor: 'not-allowed';
        `}
      ${!props.disabled ? PseudoButtonStyle(themeSettings) : ''};

      ${!props.disableMobileFullWidth &&
        displayUpTo('medium')`
        width: 100%;
        margin: ${distance.small} 0;
      `};
    `;
  }),
);

const Content = styled.div<StyledButtonProps>`
  padding: ${props => getButtonPadding(props.size)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span<{ iconPosition?: 'left' | 'right' }>`
  ${props => `margin-${props.iconPosition}: ${distance.small};`}
`;

// This is needed to make sure the button height does not change when loading is shown.
const LoadingBar = styled(ProgressBar)`
  margin-top: -4px;
`;

/**
 * The button component renders a simple button optionally with an icon.
 */
export const Button: React.FC<ButtonProps> = ({ children, icon, size, loading, theme, ...rest }) => {
  const iconPosition = (theme && theme.buttonIconPosition) || (icon && 'right');
  return (
    <StyledButton tagName="button" theme={theme} size={size} disabled={loading} {...rest}>
      <Content theme={theme} size={size}>
        {icon && iconPosition === 'left' && <Icon name={icon} size={getIconSize(size)} />}
        <Text iconPosition={iconPosition}>{children}</Text>
        {icon && iconPosition === 'right' && <Icon name={icon} size={getIconSize(size)} />}
      </Content>
      {loading && <LoadingBar animate="spinning" type="secondary" />}
    </StyledButton>
  );
};
Button.displayName = 'Button';
