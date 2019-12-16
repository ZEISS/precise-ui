import * as React from 'react';
import { shallow } from 'enzyme';
import { Highlight } from './';

describe('<Highlight />', () => {
  it('should render <Highlight> with background color on search term', () => {
    const wrapper = shallow(<Highlight text="Hello World!" highlight="World" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Highlight> with no matched search term', () => {
    const wrapper = shallow(<Highlight text="Hello World!" highlight="World2" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Highlight> with exact match on case', () => {
    const wrapper = shallow(<Highlight text="Hello World!" highlight="World" ignoreCase={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Highlight> with no exact match on case', () => {
    const wrapper = shallow(<Highlight text="Hello World!" highlight="world" ignoreCase={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Highlight> treating regex patterns as text', () => {
    const wrapper = shallow(<Highlight text="Hello (?)World!" highlight="(?)" ignoreCase={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Highlight> without trailing empty span', () => {
    const wrapper = shallow(<Highlight text="Hello World!" highlight="!" />);
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Highlight> without leading empty span', () => {
    const wrapper = shallow(<Highlight text="Hello World!" highlight="H" />);
    expect(wrapper.children()).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Highlight> a single span if no match', () => {
    const wrapper = shallow(<Highlight text="A" highlight="a" />);
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Highlight> should escape \\', () => {
    const wrapper = shallow(<Highlight text="Hello World!" highlight="\world" />);
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Highlight> matching the indices', () => {
    const wrapper = shallow(<Highlight text="Hello World! Searching for World!" matches={[[1, 3], [6, 12]]} />);
    expect(wrapper.children()).toHaveLength(5);
    expect(wrapper).toMatchSnapshot();
  });
});
