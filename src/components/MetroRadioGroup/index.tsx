import * as React from 'react';
import styled from '../../utils/styled';
import { RadioButtonGroup, RadioButtonGroupProps } from '../RadioButtonGroup';

const TileContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: -10px -10px 0;
`;

export const MetroRadioGroup: React.SFC<RadioButtonGroupProps> = props => (
  <TileContainer>
    <RadioButtonGroup {...props} />
  </TileContainer>
);
MetroRadioGroup.displayName = 'MetroRadioGroup';
