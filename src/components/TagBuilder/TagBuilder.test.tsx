import * as React from 'react';
import * as enzyme from 'enzyme';
import { TagBuilderInt } from './TagBuilderInt.part';

const tags = ['tags', 'list', 'goes', 'here'];

describe('<TagBuilderInt />', () => {
  it('should render the component', () => {
    const wrapper = enzyme.shallow(<TagBuilderInt />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not be in controlled mode by default', () => {
    const wrapper = enzyme.shallow(<TagBuilderInt />);
    expect(wrapper.state('controlled')).toBe(false);
  });

  it('should not be controlled with defaultValue set', () => {
    const wrapper = enzyme.shallow(<TagBuilderInt defaultValue={tags} />);
    expect(wrapper.state('controlled')).toBe(false);
  });

  it('should be in controlled mode when value prop set', () => {
    const wrapper = enzyme.shallow(<TagBuilderInt value={tags} />);
    expect(wrapper.state('controlled')).toBe(true);
  });

  it('should render component with empty value', () => {
    const wrapper = enzyme.shallow(<TagBuilderInt info="info block" value={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with info block and value', () => {
    const wrapper = enzyme.shallow(<TagBuilderInt info="info block" value={tags} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with error block and default value', () => {
    const wrapper = enzyme.shallow(<TagBuilderInt error="error block" defaultValue={tags} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('default input position should be undefined if just value set', () => {
    const wrapper = enzyme.mount(<TagBuilderInt value={tags} />);
    expect(wrapper.state('inputPosition')).toBe(undefined);
  });

  it('default input position should be undefined if just defaultValue string', () => {
    const wrapper = enzyme.mount(<TagBuilderInt defaultValue={tags} />);
    expect(wrapper.state('inputPosition')).toBe(undefined);
  });

  it('default input position should be undefined when no data is set', () => {
    const wrapper = enzyme.mount(<TagBuilderInt />);
    expect(wrapper.state('inputPosition')).toBe(undefined);
  });
});
