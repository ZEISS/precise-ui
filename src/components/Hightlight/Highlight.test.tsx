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
});
