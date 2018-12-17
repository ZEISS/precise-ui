import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { light } from '../../themes';
import { StandardProps } from '../../common';
import { Grid } from '../Grid';
import { distance } from '../../distance';

const widthPerNode = 150;
const spacingBetweenNodes = 30;

export interface SpiderProps extends StandardProps {
  /**
   * @ignore
   */
  children?: void;
  /**
   * The nodes to represent the spider data.
   */
  nodes?: Array<SpiderGraphNode>;
  /**
   * The width per node to use. By default, 150 (pixels) is being used.
   * @default 150
   */
  nodeWidth?: number;
  /**
   * The spacing between the nodes to use. By default, 30 (pixels) is being used.
   * @default 30
   */
  nodeSpacing?: number;
}

export interface SpiderGraphNode {
  id?: string;
  title: React.ReactNode;
  head: React.ReactNode;
  body?: React.ReactNode;
  connected?: string;
}

interface StyledNodeProps {
  width: number;
}

interface SpiderBoxProps {
  width: number;
}

const StyledContainer = styled.div`
  padding: ${distance.medium} 0;
  position: relative;
  overflow-x: auto;
`;

const StyledNode = styled.div`
  width: ${(props: StyledNodeProps) => props.width}px;
`;

const StyledNodeTitle = styled.div`
  font-size: 2em;
  margin-bottom: ${distance.xsmall};
  font-weight: 100;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledNodeHead = styled.div`
  box-sizing: border-box;
  padding: ${distance.xsmall};
  background: ${themed(props => props.theme.fill)};
  color: ${themed(props => props.theme.textSecondary)};
`;

const StyledNodeBody = styled.div`
  padding: ${distance.xsmall};
  background: ${themed(props => props.theme.text)};
  color: ${themed(props => props.theme.background)};
`;

const ConnectorCanvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const NodeGrid = styled(Grid)`
  position: relative;
  z-index: 1;
  padding-bottom: ${distance.xlarge};
`;

const SpiderBox = styled.div`
  position: relative;
  width: ${(props: SpiderBoxProps) => props.width}px;
`;

function computeHeight(element: Element) {
  const child = element.firstElementChild;

  if (child) {
    return child.getBoundingClientRect().height;
  }

  return 0;
}

function computeTopAnchor(element: Element) {
  const child = element.firstElementChild;

  if (child) {
    const body = child.children[1];
    const rect = body.getBoundingClientRect();
    return rect.top + rect.height * 0.5;
  }

  return 0;
}

/**
 * The spider component displays a linear workflow consisting of nodes with input and output.
 */
export class Spider extends React.PureComponent<SpiderProps> {
  private drawConnectors = (canvas?: HTMLCanvasElement) => {
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const grid = canvas.nextElementSibling && canvas.nextElementSibling.children[0];
      const ctx = canvas.getContext('2d');
      const { nodes = [], nodeWidth = widthPerNode, nodeSpacing = spacingBetweenNodes } = this.props;
      const lines: Array<number> = nodes.map(() => 0);
      canvas.width = rect.width;
      canvas.height = rect.height;

      if (ctx && grid) {
        ctx.clearRect(0, 0, rect.width, rect.height);

        for (let i = 0; i < nodes.length - 1; ++i) {
          const node = nodes[i];
          const target = node.connected;
          const left = (i + 1) * nodeWidth + nodeSpacing * i;
          const topLeft = computeTopAnchor(grid.children[i]) - rect.top;
          const topRight = computeTopAnchor(grid.children[i + 1]) - rect.top;
          ctx.strokeStyle = light.fill || '#000';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(left, topLeft);
          ctx.lineTo(left + nodeSpacing, topRight);
          ctx.stroke();
          ctx.closePath();

          if (target) {
            const curHeight = computeHeight(grid.children[i]);
            let maxHeight = curHeight;
            let maxLines = 0;
            let hops = 0;

            for (let j = i + 1; j < nodes.length; ++j) {
              const height = computeHeight(grid.children[j]);
              hops++;
              maxLines = Math.max(lines[j]++, maxLines);
              maxHeight = Math.max(maxHeight, height);

              if (nodes[j].id === target) {
                const offset = left - 0.4 * nodeWidth;
                const width = hops * (nodeWidth + nodeSpacing) - 0.2 * nodeWidth;
                const shift = maxLines % 2 === 1 ? 2 - 3 * (maxLines + 1) : 3 * maxLines;
                ctx.strokeStyle = light.textDisabled || '#ccc';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(offset, curHeight);
                ctx.lineTo(offset, maxHeight + 16 + shift);
                ctx.lineTo(offset + width, maxHeight + 16 + shift);
                ctx.lineTo(offset + width, height);
                ctx.stroke();
                ctx.closePath();
                break;
              }
            }
          }
        }
      }
    }
  };

  render() {
    const { nodes = [], theme, nodeWidth = widthPerNode, nodeSpacing = spacingBetweenNodes, ...props } = this.props;
    const columns = nodes.length;
    const width = columns * nodeWidth + nodeSpacing * (columns - 1);

    return (
      <StyledContainer {...props} theme={theme}>
        <SpiderBox width={width}>
          <ConnectorCanvas innerRef={this.drawConnectors} />
          <NodeGrid theme={theme} spacing={nodeSpacing} rows={1} columns={columns}>
            {nodes.map((node, i) => (
              <StyledNode width={nodeWidth} theme={theme} key={node.id || i}>
                <StyledNodeTitle theme={theme}>{node.title}</StyledNodeTitle>
                <StyledNodeHead theme={theme}>{node.head}</StyledNodeHead>
                {node.body && <StyledNodeBody theme={theme}>{node.body}</StyledNodeBody>}
              </StyledNode>
            ))}
          </NodeGrid>
        </SpiderBox>
      </StyledContainer>
    );
  }
}
