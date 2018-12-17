import * as React from 'react';
import * as enzyme from 'enzyme';
import { Toggle, ToggleChangeEvent } from './';

describe('<Toggle />', () => {
  it('should render <Toggle>', () => {
    const wrapper = enzyme.shallow(<Toggle />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Toggle> that is active', () => {
    const wrapper = enzyme.shallow(<Toggle defaultValue={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Toggle> that is not active in controlled mode', () => {
    const wrapper = enzyme.shallow(<Toggle value={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a disabled <Toggle>', () => {
    const wrapper = enzyme.shallow(<Toggle disabled />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Toggle> with content', () => {
    const wrapper = enzyme.shallow(<Toggle>Foo</Toggle>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Toggle> with an onChange handler', () => {
    const callback = (e: ToggleChangeEvent) => {};
    const wrapper = enzyme.shallow(<Toggle onChange={callback} defaultValue={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should perform the toggle on click and switch to a new state in managed mode', () => {
    let clicked = false;
    let status = true;
    const clickHandler = (e: ToggleChangeEvent) => {
      clicked = true;
      status = e.value;
    };
    const wrapper = enzyme.mount(
      enzyme
        .shallow(
          <Toggle defaultValue={status} onChange={clickHandler}>
            Content
          </Toggle>,
        )
        .get(0),
    );
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
    const clickHandler = (e: ToggleChangeEvent) => {
      clicked = true;
      status = e.value;
    };
    const wrapper = enzyme.mount(
      enzyme
        .shallow(
          <Toggle value={status} onChange={clickHandler}>
            Content
          </Toggle>,
        )
        .get(0),
    );
    wrapper.simulate('click', {
      preventDefault() {},
    });
    expect(clicked).toBe(true);
    expect(status).toBe(false);
    expect(wrapper.state('controlled')).toBe(true);
    expect(wrapper.state('value')).toBe(true);
  });
});
