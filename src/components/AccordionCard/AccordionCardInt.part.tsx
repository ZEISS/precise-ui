import * as React from 'react';
import styled, { reStyled, StyledComponentClass } from '../../utils/styled';
import { remCalc } from '../../utils/remCalc';
import { distance } from '../../distance';
import { StandardProps, PreciseTheme } from '../../common';

export interface ActiveProps {
  open: boolean;
  onClick?(e: React.MouseEvent): void;
}

const animationDuration = '0.3s';
const animationFunction = 'cubic-bezier(0, 0, 0.25, 1)';

const StyledContainer = reStyled<ActiveProps, 'div'>('div')(
  ({
    open,
    theme: {
      accordionCard: { borderColor, openedBorderColor },
      text1,
    },
  }) => `
  position: relative;
  color: ${text1};
  font-size: ${remCalc('16px')};
  line-height: 22px;
  border: 1px solid ${open ? openedBorderColor : borderColor};
`,
);

const StyledHeaderContainer = reStyled<ActiveProps, 'div'>('div')(
  ({
    open,
    theme: {
      accordionCard: { headerPadding, openedHeaderBorderColor, openedHeaderBackground, headerBackground },
    },
  }) => `
  padding: ${headerPadding};
  background: ${open ? openedHeaderBackground : headerBackground};
  border-bottom: ${open ? `1px solid ${openedHeaderBorderColor}` : 'none'};
`,
);

export const StyledActionContainer: StyledComponentClass<ActiveProps, PreciseTheme, ActiveProps> = reStyled.div<
  ActiveProps
>(
  ({ open, theme: { ui0, ui1 } }) => `
  text-align: center;
  padding: ${distance.small} ${distance.medium};
  cursor: pointer;
  background: ${open ? ui1 : ui0};
  border: ${open ? `1px solid ${ui0}` : 'none'};
  margin: -1px -1px -1px -1px;
  color: ${open ? ui0 : ui1};
`,
);

const StyledDetailsContainerAnimator = styled<ActiveProps, 'div'>('div')`
  transition: all ${animationDuration} ${animationFunction};
  max-height: ${({ open }) => (open ? '10000px' : '0')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  overflow: hidden;
`;

export interface RenderActionEvent {
  opened: boolean;
}

export interface ActionClickEvent {
  opened: boolean;
}

export interface AccordionCardProps extends StandardProps {
  /**
   * Displays card header.
   */
  header: React.ReactNode;
  /**
   * Displayed content when card is opened.
   */
  children: React.ReactNode;
  /**
   * Determines if details are open for the card.
   */
  opened?: boolean;
  /**
   * Custom loacalization can be provided.
   */
  localization?: {
    open?: string;
    close?: string;
  };
  /**
   * Custom render for card action button.
   */
  renderAction?(e: RenderActionEvent): React.ReactNode;
  /**
   * Event fired when action button clicked.
   */
  onActionClick?(e: ActionClickEvent): void;
}

export interface AccordionCardState {
  opened: boolean;
  controlled: boolean;
}

const defaultLocalization = {
  open: 'Open Details',
  close: 'Close Details',
};

export class AccordionCard extends React.Component<AccordionCardProps, AccordionCardState> {
  constructor(props: AccordionCardProps) {
    super(props);
    this.state = {
      opened: props.opened !== undefined ? props.opened : false,
      controlled: props.opened !== undefined,
    };
  }

  static getDerivedStateFromProps(props: AccordionCardProps, state: AccordionCardState) {
    return state.controlled ? { opened: props.opened } : {};
  }

  private handleClick = () => {
    const { onActionClick } = this.props;
    const { opened, controlled } = this.state;
    !controlled && this.setState({ opened: !opened });

    if (typeof onActionClick === 'function') {
      onActionClick({ opened: controlled ? opened : !opened });
    }
  };

  private renderDefaultAction = () => {
    const { theme } = this.props;
    const localization = { ...defaultLocalization, ...this.props.localization };
    const { opened } = this.state;

    return (
      <StyledActionContainer theme={theme} onClick={this.handleClick} open={opened}>
        {opened ? localization.close : localization.open}
      </StyledActionContainer>
    );
  };

  private renderAction = () => {
    const { renderAction } = this.props;
    const { opened } = this.state;

    if (typeof renderAction === 'function') {
      return renderAction({ opened });
    }

    return this.renderDefaultAction();
  };

  render() {
    const { theme, children, header, ...props } = this.props;
    const { opened } = this.state;
    return (
      <StyledContainer {...props} theme={theme} open={opened}>
        <StyledHeaderContainer theme={theme} open={opened}>
          {header}
        </StyledHeaderContainer>

        <StyledDetailsContainerAnimator open={opened}>{children}</StyledDetailsContainerAnimator>

        {this.renderAction()}
      </StyledContainer>
    );
  }
}
