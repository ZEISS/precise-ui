import * as React from 'react';
import * as enzyme from 'enzyme';
import { Accordion } from './';
import { AccordionBasic } from './AccordionBasic.part';
import { AccordionCard } from './AccordionCard.part';
import { AccordionTab } from '../AccordionTab';

describe('<Accordion />', () => {
  it('should render an empty <Accordion> component', () => {
    const wrapper = enzyme.shallow(<Accordion />);
    const nodes = wrapper.filter((node: any) => node.text() !== '');
    expect(nodes.exists()).toBeFalsy();
  });

  it('should render <AccordionBasic> with accordion mode', () => {
    const wrapper = enzyme.mount(
      <Accordion mode="accordion">
        <AccordionTab header="Header">Content</AccordionTab>
      </Accordion>,
    );
    expect(wrapper.find(AccordionBasic).length > 0).toBeTruthy();
  });

  it('should render <AccordionCard> with card mode', () => {
    const wrapper = enzyme.mount(
      <Accordion mode="card">
        <AccordionTab header="Header">Content</AccordionTab>
      </Accordion>,
    );
    expect(wrapper.find(AccordionCard).length > 0).toBeTruthy();
  });

  it('should render a <Accordion> component with several tabs', () => {
    const wrapper = enzyme.mount(
      <Accordion>
        <AccordionTab header="First">First content.</AccordionTab>
        <AccordionTab header="Second">Second content.</AccordionTab>
        <AccordionTab header="Third">Third content.</AccordionTab>
        <AccordionTab header="Last">Final content.</AccordionTab>
      </Accordion>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Accordion> component with several tabs in and selectedIndex', () => {
    const wrapper = enzyme.mount(
      <Accordion selectedIndex={1}>
        <AccordionTab header="First">First content.</AccordionTab>
        <AccordionTab header="Second">Second content.</AccordionTab>
        <AccordionTab header="Last">Final content.</AccordionTab>
      </Accordion>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
