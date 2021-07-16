import * as React from 'react';
import { usePrompt } from './usePrompt';
import { PromptBasicProps, PromptMessageCallback } from './Prompt.types';

export const PromptBasic: React.FC<PromptBasicProps> = ({ history, when, message }) => {
  usePrompt(() => getMessage(message), () => getMessage(message), history, when);

  // tslint:disable-next-line
  return null;
};

export const getMessage = (message: string | PromptMessageCallback) =>
  typeof message === 'function' ? message(undefined) : message;
