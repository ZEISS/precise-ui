import { withFormContext } from '../../hoc';
import { AutocompleteTagBuilderInt } from './AutocompleteTagBuilder.int.part';

/**
 * The tag builder with the ability to select a tag from the predefined/dynamic suggestion collection.
 */
export const AutocompleteTagBuilder = withFormContext(AutocompleteTagBuilderInt);
AutocompleteTagBuilder.displayName = 'AutocompleteTagBuilder';
