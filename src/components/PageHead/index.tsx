import * as React from 'react';
import * as colors from '../../colors';
import styled from '../../utils/styled';
import { Headline } from '../Headline';
import { Icon } from '../Icon';
import { Breadcrumbs } from '../Breadcrumbs';
import { Breadcrumb, BreadcrumbProps } from '../Breadcrumb';
import { ActionLink } from '../ActionLink';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

export interface PageHeadProps {
  /**
   * The title to display.
   */
  title: string;
  /**
   * The optional breadcrumbs to show.
   */
  breadcrumbs?: Array<BreadcrumbProps>;
  /**
   * The text for the optional help button.
   */
  help?: string;
  /**
   * Event fired when the help button was pressed.
   */
  onHelp?(): void;
}

const MainHeadline = styled(Headline)`
  margin-bottom: ${distance.xlarge} !important;

  @media (max-width: 739px) {
    margin-bottom: ${distance.large} !important;
    font-size: 28px !important;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${distance.xlarge};

  @media (max-width: 739px) {
    margin-bottom: 0px;
  }
`;

const HelpButton = styled(ActionLink)`
  ${getFontStyle({ size: 'xSmall', weight: 'light' })}

  display: flex;
  align-items: center;
  color: ${colors.dark};

  @media (max-width: 600px) {
    display: none;
  }
`;

const HelpLabel = styled.span`
  margin-left: ${distance.small};
`;

export const PageHead: React.SFC<PageHeadProps> = ({ title, breadcrumbs = [], help, onHelp }) => (
  <>
    <Navigation>
      <Breadcrumbs>
        {breadcrumbs.map(({ children: _0, ...b }, i) => (
          <Breadcrumb {...b} key={`${b.title}-${i}`} />
        ))}
        <Breadcrumb title={title} />
      </Breadcrumbs>
      {help && (
        <HelpButton onClick={onHelp}>
          <Icon name="HelpOutline" />
          <HelpLabel>{help}</HelpLabel>
        </HelpButton>
      )}
    </Navigation>
    <MainHeadline level={1}>{title}</MainHeadline>
  </>
);
PageHead.displayName = 'PageHead';
