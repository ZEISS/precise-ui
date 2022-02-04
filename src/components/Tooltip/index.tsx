import * as React from 'react';
import styled from '../../utils/styled';
import { TooltipProps } from './Tooltip.types.part';
import { Flyout } from '../Flyout';
import { tuna, white } from '../../colors';
import { remCalc } from '../../utils/remCalc';

export { TooltipPosition, TooltipChangeEvent, TooltipProps } from './Tooltip.types.part';

const TooltipContainer = styled.div`
  position: relative;
  width: fit-content;
  display: inline-block;
`;

export interface TooltipState {
  controlled: boolean;
  open: boolean;
}

export class Tooltip extends React.Component<TooltipProps, TooltipState> {
  private targetContainer: HTMLDivElement | null;

  constructor(props: TooltipProps) {
    super(props);
    this.state = {
      controlled: props.open !== undefined,
      open: props.open || false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: TooltipProps) {
    if (this.state.controlled && nextProps.open !== undefined) {
      this.setOpen(nextProps.open);
    }
  }

  private setOpen(open: boolean) {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange({ open });
    }

    this.setState({
      open,
    });
  }

  private onMouseOver = () => {
    if (!this.state.controlled) {
      this.setOpen(true);
    }
  };

  private onMouseOut = () => {
    if (!this.state.controlled) {
      this.setOpen(false);
    }
  };

  render() {
    const { open: _0, theme, ...props } = this.props;
    const { open } = this.state;
    const tooltipFlyoutTheme = {
      flyout: { background: tuna, textColor: white, fontSize: remCalc('14px'), maxWidth: '250px' },
      ...theme,
    };

    return (
      <TooltipContainer
        onFocus={this.onMouseOver}
        onBlur={this.onMouseOut}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}>
        <Flyout {...props} open={open} theme={tooltipFlyoutTheme} />
      </TooltipContainer>
    );
  }
}
