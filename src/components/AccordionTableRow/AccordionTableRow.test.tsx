import * as React from 'react';
import * as enzyme from 'enzyme';
import { AccordionTableRow } from './';

describe('<AccordionTableRow />', () => {
  it('should render an empty <AccordionTableRow> component', () => {
    const wrapper = enzyme.mount(
      <table>
        <tbody>
          <AccordionTableRow />
        </tbody>
      </table>,
    );
    expect(wrapper.find('tr').length > 0).toBeTruthy();
  });
});
