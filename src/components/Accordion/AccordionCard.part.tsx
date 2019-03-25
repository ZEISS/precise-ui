import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { AccordionProps } from './Accordion.types.part';
import { distance } from '../../distance';
import { AccordionTabProps } from '../AccordionTab';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { normalizeIndex, toggleIndex, hasIndex } from '../AccordionTable/helpers/indexHelper';
import { getFontStyle } from '../../textStyles';

export interface AccordionCardState {
  /**
   * The currently selected indices.
   */
  selectedIndexes: Array<number>;
  /**
   * Determines if the accordion table component is controlled from the outside or not.
   */
  controlled: boolean;
}

interface ActiveProps {
  open?: boolean;
  onClick?(e: React.MouseEvent): void;
}

const animationDuration = '0.3s';
const animationFunction = 'cubic-bezier(0, 0, 0.25, 1)';

const StyledList = styled(List)`
  overflow: visible;
`;

const StyledListItem = styled(ListItem)`
  padding: 0;
  margin-bottom: ${distance.xlarge};
  border: none;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Container = styled.div`
  ${getFontStyle({ size: 'medium' })}

  position: relative;
  color: ${themed(({ theme }) => theme.text1)};
`;

const ContentContainer = styled.div<ActiveProps>(
  themed(
    ({ open, theme: { ui1, ui2, ui4, ui5 } }) => css`
      ${getFontStyle({ size: 'small' })}

      padding: ${distance.medium};
      background: ${open ? ui2 : ui1};
      border: 1px solid ${open ? ui5 : ui4};
      border-bottom: ${open ? `1px solid ${ui4}` : 'none'};
    `,
  ),
);

const DetailsContainerAnimator = styled('div')<ActiveProps>`
  transition: all ${animationDuration} ${animationFunction};
  max-height: ${({ open }) => (open ? '10000px' : '0')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  overflow: hidden;
`;

const DetailsContainer = styled.div<ActiveProps>(
  themed(
    ({ open, theme: { ui4, ui5 } }) => css`
      border-right: 1px solid ${open ? ui5 : ui4};
      border-left: 1px solid ${open ? ui5 : ui4};
    `,
  ),
);

const ActionContainer = styled.div<ActiveProps>(
  themed(
    ({ open, theme: { ui0, ui1 } }) => css`
      text-align: center;
      padding: ${distance.small} ${distance.medium};
      cursor: pointer;
      background: ${open ? ui1 : ui0};
      border: ${open ? `1px solid ${ui0}` : 'none'};
      color: ${open ? ui0 : ui1};
    `,
  ),
);

export class AccordionCard extends React.Component<AccordionProps, AccordionCardState> {
  private selects: Array<() => void> = [];

  constructor(props: AccordionProps) {
    super(props);

    this.state = {
      selectedIndexes:
        props.selectedIndex !== undefined
          ? normalizeIndex(props.selectedIndex)
          : normalizeIndex(props.defaultSelectedIndex),
      controlled: props.selectedIndex !== undefined,
    };
  }

  static getDerivedStateFromProps(props: AccordionProps, state: AccordionCardState) {
    const { selectedIndex, defaultSelectedIndex } = props;

    if (state.controlled && selectedIndex !== undefined) {
      return {
        selectedIndexes: normalizeIndex(selectedIndex),
      };
    } else if (defaultSelectedIndex !== undefined) {
      return {
        selectedIndexes: normalizeIndex(defaultSelectedIndex),
      };
    }

    return state;
  }

  private changeIndex(target: number) {
    const { onChange, multiple } = this.props;
    const { controlled, selectedIndexes } = this.state;
    const nextIndexes = toggleIndex(selectedIndexes, target, multiple);

    if (typeof onChange === 'function') {
      onChange({
        selectedIndex: multiple ? nextIndexes : nextIndexes[0] !== undefined ? nextIndexes[0] : -1,
        previousIndex: multiple ? selectedIndexes : selectedIndexes[0] !== undefined ? selectedIndexes[0] : -1,
      });
    }

    if (!controlled) {
      this.setState({
        selectedIndexes: nextIndexes,
      });
    }
  }

  render() {
    const { selectedIndexes } = this.state;
    const { children, theme, onChange: _0, selectedIndex: _1, openLabel, closeLabel } = this.props;
    const items: Array<React.ReactChild> = [];
    const selects = this.selects;

    React.Children.forEach(children, (element: React.ReactElement<AccordionTabProps>, index) => {
      if (element && React.isValidElement(element)) {
        const { header } = element.props;
        const open = hasIndex(selectedIndexes, index);

        if (selects[index] === undefined) {
          selects[index] = () => this.changeIndex(index);
        }

        items.push(
          <StyledListItem theme={theme} key={`item-${index}`}>
            <Container theme={theme}>
              <ContentContainer theme={theme} open={open}>
                {header}
              </ContentContainer>

              <DetailsContainerAnimator open={open}>
                <DetailsContainer open={open}>{element}</DetailsContainer>
              </DetailsContainerAnimator>

              <ActionContainer theme={theme} onClick={selects[index]} open={open}>
                {open ? closeLabel || 'Close Details' : openLabel || 'Open Details'}
              </ActionContainer>
            </Container>
          </StyledListItem>,
        );
      }
    });

    return <StyledList borderless>{items}</StyledList>;
  }
}
