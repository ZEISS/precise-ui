import * as React from 'react';
import * as enzyme from 'enzyme';
import { SearchField } from './';

describe('<SearchField />', () => {
  it('should render a standard search field', () => {
    const wrapper = enzyme.shallow(<SearchField />);
    expect(wrapper).toMatchSnapshot();
  });
});
