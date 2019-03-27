import * as React from 'react';
import styled from '../../utils/styled';
import { Container } from '../Container';
import { Icon } from '../Icon';
import { SelectButton, SelectButtonChangeEvent } from '../SelectButton';
import { cyan, grey1 } from '../../colors';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

export interface ChangePageProps {
  disabled: boolean;
}

export interface PageControlsProps {
  current: number;
  total: number;
  changeToPrevious?(): void;
  changeToNext?(): void;
  changeToSelect?(props: SelectButtonChangeEvent): void;
  pages: Array<string>;
}

const PageControlsStyled = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const ChangePage = styled.button<ChangePageProps>`
  ${getFontStyle({ size: 'xLarge' })}
  position: relative;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  outline: none;
  display: flex;
  background: transparent;
  border: none;
  align-items: center;
  padding: ${distance.small};
  margin: 0 ${distance.small};
  color: ${props => (!props.disabled ? cyan : grey1)};
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 1px;
    background: #dfe3e6;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
  }
  &:after {
    right: 0;
    left: auto;
  }
  &:last-child {
    margin-right: 0;
    &:after {
      display: none;
    }
  }
`;

export const PageControls: React.SFC<PageControlsProps> = ({
  children,
  current,
  total,
  changeToPrevious,
  changeToNext,
  changeToSelect,
  pages,
}) => (
  <PageControlsStyled>
    <Container>{children}</Container>
    <ChangePage disabled={current <= 0} onClick={changeToPrevious} type="button">
      <Icon name="KeyboardArrowLeft" />
    </ChangePage>
    <SelectButton data={pages} value={`${current + 1}`} onChange={changeToSelect} />
    <ChangePage disabled={current >= total - 1} onClick={changeToNext} type="button">
      <Icon name="KeyboardArrowRight" />
    </ChangePage>
  </PageControlsStyled>
);
