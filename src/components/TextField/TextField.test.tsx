import * as React from 'react';
import * as enzyme from 'enzyme';
import { TextField, TextFieldChangeEvent } from './';

describe('<TextField />', () => {
  it('should render a multiline textfield', () => {
    const wrapper = enzyme.shallow(<TextField multiline />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a placeholder', () => {
    const wrapper = enzyme.shallow(<TextField placeholder="foo" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be disabled with a (default) value', () => {
    const wrapper = enzyme.shallow(<TextField disabled defaultValue="Some value" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be a disabled multiline area with 3 rows', () => {
    const wrapper = enzyme.shallow(<TextField multiline={3} disabled value="Some value" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be a resizable multiline area', () => {
    const wrapper = enzyme.shallow(<TextField multiline resizable defaultValue="Hello" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be a auto height multiline area', () => {
    const wrapper = enzyme.shallow(<TextField multiline resizable="auto" value="Hello" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should perform the change and switch to a new state in managed mode', () => {
    let seen = false;
    let status = '';
    const changeHandler = (e: TextFieldChangeEvent) => {
      seen = true;
      status = e.value;
    };
    const wrapper = enzyme.mount(enzyme.shallow(<TextField defaultValue={status} onChange={changeHandler} />).get(0));
    wrapper.find('input').simulate('change', {
      target: {
        value: 'abc',
      },
      preventDefault() {},
    });
    expect(seen).toBe(true);
    expect(status).toBe('abc');
    expect(wrapper.state('controlled')).toBe(false);
    expect(wrapper.state('value')).toBe('abc');
  });

  it('should perform the change and not switch to a new state in controlled mode', () => {
    let seen = false;
    let status = '';
    const changeHandler = (e: TextFieldChangeEvent) => {
      seen = true;
      status = e.value;
    };
    const wrapper = enzyme.mount(enzyme.shallow(<TextField value={status} onChange={changeHandler} />).get(0));
    wrapper.find('input').simulate('change', {
      target: {
        value: 'abc',
      },
      preventDefault() {},
    });
    expect(seen).toBe(true);
    expect(status).toBe('abc');
    expect(wrapper.state('controlled')).toBe(true);
    expect(wrapper.state('value')).toBe('');
  });
});
