import styled, { themed } from '../../utils/styled';

export const ListItemNumber = styled.div`
  display: block;
  border-radius: 50%;
  position: absolute;
  width: 24px;
  height: 24px;
  line-height: 20px;
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
