import * as React from 'react';
import * as enzyme from 'enzyme';
import { ActionLink } from './';

describe('<ActionLink />', () => {
  it('should render an empty <ActionLink> component', () => {
    const wrapper = enzyme.mount(<ActionLink />);
    expect(wrapper.find('a').length > 0).toBeTruthy();
  });

  it('should render a <ActionLink> component with some content', () => {
    const wrapper = enzyme.mount(<ActionLink>Content</ActionLink>).mount();
    expect(wrapper.text()).toBe('Content');
  });

  it('should render an active <ActionLink> with some content', () => {
    const wrapper = enzyme.shallow(<ActionLink active>Content</ActionLink>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an active disabled <ActionLink> with some content', () => {
    const wrapper = enzyme.shallow(
      <ActionLink disabled active>
        Content
      </ActionLink>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <ActionLink> with some content component', () => {
    const wrapper = enzyme.shallow(
      <ActionLink href="foo">
        <div>Content</div>
      </ActionLink>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should execute the click handler if enabled', () => {
    let clicked = false;
    const clickHandler = () => {
      clicked = true;
    };
    const wrapper = enzyme.mount(<ActionLink onClick={clickHandler}>Content</ActionLink>);
    wrapper.simulate('click', {
      preventDefault() {},
    });
    expect(clicked).toBe(true);
  });

  it('should not execute the click handler if disabled', () => {
    let clicked = false;
    const clickHandler = () => {
      clicked = true;
    };
    const wrapper = enzyme.mount(
      <ActionLink onClick={clickHandler} disabled>
        Content
      </ActionLink>,
    );
    wrapper.simulate('click', {
      preventDefault() {},
    });
    expect(clicked).toBe(false);
  });

  it('should not fail if no history given', () => {
    let clicked = false;
    const clickHandler = () => {
      clicked = true;
    };
    const wrapper = enzyme.mount(
      <ActionLink to="/foo" onClick={clickHandler}>
        Content
      </ActionLink>,
    );
    wrapper.simulate('click', {
      preventDefault() {},
    });
    expect(clicked).toBe(true);
  });
});
