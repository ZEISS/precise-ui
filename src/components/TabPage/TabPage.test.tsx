import * as React from 'react';
import * as enzyme from 'enzyme';
import { TabPage } from './';

describe('<TabPage />', () => {
  it('should render an empty <TabPage> component', () => {
    const wrapper = enzyme.shallow(<TabPage header="Foo" />);
    expect(wrapper.text()).toBe('');
  });

  it('should render an some text as children', () => {
    const wrapper = enzyme.shallow(<TabPage header="Foo">Bar</TabPage>);
    expect(wrapper.text()).toBe('Bar');
  });

  it('should render a header as a component', () => {
    const wrapper = enzyme.mount(<TabPage header={<div>Header</div>}>Content of the tab</TabPage>);
    expect(wrapper).toMatchSnapshot();
  });
});
