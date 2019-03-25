import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StepIndicatorProps, StepIndicatorStepProps } from './StepIndicator.types.part';
import { ListItemNumber } from './StepIndicatorShared.part';
import { PreciseTheme } from '../../common';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

const StyledProgressHost = styled.ol`
  width: 100%;
  display: table;
  table-layout: fixed;
  padding: 0;
  margin: 0;
  height: 4em;
  box-sizing: border-box;
  padding-left: ${distance.medium};
`;

const HorizontalNumber = styled(ListItemNumber)`
  top: ${distance.small};
  left: -12px;
`;

const StyledProgressStep = styled.li`
  display: table-cell;
  text-align: center;
  vertical-align: top;
  position: relative;
  color: ${themed(({ theme }) => theme.text1)};

  &:before {
    content: '';
    display: block;
    border-radius: 50%;
    margin: 1em auto;
    width: ${distance.small};
    height: ${distance.small};
    position: relative;
    left: -50%;
    z-index: 1;
    background-color: ${themed(({ theme }) => theme.text1)};
  }

  &:not(:first-child):after {
    content: '';
    position: absolute;
    top: 19px;
    left: -100%;
    width: 100%;
    height: 2px;
    background-color: ${themed(({ theme }) => theme.text1)};
  }

  &.step-active {
    ${getFontStyle({ weight: 'medium' })}
    
    color: ${themed(({ theme }) => theme.text1)};

    ~ li {
      color: ${themed(({ theme }) => theme.text2)};

      &:before {
        background-color: ${themed(({ theme }) => theme.text2)};
      }

      &:after {
        background-color: ${themed(({ theme }) => theme.text2)};
      }
    }

    &:before {
      background-color: ${themed(({ theme }) => theme.ui1)};
      border: 0.5em solid ${themed(({ theme }) => theme.text1)};
      margin: 0.5em auto;
    }
  }
`;

const StyledProgressText = styled.div`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: absolute;
  left: 0;
  top: 2.5em;
`;

function createStep(header: React.ReactNode, i: number, active: boolean, numbered?: boolean, theme?: PreciseTheme) {
  return (
    <StyledProgressStep theme={theme} key={i} className={active ? 'step-active' : ''}>
      {numbered && <HorizontalNumber theme={theme}>{i + 1}</HorizontalNumber>}
      <StyledProgressText theme={theme}>{header}</StyledProgressText>
    </StyledProgressStep>
  );
}

function getHeaders(steps: Array<React.ReactNode>, current: number, numbered?: boolean, theme?: PreciseTheme) {
  const items = steps.map((step, i) => createStep(step, i, i === current, numbered, theme));

  return {
    items,
    content: undefined,
  };
}

function getContent(children: React.ReactNode, current: number, numbered?: boolean, theme?: PreciseTheme) {
  const items: Array<React.ReactChild> = [];
  let content: React.ReactNode = undefined;

  React.Children.forEach(children, (element: React.ReactElement<StepIndicatorStepProps>, i) => {
    if (element && React.isValidElement(element)) {
      const { header, children } = element.props;
      const active = i === current;

      items.push(createStep(header, i, active, numbered, theme));

      if (active) {
        content = children;
      }
    }
  });

  return {
    items,
    content,
  };
}

export const StepIndicatorHorizontal: React.SFC<StepIndicatorProps> = ({
  theme,
  steps,
  current = 0,
  numbered,
  children,
  ...props
}) => {
  const { items, content } =
    steps !== undefined ? getHeaders(steps, current, numbered, theme) : getContent(children, current, numbered, theme);
  return (
    <div {...props}>
      <StyledProgressHost theme={theme}>{items}</StyledProgressHost>
      {content}
    </div>
  );
};
