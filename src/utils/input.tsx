import * as React from 'react';
import { InputError } from '../components/InputError';
import { InputInfo } from '../components/InputInfo';

export function showInputInfo(error?: React.ReactChild, info?: React.ReactChild) {
  if (error) {
    if (typeof error === 'string') {
      return <InputError>{error}</InputError>;
    }

    return error;
  } else if (info) {
    if (typeof info === 'string') {
      return <InputInfo>{info}</InputInfo>;
    }

    return info;
  }

  return false;
}
