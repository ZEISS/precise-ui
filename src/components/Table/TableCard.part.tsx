import * as React from 'react';
import styled, { reStyled } from '../../utils/styled';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { remCalc } from '../../utils/remCalc';
import { TableProps, TableCardRendererEvent, TableBodyRenderEvent } from './Table.types.part';
import { defaultCellRenderer } from './TableBasic.part';
import { distance } from '../../distance';

const Container = reStyled.div(
  ({ theme: { ui4, text1 } }) => `
  position: relative;
  border: 1px solid ${ui4};
  color: ${text1};
  font-size: ${remCalc('16px')};
  line-height: 22px;
`,
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
  font-size: ${remCalc('12px')};
  line-height: 14px;
`;

const PropValue = styled.div`
  font-weight: 500;
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
          <ContentContainer theme={theme}>{this.renderItemProps(item, keys)}</ContentContainer>
        </Container>
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

  private renderItemProps(item: T, keys: Array<string>) {
    const { columns } = this.props;

    return keys
      .filter(key => {
        const column = columns ? columns[key] : key;
        if (typeof column !== 'string' && column.hidden) {
          return false;
        }
        return true;
      })
      .map((key, index) => this.renderItemProp(this.getHeader(key), item[key], index));
  }

  private renderItemProp(propKey: React.ReactChild, propValue: any, index: number) {
    const { cellRenderer } = this.props;
    const propValueRenderer = typeof cellRenderer === 'function' ? cellRenderer : defaultCellRenderer;
    const value = propValueRenderer({
      column: 0,
      row: 0,
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
