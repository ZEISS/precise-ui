import * as React from 'react';
import * as enzyme from 'enzyme';
import { InteractiveSurface, InteractiveSurfaceChangeEvent } from './';

describe('<InteractiveSurface />', () => {
  it('should render an <InteractiveSurface>', () => {
    const wrapper = enzyme.shallow(<InteractiveSurface />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <InteractiveSurface> with a callback', () => {
    const callback = (e: InteractiveSurfaceChangeEvent) => {};
    const wrapper = enzyme.shallow(<InteractiveSurface onChange={callback} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <InteractiveSurface> with some content', () => {
    const wrapper = enzyme.shallow(
      <InteractiveSurface>
        <div>Foo</div>
      </InteractiveSurface>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should react properly to an update value call', () => {
    const wrapper = enzyme.shallow(
      <InteractiveSurface>
        <div>Foo</div>
      </InteractiveSurface>,
    );
    wrapper.instance().updateValue(5, 4, true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the notify callback on update value', () => {
    let result = {
      active: false,
      x: 0,
      y: 0,
    };
    const cb = (e: InteractiveSurfaceChangeEvent) => {
      result = {
        active: e.active,
        x: e.x,
        y: e.y,
      };
    };
    const wrapper = enzyme.shallow(
      <InteractiveSurface onChange={cb}>
        <div>Foo</div>
      </InteractiveSurface>,
    );
    wrapper.instance().updateValue(5, 4, true);
    expect(result).toEqual({
      x: 5,
      y: 4,
      active: true,
    });
  });

  it('should not call anything once unmounted', () => {
    let result = false;
    const cb = (e: InteractiveSurfaceChangeEvent) => {
      result = true;
    };
    const wrapper = enzyme.shallow(
      <InteractiveSurface onChange={cb}>
        <div>Foo</div>
      </InteractiveSurface>,
    );
    const instance = wrapper.instance();
    wrapper.unmount();
    instance.updateValue(5, 4, true);
    expect(result).toEqual(false);
  });
});
