import * as React from 'react';
import * as enzyme from 'enzyme';
import { DropdownField, DropdownFieldItem, DropdownFieldToggleEvent, DropdownFieldChangeEvent } from './';

describe('<DropdownField />', () => {
  it('should render <DropdownField> that is implicitly not controlled', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<DropdownField data={[]} />).get(0));
    expect(wrapper.state('controlled')).toBe(false);
  });

  it('should render <DropdownField> that is explicitly not controlled', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<DropdownField data={['1', '2']} defaultValue="1" />).get(0));
    expect(wrapper.state('controlled')).toBe(false);
  });

  it('should render a <DropdownField> that is controlled', () => {
    const wrapper = enzyme.mount(enzyme.shallow(<DropdownField data={['1', '2']} value="1" />).get(0));
    expect(wrapper.state('controlled')).toBe(true);
  });

  it('should render a <DropdownField> with an error', () => {
    const wrapper = enzyme.shallow(<DropdownField data={['1', '2']} error="You need to select a field" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <DropdownField> with an error', () => {
    const wrapper = enzyme.shallow(<DropdownField data={['1', '2']} error="You need to select a field" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <DropdownField> that renders a placeholder', () => {
    const wrapper = enzyme.shallow(<DropdownField data={['1', '2']} multiple placeholder="No value selected" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <DropdownField> that does not render a placeholder', () => {
    const wrapper = enzyme.shallow(
      <DropdownField data={['1', '2']} value={['1', '2']} multiple placeholder="No value selected" />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a disabled <DropdownField>', () => {
    const wrapper = enzyme.shallow(<DropdownField data={['1', '2']} defaultValue="1" disabled />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a borderless <DropdownField>', () => {
    const wrapper = enzyme.shallow(<DropdownField data={['1', '2']} defaultValue="1" borderless />);
    expect(wrapper).toMatchSnapshot();
  });

  it('clicking the div toggles the dropdown', () => {
    let clicked = false;
    let status = 'close';
    const clickHandler = (e: DropdownFieldToggleEvent) => {
      clicked = true;
      status = e.state;
    };
    const wrapper = enzyme.shallow(
      enzyme.shallow(<DropdownField data={['1', '2']} defaultValue="1" onToggle={clickHandler} />).get(0),
    );
    wrapper.childAt(0).simulate('mousedown', {
      preventDefault() {},
    });
    expect(clicked).toBe(true);
    expect(status).toBe('open');
    expect(wrapper.state('open')).toBe(true);
  });
});
