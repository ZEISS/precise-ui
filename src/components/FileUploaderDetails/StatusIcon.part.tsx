import * as colors from '../../colors';
import { distance } from '../../distance';
import { reStyled } from '../../utils/styled';
import { IconProps, Icon } from '../Icon';
import { ProgressStatus } from './FileUploaderDetails.types.part';

export interface StatusIconProps extends IconProps {
  type?: ProgressStatus;
  condensed?: boolean;
}

export const StatusIcon: React.ComponentType<StatusIconProps> = reStyled<StatusIconProps>(Icon)(
  ({ theme, type, condensed }) => `
  color: ${
    type === 'success' ? colors.lightGreen : type === 'error' || type === 'canceled' ? colors.purpleRed : theme.ui0
  };
  padding-right: ${condensed ? distance.xsmall : distance.medium};
`,
);
