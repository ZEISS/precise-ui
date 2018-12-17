import * as React from 'react';
import styled from '../../utils/styled';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { remCalc } from '../../utils/remCalc';
import { AccordionTableProps, AccordionTableCardRendererEvent } from './AccordionTable.types.part';
import { normalizeIndex, toggleIndex, hasIndex } from './helpers/indexHelper';
import { distance } from '../../distance';
import { defaultCellRenderer } from '../Table/TableBasic.part';
import { AccordionCard } from '../AccordionCard';

export interface AccordionTableCardState {
  /**
   * Currently selected rows indices.
   */
  selectedIndexes: Array<number>;
  /**
   * Determines if the accordion table component is controlled from the outside or not.
   */
  controlled: boolean;
}

interface ActiveProps {
  open: boolean;
  onClick?(e: React.MouseEvent): void;
}

const PropContainer = styled.div`
  margin-bottom: ${distance.medium};

  &:last-child {
    margin-bottom: 0;
  }
`;

const PropName = styled.div`
  font-size: ${remCalc('12px')};
  line-height: 14px;
`;

const PropValue = styled.div`
  font-weight: 500;
`;

const PlaceholderContainer = styled.div`
  text-align: center;
`;

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

export class AccordionTableCard<T> extends React.Component<AccordionTableProps<T>, AccordionTableCardState> {
  constructor(props: AccordionTableProps<T>) {
    super(props);

    this.state = {
      selectedIndexes: normalizeIndex(props.selectedIndex),
      controlled: props.selectedIndex !== undefined,
    };
  }

  static getDerivedStateFromProps(props: AccordionTableProps<any>, state: AccordionTableCardState) {
    const { selectedIndex } = props;

    if (state.controlled && selectedIndex !== undefined) {
      return {
        selectedIndexes: normalizeIndex(props.selectedIndex),
      };
    }

    return state;
  }

  private handleClick(target: number, data: T) {
    const { onChange, multiple } = this.props;
    const { controlled, selectedIndexes } = this.state;
    const nextIndexes = toggleIndex(selectedIndexes, target, multiple);

    if (typeof onChange === 'function') {
      onChange({
        selectedIndex: multiple ? nextIndexes : nextIndexes[0] !== undefined ? nextIndexes[0] : -1,
        previousIndex: multiple ? selectedIndexes : selectedIndexes[0] !== undefined ? selectedIndexes[0] : -1,
        data,
      });
    }

    if (!controlled) {
      this.setState({
        selectedIndexes: nextIndexes,
      });
    }
  }

  private renderItems() {
    const { data = [], columns, placeholder, theme, cardRenderer, cardBodyRenderer } = this.props;
    const keys = Object.keys(columns || data[0] || {});
    const renderer = cardRenderer ? cardRenderer : this.renderItem;
    let result = [];
    if (data.length === 0) {
      if (placeholder) {
        result.push(
          <StyledListItem theme={theme} key={0}>
            <PlaceholderContainer theme={theme}>{placeholder}</PlaceholderContainer>
          </StyledListItem>,
        );
      }
    } else {
      result = data.map((item, index) =>
        renderer({ item, index, open: hasIndex(this.state.selectedIndexes, index), keys }),
      );
    }
    return cardBodyRenderer ? cardBodyRenderer({ rows: result }) : result;
  }

  private renderItem = ({ item, index, open, keys }: AccordionTableCardRendererEvent<T>) => {
    const { detailsRenderer, theme, openLabel, closeLabel } = this.props;
    return (
      <StyledListItem theme={theme} key={index}>
        <AccordionCard
          theme={theme}
          header={this.renderItemProps(item, keys, index)}
          opened={open}
          onActionClick={() => this.handleClick(index, item)}>
          {detailsRenderer({ data: item, index })}
        </AccordionCard>
      </StyledListItem>
    );
  };

  private getHeader(key: string) {
    const { columns } = this.props;
    if (columns) {
      const column = columns[key];
      return typeof column === 'string' ? column : column.header;
    } else {
      return key;
    }
  }

  private renderItemProps(item: T, keys: Array<string>, row: number) {
    return keys.map((key, index) => this.renderItemProp(this.getHeader(key), item[key], index, row));
  }

  private renderItemProp(propKey: React.ReactChild, propValue: any, index: number, row: number) {
    const { cellRenderer } = this.props;
    const propValueRenderer = typeof cellRenderer === 'function' ? cellRenderer : defaultCellRenderer;
    const value = propValueRenderer({
      row,
      column: index,
      key: propKey.toString(),
      value: propValue,
    });

    return (
      <PropContainer key={index}>
        <PropName>{propKey}</PropName>
        <PropValue>{value}</PropValue>
      </PropContainer>
    );
  }

  render() {
    return <StyledList borderless>{this.renderItems()}</StyledList>;
  }
}
