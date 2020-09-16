import { DropdownFieldInt } from './DropdownFieldInt';
import onClickOutside from 'react-onclickoutside';
import { withFormContext } from '../../hoc/withFormContext';

export const DropdownField = withFormContext(onClickOutside(DropdownFieldInt));
export * from './DropdownField.types.part';
