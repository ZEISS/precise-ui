import * as colors from '../../colors';
import { distance } from '../../distance';
import { IconProps, Icon } from '../Icon';
import { ProgressStatus } from './FileUploaderDetails.types.part';
import styled, { themed } from '../../utils/styled';

export interface StatusIconProps extends IconProps {
  type?: ProgressStatus;
  condensed?: boolean;
}

export const StatusIcon: React.ComponentType<StatusIconProps> = styled(Icon)<StatusIconProps>(
  themed(
    ({ theme, type, condensed }) => `
      color: ${
        type === 'success' ? colors.lightGreen : type === 'error' || type === 'canceled' ? colors.purpleRed : theme.ui0
      };
      padding-right: ${condensed ? distance.xsmall : distance.medium};
    `,
  ),
);
