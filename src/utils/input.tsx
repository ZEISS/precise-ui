import * as React from 'react';
import { InputNotification } from '../components/InputNotification';
import { PaddedContainer } from '../components/PaddedContainer';

/**
 * @deprecated use InputNotification component instead
 * @param error ReactChild
 * @param info ReactChild
 */
export function showInputInfo(error?: React.ReactChild, info?: React.ReactChild) {
  return (
    (error || info) && (
      <PaddedContainer left="medium" top="xsmall" bottom="xsmall">
        <InputNotification error={error} info={info} />
      </PaddedContainer>
    )
  );
}
