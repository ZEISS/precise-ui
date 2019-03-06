import * as React from 'react';
import * as enzyme from 'enzyme';
import { Badge } from './';
import 'jest-styled-components';

describe('<Badge />', () => {
  it('should render an empty <Badge> component', () => {
    const wrapper = enzyme.mount(<Badge />);
    expect(wrapper.find('div').length > 0).toBeTruthy();
  });

  it('should render a <Badge> with text', () => {
    const wrapper = enzyme.shallow(<Badge>0</Badge>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Badge> in full mode', () => {
    const wrapper = enzyme.shallow(<Badge fill>12</Badge>);
    expect(wrapper).toMatchSnapshot();
  });
});
