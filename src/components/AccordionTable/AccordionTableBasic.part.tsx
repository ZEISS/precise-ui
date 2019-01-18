import * as React from 'react';
import styled, { reStyled } from '../../utils/styled';
import { remCalc } from '../../utils/remCalc';
import { Table, TableRowEvent, TableCellEvent } from '../Table';
import { defaultCellRenderer } from '../Table/TableShared.part';
import { Icon, IconProps } from '../Icon';
import { AccordionTableRow } from '../AccordionTableRow';
import { AccordionTableProps } from './AccordionTable.types.part';
import { normalizeIndex, toggleIndex, hasIndex } from './helpers/indexHelper';
import { distance } from '../../distance';

export interface AccordionTableBasicState {
  /**
   * Currently selected rows indices.
   */
  selectedIndexes: Array<number>;
  /**
   * Determines if the accordion table component is controlled from the outside or not.
   */
  controlled: boolean;
}

interface AccordionTableItemProps {
  active?: boolean;
}

interface StyledArrowProps extends IconProps {
  isRotated: boolean;
}

const animationDuration = '0.3s';
const animationFunction = 'cubic-bezier(0, 0, 0.25, 1)';

const StyledTable = styled(Table)`
  th,
  td {
    padding-right: ${distance.medium};
    padding-left: ${distance.medium};
  }
`;

const StyledTableRowCollapse = reStyled.tr<AccordionTableItemProps>(
  ({ theme, active }) => `
    border: ${active ? `1px solid ${theme.ui5}` : 'none'};
    ${!active ? 'display: none;' : ''}
  `,
);

const StyledCollapseAnimator = styled<AccordionTableItemProps, 'div'>('div')`
  transition: all ${animationDuration} ${animationFunction};
  max-height: ${({ active }) => (active ? '10000px' : '0')};
  opacity: ${({ active }) => (active ? '1' : '0')};
`;

const StyledTableCell = styled.td``;
const StyledDetailsContainer = styled(StyledTableCell)`
  /*
    AccordionTable is a Table abstracrion.
    Table has default paddings for it's cells.
    Expanded AccordionTable row is a container and should not have any paddings.
  */
  padding: 0 !important;
`;

const StyledIconInt: React.SFC<StyledArrowProps> = ({ isRotated: _0, ...props }) => <Icon {...props} />;

const StyledIcon = styled<StyledArrowProps>(StyledIconInt)`
  display: block;
  font-size: ${remCalc('18px')};
  height: 18px;
  width: 18px;
  transition: transform ${animationDuration} ${animationFunction};
  transform: ${({ isRotated }) => `rotate(${isRotated ? 90 : 0}deg)`};
`;

export class AccordionTableBasic<T> extends React.Component<AccordionTableProps<T>, AccordionTableBasicState> {
  static defaultProps = {
    multiple: false,
  };

  constructor(props: AccordionTableProps<T>) {
    super(props);

    this.state = {
      selectedIndexes: normalizeIndex(props.selectedIndex),
      controlled: props.selectedIndex !== undefined,
    };
  }

  static getDerivedStateFromProps(props: AccordionTableProps<any>, state: AccordionTableBasicState) {
    const { selectedIndex } = props;

    if (state.controlled && selectedIndex !== undefined) {
      return {
        selectedIndexes: normalizeIndex(selectedIndex),
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

  private rowRenderer = ({ cells, index, data, key }: TableRowEvent<T>) => {
    const { detailsRenderer, rowRenderer, theme, arrowToggle } = this.props;
    const count = React.Children.count(cells);
    const active = hasIndex(this.state.selectedIndexes, index);
    const renderData = { cells, index, data, active, key };

    return (
      <React.Fragment key={key}>
        {(rowRenderer && rowRenderer(renderData)) || (
          <AccordionTableRow
            active={active}
            clickable={!arrowToggle}
            onClick={() => this.handleClick(index, data)}
            theme={theme}>
            {cells}
          </AccordionTableRow>
        )}
        <StyledTableRowCollapse active={active}>
          <StyledDetailsContainer colSpan={count}>
            <StyledCollapseAnimator active={active}>
              {active && detailsRenderer && detailsRenderer({ index, data })}
            </StyledCollapseAnimator>
          </StyledDetailsContainer>
        </StyledTableRowCollapse>
      </React.Fragment>
    );
  };

  private cellRenderer = (e: TableCellEvent<T>) => {
    const { row: rowIndex, data } = e;
    if (e.column === 0) {
      const active = hasIndex(this.state.selectedIndexes, rowIndex);
      return (
        <StyledIcon
          isRotated={active}
          name="KeyboardArrowRight"
          onClick={() => data && this.handleClick(rowIndex, data)}
        />
      );
    }

    const { cellRenderer } = this.props;
    return typeof cellRenderer === 'function' ? cellRenderer(e) : defaultCellRenderer(e);
  };

  private getColumns() {
    const { data, columns, indexed } = this.props;

    if (columns || (data && data.length)) {
      const cols = {
        '': {
          header: '',
          width: remCalc('50px'),
          sortable: false,
        },
      };

      if (indexed) {
        cols['#'] = {
          header: '#',
          sortable: false,
        };
      }

      const keys = Object.keys(columns || data[0]);

      return keys.reduce((acc, key) => {
        acc[key] = columns ? columns[key] : key;
        return acc;
      }, cols);
    }

    return {};
  }

  render() {
    const { detailsRenderer: _0, columns: _1, indexed: _2, ...props } = this.props;
    return (
      <StyledTable
        {...props}
        mode="table"
        columns={this.getColumns()}
        rowRenderer={this.rowRenderer}
        cellRenderer={this.cellRenderer}
      />
    );
  }
}
