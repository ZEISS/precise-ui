import * as React from 'react';
import onClickOutside, { AdditionalProps } from 'react-onclickoutside';
import styled from '../../utils/styled';
import { FlyoutWindow } from './FlyoutWindow.part';
import { FlyoutProps } from './Flyout.types.part';

export { FlyoutPosition, FlyoutChangeEvent, FlyoutProps } from './Flyout.types.part';

const FlyoutContainer = styled.div`
  position: relative;
  display: inline-block;
  width: fit-content;
`;

const StyledTargetWrapper = styled.div``;

export interface FlyoutState {
  controlled: boolean;
  targetRect?: ClientRect;
  dirtyFlag: boolean;
  open: boolean;
}

class FlyoutInt extends React.Component<FlyoutProps, FlyoutState> {
  private targetContainer: HTMLDivElement | null;

  constructor(props: FlyoutProps) {
    super(props);
    this.state = {
      controlled: props.open !== undefined,
      open: props.open || false,
      targetRect: undefined,
      dirtyFlag: false,
    };
  }

  handleClickOutside = () => {
    this.state.open && !this.state.controlled && this.setOpen(false);
  };

  componentDidMount() {
    this.updateMeasurements();
  }

  componentWillReceiveProps(nextProps: FlyoutProps) {
    if (this.state.controlled && nextProps.open !== undefined) {
      this.setOpen(nextProps.open);
    }
  }

  componentDidUpdate() {
    const { dirtyFlag } = this.state;

    if (dirtyFlag) {
      this.updateMeasurements();
      this.setState({
        dirtyFlag: false,
      });
    }
  }

  private updateMeasurements() {
    if (this.targetContainer) {
      const targetRect = this.targetContainer.getBoundingClientRect();
      this.setState({
        targetRect,
      });
    }
  }

  private setTargetRef = (el: HTMLDivElement | null) => {
    this.targetContainer = el;
  };

  private setOpen(open: boolean) {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange({ open });
    }

    this.setState({
      open,
      dirtyFlag: open === true,
    });
  }

  private onClick = () => {
    if (!this.state.controlled) {
      this.setOpen(!this.state.open);
    }
  };

  render() {
    const { children, content, open: _0, onChange: _1, ...props } = this.props;
    const { targetRect } = this.state;
    const { open } = this.state;

    return (
      <FlyoutContainer ref={this.setTargetRef}>
        <StyledTargetWrapper onClick={this.onClick}>{children}</StyledTargetWrapper>
        {!!content && targetRect && open && (
          <FlyoutWindow {...props} targetRect={targetRect}>
            {content}
          </FlyoutWindow>
        )}
      </FlyoutContainer>
    );
  }
}

export const Flyout: React.ComponentClass<FlyoutProps & AdditionalProps> = onClickOutside(FlyoutInt);
Flyout.displayName = 'Flyout';
