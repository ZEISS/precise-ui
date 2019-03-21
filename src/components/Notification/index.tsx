import * as React from 'react';
import * as colors from '../../colors';
import styled, { themed, css } from '../../utils/styled';
import { NotificationType } from '../Notifications/types';
import { distance } from '../../distance';
import { StandardProps, PreciseFullTheme } from '../../common';
import { IconLink } from '../IconLink';
import { Icon, IconProps } from '../Icon';
import { getFontStyle } from '../../textStyles';

export interface NotificationProps extends StandardProps {
  /**
   * Sets the type of the notification.
   */
  type?: NotificationType;
  /**
   * Sets the title of the notification message.
   */
  title?: string;
  /**
   * Optionally provides a custom way for rendering an action control.
   */
  actionRenderer?(): React.ReactChild;
  /**
   * Event fired when the close action triggered. Return `false` if don't
   * want notification to self-close after event was played.
   */
  onClose?(e: React.MouseEvent): boolean | void;
}

export interface NotificationState {
  closed: boolean;
}

export interface StyledNotificationProps {
  closed: boolean;
  type: NotificationType;
}

function getNotificationColor(type: NotificationType = 'none', theme: PreciseFullTheme) {
  switch (type) {
    case 'success':
      return theme.notificationColorSuccess;

    case 'info':
      return theme.notificationColorInfo;

    case 'warning':
      return theme.notificationColorWarning;

    case 'error':
      return theme.notificationColorError;

    case 'none':
    default:
      return theme.notificationColorNone;
  }
}

function getNotificationIcon(type: NotificationType = 'none') {
  switch (type) {
    case 'success':
      return 'CheckCircle';

    case 'info':
      return 'Info';

    case 'warning':
      return 'Warning';

    case 'error':
      return 'Error';

    case 'none':
    default:
      return 'Notifications';
  }
}

interface LayoutProps {
  inline: boolean;
}

const StyledNotification = styled.div<StyledNotificationProps>(
  themed(
    ({ closed, type, theme }) => `
  position: relative;
  display: ${closed ? 'none' : 'flex'};
  background: #fff;
  border-style: solid;
  border-color: ${getNotificationColor(type, theme)};
  margin-bottom: ${distance.small};
  padding: ${theme.notificationPadding};
  box-shadow: ${theme.notificationBoxShadow};
  border-width: ${theme.notificationBorderWidth};
`,
  ),
);

const StyledTitle = styled.div(
  themed(
    ({ theme: { notificationTitleFontSize, notificationTitleLineHeight } }) => `
  font-family: inherit;
  font-size: ${notificationTitleFontSize};
  line-height: ${notificationTitleLineHeight};
  color: #404040;
  margin-right: ${distance.small};
`,
  ),
);

const StyledContent = styled.div<LayoutProps>(
  themed(
    ({ inline, theme: { notificationTextFontSize, notificationTextLineHeight } }) => `
  display: ${inline ? 'inline' : 'block'};
  font-family: inherit;
  font-size: ${notificationTextFontSize};
  line-height: ${notificationTextLineHeight};
  color: #404040;
  margin-right: ${distance.small};
`,
  ),
);

const ActionContainer = styled('div')<LayoutProps>`
  display: ${props => (props.inline ? 'inline' : 'block')};
`;

const CloseButton = styled(IconLink)`
  ${getFontStyle({ size: 'medium' })}

  position: absolute;
  right: ${distance.small};
  top: ${distance.small};
  background-color: ${colors.transparent};
  color: ${colors.black};
  padding: 0;
  border: none;
  outline: none;
`;

const LayoutVertical = css`
  display: flex;
  flex-direction: column;
`;

const LayoutInline = css`
  display: block;
`;

const ContentContainer = styled.div<LayoutProps>`
  ${props => (props.inline ? LayoutInline : LayoutVertical)};
  margin-right: ${distance.medium};
`;

const IconContainer = styled.div(
  themed(
    ({ theme: { notificationIconMarginRight } }) => css`
      margin-right: ${notificationIconMarginRight};
    `,
  ),
);

interface StyledIconProps extends IconProps {
  type: NotificationType;
}

const StyledIconInt: React.SFC<StyledIconProps> = ({ type: _0, ...props }) => <Icon {...props} />;

const StyledIcon = styled(StyledIconInt)<StyledIconProps>`
  color: ${themed(props => getNotificationColor(props.type, props.theme))};
`;

/**
 * The Notification component for rendering an inline notification message.
 */
export class Notification extends React.Component<NotificationProps, NotificationState> {
  constructor(props: NotificationProps) {
    super(props);

    this.state = {
      closed: false,
    };
  }

  private onCloseHandler = (e: React.MouseEvent) => {
    const { onClose } = this.props;

    if (typeof onClose === 'function') {
      const selfClose = onClose(e);
      if (selfClose === false) {
        return;
      }
    }

    this.setState({ closed: true });
  };

  render() {
    const { type = 'none', children, title, actionRenderer, theme, style, ...other } = this.props;
    const { closed } = this.state;
    const isInline = !title;

    return (
      <StyledNotification theme={theme} closed={closed} type={type} {...other}>
        <IconContainer theme={theme}>
          <StyledIcon type={type} name={getNotificationIcon(type)} size="22px" />
        </IconContainer>
        <ContentContainer inline={isInline}>
          {title && <StyledTitle theme={theme}>{title}</StyledTitle>}
          <StyledContent inline={isInline} theme={theme}>
            {children}
          </StyledContent>
          <ActionContainer inline={isInline} onClick={this.onCloseHandler}>
            {actionRenderer && actionRenderer()}
          </ActionContainer>
        </ContentContainer>
        <CloseButton onClick={this.onCloseHandler} icon="Close" />
      </StyledNotification>
    );
  }
}
