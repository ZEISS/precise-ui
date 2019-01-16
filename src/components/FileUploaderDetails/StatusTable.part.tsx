import * as React from 'react';
import styled, { reStyled, themed } from '../../utils/styled';
import { Icon } from '../Icon';
import { ProgressBar } from '../ProgressBar';
import { Table, TableCellEvent, TableRowEvent, TableProps } from '../Table';
import { ActionIconContainer } from './ActionIconContainer.part';
import { FileProgress, FileUploaderDetailsEvent, TranslationLabels } from './FileUploaderDetails.types.part';
import { StatusIcon } from './StatusIcon.part';
import { defaultLabels, getStatus, iconNames } from './helpers';

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

interface StyledTableRowProps {
  hasProgressBar: boolean;
}

const StyledTableRow = reStyled.tr<StyledTableRowProps>(
  ({ hasProgressBar, theme }) => `
  border-bottom: ${hasProgressBar ? 0 : 1}px solid ${theme.ui4};
  &:hover {
    background: ${theme.ui4};
  }
`,
);

export interface StatusTableProps {
  files: Array<FileProgress>;
  labels: Partial<TranslationLabels>;
  onCancel(e: FileUploaderDetailsEvent<FileProgress>): void;
  onDelete(e: FileUploaderDetailsEvent<FileProgress>): void;
}

function rowRenderer({ theme, cells, data }: TableRowEvent<FileProgress>) {
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

export const StatusTable: React.SFC<StatusTableProps> = ({ files, onCancel, onDelete, labels }) => {
  const columns = {
    name: {
      header: labels.tableHeaderFile || defaultLabels.tableHeaderFile,
    },
    status: {
      header: labels.tableHeaderStatus || defaultLabels.tableHeaderStatus,
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

  function cellRenderer(e: TableCellEvent<FileProgress>) {
    let value = e.value;
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
      value = getStatus(e.data);
      const error = value === 'error' && e.data.error;
      return (
        <TextWrapBox>
          <StatusIcon condensed type={value} name={iconNames[value]} />
          {error || labels[`${value}TableUpload`]}
        </TextWrapBox>
      );
    }

    return <TextWrapBox>{value}</TextWrapBox>;
  }

  return (
    <StyledTable
      data={data}
      columns={columns}
      rowRenderer={rowRenderer}
      cellRenderer={cellRenderer}
      mode="table"
      condensed
    />
  );
};
