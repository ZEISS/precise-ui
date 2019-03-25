import * as React from 'react';
import styled, { themed, css } from '../../utils/styled';
import { remCalc } from '../../utils/remCalc';
import { Table, TableRowEvent } from '../Table';
import { defaultCellRenderer } from '../Table/TableShared.part';
import { Icon, IconProps } from '../Icon';
import { AccordionTableRow } from '../AccordionTableRow';
import { AccordionTableProps, AccordionGroupRenderEvent } from './AccordionTable.types.part';
import { normalizeIndex, toggleIndex, hasIndex } from './helpers/indexHelper';
import { distance } from '../../distance';
import { TableCellRenderEvent } from '../Table/Table.types.part';
import { getFontStyle } from '../../textStyles';

export interface AccordionTableBasicState {
  selectedIndex: Array<number>;
  expandedGroups: Array<any>;
  controlledIndex: boolean;
  controlledGroups: boolean;
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

const StyledTableRowCollapse = styled.tr<AccordionTableItemProps>(
  themed(
    ({ theme, active }) => css`
      border: ${active ? `1px solid ${theme.ui5}` : 'none'};
      ${!active ? 'display: none;' : ''}
    `,
  ),
);

const StyledCollapseAnimator = styled('div')<AccordionTableItemProps>`
  transition: all ${animationDuration} ${animationFunction};
  max-height: ${({ active }) => (active ? '10000px' : '0')};
  opacity: ${({ active }) => (active ? '1' : '0')};
`;

const GroupTableCell = styled.td`
  ${getFontStyle({ weight: 'bold' })}

  padding-left: 0.5em !important;
`;

const StyledDetailsContainer = styled.td`
  /*
    AccordionTable is a Table abstraction.
    Table has default paddings for it's cells.
    Expanded AccordionTable row is a container and should not have any paddings.
  */
  padding: 0 !important;
`;

const StyledIconInt: React.SFC<StyledArrowProps> = ({ isRotated: _0, ...props }) => <Icon {...props} />;

const StyledIcon = styled(StyledIconInt)<StyledArrowProps>`
  display: block;
  font-size: ${remCalc('18px')};
  height: 18px;
  width: 18px;
  transition: transform ${animationDuration} ${animationFunction};
  transform: ${({ isRotated }) => `rotate(${isRotated ? 90 : 0}deg)`};
`;

function defaultGroupRenderer<T>(e: AccordionGroupRenderEvent<T>): React.ReactChild {
  return (
    <>
      {e.group} ({e.items.length})
    </>
  );
}

function getGroupItems<T>(data: Array<T>, groupBy?: keyof T, group?: any) {
  return groupBy ? data.filter(m => m[groupBy] === group) : [];
}

export class AccordionTableBasic<T> extends React.Component<AccordionTableProps<T>, AccordionTableBasicState> {
  static defaultProps = {
    multiple: false,
  };

  constructor(props: AccordionTableProps<T>) {
    super(props);
    const controlledDetails = props.selectedIndex !== undefined;
    const controlledGroups = Array.isArray(props.expandedGroups);

    this.state = {
      selectedIndex: normalizeIndex(props.selectedIndex),
      controlledIndex: controlledDetails,
      controlledGroups: controlledGroups,
      expandedGroups: controlledGroups ? props.expandedGroups || [] : [],
    };
  }

  static getDerivedStateFromProps(props: AccordionTableProps<any>, state: AccordionTableBasicState) {
    const { selectedIndex, expandedGroups } = props;
    const newIndex = state.controlledIndex && selectedIndex !== undefined;
    const newGroups = state.controlledGroups && expandedGroups !== undefined;

    if (newIndex || newGroups) {
      return {
        ...state,
        selectedIndex: newIndex ? normalizeIndex(selectedIndex) : state.selectedIndex,
        expandedGroups: newGroups ? expandedGroups : state.expandedGroups,
      };
    }

    return state;
  }

  private handleClick(target: number, data: T) {
    const { onChange, multiple } = this.props;
    const { controlledIndex, selectedIndex } = this.state;
    const nextIndexes = toggleIndex(selectedIndex, target, multiple);

    if (typeof onChange === 'function') {
      onChange({
        selectedIndex: multiple ? nextIndexes : nextIndexes[0] !== undefined ? nextIndexes[0] : -1,
        previousIndex: multiple ? selectedIndex : selectedIndex[0] !== undefined ? selectedIndex[0] : -1,
        data,
      });
    }

    if (!controlledIndex) {
      this.setState({
        selectedIndex: nextIndexes,
      });
    }
  }

  private toggleGroup(group: any) {
    const { data, onToggleGroup, groupBy } = this.props;
    const { expandedGroups, controlledGroups } = this.state;

    if (typeof onToggleGroup === 'function') {
      onToggleGroup({
        group,
        type: 'expand',
        items: getGroupItems(data, groupBy, group),
      });
    }

    if (!controlledGroups) {
      if (expandedGroups.indexOf(group) !== -1) {
        this.setState({
          expandedGroups: expandedGroups.filter(m => m !== group),
        });
      } else {
        this.setState({
          expandedGroups: [...expandedGroups, group],
        });
      }
    }
  }

  private groupRenderer(group: any, count: number, expanded: boolean) {
    const { theme, groupRenderer = defaultGroupRenderer, data, groupBy } = this.props;
    const items = getGroupItems(data, groupBy, group);

    return (
      <>
        <AccordionTableRow clickable onClick={() => this.toggleGroup(group)} theme={theme}>
          <GroupTableCell>
            <StyledIcon isRotated={expanded} name="KeyboardArrowRight" />
          </GroupTableCell>
          <GroupTableCell colSpan={count - 1}>{groupRenderer({ expanded, group, items })}</GroupTableCell>
        </AccordionTableRow>
        <StyledTableRowCollapse />
      </>
    );
  }

  private rowRenderer = ({ cells, index, data, key, state }: TableRowEvent<T>) => {
    const { detailsRenderer, rowRenderer, theme, arrowToggle, groupBy } = this.props;
    const { selectedIndex, expandedGroups } = this.state;
    const { groupedRows = [] } = state;
    const active = hasIndex(selectedIndex, index);
    const count = React.Children.count(cells);
    const col = groupBy && data[groupBy];
    const open = !col || expandedGroups.indexOf(col) !== -1;
    const renderData = { cells, index, data, active, key, state };
    const isNewGroup = col && groupedRows.indexOf(col) === -1;

    if (isNewGroup) {
      state.groupedRows = [...groupedRows, col];
    }

    return (
      <React.Fragment key={key}>
        {isNewGroup && this.groupRenderer(col, count, open)}
        {open && (
          <>
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
          </>
        )}
      </React.Fragment>
    );
  };

  private cellRenderer = (e: TableCellRenderEvent<T>) => {
    const { row, data } = e;

    if (e.column === 0) {
      return (
        <StyledIcon
          isRotated={hasIndex(this.state.selectedIndex, row)}
          name="KeyboardArrowRight"
          onClick={() => data && this.handleClick(row, data)}
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
    const {
      detailsRenderer: _0,
      columns: _1,
      indexed: _2,
      groupRenderer: _3,
      expandedGroups: _4,
      onToggleGroup: _5,
      openLabel: _6,
      closeLabel: _7,
      multiple: _8,
      ...props
    } = this.props;

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
