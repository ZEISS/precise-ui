import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { grey4 } from '../../colors';

export interface StepIndicatorProps {
  /**
   * The current step to show as active. Zero based.
   * @default -1
   */
  current?: number;
  /**
   * The steps to render.
   */
  steps: Array<React.ReactChild>;
}

const StyledProgressHost = styled.ol`
  width: 100%;
  display: table;
  table-layout: fixed;
  padding: 0;
  margin: 0;
  height: 4em;
`;

const StyledProgressStep = styled.li`
  display: table-cell;
  text-align: center;
  vertical-align: top;
  position: relative;

  &::before {
    content: '';
    display: block;
    border-radius: 50%;
    margin: 1em auto;
    width: 8px;
    height: 8px;
    position: relative;
    left: -50%;
    z-index: 1;
  }

  &:not(:first-child)::after {
    content: '';
    position: absolute;
    top: 19px;
    left: -100%;
    width: 100%;
    height: 2px;
  }

  &::before {
    background-color: ${themed(({ theme }) => theme.text1)};
  }

  &::after {
    background-color: ${themed(({ theme }) => theme.text1)};
  }

  &.step-active {
    color: ${themed(({ theme }) => theme.text1)};
  }

  .step-active ~ &::before {
    background-color: ${grey4};
  }

  .step-active ~ &::after {
    background-color: ${grey4};
  }

  &.step-active div {
    color: ${themed(({ theme }) => theme.text1)};
    font-weight: 500;
  }

  &.step-active::before {
    background-color: ${themed(({ theme }) => theme.ui1)};
    border: 0.5em solid ${themed(({ theme }) => theme.text1)};
    margin: 0.5em auto;
  }
`;

const StyledProgressText = styled.div`
  color: ${themed(({ theme }) => theme.ui4)};
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: absolute;
  left: 0;
  top: 2.5em;
`;

export const StepIndicator: React.SFC<StepIndicatorProps> = ({ steps, current }) => (
  <StyledProgressHost>
    {steps.map((step, i) => (
      <StyledProgressStep key={i} className={i === current ? 'step-active' : ''}>
        <StyledProgressText>{step}</StyledProgressText>
      </StyledProgressStep>
    ))}
  </StyledProgressHost>
);
