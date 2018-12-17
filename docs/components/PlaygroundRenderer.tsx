import * as React from 'react';
import { styled, distance } from '../../src';

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

const PlaygroundRenderer: React.SFC<PlaygroundRendererProps> = ({ preview, tabButtons, tabBody }) => {
  return (
    <PlaygroundBox>
      <PreviewPanel>{preview}</PreviewPanel>
      <CodePanel>
        {/*toolbar*/}
        {tabButtons}
        {tabBody}
      </CodePanel>
    </PlaygroundBox>
  );
};

export default PlaygroundRenderer;
