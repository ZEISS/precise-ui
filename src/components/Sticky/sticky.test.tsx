import * as React from 'react';
import * as enzyme from 'enzyme';
import { Sticky } from './';

describe('<Sticky />', () => {
  it('should render sticky sticked to the bottom by default', () => {
    const wrapper = enzyme.mount(<Sticky>Child</Sticky>);
    expect(wrapper).toHaveStyleRule('bottom', '0');
  });
  it('should render sticky sticked to the left', () => {
    const wrapper = enzyme.mount(<Sticky position="left">Child</Sticky>);
    expect(wrapper).toHaveStyleRule('left', '0');
  });
});
