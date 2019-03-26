import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { AccordionTabProps } from '../AccordionTab';
import { Icon } from '../Icon';
import { remCalc } from '../../utils/remCalc';
import { distance } from '../../distance';
import { AccordionProps } from './Accordion.types.part';
import { normalizeIndex, toggleIndex, hasIndex } from '../AccordionTable/helpers/indexHelper';
import { Expander } from '../Expander';
import { getFontStyle } from '../../textStyles';

export interface AccordionBasicState {
  /**
   * The currently selected indices.
   */
  selectedIndexes: Array<number>;
  /**
   * Determines if the accordion component is controlled from the outside or not.
   */
  controlled: boolean;
}

interface AccordionItemProps {
  active?: boolean;
}

interface StyledArrowProps {
  isRotated: boolean;
}

const animationDuration = '0.3s';
const animationFunction = 'cubic-bezier(0, 0, 0.25, 1)';

const AccordionContainer = styled.div``;

const AccordionItems = styled.ul`
  padding: 0;
  list-style: none;
`;

const AccordionItem = styled.li`
  ${getFontStyle({ size: 'small' })}

  position: relative;
  z-index: 1;
  margin: 0;
  text-align: left;
  overflow: visible;
  border-top: ${themed(({ theme }) => theme.accordionLine)};
  box-sizing: border-box;
  color: ${themed(({ theme }) => theme.text1)};

  &:last-child {
    border-bottom: ${themed(({ theme }) => theme.accordionLine)};
  }
`;

const AccordionItemHeaderContainer = styled('div')<AccordionItemProps>`
  transition: background-color ${animationDuration} ${animationFunction};
  background-color: ${themed(props => (props.active ? props.theme.ui2 : props.theme.ui1))};
`;

const AccordionItemHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${themed(({ theme }) => theme.accordionPadding)};
`;

const StyledIcon = styled(Icon)<StyledArrowProps>`
  font-size: ${remCalc('18px')};
  margin-right: ${distance.medium};
  transition: transform 0.2s ${animationFunction};
  transform: ${({ isRotated }) => `rotate(${isRotated ? 90 : 0}deg)`};
`;

const AccordionItemContent = styled.div`
  padding: ${themed(({ theme }) => theme.accordionContentPadding)};
`;

export class AccordionBasic extends React.Component<AccordionProps, AccordionBasicState> {
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

  static getDerivedStateFromProps(props: AccordionProps, state: AccordionBasicState) {
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
    const { children, theme, onChange: _0, selectedIndex: _1 } = this.props;
    const items: Array<React.ReactChild> = [];
    const selects = this.selects;

    React.Children.forEach(children, (element: React.ReactElement<AccordionTabProps>, index) => {
      if (element && React.isValidElement(element)) {
        const { header } = element.props;
        const active = hasIndex(selectedIndexes, index);

        if (selects[index] === undefined) {
          selects[index] = () => this.changeIndex(index);
        }

        items.push(
          <AccordionItem theme={theme} key={`item-${index}`}>
            <AccordionItemHeaderContainer active={active}>
              <AccordionItemHeader theme={theme} onClick={selects[index]}>
                <StyledIcon isRotated={active} name="KeyboardArrowRight" />
                {header}
              </AccordionItemHeader>
            </AccordionItemHeaderContainer>
            <Expander expand={active} timeout={300} unmountOnExit>
              <AccordionItemContent theme={theme}>{element}</AccordionItemContent>
            </Expander>
          </AccordionItem>,
        );
      }
    });

    return (
      <AccordionContainer>
        <AccordionItems theme={theme}>{items}</AccordionItems>
      </AccordionContainer>
    );
  }
}
