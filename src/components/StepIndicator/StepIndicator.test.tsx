import * as React from 'react';
import * as enzyme from 'enzyme';
import { StepIndicator } from './';

describe('<StepIndicator />', () => {
  it('should render an empty step indicator', () => {
    const wrapper = enzyme.shallow(<StepIndicator steps={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an empty horizontal step indicator component', () => {
    const wrapper = enzyme.shallow(<StepIndicator mode="horizontal" steps={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an empty vertical step indicator component', () => {
    const wrapper = enzyme.shallow(<StepIndicator mode="vertical" steps={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a step indicator with two elements', () => {
    const wrapper = enzyme.shallow(<StepIndicator steps={['One', 'Two']} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a step indicator with three elements currently at the second', () => {
    const wrapper = enzyme.shallow(<StepIndicator steps={['One', 'Two', 'Three']} current={1} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a step indicator with two elements currently at the first', () => {
    const wrapper = enzyme.shallow(<StepIndicator steps={['One', 'Twee']} current={0} />);
    expect(wrapper).toMatchSnapshot();
  });
});
