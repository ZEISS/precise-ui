import * as React from 'react';
import * as enzyme from 'enzyme';
import { Container } from './';
import 'jest-styled-components';

describe('<Container />', () => {
  it('should render an empty <Container> component', () => {
    const wrapper = enzyme.shallow(<Container>Child</Container>);
    expect(wrapper.text()).toBe('Child');
  });

  it('should render default fluid container with 100% width', () => {
    const wrapper = enzyme.mount(<Container>Child</Container>);
    expect(wrapper).toHaveStyleRule('width', '100%');
  });

  it('should not have 100% width when maxWidth specified', () => {
    const wrapper = enzyme.mount(<Container maxWidth={100}>Child</Container>);
    expect(wrapper).toHaveStyleRule('max-width', '100px');
  });

  it('should have margin-left: auto, when right aligned and maxWidth set', () => {
    const wrapper = enzyme.mount(
      <Container maxWidth={100} align="right">
        Child
      </Container>,
    );
    expect(wrapper).toHaveStyleRule('margin-left', 'auto');
  });

  it('should have margin-right: auto, when left aligned and maxWidth set', () => {
    const wrapper = enzyme.mount(
      <Container maxWidth={100} align="left">
        Child
      </Container>,
    );
    expect(wrapper).toHaveStyleRule('margin-right', 'auto');
  });
});
