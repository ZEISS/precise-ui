import * as React from 'react';
import { InputInfo, InputInfoProps } from '../components/InputInfo';
import { InputError, InputErrorProps } from '../components/InputError';

type Props = {
  error?: React.ReactChild;
  info?: React.ReactChild;
};

export const withInputInfo = ({ error, info }: Props) => {
  const WithInfo = ({ info, ...props }: Pick<Props, 'info'>) => {
    return typeof info === 'string' ? (
      <InputInfo left="medium" {...props}>
        {info}
      </InputInfo>
    ) : (
      <>{info}</>
    );
  };
  const WithError = ({ error, ...props }: Pick<Props, 'error'>) => {
    return typeof error === 'string' ? (
      <InputError left="medium" {...props}>
        {error}
      </InputError>
    ) : (
      <>{error}</>
    );
  };

  if (error) return (props: InputErrorProps) => <WithError error={error} {...props} />;
  if (info) return (props: InputInfoProps) => <WithInfo info={info} {...props} />;

  return () => <></>;
};
