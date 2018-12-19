import * as React from 'react';

import { Icon, IconName } from '../Icon';
import { ProgressStatus, TranslationLabels } from './FileUploaderDetails.types.part';
import { defaultLabels, iconNames } from './helpers';
import styled, { reStyled } from '../../utils/styled';

import { ActionIconContainer } from './ActionIconContainer.part';
import { ActionLink } from '../ActionLink';
import { ProgressBar } from '../ProgressBar';
import { StatusIcon } from './StatusIcon.part';
import { distance } from '../../distance';

const ProgressBarWrapper = reStyled.div(
  ({ theme }) => `
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 2px 6px 0 rgba(75, 78, 82, 0.2);
  border: solid 1px ${theme.ui4};
  background-color: ${theme.text4};
`,
);

const StyledProgressBar = styled(ProgressBar)`
  border-radius: 0;
  height: ${distance.xsmall};
`;

const BarInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 54px;
`;

const StatusBarGroup = styled.div`
  padding: ${distance.small};
`;

const StyledStatusBar = styled.div`
  padding: ${distance.small};
  display: flex;
  align-items: center;
`;

const ActionGroup = styled.div`
  padding: ${distance.medium};
  display: flex;
  align-items: center;
`;

export interface StatusBarProps {
  status: ProgressStatus;
  iconName: IconName;
  count: number;
  title: string;
  labels: Partial<TranslationLabels>;
}

const StatusLabel = styled.span`
  padding-left: ${distance.medium};
`;

function StatusBar({ status, count, iconName, title, labels }: StatusBarProps) {
  return (
    <StyledStatusBar>
      <StatusIcon name={iconName} type={status} />
      {`${count} ${
        count > 1 ? labels.itemPlural || defaultLabels.itemPlural : labels.itemSingular || defaultLabels.itemSingular
      }`}
      <StatusLabel>{title}</StatusLabel>
    </StyledStatusBar>
  );
}

export interface UploaderProgressBarProps {
  /**
   * The total progress from 0 to 100.
   */
  progressValue: number;
  /**
   * Determines if scanning is currently in progress.
   */
  scanning: boolean;
  /**
   * Object with translations. By default standard labels are used.
   */
  labels?: Partial<TranslationLabels>;
  /**
   * Event emitted when the status should be closed fully.
   */
  onClose(): void;
  /**
   * Event emitted when details should be shown.
   */
  onShow(): void;
  /**
   * Total number of files that are being uploaded.
   */
  total: number;
  /**
   * Number of files that are currently in progress.
   */
  inProgress: number;
  /**
   * Number of files that have failed.
   */
  errors: number;
}

export const UploaderProgressBar: React.SFC<UploaderProgressBarProps> = ({
  total,
  labels = defaultLabels,
  onClose,
  onShow,
  progressValue,
  inProgress,
  scanning,
  errors,
}) => {
  const completed = progressValue >= 100;

  return (
    <ProgressBarWrapper>
      <BarInfo>
        <StatusBarGroup>
          {!completed || scanning ? (
            inProgress > 0 && (
              <StatusBar
                count={total}
                iconName={iconNames.progress}
                title={
                  completed && scanning
                    ? labels.uploadScanning || defaultLabels.uploadScanning
                    : labels.uploadProgress || defaultLabels.uploadProgress
                }
                status={completed && scanning ? 'scanning' : 'progress'}
                labels={labels}
              />
            )
          ) : (
            <>
              {inProgress > 0 && (
                <StatusBar
                  count={inProgress}
                  iconName={iconNames.success}
                  title={labels.uploadSuccess || defaultLabels.uploadSuccess}
                  status="success"
                  labels={labels}
                />
              )}
              {errors > 0 && (
                <StatusBar
                  count={errors}
                  iconName={iconNames.error}
                  title={labels.uploadError || defaultLabels.uploadError}
                  status="error"
                  labels={labels}
                />
              )}
            </>
          )}
        </StatusBarGroup>
        <ActionGroup>
          <ActionLink onClick={onShow}>{labels.viewDetails || defaultLabels.viewDetails}</ActionLink>
          {completed && !scanning && (
            <ActionIconContainer onClick={onClose}>
              <Icon name="Close" />
            </ActionIconContainer>
          )}
        </ActionGroup>
      </BarInfo>
      {!completed && <StyledProgressBar value={progressValue} animate />}
    </ProgressBarWrapper>
  );
};
UploaderProgressBar.displayName = 'UploaderProgressBar';
