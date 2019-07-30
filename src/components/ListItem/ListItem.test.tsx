import * as React from 'react';
import * as enzyme from 'enzyme';
import { ListItem } from './';

describe('<ListItem />', () => {
  it('should render styled.li as default', () => {
    const wrapper = enzyme.shallow(<ListItem />);
    expect(wrapper.name()).toBe('styled.li');
  });

  it('should be render with padding, by default', () => {
    const wrapper = enzyme.mount(<ListItem />);
    expect(wrapper).toHaveStyleRule('padding', '0.75rem 1.25rem');
  });

  it('should render component without padding', () => {
    const wrapper = enzyme.mount(<ListItem disablePadding />);
    expect(wrapper).toHaveStyleRule('padding', '0');
  });

  it('should not present a border', () => {
    const wrapper = enzyme.mount(<ListItem border={false} />);
    expect(wrapper).toMatchSnapshot();
  });
});
