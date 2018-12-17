import * as React from 'react';
import * as enzyme from 'enzyme';
import { Tabs } from './';
import { TabPage } from '../TabPage';

describe('<Tabs />', () => {
  it('should render an empty <Tabs> component', () => {
    const wrapper = enzyme.shallow(<Tabs />);
    const nodes = wrapper.filter((node: any) => node.text() !== '');
    expect(nodes.exists()).toBeFalsy();
  });

  it('should not be controlled without props', () => {
    const wrapper = enzyme.shallow(
      <Tabs>
        <TabPage header="Bar">Foo</TabPage>
      </Tabs>,
    );
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should be controlled with selectedIndex', () => {
    const wrapper = enzyme.shallow(
      <Tabs selectedIndex={0}>
        <TabPage header="Bar">Foo</TabPage>
      </Tabs>,
    );
    expect(wrapper.state('controlled')).toBeTruthy();
  });

  it('should not be controlled with defaultIndex', () => {
    const wrapper = enzyme.shallow(
      <Tabs defaultIndex={0}>
        <TabPage header="Bar">Foo</TabPage>
      </Tabs>,
    );
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should not be controlled with onTabChange', () => {
    const wrapper = enzyme.shallow(
      <Tabs defaultIndex={0} onTabChange={() => {}}>
        <TabPage header="Bar">Foo</TabPage>
      </Tabs>,
    );
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should render a <Tabs> component with some props', () => {
    const wrapper = enzyme.mount(
      <Tabs defaultIndex={2}>
        <TabPage header="First">First content.</TabPage>
        <TabPage header="Second">Second content.</TabPage>
        <TabPage header="Third">Third content.</TabPage>
        <TabPage header="Last">Final content.</TabPage>
      </Tabs>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
