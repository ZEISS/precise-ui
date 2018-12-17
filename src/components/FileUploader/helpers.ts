import { FileProgress } from '../FileUploaderDetails';
import { getStatus } from '../FileUploaderDetails/helpers';

let uploadId = 0;

function pad(value: number) {
  if (value < 10) {
    return `00${~~value}`;
  } else if (value < 100) {
    return `0${~~value}`;
  } else if (value < 1000) {
    return `${~~value}`;
  } else {
    return `${~~value % 1000}`;
  }
}

export function generateId() {
  return `${pad(Math.random() * 1000)}-${pad(Math.random() * 1000)}-${pad(uploadId++)}`;
}

export function getSimpleStatus(file: FileProgress) {
  const status = getStatus(file);

  switch (status) {
    case 'error':
    case 'canceled':
      return 'canceled';
    case 'progress':
    case 'scanning':
      return 'active';
  }

  return 'complete';
}
