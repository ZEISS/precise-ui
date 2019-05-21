import * as enzyme from 'enzyme';
import * as React from 'react';
import { withValidation } from './withValidation';
import {
  TextField,
  Autocomplete,
  Checkbox,
  ColorPicker,
  DateField,
  DropdownField,
  FileSelect,
  RadioButton,
  Slider,
  TagBuilder,
  Toggle,
  InputError,
} from '../components';

const components = [
  [TextField.displayName, TextField, 'test'],
  [Autocomplete.displayName, Autocomplete, 'test'],
  [Checkbox.displayName, Checkbox, 'test'],
  [ColorPicker.displayName, ColorPicker, '#fff'],
  [DateField.displayName, DateField, new Date().toISOString],
  [DropdownField.displayName, DropdownField, 'test'],
  [FileSelect.displayName, FileSelect, [new File(['test'] as Array<BlobPart>, 'test')]],
  ['RadioButton', RadioButton, 'test'],
  [Slider.displayName, Slider, 20],
  [TagBuilder.displayName, TagBuilder, ['test', 'test1']],
  [Toggle.displayName, Toggle, 'test'],
];

describe('withValidation hoc', () => {
  it.each(components)('%s', (_, component, value) => {
    const RequiredField = withValidation(({ value }) => !value && 'Input is required')(component);

    const wrapper = enzyme.mount(<RequiredField />);

    expect(wrapper.find(InputError).exists()).toBe(false);

    (wrapper.instance() as any).validate({ value: undefined });
    wrapper.update();

    expect(wrapper.find(InputError).text()).toBe('Input is required');

    (wrapper.instance() as any).validate({ value });

    wrapper.update();
    expect(wrapper.find(InputError).exists()).toBe(false);
  });
});
