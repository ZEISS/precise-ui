import * as React from 'react';
import * as enzyme from 'enzyme';
import { Sidebar } from '.';
import { SidebarContainer } from './SidebarContainer.part';
import { SidebarActivatorContainer } from './SidebarActivatorContainer.part';
import { CloseButton } from '../CloseButton';

describe('<Sidebar />', () => {
  let wrapper;
  const getContainer = () => wrapper.find(SidebarContainer).first();
  const show = () =>
    wrapper
      .find(SidebarActivatorContainer)
      .first()
      .simulate('click')
      .update();
  const hide = () =>
    wrapper
      .find(CloseButton)
      .first()
      .simulate('click')
      .update();

  const expectHidden = () =>
    [['visibility', 'hidden'], ['opacity', '0'], ['overflow', 'initial']].forEach(([name, value]) => {
      expect(getContainer()).toHaveStyleRule(name, value);
    });

  const expectShown = () =>
    [['visibility', 'visible'], ['opacity', '1'], ['overflow', 'auto']].forEach(([name, value]) => {
      expect(getContainer()).toHaveStyleRule(name, value);
    });

  beforeEach(() => {
    wrapper = enzyme.mount(<Sidebar activator="Show">Content</Sidebar>);
  });

  it('Should render Sidebar', () => {
    expect(wrapper.contains('Content')).toBeTruthy();
    expect(wrapper.contains('Show')).toBeTruthy();
  });

  it('Disabled <Sidebar /> should have proper styles', () => {
    expectHidden();
  });

  it('Enabled <Sidebar /> should  have proper styles', () => {
    show();
    expectShown();
  });

  it('Should be hidden after all', () => {
    show();
    expectShown();
    hide();
    expectHidden();
  });

  it('Should match snapshot', () => {
    expect(wrapper.contains('Content')).toBeTruthy();
    expect(wrapper.contains('Show')).toBeTruthy();
  });
});
