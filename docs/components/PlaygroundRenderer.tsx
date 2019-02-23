import * as React from 'react';
import { styled, distance, StackPanel, StackItem } from '../../src';

interface PlaygroundRendererProps {
  name: string;
  preview: React.ReactNode;
  previewProps: any;
  tabButtons: React.ReactNode;
  tabBody: React.ReactNode;
  toolbar: React.ReactNode;
}

const PlaygroundBox = styled.div`
  border: 1px solid #000;
  margin: ${distance.medium} 0;
`;

const PreviewPanel = styled.div`
  padding: ${distance.medium};
`;

const CodePanel = styled.div`
  padding: ${distance.medium};
  background: rgba(75, 78, 82, 0.05);

  div.CodeMirror {
    background: transparent;
    padding: ${distance.large} ${distance.xsmall} 0 ${distance.xsmall};
  }
`;

const StyledStackPanel = styled(StackPanel)`
  justify-content: space-between;
`;

const ToolbarContainer = styled(StackItem)`
  flex-grow: 0;
  flex-shrink: 0;
  height: 22px;
  margin-top: -4px;
`;

const PlaygroundRenderer: React.SFC<PlaygroundRendererProps> = ({
  preview,
  tabButtons,
  tabBody,
  toolbar,
  name,
  previewProps,
}) => {
  return (
    <PlaygroundBox>
      <PreviewPanel data-preview={name} {...previewProps}>
        {preview}
      </PreviewPanel>
      <CodePanel>
        <StyledStackPanel>
          <StackItem>
            {tabButtons}
            {tabBody}
          </StackItem>
          <ToolbarContainer>{toolbar}</ToolbarContainer>
        </StyledStackPanel>
      </CodePanel>
    </PlaygroundBox>
  );
};

export default PlaygroundRenderer;
