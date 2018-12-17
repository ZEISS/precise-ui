import * as React from 'react';
import * as enzyme from 'enzyme';
import { GradientContainer } from './';
import 'jest-styled-components';

describe('<GradientContainer />', () => {
  it('should render an empty <GradientContainer> component', () => {
    const wrapper = enzyme.shallow(<GradientContainer>Child</GradientContainer>);
    expect(wrapper.text()).toBe('<styled.div />');
  });
});
