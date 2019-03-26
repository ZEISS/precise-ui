import * as React from 'react';
import * as enzyme from 'enzyme';
import { Anchor } from './';

describe('<Anchor />', () => {
  it('should render an empty <Anchor> component', () => {
    const wrapper = enzyme.shallow(<Anchor />);
    expect(wrapper.text()).toBe('');
  });

  it('should render an <Anchor> component with href', () => {
    const wrapper = enzyme.shallow(<Anchor href="foo">Text</Anchor>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an <Anchor> component with to', () => {
    const wrapper = enzyme.shallow(<Anchor to="foo">Text</Anchor>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an <Anchor> component with to and href', () => {
    const wrapper = enzyme.shallow(
      <Anchor to="foo" href="bar">
        Text
      </Anchor>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an <Anchor> component with onClick', () => {
    const wrapper = enzyme.shallow(<Anchor onClick={() => console.log()}>Text</Anchor>);
    expect(wrapper).toMatchSnapshot();
  });
});
