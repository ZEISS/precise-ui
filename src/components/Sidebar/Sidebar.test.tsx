import * as React from 'react';
import * as enzyme from 'enzyme';
import { Sidebar } from '.';
import { SidebarContainer } from './SidebarContainer.part';
import { SidebarActivatorContainer } from './SidebarActivatorContainer.part';
import { CloseButton } from '../CloseButton';

function expectHidden(container: any) {
  [['visibility', 'hidden'], ['opacity', '0'], ['overflow', 'initial']].forEach(([name, value]) => {
    expect(container).toHaveStyleRule(name, value);
  });
}

function expectShown(container: any) {
  [['visibility', 'visible'], ['opacity', '1'], ['overflow', 'auto']].forEach(([name, value]) => {
    expect(container).toHaveStyleRule(name, value);
  });
}

function getContainer(wrapper: any) {
  return wrapper.find(SidebarContainer).first();
}

function clickActivator(wrapper: any) {
  wrapper
    .find(SidebarActivatorContainer)
    .first()
    .simulate('click')
    .update();
}

function clickClose(wrapper: any) {
  wrapper
    .find(CloseButton)
    .first()
    .simulate('click')
    .update();
}

describe('<Sidebar /> basic', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = enzyme.mount(<Sidebar activator="Show">Content</Sidebar>);
  });

  it('Should render Sidebar', () => {
    expect(wrapper.contains('Content')).toBeTruthy();
    expect(wrapper.contains('Show')).toBeTruthy();
  });

  it('Disabled <Sidebar /> should have proper styles', () => {
    expectHidden(getContainer(wrapper));
  });

  it('Enabled <Sidebar /> should  have proper styles', () => {
    clickActivator(wrapper);
    expectShown(getContainer(wrapper));
  });

  it('Should be hidden after all', () => {
    clickActivator(wrapper);
    expectShown(getContainer(wrapper));
    clickClose(wrapper);
    expectHidden(getContainer(wrapper));
  });

  it('Should match snapshot', () => {
    expect(wrapper.contains('Content')).toBeTruthy();
    expect(wrapper.contains('Show')).toBeTruthy();
  });
});

describe('<Sidebar /> in a controlled mode', () => {
  it('Should react on change of open prop', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const wrapper = enzyme.mount(
      <Sidebar onShow={onOpen} onClose={onClose} activator="Show" open={false}>
        Content
      </Sidebar>,
    );

    expectHidden(getContainer(wrapper));
    clickActivator(wrapper);
    expect(onOpen).toBeCalled();
    wrapper.setProps({ open: true });
    expectShown(getContainer(wrapper));
    clickClose(wrapper);
    expect(onClose).toBeCalled();
    wrapper.setProps({ open: false });
    expectHidden(getContainer(wrapper));
  });
});
