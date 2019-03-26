import * as React from 'react';
import * as enzyme from 'enzyme';
import { IndicatorKnob } from './';

describe('<IndicatorKnob />', () => {
  it('should render an empty <IndicatorKnob>', () => {
    const wrapper = enzyme.shallow(<IndicatorKnob />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an active <IndicatorKnob>', () => {
    const wrapper = enzyme.shallow(<IndicatorKnob active />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <IndicatorKnob> in red', () => {
    const wrapper = enzyme.shallow(<IndicatorKnob color="red" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a disabled <IndicatorKnob>', () => {
    const wrapper = enzyme.shallow(<IndicatorKnob disabled />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an active disabled <IndicatorKnob>', () => {
    const wrapper = enzyme.shallow(<IndicatorKnob active disabled />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <IndicatorKnob> with explicit x and y coordinates', () => {
    const wrapper = enzyme.shallow(<IndicatorKnob x={1} y={1} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <IndicatorKnob> at the top', () => {
    const wrapper = enzyme.shallow(<IndicatorKnob y={0} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <IndicatorKnob> on the left', () => {
    const wrapper = enzyme.shallow(<IndicatorKnob x={0} />);
    expect(wrapper).toMatchSnapshot();
  });
});
