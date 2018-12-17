import * as React from 'react';
import * as enzyme from 'enzyme';
import { AccordionTab } from './';

describe('<AccordionTab />', () => {
  it('should render an empty <AccordionTab> component', () => {
    const wrapper = enzyme.shallow(<AccordionTab header="Header" />);
    expect(wrapper.text()).toBe('');
  });

  it('should render a text as a content', () => {
    const wrapper = enzyme.shallow(<AccordionTab header="Header">Content</AccordionTab>);
    expect(wrapper.text()).toBe('Content');
  });

  it('should render a component as a content', () => {
    const wrapper = enzyme.shallow(
      <AccordionTab header="Header">
        <div>Content</div>
      </AccordionTab>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a header as a component', () => {
    const wrapper = enzyme.mount(<AccordionTab header={<div>Header</div>}>Content of the tab</AccordionTab>);
    expect(wrapper).toMatchSnapshot();
  });
});
