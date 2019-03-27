import * as React from 'react';
import styled, { themed } from '../utils/styled';
import { distance } from '../distance';
import { getFontStyle } from '../textStyles';

const FileItem = styled.li`
  ${getFontStyle({ size: 'xSmall' })}
  background-color: ${themed(({ theme }) => theme.ui3)};
  padding: ${distance.small} ${distance.medium};
  margin-bottom: ${distance.xsmall};
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FileName = styled.span`
  flex: 1;
`;

export interface StyledFileItemProps {
  name?: string;
}

export const StyledFileItem: React.SFC<StyledFileItemProps> = ({ name, children }) => {
  return (
    <FileItem>
      {name && <FileName>{name}</FileName>}
      {children}
    </FileItem>
  );
};
