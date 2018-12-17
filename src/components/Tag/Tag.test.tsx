import * as React from 'react';
import * as enzyme from 'enzyme';
import { Tag } from './';

describe('<Tag />', () => {
  it('should render an empty <Tag> component', () => {
    const wrapper = enzyme.shallow(<Tag />);
    const nodes = wrapper.filter((node: any) => node.text() !== '');
    expect(nodes.exists()).toBeFalsy();
  });

  it('should render a <Tag> with a primary type if nothing given', () => {
    const wrapper = enzyme.mount(<Tag>my-nice-tag</Tag>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Tag> with a primary type if something wrong given', () => {
    // @ts-ignore: test case
    const wrapper = enzyme.mount(<Tag type="bar">foo</Tag>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Tag> with a info type if explicitly given', () => {
    const wrapper = enzyme.mount(<Tag type="info">foo</Tag>);
    expect(wrapper).toMatchSnapshot();
  });
});
