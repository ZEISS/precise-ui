import * as React from 'react';
import * as enzyme from 'enzyme';
import { SidebarPopup } from './';

describe('<SearchField />', () => {
  it('should render SidebarPopup', () => {
    const wrapper = enzyme.shallow(<SidebarPopup>Content</SidebarPopup>);
    expect(wrapper).toMatchSnapshot();
  });
});
