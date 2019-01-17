import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StepIndicatorProps, StepIndicatorStepProps } from './StepIndicator.types.part';
import { distance } from '../../distance';

const StyledProgressHost = styled.ol`
  width: 100%;
  display: block;
  padding: 0;
  margin: 0;
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
    width: 8px;
    height: 8px;
    position: absolute;
    top: 0;
    left: ${distance.small};
    z-index: 1;
    background-color: ${themed(({ theme }) => theme.text1)};
  }

  &:not(:last-child):after {
    content: '';
    position: absolute;
    top: 0;
    left: 11px;
    width: 2px;
    height: 100%;
    background-color: ${themed(({ theme }) => theme.text1)};
  }

  &.step-active {
    color: ${themed(({ theme }) => theme.text1)};
    font-weight: 500;

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
    }
  }
`;

const StyledProgressText = styled.div`
  display: block;
`;

const StyledProgressContent = styled.div`
  min-height: 100px;
`;

const ListItemNumber = styled.div`
  display: block;
  border-radius: 50%;
  position: absolute;
  width: 24px;
  height: 24px;
  top: 0;
  left: 0;
  z-index: 1;
  background: ${themed(({ theme }) => theme.ui1)};
  border: 2px solid ${themed(({ theme }) => theme.text1)};
  box-sizing: border-box;
  text-align: center;

  .step-active ~ li & {
    border-color: ${themed(({ theme }) => theme.text2)};
  }
`;

export const StepIndicatorVertical: React.SFC<StepIndicatorProps> = ({ current, numbered, children }) => {
  const items: Array<React.ReactChild> = [];

  React.Children.forEach(children, (element: React.ReactElement<StepIndicatorStepProps>, i) => {
    if (element && React.isValidElement(element)) {
      const { header, children } = element.props;

      items.push(
        <StyledProgressStep key={i} className={i === current ? 'step-active' : ''}>
          {numbered && <ListItemNumber>{i + 1}</ListItemNumber>}
          <StyledProgressText>{header}</StyledProgressText>
          <StyledProgressContent>{children}</StyledProgressContent>
        </StyledProgressStep>,
      );
    }
  });

  return <StyledProgressHost>{items}</StyledProgressHost>;
};
