import * as React from 'react';
import onClickOutside, { AdditionalProps } from 'react-onclickoutside';
import { InteractiveListInt } from './InteractiveListInt.part';
import { InteractiveListProps } from './InteractiveList.types.part';

export {
  InteractiveListWrapperProps,
  InteractiveListDirection,
  InteractiveListBorderType,
  InteractiveListItem,
  InteractiveListProps,
  InteractiveListState,
  InteractiveListChangeEvent,
  InteractiveListItemObject,
} from './InteractiveList.types.part';

/**
 * General purpose list component which can be used for rendering list items.
 */
export const InteractiveList: React.ComponentClass<InteractiveListProps & AdditionalProps> = onClickOutside(
  InteractiveListInt,
);
InteractiveList.displayName = 'InteractiveList';
