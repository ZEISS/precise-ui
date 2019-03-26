import * as React from 'react';
import * as enzyme from 'enzyme';
import { AccordionCard } from './';
import { StyledActionContainer } from './AccordionCardInt.part';

describe('<AccordionCard />', () => {
  it('should render <AccordionCard> component', () => {
    const wrapper = enzyme.mount(<AccordionCard header="Header">Content</AccordionCard>);
    expect(wrapper.text()).toMatch('Header');
    expect(wrapper.text()).toMatch('Content');
  });

  it('should behave correctly in non controlled mode', () => {
    const onActionClick = jest.fn();
    const wrapper = enzyme.mount(
      <AccordionCard header="Header" onActionClick={onActionClick}>
        Content
      </AccordionCard>,
    );
    expect(wrapper.state().opened).toEqual(false);
    wrapper.find(StyledActionContainer).simulate('click');
    expect(wrapper.state().opened).toEqual(true);
    expect(onActionClick).lastCalledWith({ opened: true });
  });

  it('should behave correctly in controlled mode', () => {
    const onActionClick = jest.fn();
    const wrapper = enzyme.mount(
      <AccordionCard header="Header" onActionClick={onActionClick} opened>
        Content
      </AccordionCard>,
    );
    expect(wrapper.state().opened).toEqual(true);
    wrapper.find(StyledActionContainer).simulate('click');
    expect(wrapper.state().opened).toEqual(true);
    expect(onActionClick).lastCalledWith({ opened: true });
  });

  it('should render custom action block', () => {
    const wrapper = enzyme.mount(
      <AccordionCard header="Header" renderAction={() => 'Test'}>
        Content
      </AccordionCard>,
    );
    expect(wrapper.text()).toMatch('Test');
  });
});
