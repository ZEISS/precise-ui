import * as React from 'react';
import styled, { keyframes } from '../../utils/styled';
import { distance } from '../../distance';
import { remCalc } from '../../utils/remCalc';
import { Notification, NotificationProps } from '../Notification';
import { NotificationOption, NotificationsPosition } from './types';

export type ToastNotificationProps = NotificationOption & NotificationProps;

export interface ToastNotificationState {
  closing: boolean;
}

const animationDuration = 200; // ms
const offsetDistance = 32;

function sideMultiplier(position?: NotificationsPosition) {
  switch (position) {
    case 'bottom-left':
    case 'top-left':
      return -1;

    case 'top-right':
    case 'bottom-right':
      return 1;

    default:
      return 0;
  }
}

const InAnimation = (startOffset: number) => keyframes`
  from {
    opacity: 0;
    transform: translate(${startOffset}px);
  }
  to {
    opacity: 1;
    transform: translate(0px);
  }
`;

const OutAnimation = (endOffset: number) => keyframes`
  from {
    opacity: 1;
    transform: translate(0px);
  }
  to {
    opacity: 0;
    transform: translate(${endOffset}px);
  }
`;

interface StyledNotificationProps {
  closing: boolean;
  position?: NotificationsPosition;
}

const StyledNotification = styled(Notification)<StyledNotificationProps>`
  opacity: 0;
  animation: ${props =>
      props.closing
        ? OutAnimation(sideMultiplier(props.position) * offsetDistance)
        : InAnimation(sideMultiplier(props.position) * offsetDistance)}
    ${animationDuration / 1000}s ease-in-out forwards;
`;

export class ToastNotification extends React.Component<ToastNotificationProps, ToastNotificationState> {
  private autoCloseId: any;
  private closeId: any;

  constructor(props: ToastNotificationProps) {
    super(props);

    this.state = {
      closing: false,
    };
  }

  componentWillMount() {
    const { autoClose } = this.props;

    if (autoClose) {
      this.autoCloseId = setTimeout(this.close, autoClose);
    }
  }

  componentWillUnmount() {
    if (this.closeId) {
      clearTimeout(this.closeId);
    }

    if (this.autoCloseId) {
      clearTimeout(this.autoCloseId);
    }
  }

  private onCloseHandler = () => {
    this.close();
    return false;
  };

  private close = () => {
    const { onClose } = this.props;

    this.setState({ closing: true }, () => {
      this.closeId = setTimeout(() => {
        if (typeof onClose === 'function') {
          onClose();
        }
      }, animationDuration);
    });
  };

  render() {
    const { closing } = this.state;
    const { autoClose: _0, events: _1, id: _2, onClose: _4, position, ...other } = this.props;

    const toastTheme = {
      notificationPadding: `${distance.small} ${distance.small} ${distance.medium}`,
      notificationBorderWidth: `0 0 0 5px`,
      notificationTextFontSize: remCalc('12px'),
      notificationTextLineHeight: `14px`,
      notificationIconMarginRight: distance.small,
    };

    return (
      <StyledNotification
        position={position}
        closing={closing}
        theme={toastTheme}
        onClose={this.onCloseHandler}
        {...other}
      />
    );
  }
}
