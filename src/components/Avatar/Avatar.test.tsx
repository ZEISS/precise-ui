import * as React from 'react';
import * as enzyme from 'enzyme';
import { Avatar } from './';

describe('<Avatar />', () => {
  it('should render an empty <Avatar> component', () => {
    const wrapper = enzyme.mount(<Avatar />);
    expect(wrapper.find('div').length > 0).toBeTruthy();
  });

  it('should render an <Avatar> with an image', () => {
    const wrapper = enzyme.shallow(
      <Avatar image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an <Avatar> with initials', () => {
    const wrapper = enzyme.shallow(<Avatar initials="FR" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an <Avatar> with initials overriding the color', () => {
    const wrapper = enzyme.mount(<Avatar initials="FR" color="red" />);
    const layers = wrapper.find('div');
    expect(layers.length).toBe(3);
    expect(layers.at(2)).toHaveStyleRule('background-color', 'red');
    expect(wrapper).toMatchSnapshot();
  });

  it('should render have a proper title in form of the description', () => {
    const wrapper = enzyme.shallow(<Avatar initials="FR" description="Sample" />);
    expect(wrapper).toMatchSnapshot();
  });
});
