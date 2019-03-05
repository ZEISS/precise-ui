import * as React from 'react';
import * as enzyme from 'enzyme';
import { Breadcrumb } from './';

describe('<Breadcrumb />', () => {
  it('should render a basic <Breadcrumb>', () => {
    const wrapper = enzyme.shallow(<Breadcrumb title="Title" to="/test" />);
    expect(wrapper.text()).toBe('Title');
  });

  it('should render a <Breadcrumb> with external reference', () => {
    const wrapper = enzyme.shallow(<Breadcrumb title="Title" href="foo" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Breadcrumb> with internal reference', () => {
    const wrapper = enzyme.shallow(<Breadcrumb title="Title" to="foo" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should execute the click handler', () => {
    let clicked = false;
    const clickHandler = () => {
      clicked = true;
    };
    const wrapper = enzyme.shallow(<Breadcrumb title="Title" onClick={clickHandler} />);
    wrapper.simulate('click', {
      preventDefault() {},
    });
    expect(clicked).toBe(true);
  });

  it('should not fail if no history given', () => {
    let clicked = false;
    const clickHandler = () => {
      clicked = true;
    };
    const wrapper = enzyme.shallow(<Breadcrumb title="Title" to="/foo" onClick={clickHandler} />);
    wrapper.simulate('click', {
      preventDefault() {},
    });
    expect(clicked).toBe(true);
  });
});
