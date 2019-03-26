import * as React from 'react';
import * as enzyme from 'enzyme';
import { ColorPicker } from './';

describe('<ColorPicker />', () => {
  it('should render the color picker with a default color', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<ColorPicker />).get(0));
    expect(wrapper.state('value')).toEqual({
      r: 0,
      g: 0,
      b: 0,
      a: undefined,
      h: 0,
      s: 0,
      v: 0,
    });
  });

  it('should render the color picker with the initial color given as an object', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<ColorPicker defaultValue={{ r: 255, g: 180, b: 90 }} />).get(0));
    expect(wrapper.state('value')).toEqual({
      r: 255,
      g: 180,
      b: 90,
      a: undefined,
      h: 0.09090909090909091,
      s: 0.6470588235294118,
      v: 1,
    });
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should render the color picker with the initial color given as a hex string', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<ColorPicker defaultValue="#FF00CC" />).get(0));
    expect(wrapper.state('value')).toEqual({
      r: 255,
      g: 0,
      b: 204,
      a: 1,
      h: 0.8666666666666667,
      s: 1,
      v: 1,
    });
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should render the color picker with the initial color given as a rgb string', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<ColorPicker defaultValue="rgb(100, 50, 90)" />).get(0));
    expect(wrapper.state('value')).toEqual({
      r: 100,
      g: 50,
      b: 90,
      a: 1,
      h: 0.8666666666666667,
      s: 0.5,
      v: 0.39215686274509803,
    });
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should render the color picker with the initial color given as a rgba string', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<ColorPicker defaultValue="rgba(1, 50, 90, 0.2)" />).get(0));
    expect(wrapper.state('value')).toEqual({
      r: 1,
      g: 50,
      b: 90,
      a: 0.2,
      h: 0.5749063670411985,
      s: 0.9888888888888889,
      v: 0.35294117647058826,
    });
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should render the color picker with the controlled color', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<ColorPicker value={{ r: 255, g: 180, b: 90 }} />).get(0));
    expect(wrapper.state('value')).toEqual({
      r: 255,
      g: 180,
      b: 90,
      a: undefined,
      h: 0.09090909090909091,
      s: 0.6470588235294118,
      v: 1,
    });
    expect(wrapper.state('controlled')).toBeTruthy();
  });

  it('should render the default color picker with the controlled alpha color', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<ColorPicker value={{ r: 255, g: 180, b: 90, a: 0.5 }} />).get(0));
    expect(wrapper.state('value')).toEqual({
      r: 255,
      g: 180,
      b: 90,
      a: 0.5,
      h: 0.09090909090909091,
      s: 0.6470588235294118,
      v: 1,
    });
    expect(wrapper.state('controlled')).toBeTruthy();
  });
});
