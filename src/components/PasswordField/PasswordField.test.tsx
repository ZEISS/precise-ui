import * as React from 'react';
import * as enzyme from 'enzyme';
import { PasswordField } from './';
import { TextFieldChangeEvent } from '../TextField';

describe('<PasswordField />', () => {
  it('should render a standard textfield', () => {
    const wrapper = enzyme.shallow(<PasswordField />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a borderless password field', () => {
    const wrapper = enzyme.shallow(<PasswordField borderless />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be disabled with a value', () => {
    const wrapper = enzyme.shallow(<PasswordField disabled error="Password empty" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be the controlled value', () => {
    const wrapper = enzyme.shallow(<PasswordField value="Some value" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a custom prefix', () => {
    const wrapper = enzyme.shallow(<PasswordField prefix="Secret?" defaultValue="Hello" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a custom suffix', () => {
    const wrapper = enzyme.shallow(<PasswordField suffix="Reveal!" defaultValue="Hello" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should perform the change from the underlying text field', () => {
    let seen = false;
    let status = '';
    const changeHandler = (e: TextFieldChangeEvent) => {
      seen = true;
      status = e.value;
    };
    const wrapper = enzyme.mount(<PasswordField defaultValue={status} onChange={changeHandler} />);
    wrapper.find('input').simulate('change', {
      target: {
        value: 'abc',
      },
      preventDefault() {},
    });
    expect(seen).toBe(true);
    expect(status).toBe('abc');
  });

  it('should reveal the password if clicked on the suffix', () => {
    const wrapper = enzyme.mount(<PasswordField defaultValue="abc" />);
    expect(wrapper.state('reveal')).toBe(false);
    wrapper.find('a').simulate('click', {
      preventDefault() {},
    });
    expect(wrapper.state('reveal')).toBe(true);
  });

  it('should hide the password if clicked twice on the suffix', () => {
    const wrapper = enzyme.mount(<PasswordField defaultValue="abc" />);
    expect(wrapper.state('reveal')).toBe(false);
    wrapper.find('a').simulate('click', {
      preventDefault() {},
    });
    wrapper.find('a').simulate('click', {
      preventDefault() {},
    });
    expect(wrapper.state('reveal')).toBe(false);
  });
});
