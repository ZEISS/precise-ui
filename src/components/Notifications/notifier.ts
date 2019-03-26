import { NotificationOption, NotificationType, NotificationOptions, NotificationAction } from './types';
import { eventManagers } from '../../utils/eventManager';

const defaultOptions: NotificationOption = {
  type: 'none',
  autoClose: undefined,
};

function mergeOptions(options: NotificationOption, type: NotificationType): NotificationOption {
  return Object.assign({}, defaultOptions, options, { type });
}

function emitEvent({ content, options = {} }: NotificationOptions, type: NotificationType = 'none') {
  const { events: eventManagerOption } = options;
  const eventManager = eventManagerOption || eventManagers[0];
  eventManager.emit(NotificationAction.showNotification, {
    content,
    options: mergeOptions(options, type),
  });
}

export const notify = Object.assign(
  (payload: NotificationOptions) => emitEvent(payload, payload.options && payload.options.type),
  {
    success: (payload: NotificationOptions) => emitEvent(payload, 'success'),
    info: (payload: NotificationOptions) => emitEvent(payload, 'info'),
    warn: (payload: NotificationOptions) => emitEvent(payload, 'warning'),
    warning: (payload: NotificationOptions) => emitEvent(payload, 'warning'),
    error: (payload: NotificationOptions) => emitEvent(payload, 'error'),
  },
);
