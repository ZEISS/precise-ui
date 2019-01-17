import * as React from 'react';
import { EventManager } from '../../utils/eventManager';

export interface NotificationOption {
  /**
   * Gives the notification a unique identifier.
   */
  id?: string;
  /**
   * Sets the type of the notification.
   */
  type?: NotificationType;
  /**
   * Determines the position of the notification.
   */
  position?: NotificationsPosition;
  /**
   * Event fired when the notification is closed.
   */
  onClose?(): void;
  /**
   * Optionally provides a custom way for rendering an action control.
   */
  actionRenderer?(): React.ReactChild;
  /**
   * Sets the title of the notification message.
   */
  title?: string;
  /**
   * Automatically closes the notification after some milliseconds.
   */
  autoClose?: false | number;
  /**
   * Optionally sets the event manager to use.
   */
  events?: EventManager;
}

export interface NotificationProps {
  /**
   * Event fired when the notification is closed.
   */
  onClose?(): void;
}

export type NotificationsPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'relative';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'none';

export const NotificationAction = {
  showNotification: 'show_notification',
  clearNotification: 'clear_notification',
  notificationsMounted: 'notifications_mounted',
};

export type NotificationContent =
  | JSX.Element
  | React.ReactElement<NotificationProps>
  | string
  | number
  | ((props: NotificationProps) => React.ReactChild);

export interface NotificationOptions {
  content: NotificationContent;
  options?: NotificationOption;
}
