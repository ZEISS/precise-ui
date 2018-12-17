import * as React from 'react';
import * as enzyme from 'enzyme';
import { Button } from './';
import { Anchor } from '../Anchor';

describe('<Button />', () => {
  it('should render an empty <Button> component', () => {
    const wrapper = enzyme.mount(<Button />);
    expect(wrapper.find(Anchor).length).toEqual(1);
  });

  it('should render a <Button> component with some content', () => {
    const wrapper = enzyme.mount(<Button>Content</Button>).mount();
    expect(wrapper.text()).toBe('Content');
  });

  it('should render an active <Button> with some content', () => {
    const wrapper = enzyme.shallow(<Button active>Content</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an active disabled <Button> with some content', () => {
    const wrapper = enzyme.shallow(
      <Button disabled active>
        Content
      </Button>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Button> with some content component', () => {
    const wrapper = enzyme.shallow(
      <Button href="foo">
        <div>Content</div>
      </Button>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should execute the click handler if enabled', () => {
    let clicked = false;
    const clickHandler = () => {
      clicked = true;
    };
    const wrapper = enzyme.mount(<Button onClick={clickHandler}>Content</Button>);
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
      <Button onClick={clickHandler} disabled>
        Content
      </Button>,
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
      <Button to="/foo" onClick={clickHandler}>
        Content
      </Button>,
    );
    wrapper.simulate('click', {
      preventDefault() {},
    });
    expect(clicked).toBe(true);
  });
});
