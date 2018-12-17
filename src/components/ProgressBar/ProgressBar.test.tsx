import * as React from 'react';
import * as enzyme from 'enzyme';
import { ProgressBar } from './';

describe('<ProgressBar />', () => {
  it('should render empty default <ProgressBar /> element', () => {
    const wrapper = enzyme.shallow(<ProgressBar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <ProgressBar /> with 50%', () => {
    const wrapper = enzyme.shallow(<ProgressBar value={50} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <ProgressBar /> with 50% with custom boundaries', () => {
    const wrapper = enzyme.shallow(<ProgressBar value={15} maximum={20} minimum={10} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <ProgressBar /> with 0% with custom boundaries', () => {
    const wrapper = enzyme.shallow(<ProgressBar value={15} maximum={20} minimum={15} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <ProgressBar /> with 100% with custom boundaries', () => {
    const wrapper = enzyme.shallow(<ProgressBar value={20} maximum={20} minimum={15} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <ProgressBar /> with a title', () => {
    const wrapper = enzyme.shallow(<ProgressBar title="My Progress" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <ProgressBar /> with a description', () => {
    const wrapper = enzyme.shallow(<ProgressBar description="Please wait until we finish the work" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <ProgressBar /> with a title, description, at 75%', () => {
    const wrapper = enzyme.shallow(<ProgressBar value={75} title="My Progress" description="My Description" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <ProgressBar /> animated at 75%', () => {
    const wrapper = enzyme.shallow(<ProgressBar value={75} animate />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <ProgressBar /> with maximum and minimum', () => {
    const wrapper = enzyme.shallow(<ProgressBar maximum={75} minimum={25} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should cut the maximum at 100 percent', () => {
    const wrapper = enzyme.shallow(<ProgressBar maximum={10} value={25} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <ProgressBar /> with maximum and minimum and some stops', () => {
    const wrapper = enzyme.shallow(<ProgressBar maximum={75} minimum={25} stops={[30, 50, 70]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <ProgressBar /> with cut stops', () => {
    const wrapper = enzyme.shallow(<ProgressBar stops={[-10, 0, 50, 100, 110]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the <ProgressBar /> with a single stop', () => {
    const wrapper = enzyme.shallow(<ProgressBar stops={[0.5]} maximum={1} />);
    expect(wrapper).toMatchSnapshot();
  });
});
