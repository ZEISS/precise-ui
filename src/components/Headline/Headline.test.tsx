import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Headline } from './';
import { light } from '../../themes';
import 'jest-styled-components';

describe('<Headline />', () => {
  it('should render default <Headline> component', () => {
    const wrapper = shallow(<Headline>h3 Headline</Headline>);
    expect(wrapper).toHaveStyleRule('font-size', '3rem');
    expect(wrapper).toHaveStyleRule('color', 'inherit');
  });

  it('should have font-size: 1.5rem when size is small', () => {
    const wrapper = shallow(<Headline size="small">h1 Headline</Headline>);
    expect(wrapper).toHaveStyleRule('font-size', '1.375rem');
  });

  it('should render h2 headline', () => {
    const wrapper = mount(<Headline level={2}>h2 Headline</Headline>);
    expect(wrapper).toMatchSnapshot();
  });

  it('with subheader should have light theme sub header dark gray color', () => {
    const wrapper = mount(<Headline subheader>h1 Headline</Headline>);
    expect(wrapper).toHaveStyleRule('color', light.text5.replace(/\s/g, ''));
  });
});
