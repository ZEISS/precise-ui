import * as React from 'react';
import * as enzyme from 'enzyme';
import { GradientContainer } from './';

describe('<GradientContainer />', () => {
  it('should render an empty <GradientContainer> component', () => {
    const wrapper = enzyme.mount(<GradientContainer>Child</GradientContainer>);
    expect(wrapper.find('div').length > 0).toBeTruthy();
  });
});
