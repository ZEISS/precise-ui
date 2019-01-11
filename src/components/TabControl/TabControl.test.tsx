import * as React from 'react';
import * as enzyme from 'enzyme';
import { TabControl } from './';

describe('<TabControl />', () => {
  it('should not be controlled without props', () => {
    const wrapper = enzyme.shallow(
      <TabControl render={() => false}>
        <div>Foo</div>
      </TabControl>,
    );
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should be controlled with selectedIndex', () => {
    const wrapper = enzyme.shallow(
      <TabControl render={() => false} selectedIndex={0}>
        <div>Foo</div>
      </TabControl>,
    );
    expect(wrapper.state('controlled')).toBeTruthy();
  });

  it('should not be controlled with defaultIndex', () => {
    const wrapper = enzyme.shallow(
      <TabControl render={() => false} defaultIndex={0}>
        <div>Foo</div>
      </TabControl>,
    );
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should not be controlled with onTabChange', () => {
    const wrapper = enzyme.shallow(
      <TabControl render={() => false} defaultIndex={0} onTabChange={() => {}}>
        <div>Foo</div>
      </TabControl>,
    );
    expect(wrapper.state('controlled')).toBeFalsy();
  });
});
