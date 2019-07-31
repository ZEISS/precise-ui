import * as React from 'react';
import { withInputInfo } from '../hoc/withInputInfo';

export function showInputInfo(error?: React.ReactChild, info?: React.ReactChild) {
  const WithInputInfo = withInputInfo({ error, info });
  return <WithInputInfo />;
}
