import * as React from 'react';
import styled from '../../utils/styled';
import { SelectButton, SelectButtonChangeEvent } from '../SelectButton';
import { dark } from '../../colors';
import { distance } from '../../distance';

const StyledItemControls = styled.div`
  margin-right: auto;
  display: flex;
  align-items: center;
`;

const StyledItemsInfo = styled.div`
  position: relative;
  padding-left: ${distance.small};

  &:before {
    content: '';
    background: ${dark};
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 100%;
  }
`;

export interface ItemControlsProps {
  label: string;
  data: Array<string>;
  value: string;
  onChange?(attr: SelectButtonChangeEvent): void;
}

export const ItemControls: React.SFC<ItemControlsProps> = ({ label, data, value, children, onChange }) => (
  <StyledItemControls>
    {label}
    <SelectButton data={data} value={value} onChange={onChange} />
    <StyledItemsInfo>{children}</StyledItemsInfo>
  </StyledItemControls>
);
