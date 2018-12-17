import * as React from 'react';
import * as enzyme from 'enzyme';
import { AccordionTableCard } from './AccordionTableCard.part';

describe('<AccordionTableCard />', () => {
  it('should render an empty <AccordionTableCard> component', () => {
    const wrapper = enzyme.shallow(<AccordionTableCard data={[]} detailsRenderer={() => undefined} />);
    const nodes = wrapper.filter((node: any) => node.text() !== '');
    expect(nodes.exists()).toBeFalsy();
  });

  it('should not be controlled without props', () => {
    const wrapper = enzyme.shallow(<AccordionTableCard data={[]} detailsRenderer={() => <div />} />);
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should be controlled with selectedIndex', () => {
    const wrapper = enzyme.shallow(<AccordionTableCard selectedIndex={0} data={[]} detailsRenderer={() => <div />} />);
    expect(wrapper.state('controlled')).toBeTruthy();
  });

  it('should not be controlled with onChange', () => {
    const wrapper = enzyme.shallow(
      <AccordionTableCard onChange={() => {}} data={[]} detailsRenderer={() => <div />} />,
    );
    expect(wrapper.state('controlled')).toBeFalsy();
  });

  it('should render a <AccordionTableCard> component with right columns', () => {
    const wrapper = enzyme.shallow(
      <AccordionTableCard data={[{ c: 5 }, { c: 10 }]} columns={{ c: 'C' }} detailsRenderer={() => <div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTableCard> component with wrong columns', () => {
    const wrapper = enzyme.shallow(
      <AccordionTableCard data={[{ c: 5 }, { c: 10 }]} columns={{ a: 'A', b: 'B' }} detailsRenderer={() => <div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTableCard> component with sorted data', () => {
    const wrapper = enzyme.shallow(
      <AccordionTableCard data={[{ c: 15 }, { c: 10 }]} sortBy="c" detailsRenderer={() => <div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTableCard> component without data and custom placeholder', () => {
    const wrapper = enzyme.shallow(
      <AccordionTableCard data={[]} placeholder="No data" detailsRenderer={() => <div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTableCard> component with data set', () => {
    const data = [
      { tag: 'C', value: 'Charlie', team: 'Charlie team' },
      { tag: 'D', value: 'Delta', team: 'Delta team' },
      { tag: 'E', value: 'Echo', team: 'Echo team' },
    ];

    const detailsRenderer = () => <div>Test details renderer</div>;

    const wrapper = enzyme.shallow(<AccordionTableCard data={data} detailsRenderer={detailsRenderer} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTableCard> component with data and selectedIndex set', () => {
    const data = [
      { tag: 'A', value: 'Alpha', team: 'Alpha team' },
      { tag: 'B', value: 'Bravo', team: 'Bravo team' },
      { tag: 'C', value: 'Charlie', team: 'Charlie team' },
      { tag: 'D', value: 'Delta', team: 'Delta team' },
    ];

    const detailsRenderer = () => <div>Test details renderer</div>;

    const wrapper = enzyme.shallow(
      <AccordionTableCard selectedIndex={1} data={data} detailsRenderer={detailsRenderer} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTable> component with no data and placeholder set', () => {
    const detailsRenderer = () => <div>Test details renderer</div>;

    const wrapper = enzyme.shallow(
      <AccordionTableCard placeholder="No data" data={[]} detailsRenderer={detailsRenderer} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
