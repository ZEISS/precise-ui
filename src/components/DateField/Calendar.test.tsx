import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { DateFieldInt as DateField, CalendarTable, Row } from './DateFieldInt';

function getCalendarTable(root: ReactWrapper): ReactWrapper {
  return root
    .childAt(0)
    .childAt(0)
    .childAt(1) // CalendarView
    .childAt(0)
    .childAt(2)
    .childAt(0); // CalendarTable
}

describe('<DateField />', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = mount(<DateField />);
    instance = wrapper.instance();
  });

  describe('date shifting', () => {
    it('should have todays date as default', () => {
      expect(wrapper.state().date.setHours(0, 0, 0, 0)).toEqual(new Date().setHours(0, 0, 0, 0));
    });

    it('should increase month by 1', () => {
      const currentMonth = wrapper.state().date.getMonth();
      expect(instance.shiftDate(1).getMonth()).toEqual((currentMonth + 1) % 12);
    });

    it('should increase year by 1 when shifting 12 months', () => {
      const currentYear = wrapper.state().date.getFullYear();
      expect(instance.shiftDate(12).getFullYear()).toEqual(currentYear + 1);
    });

    it('should decrease year by 1 in `month` view', () => {
      wrapper.setState({ view: 'months' });
      const currentYear = wrapper.state().date.getFullYear();
      expect(instance.shiftDate(-1).getFullYear()).toEqual(currentYear - 1);
    });

    it('should decrease decade by 10 in `years` view', () => {
      wrapper.setState({ view: 'years' });
      const currentYear = wrapper.state().date.getFullYear();
      expect(instance.shiftDate(-1).getFullYear()).toEqual(currentYear - 10);
    });
  });

  describe('change view', () => {
    it('should change the view to `months` if current is `days`', () => {
      instance.changeView();
      expect(wrapper.state().view).toEqual('months');
    });

    it('should change the view to `years` if current is `months`', () => {
      wrapper.setState({ view: 'months' });
      instance.changeView();
      expect(wrapper.state().view).toEqual('years');
    });

    it('should not change if view is already `years`', () => {
      wrapper.setState({ view: 'years' });
      instance.changeView();
      expect(wrapper.state().view).toEqual('years');
    });
  });

  describe('days render', () => {
    it('should render correctly disabled cells (May, 2018)', () => {
      /**
       * [ - 0 0 0 0 0 0 ]
       * [ 0 0 0 0 0 0 0 ]
       * [ 0 0 0 0 0 0 0 ]
       * [ 0 0 0 0 0 0 0 ]
       * [ 0 0 0 0 - - - ]
       */
      wrapper.setState({ open: true, date: new Date(2018, 4) });
      const firstRowButtons = wrapper
        .find(CalendarTable)
        .find(Row)
        .at(0)
        .find('button');
      expect(firstRowButtons.at(0).props().disabled).toBeTruthy();

      const lastRowButtons = wrapper
        .find(CalendarTable)
        .find(Row)
        .at(4)
        .find('button');
      expect(lastRowButtons.at(5).props().disabled).toBeTruthy();
      expect(lastRowButtons.at(6).props().disabled).toBeTruthy();
    });

    it('should render correctly disabled cells (July, 2018)', () => {
      /**
       * [ - - - - - - 0 ]
       * [ - 0 0 0 0 0 0 ]
       * [ 0 0 0 0 0 0 0 ]
       * [ 0 0 0 0 0 0 0 ]
       * [ 0 0 0 0 0 0 0 ]
       * [ 0 0 - - - - - ]
       */
      wrapper.setState({ open: true, date: new Date(2018, 6) });
      const firstRowButtons = wrapper
        .find(CalendarTable)
        .find(Row)
        .at(0)
        .find('button');
      expect(firstRowButtons.at(0).props().disabled).toBeTruthy();

      const lastRowButtons = wrapper
        .find(CalendarTable)
        .find(Row)
        .at(5)
        .find('button');
      expect(lastRowButtons.at(2).props().disabled).toBeTruthy();
      expect(lastRowButtons.at(3).props().disabled).toBeTruthy();
      expect(lastRowButtons.at(4).props().disabled).toBeTruthy();
      expect(lastRowButtons.at(5).props().disabled).toBeTruthy();
      expect(lastRowButtons.at(6).props().disabled).toBeTruthy();
    });
  });
});
