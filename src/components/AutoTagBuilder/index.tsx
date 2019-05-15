import { withFormContext } from '../../hoc';
import { AutoTagBuilderInt } from './AutoTagBuilder.int.part';

/**
 * The tag builder with the ability to select a tag from the predefined/dynamic suggestion collection.
 */
export const AutoTagBuilder = withFormContext(AutoTagBuilderInt);
AutoTagBuilder.displayName = 'AutoTagBuilder';
