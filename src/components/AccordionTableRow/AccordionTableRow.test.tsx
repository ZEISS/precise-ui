import * as React from 'react';
import * as enzyme from 'enzyme';
import { AccordionTableRow } from './';

describe('<AccordionTableRow />', () => {
  it('should render an empty <AccordionTableRow> component', () => {
    const wrapper = enzyme.shallow(<AccordionTableRow />);
    expect(wrapper.text()).toBe('<styled.tr />');
  });
});
