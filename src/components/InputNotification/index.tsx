import * as React from 'react';
import { InputError, InputErrorProps } from '../InputError';
import { InputInfo, InputInfoProps } from '../InputInfo';

export interface InputNotificationProps extends InputErrorProps, InputInfoProps {
  error?: React.ReactNode;
  info?: React.ReactNode;
}

/**
 * Input notification component.
 * Shows InputError and InputInfo either error or info provided.
 */
export const InputNotification: React.FC<InputNotificationProps> = ({ error, info, ...rest }) => {
  if (error) {
    if (typeof error === 'string') {
      return <InputError {...rest}>{error}</InputError>;
    }

    return <>{error}</>;
  } else if (info) {
    if (typeof info === 'string') {
      return <InputInfo {...rest}>{info}</InputInfo>;
    }

    return <>{info}</>;
  }

  // tslint:disable-next-line
  return null;
};
