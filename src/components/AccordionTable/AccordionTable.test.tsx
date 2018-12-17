import * as React from 'react';
import * as enzyme from 'enzyme';
import { AccordionTable } from './';
import { AccordionTableBasic } from './AccordionTableBasic.part';
import { AccordionTableCard } from './AccordionTableCard.part';

describe('<AccordionTable />', () => {
  it('should render an empty <AccordionTable> component', () => {
    const wrapper = enzyme.shallow(<AccordionTable data={[]} detailsRenderer={() => undefined} mode="card" />);
    const nodes = wrapper.filter((node: any) => node.text() !== '');
    expect(nodes.exists()).toBeFalsy();
  });

  it('should render <AccordionTableBasic> with table mode', () => {
    const wrapper = enzyme.mount(<AccordionTable mode="table" data={[]} detailsRenderer={() => undefined} />);
    expect(wrapper.find(AccordionTableBasic).length > 0).toBeTruthy();
  });

  it('should render <AccordionTableCard> with card mode', () => {
    const wrapper = enzyme.mount(<AccordionTable mode="card" data={[]} detailsRenderer={() => undefined} />);
    expect(wrapper.find(AccordionTableCard).length > 0).toBeTruthy();
  });

  it('should render a <AccordionTable> component with right columns', () => {
    const wrapper = enzyme.shallow(
      <AccordionTable mode="table" data={[{ c: 5 }, { c: 10 }]} columns={{ c: 'C' }} detailsRenderer={() => <div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTable> component with wrong columns', () => {
    const wrapper = enzyme.shallow(
      <AccordionTable
        mode="table"
        data={[{ c: 5 }, { c: 10 }]}
        columns={{ a: 'A', b: 'B' }}
        detailsRenderer={() => <div />}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTable> component with sorted data', () => {
    const wrapper = enzyme.shallow(
      <AccordionTable mode="table" data={[{ c: 15 }, { c: 10 }]} sortBy="c" detailsRenderer={() => <div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTable> component without headers', () => {
    const wrapper = enzyme.shallow(
      <AccordionTable mode="table" data={[{ c: 15 }, { c: 10 }]} noHeader detailsRenderer={() => <div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTable> component without data and custom placeholder', () => {
    const wrapper = enzyme.shallow(
      <AccordionTable mode="table" data={[]} placeholder="No data" detailsRenderer={() => <div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTable> component with data set', () => {
    const data = [
      { tag: 'C', value: 'Charlie', team: 'Charlie team' },
      { tag: 'D', value: 'Delta', team: 'Delta team' },
      { tag: 'E', value: 'Echo', team: 'Echo team' },
    ];

    const detailsRenderer = () => <div>Test details renderer</div>;

    const wrapper = enzyme.shallow(<AccordionTable mode="table" data={data} detailsRenderer={detailsRenderer} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTable> component with data and selectedIndex set', () => {
    const data = [
      { tag: 'A', value: 'Alpha', team: 'Alpha team' },
      { tag: 'B', value: 'Bravo', team: 'Bravo team' },
      { tag: 'C', value: 'Charlie', team: 'Charlie team' },
      { tag: 'D', value: 'Delta', team: 'Delta team' },
    ];

    const detailsRenderer = () => <div>Test details renderer</div>;

    const wrapper = enzyme.shallow(
      <AccordionTable mode="table" selectedIndex={1} data={data} detailsRenderer={detailsRenderer} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTable> component with no data and placeholder set', () => {
    const detailsRenderer = () => <div>Test details renderer</div>;

    const wrapper = enzyme.shallow(
      <AccordionTable placeholder="No data" mode="table" data={[]} detailsRenderer={detailsRenderer} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccordionTable> component with mode set', () => {
    const detailsRenderer = () => <div>Test details renderer</div>;

    const wrapper = enzyme.shallow(<AccordionTable data={[]} mode="table" detailsRenderer={detailsRenderer} />);
    expect(wrapper).toMatchSnapshot();
  });
});
