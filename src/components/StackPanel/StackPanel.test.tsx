import * as React from 'react';
import * as enzyme from 'enzyme';
import { StackPanel, StackPanelDirection } from './';
import { StackItem } from '../StackItem';

describe('<StackPanel />', () => {
  it('should render the default StackPanel', () => {
    const wrapper = enzyme.mount(<StackPanel />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the StackPanel with three items', () => {
    const wrapper = enzyme.mount(
      <StackPanel>
        <StackItem>First</StackItem>
        <StackItem>Second</StackItem>
        <StackItem>Third</StackItem>
      </StackPanel>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the StackPanel with explicit widths and wrapping', () => {
    const wrapper = enzyme.mount(
      <StackPanel wrap>
        <StackItem width="440px">First</StackItem>
        <StackItem width="300px">Second</StackItem>
        <StackItem width="40%">Third</StackItem>
      </StackPanel>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the StackPanel with explicit withs and no wrapping', () => {
    const wrapper = enzyme.mount(
      <StackPanel>
        <StackItem width="100px">First</StackItem>
        <StackItem width="100px">Second</StackItem>
      </StackPanel>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the StackPanel bottom to top', () => {
    const wrapper = enzyme.mount(
      <StackPanel direction={StackPanelDirection.bottomToTop}>
        <StackItem>First</StackItem>
        <StackItem>Second</StackItem>
      </StackPanel>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the StackPanel right to left', () => {
    const wrapper = enzyme.mount(
      <StackPanel direction={StackPanelDirection.rightToLeft}>
        <StackItem>First</StackItem>
        <StackItem>Second</StackItem>
      </StackPanel>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the StackPanel top to bottom with explicit heights', () => {
    const wrapper = enzyme.mount(
      <StackPanel direction={StackPanelDirection.topToBottom} style={{ height: '400px' }}>
        <StackItem height="20%">First</StackItem>
        <StackItem height="60%">Second</StackItem>
        <StackItem height="20%">Third</StackItem>
      </StackPanel>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
