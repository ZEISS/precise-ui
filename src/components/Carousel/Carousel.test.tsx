import * as React from 'react';
import * as enzyme from 'enzyme';
import { Carousel } from '.';

describe('<Carousel />', () => {
  it('should render an empty <Carousel> component', () => {
    const wrapper = enzyme.shallow(<Carousel />);
    const nodes = wrapper.filter((node: any) => node.text() !== '');
    expect(nodes.exists()).toBeFalsy();
  });

  it('should not be controlled without props', () => {
    const wrapper = enzyme.shallow(
      <Carousel>
        <div>Content</div>
      </Carousel>,
    );
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should be controlled with selectedIndex', () => {
    const wrapper = enzyme.shallow(
      <Carousel selectedIndex={0}>
        <div>Content</div>
      </Carousel>,
    );
    expect(wrapper.state('controlled')).toBeTruthy();
  });

  it('should not be controlled with onPageChage', () => {
    const wrapper = enzyme.shallow(
      <Carousel onPageChange={() => {}}>
        <div>Content</div>
      </Carousel>,
    );
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should render a <Carousel> component with several pages', () => {
    const wrapper = enzyme.mount(
      <Carousel>
        <div>First page.</div>
        <div>Second page.</div>
        <div>Third page.</div>
        <div>Final page.</div>
      </Carousel>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Carousel> component with several pages in and selectedIndex', () => {
    const wrapper = enzyme.mount(
      <Carousel selectedIndex={1}>
        <div>First page.</div>
        <div>Second page.</div>
        <div>Final page.</div>
      </Carousel>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
