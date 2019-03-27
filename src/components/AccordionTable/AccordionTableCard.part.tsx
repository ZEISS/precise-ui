import * as React from 'react';
import styled from '../../utils/styled';
import { normalizeIndex, toggleIndex, hasIndex } from './helpers/indexHelper';
import { AccordionTableProps, AccordionTableCardRendererEvent } from './AccordionTable.types.part';
import { defaultCellRenderer } from '../Table/TableShared.part';
import { defaultBodyRenderer } from '../Table/TableCard.part';
import { AccordionCard } from '../AccordionCard';
import { ListItem } from '../ListItem';
import { List } from '../List';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

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

const PropContainer = styled.div`
  margin-bottom: ${distance.medium};

  &:last-child {
    margin-bottom: 0;
  }
`;

const PropName = styled.div`
  ${getFontStyle({ size: 'xSmall' })}
`;

const PropValue = styled.div`
  ${getFontStyle({ weight: 'medium' })}
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

interface AccordionTableCardHostProps {
  borderless: boolean;
}

const AccordionTableCardHost: React.SFC<AccordionTableCardHostProps> = props => <StyledList {...props} />;

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

  private renderItem = ({ item, index, open, keys, closeLabel, openLabel }: AccordionTableCardRendererEvent<T>) => {
    const { detailsRenderer, theme } = this.props;
    return (
      <StyledListItem theme={theme} key={index}>
        <AccordionCard
          openLabel={openLabel}
          closeLabel={closeLabel}
          theme={theme}
          header={this.renderItemProps(item, keys, index)}
          opened={open}
          onActionClick={() => this.handleClick(index, item)}>
          {open && detailsRenderer && detailsRenderer({ data: item, index })}
        </AccordionCard>
      </StyledListItem>
    );
  };

  private getHeader(key: string) {
    const { columns } = this.props;

    if (columns) {
      const column = columns[key];
      return typeof column === 'string' ? column : column.header;
    }

    return key;
  }

  private renderItemProps(item: T, keys: Array<string>, row: number) {
    return keys.map((key, index) => this.renderItemProp(this.getHeader(key), item[key], index, row));
  }

  private renderItemProp(propKey: React.ReactChild, propValue: any, index: number, row: number) {
    const { cellRenderer = defaultCellRenderer } = this.props;

    return (
      <PropContainer key={index}>
        <PropName>{propKey}</PropName>
        <PropValue>
          {cellRenderer({
            row,
            column: index,
            key: propKey.toString(),
            value: propValue,
            render: defaultCellRenderer,
          })}
        </PropValue>
      </PropContainer>
    );
  }

  render() {
    const {
      data = [],
      columns,
      placeholder,
      theme,
      cardRenderer = this.renderItem,
      bodyRenderer = defaultBodyRenderer,
      openLabel,
      closeLabel,
      ...props
    } = this.props;
    const keys = Object.keys(columns || data[0] || {});
    const rows =
      data.length === 0
        ? placeholder
          ? [
              <StyledListItem theme={theme} key={0}>
                <PlaceholderContainer theme={theme}>{placeholder}</PlaceholderContainer>
              </StyledListItem>,
            ]
          : []
        : data.map((item, index) =>
            cardRenderer({
              item,
              index,
              open: hasIndex(this.state.selectedIndexes, index),
              keys,
              openLabel,
              closeLabel,
            }),
          );

    return bodyRenderer({
      rows,
      mode: 'card',
      props: {
        theme,
        borderless: true,
        ...props,
      },
      table: AccordionTableCardHost,
    });
  }
}
