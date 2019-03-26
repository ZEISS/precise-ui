import * as React from 'react';
import { TagBuilderInt } from './TagBuilderInt.part';
import { withFormContext } from '../../hoc/withFormContext';
import { TagBuilderProps } from './TagBuilder.types.part';

export * from './TagBuilder.types.part';

export const TagBuilder: React.SFC<TagBuilderProps> = withFormContext(TagBuilderInt);
TagBuilder.displayName = 'TagBuilder';
