import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { Anchor, AnchorProps } from '../Anchor';
import { StyledTileIcon } from '../../quarks';
import { getFontStyle } from '../../textStyles';

const Tile = styled(Anchor)`
  cursor: pointer;
  display: block;
  position: relative;
  width: ${themed(({ theme }) => theme.metroInfoTile.size)};
  height: ${themed(({ theme }) => theme.metroInfoTile.size)};
  margin: 0 12px 12px 0;
  overflow: hidden;
  user-select: none;
  background: ${themed(({ theme }) => theme.metroInfoTile.background)};
  color: ${themed(({ theme }) => theme.metroInfoTile.textColor)};

  &:hover {
    outline: rgba(29, 29, 29, 0.1) solid 4px;
  }
`;

const TileTitle = styled.span`
  ${getFontStyle({ size: 'small', weight: 'medium' })}

  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0 10px 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  z-index: 2;
`;

export interface MetroInfoTileProps extends AnchorProps {
  /**
   * The source URL of an icon, if used. The icon scaled to max. 33% of the tile.
   */
  image?: string;
  /**
   * The title of the tile, if anything.
   */
  title?: string;
}

/**
 * Provides a simple tile component that gives a flat info appareance.
 */
export const MetroInfoTile: React.SFC<MetroInfoTileProps> = ({ children, image, title, ...props }) => (
  <Tile {...props}>
    {image && <StyledTileIcon src={image} width="33%" height="33%" />}
    {title && <TileTitle>{title}</TileTitle>}
    {children}
  </Tile>
);
MetroInfoTile.displayName = 'MetroInfoTile';
