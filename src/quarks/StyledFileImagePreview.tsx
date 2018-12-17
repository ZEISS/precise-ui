import * as React from 'react';
import { remCalc } from '../utils/remCalc';
import styled, { themed } from '../utils/styled';
import { distance } from '../distance';

export interface FileImagePreview {
  file: File;
  data: string;
}

export interface StyledFileImagePreviewProps {
  src?: string;
}

const PreviewImageWrapper = styled.div`
  display: inline-flex;
  background-color: ${themed(({ theme }) => theme.ui3)};
  padding: ${distance.xsmall} ${distance.small} ${distance.xsmall} ${distance.xsmall};
  margin-right: ${distance.xsmall};
  margin-bottom: ${distance.xsmall};
`;

const PreviewImage = styled.img`
  max-width: ${remCalc('96px')};
  max-height: ${remCalc('96px')};
`;

export const StyledFileImagePreview: React.SFC<StyledFileImagePreviewProps> = ({ src, children }) => {
  return (
    <PreviewImageWrapper>
      {src && <PreviewImage src={src} />}
      {children}
    </PreviewImageWrapper>
  );
};
