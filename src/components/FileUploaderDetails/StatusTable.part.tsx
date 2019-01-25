import * as React from 'react';
import styled, { reStyled, themed } from '../../utils/styled';
import { getPropLabel } from '../../utils/labels';
import { Icon } from '../Icon';
import { ProgressBar } from '../ProgressBar';
import { Table, TableCellEvent, TableRowEvent } from '../Table';
import { ActionIconContainer } from './ActionIconContainer.part';
import { FileProgress, FileUploaderDetailsEvent } from './FileUploaderDetails.types.part';
import { StatusIcon } from './StatusIcon.part';
import { getStatus, iconNames } from './helpers';
import { StandardProps } from '../../common';

const TextWrapBox = styled.div`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledTable = styled(Table)`
  table-layout: fixed;
`;

const ProgressTableRow = reStyled.tr(
  ({ theme }) => `
  border-bottom: 1px solid ${theme.ui4};
  padding: 0;
  &:hover {
    background: ${theme.ui3};
  }
`,
);

const ProgressTableCell = styled.td`
  padding: 0 !important;
  &:hover {
    background: ${themed(({ theme }) => theme.ui3)};
  }
`;

const StyledProgressBar = styled(ProgressBar)`
  border-radius: 0;
  height: 2px;
`;

export interface StyledTableRowProps {
  hasProgressBar: boolean;
}

export const StyledTableRow = reStyled.tr<StyledTableRowProps>(
  ({ hasProgressBar, theme }) => `
  border-bottom: ${hasProgressBar ? 0 : 1}px solid ${theme.ui4};
  &:hover {
    background: ${theme.ui4};
  }
`,
);

export interface StatusTableProps extends StandardProps {
  files: Array<FileProgress>;
  onCancel(e: FileUploaderDetailsEvent<FileProgress>): void;
  onDelete(e: FileUploaderDetailsEvent<FileProgress>): void;
  tableHeaderFileLabel?: string;
  tableHeaderStatusLabel?: string;
  canceledTableUploadLabel?: string;
  scanningTableUploadLabel?: string;
  progressTableUploadLabel?: string;
  successTableUploadLabel?: string;
  errorTableUploadLabel?: string;
}

export const StatusTable: React.SFC<StatusTableProps> = ({ theme, files, onCancel, onDelete, ...props }) => {
  const columns = {
    name: {
      header: getPropLabel(props, 'tableHeaderFileLabel'),
    },
    status: {
      header: getPropLabel(props, 'tableHeaderStatusLabel'),
      width: '40%',
    },
    action: {
      header: '',
      width: '30px',
    },
  };

  const data = files.map(item => ({
    ...item,
    status: getStatus(item),
  }));

  function rowRenderer({ cells, data }: TableRowEvent<FileProgress>) {
    const hasProgressBar = !(data.canceled || data.error || data.progress >= 100);
    return (
      <React.Fragment key={data.fileId}>
        <StyledTableRow hasProgressBar={hasProgressBar} theme={theme}>
          {cells}
        </StyledTableRow>
        {hasProgressBar && (
          <ProgressTableRow theme={theme}>
            <ProgressTableCell colSpan={3}>
              <StyledProgressBar value={data.progress} animate />
            </ProgressTableCell>
          </ProgressTableRow>
        )}
      </React.Fragment>
    );
  }

  function cellRenderer(e: TableCellEvent<FileProgress>) {
    const value = e.value;
    const fileData = e.data;

    if (e.key.toLowerCase() === 'action' && fileData) {
      const status = getStatus(fileData);
      return status === 'progress' || status === 'scanning' ? (
        <ActionIconContainer onClick={() => onCancel({ files: [fileData] })}>
          <Icon name="Close" />
        </ActionIconContainer>
      ) : status === 'success' ? (
        <ActionIconContainer onClick={() => onDelete({ files: [fileData] })}>
          <Icon name="Delete" />
        </ActionIconContainer>
      ) : (
        false
      );
    }

    if (e.key.toLowerCase() === 'status' && e.data) {
      const status = getStatus(e.data);
      const error = status === 'error' && e.data.error;

      return (
        <TextWrapBox>
          <StatusIcon condensed type={status} name={iconNames[value]} />
          {error || getPropLabel(props, `${status}TableUploadLabel` as any)}
        </TextWrapBox>
      );
    }

    return <TextWrapBox>{value}</TextWrapBox>;
  }

  return (
    <StyledTable
      data={data}
      theme={theme}
      columns={columns}
      rowRenderer={rowRenderer}
      cellRenderer={cellRenderer}
      mode="table"
      condensed
    />
  );
};
