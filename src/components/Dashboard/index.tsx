import * as React from 'react';
import styled from '../../utils/styled';
import { StandardProps } from '../../common';
import { InteractiveSurface, InteractiveSurfaceChangeEvent } from '../InteractiveSurface';
import { Grid, GridLayout } from '../Grid';
import { GridArea, GridAreaTapEvent } from '../GridArea';

export interface DashboardTile {
  /**
   * Id of the tile, must be unique.
   */
  id: string;
  /**
   * The column placement for the tile. By default auto.
   * @default auto
   */
  column?: number;
  /**
   * The row placement for the tile. By default auto.
   * @default auto
   */
  row?: number;
  /**
   * The number of columns spanned by the tile. By default 1.
   * @default 1
   */
  colSpan?: number;
  /**
   * The number of rows spanned by the tile. By default 1.
   * @default 1
   */
  rowSpan?: number;
  /**
   * Determines whether the tile is hidden or not.
   * @default false
   */
  hidden?: boolean;
}

export interface DashboardChangeEvent {
  /**
   * The tile that originated the change.
   */
  tile: DashboardTile;
  /**
   * The reconstructed dashboard layout.
   */
  tiles: Array<DashboardTile>;
}

export interface DashboardProps extends StandardProps {
  /**
   * The number of rows in the dashboard grid. By default flexible.
   * @default auto
   */
  rowCount?: number;
  /**
   * The height per row in pixel. By default auto.
   * @default auto
   */
  rowHeight?: number;
  /**
   * The number of columns in the dashboard grid. By default 5.
   * @default 5
   */
  columnCount?: number;
  /**
   * The height per row in pixel. By default auto.
   * @default auto
   */
  columnWidth?: number;
  /**
   * The spacing between the grid cells in pixel. By default 10.
   * @default 10
   */
  spacing?: number;
  /**
   * The default tile arrangement to use. Only managed mode exist. Setting
   * this property later will reset the tile layout to the given one.
   */
  defaultTiles: Array<DashboardTile>;
  /**
   * Fired when the dashboard layout is changed.
   */
  onChange?(e: DashboardChangeEvent): void;
  /**
   * Disables the ability to change the layout. By default false.
   * @default false
   */
  disabled?: boolean;
  /**
   * Enables the live preview during the tile drag with a standard
   * or custom element.
   */
  preview?: React.ReactChild | boolean;
  /**
   * By providing the show tile property, the dashboard will render
   * the unused tiles.
   */
  emptyTiles?: boolean;
  /**
   * The content to consider for the dashboard.
   */
  children?: React.ReactNode;
  /**
   * Gets the reference to the underlying HTML DOM element.
   */
  innerRef?(instance: HTMLElement | null): void;
}

export interface DashboardState {
  tiles: Array<DashboardTile>;
  live?: Array<DashboardTile>;
}

function clamp(lower: number, value: number, upper: number) {
  return Math.min(Math.max(lower, value), upper);
}

function calc(rel: number, off: number, total: number, dim: number) {
  const value = clamp(0, rel * total - off, total - dim);
  return `${value}px`;
}

function repeat(count: number | undefined, dim?: number) {
  const value = dim !== undefined ? `${dim}px` : '1fr';

  if (count !== undefined) {
    const values: Array<string> = [];

    for (let i = 0; i < count; i++) {
      values.push(value);
    }

    return values;
  }

  return value;
}

function collides(a: DashboardTile, b: DashboardTile) {
  if (a.hidden || b.hidden) {
    return false;
  } else if (a.column !== undefined && a.row !== undefined && b.column !== undefined && b.row !== undefined) {
    const { colSpan: acp = 1, rowSpan: arp = 1 } = a;
    const { colSpan: bcp = 1, rowSpan: brp = 1 } = b;
    const acs = a.column;
    const ace = a.column + acp - 1;
    const ars = a.row;
    const are = a.row + arp - 1;
    const bcs = b.column;
    const bce = b.column + bcp - 1;
    const brs = b.row;
    const bre = b.row + brp - 1;
    return acs <= bce && ace >= bcs && ars <= bre && are >= brs;
  }

  return false;
}

function notEqual(a: Array<DashboardTile>, b: Array<DashboardTile>) {
  if (a !== b) {
    if (a.length !== b.length) {
      return true;
    }

    for (let i = a.length; i--; ) {
      const at = a[i];
      const bt = b[i];

      if (
        at !== bt ||
        at.colSpan !== bt.colSpan ||
        at.column !== bt.column ||
        at.id !== bt.id ||
        at.row !== bt.row ||
        at.rowSpan !== bt.rowSpan
      ) {
        return true;
      }
    }
  }

  return false;
}

function resetStyle(node: HTMLElement) {
  // tslint:disable-next-line
  const defaultValue = null;
  const style = node.style;
  style.position = 'static';
  style.cursor = defaultValue;
  style.width = defaultValue;
  style.height = defaultValue;
  style.left = defaultValue;
  style.top = defaultValue;
  style.zIndex = defaultValue;
}

const Preview = styled.div`
  background: #eee;
  border: 1px dashed #ccc;
  width: 100%;
  height: 100%;
`;

function getPreview(preview: React.ReactChild | boolean, tile: DashboardTile) {
  const content = preview === true ? <Preview /> : preview;
  return (
    <GridArea colSpan={tile.colSpan} rowSpan={tile.rowSpan} column={tile.column} row={tile.row}>
      {content}
    </GridArea>
  );
}

const defaultActiveTile = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

function changeTile(oldTiles: Array<DashboardTile>, newTile: DashboardTile) {
  let changed = false;

  const newTiles = oldTiles.map(tile => {
    if (tile.id === newTile.id) {
      changed =
        changed ||
        tile.colSpan !== newTile.colSpan ||
        tile.column !== newTile.column ||
        tile.hidden !== newTile.hidden ||
        tile.row !== newTile.row ||
        tile.rowSpan !== newTile.rowSpan;
      return newTile;
    } else if (collides(tile, newTile)) {
      changed = true;
      return {
        id: tile.id,
        colSpan: tile.colSpan,
        rowSpan: tile.rowSpan,
      };
    }

    return tile;
  });

  return changed ? newTiles : oldTiles;
}

/**
 * Dashboard component.
 */
export class Dashboard extends React.Component<DashboardProps, DashboardState> {
  private setters: Array<(e: GridAreaTapEvent) => void> = [];
  private layout: GridLayout;
  private activeTile:
    | {
        node: HTMLElement;
        x: number;
        y: number;
        width: number;
        height: number;
        index: number;
        current: DashboardTile;
      }
    | undefined;

  constructor(props: DashboardProps) {
    super(props);
    const { defaultTiles = [] } = props;
    this.state = {
      tiles: [...defaultTiles],
      live: undefined,
    };
  }

  componentWillReceiveProps(nextProps: DashboardProps) {
    const { defaultTiles: currTiles = [] } = this.props;
    const { defaultTiles: nextTiles = [] } = nextProps;

    if (notEqual(currTiles, nextTiles)) {
      this.setState({
        tiles: [...nextTiles],
        live: undefined,
      });
    }
  }

  private finishDrag(newTile: DashboardTile) {
    const { onChange } = this.props;
    const { tiles: oldTiles } = this.state;
    const newTiles = changeTile(oldTiles, newTile);
    this.activeTile = undefined;

    if (newTiles !== oldTiles) {
      this.setState({
        tiles: newTiles,
        live: undefined,
      });

      if (typeof onChange === 'function') {
        onChange({
          tile: newTile,
          tiles: newTiles,
        });
      }
    } else {
      this.setState({
        live: undefined,
      });
    }
  }

  private dragTile = (e: InteractiveSurfaceChangeEvent) => {
    const { activeTile } = this;

    if (activeTile) {
      const node = activeTile.node;
      const current = activeTile.current;

      if (!e.moved) {
        // don't do anything (yet)
      } else if (e.active) {
        const style = node.style;
        style.left = calc(e.x, activeTile.x, e.rect.width, activeTile.width);
        style.top = calc(e.y, activeTile.y, e.rect.height, activeTile.height);
        this.previewDrag(e.x, e.y, current);
      } else {
        const pos = this.getTargetPosition(e.x, e.y, current);
        resetStyle(node);
        this.finishDrag({
          ...current,
          column: pos.column,
          row: pos.row,
        });
      }
    } else {
      e.release();
    }
  };

  private previewDrag(h: number, v: number, tile: DashboardTile) {
    const active = this.activeTile;
    const { preview } = this.props;
    const { live, tiles } = this.state;

    if (preview && active && live) {
      const current = active.current;
      const pos = this.getTargetPosition(h, v, tile);
      const last = live[active.index];

      if (pos.column !== last.column || pos.row !== last.row) {
        this.setState({
          live: changeTile(tiles, {
            ...current,
            column: pos.column,
            row: pos.row,
          }),
        });
      }
    }
  }

  private getTargetPosition(h: number, v: number, tile: DashboardTile) {
    const { columns, rows } = this.layout;
    const { colSpan = 1, rowSpan = 1 } = tile;
    const { x, y, width, height } = this.activeTile || defaultActiveTile;
    const totalRows = rows.length;
    const totalColumns = columns.length;
    const columnOffset = ~~((x * colSpan) / width);
    const rowOffset = ~~((y * rowSpan) / height);
    return {
      column: clamp(0, ~~(h * totalColumns) - columnOffset, totalColumns - colSpan),
      row: clamp(0, ~~(v * totalRows) - rowOffset, totalRows - rowSpan),
    };
  }

  private setActiveTile(e: GridAreaTapEvent, index: number) {
    const { disabled } = this.props;
    const { tiles } = this.state;
    const current = tiles[index];

    if (!disabled) {
      this.activeTile = {
        ...e,
        index,
        current,
      };

      const style = e.node.style;
      style.cursor = 'move';
      style.position = 'absolute';
      style.width = `${e.width}px`;
      style.height = `${e.height}px`;
      style.zIndex = '100000000';

      this.setState({
        live: tiles,
      });
    }
  }

  private setLayout = ({ layout }: { layout: GridLayout }) => {
    this.layout = layout;
  };

  render() {
    const {
      columnWidth,
      columnCount = 5,
      rowHeight,
      rowCount,
      spacing = 10,
      theme,
      children,
      disabled,
      preview,
      defaultTiles: _0,
      onChange: _1,
      emptyTiles,
      ...props
    } = this.props;
    const { tiles, live } = this.state;
    const currentTiles = live || tiles;
    const columns = repeat(columnCount, columnWidth);
    const rows = repeat(rowCount, rowHeight);
    const active = this.activeTile;

    return (
      <InteractiveSurface theme={theme} onChange={this.dragTile} disabled={disabled}>
        <Grid
          theme={theme}
          rows={rows}
          columns={columns}
          spacing={`${spacing}px`}
          showEmptyCells={emptyTiles}
          onLayout={this.setLayout}
          {...props}>
          {React.Children.map(children, (child, index) => {
            const tile = currentTiles[index];
            const setters = this.setters;

            if (setters[index] === undefined) {
              setters[index] = e => this.setActiveTile(e, index);
            }

            return (
              tile && (
                <GridArea
                  key={tile.id}
                  theme={theme}
                  onTap={setters[index]}
                  column={tile.column}
                  colSpan={tile.colSpan}
                  rowSpan={tile.rowSpan}
                  hidden={tile.hidden}
                  row={tile.row}>
                  {child}
                </GridArea>
              )
            );
          })}
          {preview && active && getPreview(preview, currentTiles[active.index])}
        </Grid>
      </InteractiveSurface>
    );
  }
}
