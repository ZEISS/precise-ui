import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { grey6m } from '../../colors';

export type TagType = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'disabled' | 'none';

export interface TagProps extends StandardProps {
  /**
   * Event fired when the tag was clicked.
   */
  onClick?(): void;
  /**
   * The type of the tag, which is primary by default.
   * @default primary
   */
  type?: TagType;
  /**
   * The content of the tag.
   */
  children?: React.ReactNode;
}

const StyledTag = styled('span')<TagProps>`
  display: inline-block;
  border-radius: 3px;
  font-size: 0.8em;
  border: 0;
  color: ${themed(({ theme }) => theme.tagColor)};
  background-color: ${themed(({ theme }) => theme.tagBackground)};
  padding: ${distance.xsmall} ${distance.medium};
`;

function getStyle(type: TagType) {
  switch (type) {
    case 'secondary':
      return {
        tagColor: 'rgba(114,67,150,1)',
        tagBackground: 'rgba(238,211,254,1)',
      };
    case 'info':
      return {
        tagColor: 'rgba(47,101,20,1)',
        tagBackground: 'rgba(201,239,148,1)',
      };
    case 'success':
      return {
        tagColor: 'rgba(0,109,93,1)',
        tagBackground: 'rgba(170,249,230,1)',
      };
    case 'danger':
      return {
        tagColor: 'rgba(163,56,42,1)',
        tagBackground: 'rgba(254,214,149,1)',
      };
    case 'warning':
      return {
        tagColor: 'rgba(114,94,16,1)',
        tagBackground: 'rgba(252,231,126,1)',
      };
    case 'disabled':
      return {
        tagColor: 'rgba(57,75,84,1)',
        tagBackground: grey6m,
      };
    case 'none':
      return {
        tagColor: 'rgba(173,22,37,1)',
        tagBackground: 'rgba(255,210,221,1)',
      };
    case 'primary':
    default:
      return {
        tagColor: 'rgba(52,93,127,1)',
        tagBackground: 'rgba(193,230,254,1)',
      };
  }
}

const defaultType: TagType = 'primary';
/**
 * The tag component represents a simple block with a typed color and content.
 */
export const Tag: React.SFC<TagProps> = ({ type = defaultType, ...props }) => (
  <StyledTag theme={getStyle(type)} {...props} />
);
Tag.displayName = 'Tag';
