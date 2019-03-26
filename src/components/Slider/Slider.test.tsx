import * as React from 'react';
import * as enzyme from 'enzyme';
import { Slider, SliderChangeEvent } from './';

describe('<Slider />', () => {
  it('should render <Slider>', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider />).get(0));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Slider> using a custom indicator color', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider color="red" />).get(0));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Slider> with an initial value', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider defaultValue={0.76} />).get(0));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Slider> in controlled mode', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider value={0.5} />).get(0));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Slider> with an initial multiple values', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider defaultValue={[0, 5, 10]} minimum={0} maximum={10} />).get(0));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Slider> with multiple values and a fixed margin', () => {
    const wrapper = enzyme.mount(
      enzyme.shallow(<Slider defaultValue={[0, 5]} minimum={0} maximum={5} margin={1} />).get(0),
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Slider> in controlled mode with multiple values', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider value={[0.5, 0.75]} />).get(0));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Slider> with custom boundaries in controlled mode', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider minimum={1} maximum={10} value={6} />).get(0));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a disabled <Slider>', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider disabled />).get(0));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Slider> with a fixed stepping', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider step={0.1} value={0.5} />).get(0));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a multi-value <Slider> with a fixed stepping', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider step={10} value={[0, 50, 100]} maximum={1000} />).get(0));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a vertical <Slider>', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider orientation="vertical" />).get(0));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a horizontal <Slider>', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider orientation="horizontal" value={0.5} />).get(0));
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a horizontal <Slider> that is managed and responds to change events', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider defaultValue={0.5} />).get(0));
    expect(wrapper.state('value')).toEqual([0.5]);
    wrapper.instance().updateValue({
      x: 0.7,
      y: 0.1,
      active: true,
    });
    expect(wrapper.state('value')).toEqual([0.7]);
  });

  it('should render a horizontal <Slider> that is controlls and calls back to change events', () => {
    let found = 0;
    const cb = (e: SliderChangeEvent) => {
      found = e.value;
    };
    const wrapper = enzyme.shallow(enzyme.shallow(<Slider value={0.5} onChange={cb} />).get(0));
    expect(wrapper.state('value')).toEqual([0.5]);
    wrapper.instance().updateValue({
      x: 0.7,
      y: 0.1,
      active: true,
    });
    expect(wrapper.state('value')).toEqual([0.5]);
    expect(found).toEqual(0.7);
  });

  it('should render a vertical <Slider> that is managed and responds to change events', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider defaultValue={0.5} orientation="vertical" />).get(0));
    expect(wrapper.state('value')).toEqual([0.5]);
    wrapper.instance().updateValue({
      x: 0.7,
      y: 0.1,
      active: true,
    });
    expect(wrapper.state('value')).toEqual([0.9]);
  });

  it('should render a <Slider> that is disabled and does not respond to change events', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider defaultValue={0.5} disabled />).get(0));
    expect(wrapper.state('value')).toEqual([0.5]);
    wrapper.instance().updateValue({
      x: 0.7,
      y: 0.1,
      active: true,
    });
    expect(wrapper.state('value')).toEqual([0.5]);
  });

  it('should render a vertical <Slider> that is controlled and calls back to change events', () => {
    let found = 0;
    const cb = (e: SliderChangeEvent) => {
      found = e.value;
    };
    const wrapper = enzyme.shallow(enzyme.shallow(<Slider value={0.5} orientation="vertical" onChange={cb} />).get(0));
    expect(wrapper.state('value')).toEqual([0.5]);
    wrapper.instance().updateValue({
      x: 0.7,
      y: 0.2,
      active: true,
    });
    expect(wrapper.state('value')).toEqual([0.5]);
    expect(found).toEqual(0.8);
  });

  it('should render a multi-value <Slider> that does respond to change events with the closest knob', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider defaultValue={[0.3, 0.5]} />).get(0));
    expect(wrapper.state('value')).toEqual([0.3, 0.5]);
    wrapper.instance().updateValue({
      x: 0.7,
      y: 0.1,
      active: true,
    });
    expect(wrapper.state('value')).toEqual([0.3, 0.7]);
  });

  it('should render a multi-value <Slider> that does respond to change events with the active knob', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<Slider defaultValue={[0.3, 0.5]} />).get(0));
    wrapper.setState({
      active: 1,
    });
    expect(wrapper.state('value')).toEqual([0.3, 0.5]);
    wrapper.instance().updateValue({
      x: 0.45,
      y: 0.1,
      active: true,
    });
    expect(wrapper.state('value')).toEqual([0.45, 0.5]);
  });
});
