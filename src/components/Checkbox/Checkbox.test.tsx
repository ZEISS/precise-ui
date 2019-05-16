import * as React from 'react';
import * as enzyme from 'enzyme';
import { Checkbox, CheckboxChangeEvent, CheckboxInt } from './';

describe('<CheckboxInt />', () => {
  it('should render <CheckboxInt> that is not controlled', () => {
    const wrapper = enzyme.shallow(<CheckboxInt />);
    expect(wrapper.state('controlled')).toBe(false);
  });

  it('should render a <CheckboxInt> that is controlled', () => {
    const wrapper = enzyme.shallow(<CheckboxInt value={false} />);
    expect(wrapper.state('controlled')).toBe(true);
  });

  it('should not have <label> if no children', () => {
    const wrapper = enzyme.mount(<CheckboxInt />);
    expect(wrapper.find('label').length).toBe(0);
  });

  it('should have label', () => {
    const wrapper = enzyme.mount(<Checkbox>Label text</Checkbox>);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.text()).toEqual('Label text');
  });

  it('should render the disabled, uncontrolled checkbox', () => {
    const wrapper = enzyme.shallow(<Checkbox disabled defaultValue />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the controlled checkbox with a label', () => {
    const wrapper = enzyme.shallow(<Checkbox value>Value</Checkbox>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should perform the toggle on click and switch to a new state in managed mode', () => {
    let clicked = false;
    let status = true;
    const clickHandler = (e: CheckboxChangeEvent) => {
      clicked = true;
      status = e.value;
    };
    const wrapper = enzyme.mount(<CheckboxInt defaultValue={status} onChange={clickHandler} />);
    wrapper.simulate('click', {
      preventDefault() {},
    });
    expect(clicked).toBe(true);
    expect(status).toBe(false);
    expect(wrapper.state('controlled')).toBe(false);
    expect(wrapper.state('value')).toBe(false);
  });

  it('should perform the callback on click and not switch to a new state in controlled mode', () => {
    let clicked = false;
    let status = true;
    const clickHandler = (e: CheckboxChangeEvent) => {
      clicked = true;
      status = e.value;
    };
    const wrapper = enzyme.shallow(<CheckboxInt value={status} onChange={clickHandler} />);
    wrapper.simulate('click', {
      preventDefault() {},
    });
    expect(clicked).toBe(true);
    expect(status).toBe(false);
    expect(wrapper.state('controlled')).toBe(true);
    expect(wrapper.state('value')).toBe(true);
  });
});
