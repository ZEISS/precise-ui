import * as React from 'react';
import * as enzyme from 'enzyme';
import { Dropzone } from './';

describe('<Dropzone />', () => {
  it('should render <Dropzone> that is implicitly not controlled', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Dropzone />).get(0));
    expect(wrapper.state('controlled')).toBe(false);
  });

  it('should render <Dropzone> that is explicitly not controlled', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Dropzone defaultValue={[]} />).get(0));
    expect(wrapper.state('controlled')).toBe(false);
  });

  it('should render a <Dropzone> that is controlled', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Dropzone value={[]} />).get(0));
    expect(wrapper.state('controlled')).toBe(true);
  });

  it('should render a <Dropzone> with an error', () => {
    const wrapper = enzyme.shallow(<Dropzone error="You need to select a file" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a disabled <Dropzone>', () => {
    const wrapper = enzyme.shallow(<Dropzone disabled />);
    expect(wrapper).toMatchSnapshot();
  });
});
