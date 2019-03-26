import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StepIndicatorProps, StepIndicatorStepProps } from './StepIndicator.types.part';
import { ListItemNumber } from './StepIndicatorShared.part';
import { distance } from '../../distance';
import { PreciseTheme } from '../../common';
import { getFontStyle } from '../../textStyles';

const StyledProgressContent = styled.div`
  min-height: ${distance.xxxlarge};
`;

const StyledProgressStep = styled.li`
  display: block;
  position: relative;
  padding-left: 40px;
  color: ${themed(({ theme }) => theme.text1)};

  &:before {
    content: '';
    display: block;
    border-radius: 50%;
    width: ${distance.small};
    height: ${distance.small};
    position: absolute;
    top: ${distance.small};
    left: ${distance.small};
    z-index: 1;
    background-color: ${themed(({ theme }) => theme.text1)};
  }

  &:not(:last-child):after {
    content: '';
    position: absolute;
    top: ${distance.small};
    left: 11px;
    width: 2px;
    height: 100%;
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

    &:after {
      background-color: ${themed(({ theme }) => theme.text2)};
    }

    &:before {
      background-color: ${themed(({ theme }) => theme.ui1)};
      border: 0.5em solid ${themed(({ theme }) => theme.text1)};
      left: 0;
      top: 0;
    }
  }
`;

const StyledProgressText = styled.div`
  display: block;
`;

const StyledProgressHost = styled.ol`
  width: 100%;
  display: block;
  padding: 0;
  margin: 0;

  & ${StyledProgressStep}:last-of-type ${StyledProgressContent} {
    min-height: auto;
  }
`;

function createStep(
  header: React.ReactNode,
  content: React.ReactNode,
  i: number,
  active: boolean,
  numbered?: boolean,
  theme?: PreciseTheme,
) {
  return (
    <StyledProgressStep theme={theme} key={i} className={active ? 'step-active' : ''}>
      {numbered && <ListItemNumber theme={theme}>{i + 1}</ListItemNumber>}
      <StyledProgressText theme={theme}>{header}</StyledProgressText>
      <StyledProgressContent>{content}</StyledProgressContent>
    </StyledProgressStep>
  );
}

function getHeaders(steps: Array<React.ReactNode>, current: number, numbered?: boolean, theme?: PreciseTheme) {
  return steps.map((step, i) => createStep(step, undefined, i, i === current, numbered, theme));
}

function getContent(children: React.ReactNode, current: number, numbered?: boolean, theme?: PreciseTheme) {
  const items: Array<React.ReactChild> = [];

  React.Children.forEach(children, (element: React.ReactElement<StepIndicatorStepProps>, i) => {
    if (element && React.isValidElement(element)) {
      const { header, children } = element.props;
      items.push(createStep(header, children, i, i === current, numbered, theme));
    }
  });

  return items;
}

export const StepIndicatorVertical: React.SFC<StepIndicatorProps> = ({
  theme,
  steps,
  current = 0,
  numbered,
  children,
}) => {
  const items =
    steps !== undefined ? getHeaders(steps, current, numbered, theme) : getContent(children, current, numbered, theme);

  return <StyledProgressHost>{items}</StyledProgressHost>;
};
