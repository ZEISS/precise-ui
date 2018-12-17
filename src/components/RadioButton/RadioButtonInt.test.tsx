import * as React from 'react';
import * as enzyme from 'enzyme';
import { RadioButtonInt, RadioButtonChangeEvent } from './';

describe('<RadioButtonInt />', () => {
  it('should render <RadioButtonInt> that is not controlled', () => {
    const wrapper = enzyme.shallow(<RadioButtonInt />);
    expect(wrapper.state('controlled')).toBe(false);
  });

  it('should render a <RadioButtonInt> that is controlled', () => {
    const wrapper = enzyme.shallow(<RadioButtonInt value={false} />);
    expect(wrapper.state('controlled')).toBe(true);
  });

  it('should not have <label> if no children', () => {
    const wrapper = enzyme.mount(<RadioButtonInt />);
    expect(wrapper.find('label').length).toBe(0);
  });

  it('should have label', () => {
    const wrapper = enzyme.mount(<RadioButtonInt>Label text</RadioButtonInt>);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.text()).toEqual('Label text');
  });

  it('should render the disabled, uncontrolled RadioButtonInt', () => {
    const wrapper = enzyme.shallow(<RadioButtonInt disabled defaultValue />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the controlled RadioButtonInt with a label', () => {
    const wrapper = enzyme.shallow(<RadioButtonInt value>Value</RadioButtonInt>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should perform the toggle on click and not switch to a new state in managed mode', () => {
    let clicked = false;
    let selected = false;
    const clickHandler = (e: RadioButtonChangeEvent) => {
      clicked = true;
      selected = e.value;
    };
    const wrapper = enzyme.shallow(<RadioButtonInt defaultValue={selected} onChange={clickHandler} />);
    wrapper.simulate('click', {
      preventDefault() {},
    });

    expect(clicked).toBe(true);
    expect(selected).toBe(true);
    expect(wrapper.state('controlled')).toBe(false);
    expect(wrapper.state('value')).toBe(true);
  });

  it('should not perform the callback on click while is already selected, keep selected state and switch to a new state in controlled mode', () => {
    let clicked = false;
    let selected = true;
    const clickHandler = (e: RadioButtonChangeEvent) => {
      clicked = true;
      selected = e.value;
    };
    const wrapper = enzyme.shallow(<RadioButtonInt value={selected} onChange={clickHandler} />);
    wrapper.simulate('click', {
      preventDefault() {},
    });

    expect(clicked).toBe(false);
    expect(selected).toBe(true);
    expect(wrapper.state('controlled')).toBe(true);
    expect(wrapper.state('value')).toBe(true);
  });
});
