import styled, { themed } from '../../utils/styled';
import { distance } from '../../distance';
import { ActionLink, ActionLinkProps } from '../ActionLink';

export const ActionIconContainer: React.ComponentType<ActionLinkProps> = styled(ActionLink)`
  margin-left: ${distance.xlarge};
  color: ${themed(({ theme }) => theme.ui5)};
`;
