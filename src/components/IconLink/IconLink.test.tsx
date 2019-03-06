import * as React from 'react';
import * as enzyme from 'enzyme';
import { IconLink } from './';
import { Anchor } from '../Anchor';

const defaultIconName = 'Favorite';

describe('<IconLink />', () => {
  it('should render an empty <IconLink> component', () => {
    const wrapper = enzyme.mount(<IconLink icon={defaultIconName} />);
    expect(wrapper.find(Anchor).length).toBe(1);
  });

  it('should render a <IconLink> component with some content', () => {
    const wrapper = enzyme.mount(<IconLink icon={defaultIconName}>Content</IconLink>).mount();
    expect(wrapper.text()).toBe('Content');
  });

  it('should render a disabled <IconLink> with some content', () => {
    const wrapper = enzyme.shallow(
      <IconLink icon={defaultIconName} disabled>
        Content
      </IconLink>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <IconLink> with some content component', () => {
    const wrapper = enzyme.shallow(
      <IconLink icon={defaultIconName} href="foo">
        <div>Content</div>
      </IconLink>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should execute the click handler if enabled', () => {
    let clicked = false;
    const clickHandler = () => {
      clicked = true;
    };
    const wrapper = enzyme.mount(
      <IconLink icon={defaultIconName} onClick={clickHandler}>
        Content
      </IconLink>,
    );
    wrapper.find('a').simulate('click', {
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
      <IconLink icon={defaultIconName} onClick={clickHandler} disabled>
        Content
      </IconLink>,
    );
    wrapper.find('a').simulate('click', {
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
      <IconLink icon={defaultIconName} to="/foo" onClick={clickHandler}>
        Content
      </IconLink>,
    );
    wrapper.find('a').simulate('click', {
      preventDefault() {},
    });
    expect(clicked).toBe(true);
  });
});
