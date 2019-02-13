import * as React from 'react';
import styled from '../../utils/styled';
import { setLabels, getPropLabel, PaginationBarLabels } from '../../utils/labels';
import { ItemControls } from './ItemControlsView.part';
import { PageControls } from './PageControls.part';
import { SelectButtonChangeEvent } from '../SelectButton';

setLabels({
  itemsPerPageLabel: 'Items per page:',
});

function defaultItemsInfo(start: number, end: number, total: number) {
  return `${start} - ${end} of ${total}`;
}

function defaultPagesInfo(start: number, end: number) {
  return `${start} of ${end} pages`;
}

function getPages(itemsPerPage: number, total: number) {
  const l = Math.ceil(total / itemsPerPage);
  const pages: Array<string> = [];

  for (let i = 1; i <= l; i++) {
    pages.push(i.toString());
  }

  return pages;
}

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  align-items: center;
  height: 40px;
`;

export interface PaginationBarSizeChangedEvent {
  size: number;
}

export interface PaginationBarPageChangedEvent {
  page: number;
}

export interface PaginationBarProps extends PaginationBarLabels {
  /**
   * The available maximum numbers of entries per page to choose from, if any.
   */
  availableSizes?: Array<number>;
  /**
   * The currently active page.
   */
  selectedPage: number;
  /**
   * The maximum number of entries per page.
   */
  size: number;
  /**
   * The total number of entries.
   */
  items: number;
  /**
   * Pages info label generator.
   * @default '{start} of {end} pages'
   */
  pagesInfo?(start: number, end: number): React.ReactChild;
  /**
   * Items info label generator.
   * @default '{start} - {end} of {total}'
   */
  itemsInfo?(start: number, end: number, total: number): React.ReactChild;
  /**
   * Event fired when the size per page has been changed.
   */
  onSizeChanged?(e: PaginationBarSizeChangedEvent): void;
  /**
   * Event fired when the selected page has been changed.
   */
  onPageChanged?(e: PaginationBarPageChangedEvent): void;
}

export class PaginationBar extends React.Component<PaginationBarProps> {
  private sizeChanged = (e: SelectButtonChangeEvent) => {
    const { onSizeChanged, availableSizes } = this.props;

    if (Array.isArray(availableSizes) && typeof onSizeChanged === 'function') {
      onSizeChanged({
        size: availableSizes[e.index],
      });
    }
  };

  private changeToPrevious = () => {
    const { selectedPage } = this.props;
    this.changeTo(selectedPage - 1);
  };

  private changeToNext = () => {
    const { selectedPage } = this.props;
    this.changeTo(selectedPage + 1);
  };

  private changeToSelect = ({ index }: SelectButtonChangeEvent) => {
    this.changeTo(index);
  };

  private changeTo(page: number) {
    const { onPageChanged } = this.props;

    if (page < 0) {
      page = 0;
    }
    if (typeof onPageChanged === 'function') {
      onPageChanged({
        page,
      });
    }
  }

  render() {
    const {
      availableSizes,
      size,
      selectedPage,
      pagesInfo = defaultPagesInfo,
      itemsInfo = defaultItemsInfo,
      items,
      onSizeChanged,
      onPageChanged,
      ...props
    } = this.props;
    const pages = getPages(size, items);
    const currentItem = selectedPage * size;
    const nextItem = currentItem + size;

    return (
      <ControlsContainer>
        {Array.isArray(availableSizes) && availableSizes.length > 0 && (
          <ItemControls
            label={getPropLabel(props, 'itemsPerPageLabel')}
            data={availableSizes.map(size => size.toString())}
            value={`${size}`}
            onChange={this.sizeChanged}>
            {itemsInfo(currentItem, Math.min(nextItem, items), items)}
          </ItemControls>
        )}
        <PageControls
          current={selectedPage}
          total={pages.length}
          changeToPrevious={this.changeToPrevious}
          changeToNext={this.changeToNext}
          changeToSelect={this.changeToSelect}
          pages={pages}>
          {pagesInfo(selectedPage + 1, Math.max(pages.length, 1))}
        </PageControls>
      </ControlsContainer>
    );
  }
}
