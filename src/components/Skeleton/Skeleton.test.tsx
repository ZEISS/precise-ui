import * as React from 'react';
import * as enzyme from 'enzyme';
import { Skeleton } from './';

describe('<Skeleton />', () => {
  it('should render a simple <Skeleton> component', () => {
    const wrapper = enzyme.shallow(<Skeleton />);
    const nodes = wrapper.filter((node: any) => node.text() !== '');
    expect(nodes.exists()).toBeFalsy();
  });

  it('should render a <Skeleton> with a width in pixels if no unit was given', () => {
    const wrapper = enzyme.mount(<Skeleton width={100} />);
    expect(wrapper).toHaveStyleRule('width', '100px');
  });
});
