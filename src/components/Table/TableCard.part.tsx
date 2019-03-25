import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { TableProps, TableCardRendererEvent, TableBodyRenderEvent } from './Table.types.part';
import { defaultCellRenderer } from './TableShared.part';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

const Container = styled.div(
  themed(
    ({ theme: { ui4, text1 } }) => css`
      ${getFontStyle({ size: 'medium' })}

      position: relative;
      border: 1px solid ${ui4};
      color: ${text1};
    `,
  ),
);

const ContentContainer = styled.div`
  padding: ${distance.medium} ${distance.medium} ${distance.large};
`;

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

const StyledListItem = styled(ListItem)`
  padding: 0;
  margin-bottom: ${distance.xlarge};
  border: none;

  &:last-child {
    margin-bottom: 0;
  }
`;

export function defaultBodyRenderer(e: TableBodyRenderEvent) {
  const CardBody = e.table;
  return <CardBody>{e.rows}</CardBody>;
}

interface TableCardHostProps {
  borderless: boolean;
}

const TableCardHost: React.SFC<TableCardHostProps> = props => <List {...props} />;

export class TableCard<T> extends React.Component<TableProps<T>> {
  constructor(props: TableProps<T>) {
    super(props);
  }

  private renderItem = ({ item, index, keys }: TableCardRendererEvent<T>) => {
    const { theme } = this.props;
    return (
      <StyledListItem theme={theme} key={index}>
        <Container theme={theme}>
          <ContentContainer theme={theme}>{this.renderItemProps(item, index, keys)}</ContentContainer>
        </Container>
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

  private renderItemProps(item: T, rowIndex: number, keys: Array<string>) {
    const { columns, cellRenderer = defaultCellRenderer } = this.props;

    return keys
      .map((key, colIndex) => {
        const column = columns ? columns[key] : key;

        if (typeof column === 'string' || !column.hidden) {
          const propKey = this.getHeader(key);
          const value = cellRenderer({
            column: colIndex,
            row: rowIndex,
            key,
            value: item[key],
            data: item,
            render: defaultCellRenderer,
          });

          return (
            <PropContainer key={colIndex}>
              <PropName>{propKey}</PropName>
              <PropValue>{value}</PropValue>
            </PropContainer>
          );
        }

        return undefined;
      })
      .filter(m => !!m);
  }

  render() {
    const {
      data = [],
      columns,
      placeholder,
      theme,
      cardRenderer = this.renderItem,
      bodyRenderer = defaultBodyRenderer,
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
        : data.map((item, index) => cardRenderer({ item, index, keys }));

    return bodyRenderer({
      table: TableCardHost,
      props: {
        theme,
        borderless: true,
        ...props,
      },
      rows,
      mode: 'card',
    });
  }
}
