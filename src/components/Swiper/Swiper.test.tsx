import * as React from 'react';
import * as enzyme from 'enzyme';
import { Swiper } from './';

describe('<Swiper />', () => {
  it('should render an empty <Swiper> component', () => {
    const wrapper = enzyme.shallow(<Swiper />);
    const nodes = wrapper.filter((node: any) => node.text() !== '');
    expect(nodes.exists()).toBeFalsy();
  });

  it('should not be controlled without props', () => {
    const wrapper = enzyme.shallow(
      <Swiper>
        <div>Content</div>
      </Swiper>,
    );
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should be controlled with selectedIndex', () => {
    const wrapper = enzyme.shallow(
      <Swiper selectedIndex={0}>
        <div>Content</div>
      </Swiper>,
    );
    expect(wrapper.state('controlled')).toBeTruthy();
  });

  it('should not be controlled with onPageChage', () => {
    const wrapper = enzyme.shallow(
      <Swiper onPageChange={() => {}}>
        <div>Content</div>
      </Swiper>,
    );
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should render a <Swiper> component with several pages', () => {
    const wrapper = enzyme.mount(
      <Swiper>
        <div>First page.</div>
        <div>Second page.</div>
        <div>Third page.</div>
        <div>Final page.</div>
      </Swiper>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Swiper> component with several pages in and selectedIndex', () => {
    const wrapper = enzyme.mount(
      <Swiper selectedIndex={1}>
        <div>First page.</div>
        <div>Second page.</div>
        <div>Final page.</div>
      </Swiper>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
