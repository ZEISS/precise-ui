import * as React from 'react';
import * as colors from '../../colors';
import styled from '../../utils/styled';
import { RadioButton, RadioButtonChangeEvent, RadioButtonProps } from '../RadioButton';
import { StyledTileIcon } from '../../quarks/StyledTileIcon';
import { getFontStyle } from '../../textStyles';

const Tile = styled(RadioButton)<{ checked: boolean }>`
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 96px;
  height: 96px;
  padding: 8px;
  overflow: hidden;
  margin: 10px !important;
  user-select: none;
  color: ${colors.black};
  background: ${colors.grey7};
  ${props => (props.checked ? `outline: ${colors.cyan} solid 4px;` : '')};

  &:hover {
    ${props => (!props.checked ? `outline: rgba(29, 29, 29, 0.1) solid 4px;` : '')};
  }
`;

const TileTitle = styled.span`
  ${getFontStyle({ size: 'small', weight: 'medium' })}

  position: absolute;
  bottom: 8px;
  right: 8px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  z-index: 2;
`;

export interface MetroRadioTileProps extends RadioButtonProps {
  /**
   * The source URL of an icon, if used. The icon is scaled to max. 50px of the tile.
   */
  image?: string;
  /**
   * The title of the tile, if anything.
   */
  title?: string;
}

export interface MetroRadioTileState {
  checked: boolean;
  controlled: boolean;
}

export class MetroRadioTile extends React.Component<MetroRadioTileProps, MetroRadioTileState> {
  constructor(props: MetroRadioTileProps) {
    super(props);
    this.state = {
      controlled: props.value !== undefined,
      checked: props.value || props.defaultValue || false,
    };
  }

  componentWillReceiveProps(props: MetroRadioTileProps) {
    if (this.state.controlled) {
      this.setState({
        checked: props.value || false,
      });
    }
  }

  private change = (e: RadioButtonChangeEvent) => {
    const { onChange } = this.props;

    if (!this.state.controlled) {
      this.setState({
        checked: e.value,
      });
    }

    if (typeof onChange === 'function') {
      onChange(e);
    }
  };

  render() {
    const { image, title, ...props } = this.props;
    const { checked } = this.state;

    return (
      <Tile onChange={this.change} checked={checked} {...props}>
        {image && <StyledTileIcon src={image} width="50px" height="50px" />}
        {title && <TileTitle>{title}</TileTitle>}
      </Tile>
    );
  }
}
