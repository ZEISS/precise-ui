import * as React from 'react';
import styled, { css } from '../../utils/styled';
import {
  NotificationOption,
  NotificationProps,
  NotificationsPosition,
  NotificationAction,
  NotificationOptions,
  NotificationContent,
} from './types';
import { EventManager, eventManagers } from '../../utils/eventManager';
import { capitalizeFirst } from '../../utils/text';
import { ToastNotification } from './ToastNotification.part';

export {
  NotificationsPosition,
  NotificationOption,
  NotificationType,
  NotificationOptions,
  NotificationAction,
} from './types';
export { notify } from './notifier';

export interface NotificationsProps {
  /**
   * Custom notification renderer component.
   */
  notificationRenderer?(e: NotificationOptions): React.ReactChild;
  /**
   * The default position for new notifications. By default relative.
   * @default relative
   */
  position?: NotificationsPosition;
  /**
   * Disable the pointer symbol. By default enabled.
   * @default false
   */
  disablePointer?: boolean;
  /**
   * The width to be used, by default auto.
   * @default auto
   */
  width?: number;
  /**
   * Automatically closes notifications after a certain time. By default
   * the notifications are not closed.
   * @default false
   */
  autoClose?: false | number;
  /**
   * Show the latest on top. By default latest notifications are shown below.
   * @default false
   */
  newestOnTop?: boolean;
  /**
   * Sets the event manager to use. By default a standard event manager is used.
   */
  events?: EventManager;
}

export interface NotificationsState {
  notifications: Array<string>;
}

export interface StyledNotificationsProps {
  position?: NotificationsPosition;
  disablePointer?: boolean;
  width?: number;
}

export interface AbsoluteContainerProps {
  position: NotificationsPosition;
  width: number;
}

interface NotificationEntry extends NotificationOptions {
  name: string;
}

const defaultProps = {
  width: 320,
};

const getNotificationPositionStyle = (pos: NotificationsPosition) => {
  let positionStyle = `${pos.split('-')[0]}:1rem;`;
  if (pos.indexOf('center') !== -1) {
    positionStyle += `left:50%;transform:translateX(-50%);`;
  } else {
    positionStyle += `${pos.split('-')[1]}:1rem;`;
  }

  return positionStyle;
};

const AbsoluteContainer = css<AbsoluteContainerProps>`
  z-index: 10001;
  position: fixed;
  ${props => getNotificationPositionStyle(props.position)};
  width: ${props => (props.width ? props.width : defaultProps.width)}px;
  @media (max-width: 480px) {
    width: 100vw;
    padding: 0;
    right: 0;
    margin: 0;
    position: fixed;
    ${props => (props.position.substring(0, 3) === 'top' ? 'top: 0' : 'bottom: 0')};
  }
`;

const StyledNotifications = styled.div<StyledNotificationsProps>`
  box-sizing: border-box;
  width: ${props => (!props.width ? 'auto' : `${props.width}px`)};
  ${props => (props.disablePointer ? `pointer-events: none` : ``)};
  @media (max-width: 480px) {
    padding: 0;
    margin: 0;
  }
  ${props => (props.position !== 'relative' ? AbsoluteContainer : '')};
`;

interface NotificationClose {
  (): void;
}

/**
 * The host element for arbitrary notifications. Use as a singleton only.
 */
export class Notifications extends React.Component<NotificationsProps, NotificationsState> {
  private collection: Array<NotificationEntry> = [];
  private eventManager: EventManager;

  constructor(props: NotificationsProps) {
    super(props);
    const { events } = props;
    this.eventManager = events || eventManagers[0];

    this.state = {
      notifications: [],
    };
  }

  componentDidMount() {
    const em = this.eventManager;
    em.on(NotificationAction.showNotification, this.show);
    em.on(NotificationAction.clearNotification, this.hide);
    eventManagers.push(em);
  }

  componentWillUnmount() {
    const em = this.eventManager;
    em.off(NotificationAction.showNotification, this.show);
    em.off(NotificationAction.clearNotification, this.hide);
    eventManagers.splice(eventManagers.lastIndexOf(em), 1);
  }

  private removeNotification(id: string) {
    this.setState({
      notifications: this.state.notifications.filter(v => v !== id),
    });
  }

  private clearNotifications() {
    this.setState({
      notifications: [],
    });
  }

  private getNotificationContent(content: NotificationContent, onClose?: NotificationClose) {
    if (React.isValidElement(content)) {
      return React.cloneElement(content, { onClose } as NotificationProps);
    } else if (typeof content === 'function') {
      return content({ onClose });
    }

    return content;
  }

  private hide = (id: string) => {
    if (typeof id === 'string') {
      this.removeNotification(id);
    } else {
      this.clearNotifications();
    }
  };

  private show = (payload: NotificationOptions) => {
    const { content, options = {} } = payload;
    const { position, autoClose } = this.props;
    const { notifications } = this.state;
    const id = options.id || `${~~(Math.random() * 1000000)}`;
    const opts: NotificationOption = {
      id,
      type: options.type || 'none',
      onClose: () => this.removeNotification(id),
      position: options.position || position,
      title: options.title || capitalizeFirst(options.type || ''),
      actionRenderer: options.actionRenderer,
      autoClose: typeof options.autoClose === 'number' ? options.autoClose : autoClose,
    };

    this.collection.push({
      name: id,
      options: opts,
      content: this.getNotificationContent(content, opts.onClose),
    });

    this.setState({
      notifications: [...notifications, id],
    });
  };

  private defaultNotificationRenderer(payload: NotificationOptions) {
    const { content, options = {} } = payload;
    return (
      <ToastNotification {...options} title={options.title} key={`notification-${options.id}`}>
        {content}
      </ToastNotification>
    );
  }

  private makeNotification(payload: NotificationOptions) {
    const { notificationRenderer } = this.props;
    const renderer = notificationRenderer || this.defaultNotificationRenderer;
    return renderer(payload);
  }

  render() {
    const { position = 'relative', width, newestOnTop = false } = this.props;
    const { notifications } = this.state;
    const notificationsToRender = {};
    const collection = this.collection.map((item, i) => ({
      id: item.name,
      item: item,
      index: i,
    }));

    if (newestOnTop) {
      collection.reverse();
    }

    collection.forEach(({ id, item, index }) => {
      const options = item.options || {};
      const itemPosition = options.position || position;
      notificationsToRender[itemPosition] || (notificationsToRender[itemPosition] = []);

      if (notifications.indexOf(id) !== -1) {
        notificationsToRender[itemPosition].push(this.makeNotification(item));
      } else {
        notificationsToRender[itemPosition].push(undefined);
        this.collection.splice(index, 1);
      }
    });

    return (
      <div>
        {Object.keys(notificationsToRender).map((position: NotificationsPosition) => {
          const disablePointer =
            notificationsToRender[position].length === 1 && notificationsToRender[position][0] === null;

          return (
            <StyledNotifications
              key={`notification-container-${position}`}
              width={width}
              position={position}
              disablePointer={disablePointer}>
              {notificationsToRender[position]}
            </StyledNotifications>
          );
        })}
      </div>
    );
  }
}
