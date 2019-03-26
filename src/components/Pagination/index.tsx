import * as React from 'react';
import { StandardProps } from '../../common';
import { PaginationBar, PaginationBarSizeChangedEvent, PaginationBarPageChangedEvent } from '../PaginationBar';
import { PaginationLayout } from './PaginationLayout.part';

export interface PaginationChangeEvent {
  /**
   * The current page index.
   */
  value: number;
}

export interface PaginationState {
  current: number;
  size: number;
}

export interface PaginationRenderEvent {
  /**
   * The current page index.
   */
  current: number;
  /**
   * The minimum index for the entry to be in the current page.
   */
  min: number;
  /**
   * The maximum index for the entry to be in the current page.
   */
  max: number;
  /**
   * The total number of entries.
   */
  count: number;
  /**
   * The rendered entries.
   */
  content: React.ReactNode;
  /**
   * Callback for emitting an items per page change.
   */
  sizeChanged(e: PaginationBarSizeChangedEvent): void;
  /**
   * Callback for emitting a change of the current page index.
   */
  pageChanged(e: PaginationBarPageChangedEvent): void;
}

export interface PaginationProps extends StandardProps {
  /**
   * The initial, i.e., default, page index used in managed mode.
   */
  defaultValue?: number;
  /**
   * The current page index leading to controlled mode.
   */
  value?: number;
  /**
   * The maximum number of entries per page. By default set to 20.
   * @default 20
   */
  size?: number | Array<number>;
  /**
   * The optional host element to be used.
   */
  host?: string | React.ComponentClass | React.StatelessComponent;
  /**
   * Event fired when the selected page changes.
   */
  onChange?(e: PaginationChangeEvent): void;
  /**
   * The optional footer info label override, e.g., for localization.
   */
  label?: string;
  /**
   * Optional function to compute the items info label.
   * @param start The inclusive start number of entries.
   * @param end The inclusive end number of entries.
   * @param total The total number of pages.
   */
  itemsInfo?(start: number, end: number, total: number): React.ReactChild;
  /**
   * Optional function to compute the pages info label.
   * @param start The inclusive start number of entries.
   * @param end The inclusive end number of entries.
   */
  pagesInfo?(start: number, end: number): React.ReactChild;
  /**
   * Callback to override the rendering of the pagination.
   */
  render?(e: PaginationRenderEvent): React.ReactNode;
  /**
   * The content of the component. Will be cropped if pagination applies.
   */
  children?: React.ReactNode;
}

/**
 * The Pagination component allows generic pagination of arbitrary components.
 */
export class Pagination extends React.Component<PaginationProps, PaginationState> {
  constructor(props: PaginationProps) {
    super(props);
    const { value, defaultValue, size = 20 } = props;
    this.state = {
      current: value || defaultValue || 0,
      size: Array.isArray(size) ? size[0] : size,
    };
  }

  private handlePageChange = ({ page }: PaginationBarPageChangedEvent) => {
    const { onChange, value } = this.props;

    if (value === undefined) {
      this.setState({
        current: page,
      });
    }

    if (typeof onChange === 'function') {
      onChange({
        value: page,
      });
    }
  };

  private handleSizeChange = ({ size }: PaginationBarSizeChangedEvent) => {
    const { children } = this.props;
    const { current } = this.state;
    const total = React.Children.count(children);
    const maxPageCount = Math.max(Math.ceil(total / size) - 1, 0);
    this.setState({
      size,
      current: Math.min(current, maxPageCount),
    });
  };

  private getDim(count: number) {
    const { current, size: sizeState } = this.state;
    const min = current * sizeState;

    if (min < count) {
      return {
        current,
        min,
        max: min + sizeState,
        sizeState,
      };
    } else {
      const previous = ~~((count - 1) / sizeState);
      return {
        current: previous,
        min: previous * sizeState,
        max: (previous + 1) * sizeState,
        sizeState,
      };
    }
  }

  render() {
    const { children, host, size: sizeProp, itemsInfo, pagesInfo, label, render, ...props } = this.props;
    const count = React.Children.count(children);
    const { current, min, max, sizeState } = this.getDim(count);
    const content =
      count < sizeState
        ? children
        : React.Children.map(children, (child, index) => {
            if (index >= min && index < max) {
              return child;
            }
            return undefined;
          });

    if (typeof render === 'function') {
      return render({
        current,
        min,
        max,
        count,
        content,
        sizeChanged: this.handleSizeChange,
        pageChanged: this.handlePageChange,
      });
    }

    return (
      <PaginationLayout
        {...props}
        host={host}
        content={content}
        controls={
          <PaginationBar
            selectedPage={current}
            itemsInfo={itemsInfo}
            itemsPerPageLabel={label}
            pagesInfo={pagesInfo}
            size={sizeState}
            items={count}
            onSizeChanged={this.handleSizeChange}
            onPageChanged={this.handlePageChange}
            availableSizes={Array.isArray(sizeProp) ? sizeProp : []}
          />
        }
      />
    );
  }
}
