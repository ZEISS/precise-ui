import * as React from 'react';
import { shallow } from 'enzyme';
import { Image } from './';

const image =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

describe('<Image />', () => {
  it('should render <Image> without wrapper', () => {
    const wrapper = shallow(<Image src={image} alt="" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Image> within wrapper component when preloaded', () => {
    const wrapper = shallow(<Image preload src={image} alt="some image" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render default error component when image fails onload', () => {
    const wrapper = shallow(<Image preload src="http://broken-link" alt="some image" />);
    wrapper.setState({ status: 'error' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should use alternative preloader when one provided', () => {
    const preloader = <div>Loading...</div>;
    const wrapper = shallow(<Image preload preloader={preloader} src={image} alt="some image" />);
    wrapper.setState({ status: 'loading' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should use alternative error component when one provided', () => {
    const errorComponent = <div>Ooops something went wrong...</div>;
    const wrapper = shallow(<Image preload error={errorComponent} src={image} alt="some image" />);
    wrapper.setState({ status: 'error' });
    expect(wrapper).toMatchSnapshot();
  });
});
