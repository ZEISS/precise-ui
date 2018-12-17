import * as React from 'react';
import { remCalc } from '../utils/remCalc';
import styled, { themed } from '../utils/styled';
import { distance } from '../distance';
import { TextStyles, TextStylings } from '../textStyles';

const FileItem = styled.li`
  background-color: ${themed(({ theme }) => theme.ui3)};
  font-size: ${TextStylings[TextStyles.caption].fontSize};
  line-height: ${TextStylings[TextStyles.caption].lineHeight};
  font-weight: ${TextStylings[TextStyles.caption].fontWeight};
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

const Remove = styled.div`
  cursor: pointer;
  line-height: 1;
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
