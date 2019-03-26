import * as React from 'react';
import styled, { css } from '../../utils/styled';
import { KeyCodes } from '../../utils/keyCodes';
import { remCalc } from '../../utils/remCalc';
import { InteractiveSurface, InteractiveSurfaceChangeEvent } from '../InteractiveSurface';
import { Icon } from '../Icon';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { getFontStyle } from '../../textStyles';

export interface CarouselChangeEvent {
  /**
   * The previously selected page index.
   */
  previousIndex: number;
  /**
   * The currently selected page index.
   */
  selectedIndex: number;
}

export interface CarouselStopEvent {
  /**
   * The reason for stopping the autoplay mode.
   */
  reason: 'ended' | 'manual';
  /**
   * Resumes execution of the autoplay mode.
   */
  resume(): void;
}

export interface CarouselProps extends StandardProps {
  /**
   * The default page index - only set for use in automatic mode.
   */
  defaultIndex?: number;
  /**
   * The currently selected page index - used in the controlled mode.
   */
  selectedIndex?: number;
  /**
   * Notification callback if the selected page index should change.
   */
  onPageChange?(e: CarouselChangeEvent): void;
  /**
   * The children, usually passed as a collection of elements.
   */
  children?: React.ReactNode;
  /**
   * Overrides the default container for bullets.
   */
  bulletsContainer?: React.ComponentType;
  /**
   * Overrides the default bullet point component.
   */
  bullet?: React.ComponentType<BulletProps>;
  /**
   * Displays the previous / next arrow. By default disabled.
   * @default false
   */
  arrows?: boolean;
  /**
   * Event emitted once the Carousel autoplay stops.
   */
  onStop?(e: CarouselStopEvent): void;
  /**
   * Activate the autoplay mode, potentially with the time per slide
   * in milliseconds. By default 3000.
   * @default false
   */
  autoplay?: boolean | number;
  /**
   * Whether the Carousel can loop without stopping.
   * @default false
   */
  infinite?: boolean;
}

export interface DragStatus {
  isDragging: boolean;
  start?: Point;
}

export interface Point {
  x: number;
  y: number;
}

export interface CarouselState {
  /**
   * The currently selected page index.
   */
  selectedIndex: number;
  /**
   * Determines if the tab component is controlled from the outside or not.
   */
  controlled: boolean;
  /**
   * Status of the current swipe move.
   */
  dragStatus: DragStatus;
}

const shiftThreshold = 0.3;
const animationDuration = '0.3s';
const animationFunction = 'ease-in-out';

const RootContainer = styled.div`
  outline: none;
`;

const DefaultBulletsContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

export interface BulletProps extends StandardProps {
  /**
   * Determines if the bullet is active or not.
   */
  active: boolean;
  /**
   * Fired once the bullet has been clicked.
   */
  onClick(): void;
  /**
   * Sets the bullet's index.
   */
  index: number;
}

const ActiveBullet = css`
  background-color: rgba(116, 118, 120, 1);
`;

const DefaultBullet = styled.div<BulletProps>`
  height: ${remCalc('12px')};
  width: ${remCalc('12px')};
  background-color: rgba(224, 225, 221, 1);
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
  margin: ${distance.xsmall};
  ${props => (props.active ? ActiveBullet : '')};
`;

const PageItem = styled.div`
  min-width: 100%;
`;

interface PagesContainerProps extends StandardProps {
  selectedIndex: number;
}

const PagesContainer = styled.div<PagesContainerProps>`
  box-sizing: border-box;
  display: flex;
  position: relative;
  left: ${props => -props.selectedIndex * 100}%;
  transition: left ${animationDuration} ${animationFunction};
`;

const Mask = styled.div`
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;

const Arrow = styled.button`
  ${getFontStyle({ size: 'medium' })}

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  padding: 0;
  border: none;
  align-self: start;
  cursor: pointer;
  > i {
    vertical-align: middle;
  }
`;
const ArrowLeft = styled(Arrow)`
  left: 8px;
`;
const ArrowRight = styled(Arrow)`
  right: 8px;
`;

function calcNextPage(currentPage: number, totalPages: number, infinite: boolean = false) {
  const maxIndex = totalPages - 1;
  const nextPage = currentPage + 1;
  return infinite && nextPage > maxIndex ? 0 : Math.min(nextPage, maxIndex);
}

function calcPrevPage(currentPage: number, totalPages: number, infinite: boolean = false) {
  const prevPage = currentPage - 1;
  const maxIndex = totalPages - 1;
  return infinite && prevPage < 0 ? maxIndex : Math.max(prevPage, 0);
}

function calcLeftShiftPercent(selectedIndex: number) {
  return selectedIndex * -100;
}

const defaultAutoPlayTime = 3000;

/**
 * The Carousel component displays a toggling list of content. Page can be changed using bullet
 * controls or swiping gestures.
 */
export class Carousel extends React.PureComponent<CarouselProps, CarouselState> {
  private selects: Array<() => void> = [];
  private pagesContainer: HTMLDivElement | null;
  private autoPlayTimeout: any;

  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex || props.defaultIndex || 0,
      controlled: props.selectedIndex !== undefined,
      dragStatus: { isDragging: false },
    };
  }

  componentWillReceiveProps(nextProps: CarouselProps) {
    const { selectedIndex } = nextProps;
    const { controlled } = this.state;

    if (controlled && typeof selectedIndex === 'number') {
      this.setState({
        selectedIndex,
      });
    }
  }

  componentDidMount() {
    this.tryToPlay();
  }

  componentWillUnmount() {
    this.stop();
  }

  private tryToPlay() {
    this.stop();
    const { autoplay } = this.props;

    if (autoplay) {
      this.play(typeof autoplay === 'number' ? autoplay : defaultAutoPlayTime);
    }
  }

  private play(time: number) {
    this.autoPlayTimeout = setInterval(this.swipeRightAuto, time);
  }

  private stop() {
    this.autoPlayTimeout = clearInterval(this.autoPlayTimeout);
  }

  private resume = () => {
    if (!this.autoPlayTimeout) {
      this.tryToPlay();
    }
  };

  private changePage(target: number, manual = true) {
    const { onPageChange, onStop, children } = this.props;
    const childrenCount = React.Children.count(children);
    const { controlled, selectedIndex } = this.state;
    const shouldStop = target >= childrenCount || target < 0;

    if (manual || shouldStop) {
      if (this.autoPlayTimeout) {
        this.stop();

        if (typeof onStop === 'function') {
          onStop({
            reason: manual ? 'manual' : 'ended',
            resume: this.resume,
          });
        }
      }
    }

    if (!shouldStop) {
      if (typeof onPageChange === 'function') {
        onPageChange({
          previousIndex: selectedIndex,
          selectedIndex: target,
        });
      }

      if (!controlled) {
        this.setState(() => ({
          selectedIndex: target,
        }));
      }
    }
  }

  private dragTile = (e: InteractiveSurfaceChangeEvent) => {
    const { controlled, selectedIndex, dragStatus } = this.state;
    const shift = dragStatus.start ? e.x - dragStatus.start.x : 0;

    if (controlled) {
      e.release();
    }

    if (this.pagesContainer) {
      if (e.active) {
        if (!dragStatus.isDragging) {
          this.setState({ dragStatus: { isDragging: true, start: { x: e.x, y: e.y } } });
          this.setDragStyle(this.pagesContainer);
        }
        this.pagesContainer.style.left = `${calcLeftShiftPercent(selectedIndex) + shift * 100}%`;
      } else {
        this.setState({ dragStatus: { isDragging: false, start: undefined } });
        this.resetInitialStyle(this.pagesContainer);
        this.checkPageChange(shift);
      }
    }
  };

  private checkPageChange(shift: number) {
    const { selectedIndex } = this.state;

    if (shift <= -shiftThreshold) {
      const nextIndex = calcNextPage(selectedIndex, React.Children.count(this.props.children), this.props.infinite);
      this.changePage(nextIndex);
    } else if (shift >= shiftThreshold) {
      const prevIndex = calcPrevPage(selectedIndex, React.Children.count(this.props.children), this.props.infinite);
      this.changePage(prevIndex);
    }
  }

  private setDragStyle(node: HTMLElement) {
    const style = node.style;

    style.transitionProperty = 'unset';
    style.transitionDuration = 'unset';
    style.transitionTimingFunction = 'unset';
  }

  private resetInitialStyle(node: HTMLElement) {
    const style = node.style;

    // tslint:disable-next-line
    style.left = null;
    style.transitionProperty = 'left';
    style.transitionDuration = animationDuration;
    style.transitionTimingFunction = animationFunction;
  }

  private swipe(direction: number, manual: boolean) {
    const { selectedIndex } = this.state;
    const { children, infinite } = this.props;
    const childrenCount = React.Children.count(children);
    let nextIndex = selectedIndex;

    if (direction === 1) {
      nextIndex = calcNextPage(selectedIndex, childrenCount, infinite);
    } else if (direction === -1) {
      nextIndex = calcPrevPage(selectedIndex, childrenCount, infinite);
    }

    this.changePage(nextIndex, manual);
  }

  private swipeLeft = () => {
    this.swipe(-1, true);
  };

  private swipeRight = () => {
    this.swipe(1, true);
  };

  private swipeRightAuto = () => {
    this.swipe(1, false);
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { children, infinite } = this.props;
    const { selectedIndex } = this.state;
    const childrenCount = React.Children.count(children);
    let nextIndex = selectedIndex;

    switch (e.keyCode) {
      case KeyCodes.left:
        nextIndex = calcPrevPage(selectedIndex, childrenCount, infinite);
        break;
      case KeyCodes.right:
        nextIndex = calcNextPage(selectedIndex, childrenCount, infinite);
        break;
      case KeyCodes.end:
        nextIndex = childrenCount - 1;
        break;
      case KeyCodes.home:
        nextIndex = 0;
        break;
      default:
        return;
    }

    this.changePage(nextIndex);
  };

  render() {
    const { selectedIndex } = this.state;
    const {
      children,
      theme,
      selectedIndex: _0,
      defaultIndex: _1,
      onPageChange: _2,
      bulletsContainer: CustomBulletsContainer,
      bullet: CustomBullet,
      arrows = false,
      infinite = false,
      ...props
    } = this.props;
    const childrenCount = React.Children.count(children);
    const bullets: Array<React.ReactChild> = [];
    const items: Array<React.ReactChild> = [];
    const selects = this.selects;
    const BulletsContainer = CustomBulletsContainer || DefaultBulletsContainer;
    const Bullet = CustomBullet || DefaultBullet;

    React.Children.forEach(children, (element, index) => {
      if (element && React.isValidElement(element)) {
        const active = index === selectedIndex;

        if (selects[index] === undefined) {
          selects[index] = () => this.changePage(index);
        }

        bullets.push(
          <Bullet theme={theme} key={`bullet-${index}`} active={active} index={index} onClick={selects[index]} />,
        );
        items.push(<PageItem key={`item-${index}`}>{element}</PageItem>);
      }
    });

    const disableLeft = !infinite && selectedIndex < 1;
    const disableRight = !infinite && selectedIndex > childrenCount - 2;

    return (
      <RootContainer {...props} onKeyDown={this.handleKeyDown} tabIndex={0}>
        <Mask>
          <InteractiveSurface theme={theme} onChange={this.dragTile} opaque>
            <PagesContainer ref={node => (this.pagesContainer = node)} selectedIndex={selectedIndex}>
              {items}
            </PagesContainer>
          </InteractiveSurface>
          {arrows && (
            <div>
              <ArrowLeft onClick={this.swipeLeft} disabled={disableLeft} type="button">
                <Icon name="KeyboardArrowLeft" size={2} />
              </ArrowLeft>
              <ArrowRight onClick={this.swipeRight} disabled={disableRight} type="button">
                <Icon name="KeyboardArrowRight" size={2} />
              </ArrowRight>
            </div>
          )}
        </Mask>
        <BulletsContainer>{bullets}</BulletsContainer>
      </RootContainer>
    );
  }
}
