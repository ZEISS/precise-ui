import * as React from 'react';
import * as enzyme from 'enzyme';
import { Dashboard } from './';

describe('<Dashboard />', () => {
  it('should render an empty <Dashboard>', () => {
    const wrapper = enzyme.shallow(<Dashboard defaultTiles={[]} />);
    expect(wrapper.state('tiles')).toEqual([]);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an empty <Dashboard> with 3x2 layout', () => {
    const wrapper = enzyme.shallow(<Dashboard defaultTiles={[]} columnCount={3} rowCount={2} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an empty <Dashboard> with 2x2 layout in (200px,200px)', () => {
    const wrapper = enzyme.shallow(
      <Dashboard defaultTiles={[]} columnCount={2} rowCount={2} columnWidth={200} rowHeight={200} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Dashboard> with three tiles', () => {
    const tiles = [{ id: '1' }, { id: '2' }, { id: '3' }];
    const wrapper = enzyme.shallow(
      <Dashboard defaultTiles={tiles}>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </Dashboard>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Dashboard> with one tile since only a single child is given', () => {
    const tiles = [{ id: '1' }, { id: '2' }];
    const wrapper = enzyme.shallow(
      <Dashboard defaultTiles={tiles}>
        <div>First</div>
      </Dashboard>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Dashboard> with one tile since only a single tile is defined', () => {
    const tiles = [{ id: '1' }];
    const wrapper = enzyme.shallow(
      <Dashboard defaultTiles={tiles}>
        <div>First</div>
        <div>Second</div>
      </Dashboard>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Dashboard> with spacing', () => {
    const tiles = [{ id: '1' }, { id: '2' }];
    const wrapper = enzyme.shallow(
      <Dashboard defaultTiles={tiles} spacing={15}>
        <div>First</div>
        <div>Second</div>
      </Dashboard>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Dashboard> with some fixed, some unfixed tiles', () => {
    const tiles = [
      { id: 'cct', column: 1, row: 1 },
      { id: 'sample', colSpan: 2, rowSpan: 1 },
      { id: 'ibase-tile', column: 2, row: 1 },
      { id: 'sdp-tile', column: 0, row: 0 },
      { id: 'sma' },
      { id: 'tssr', column: 1, row: 0 },
    ];
    const wrapper = enzyme.shallow(
      <Dashboard defaultTiles={tiles} spacing={10} rowCount={2} columnCount={3}>
        <div>CCT</div>
        <div>Sample</div>
        <div>iBase</div>
        <div>SDP</div>
        <div>SMA</div>
        <div>TSSR</div>
      </Dashboard>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Dashboard> with some fixed, some unfixed tiles coming from remote', () => {
    const remotePositions = {
      '@zeiss/zeisslet-imt-sri://imt-sri-tile': { colSpan: 4, rowSpan: 5, column: 4, row: 5 },
      '@zeiss/zeisslet-my-dashboard://toggle-button': { colSpan: 0, rowSpan: 0, column: 12, row: 4 },
      '@zeiss/zeisslet-imt-sdp://sdp-tile': { colSpan: 4, rowSpan: 5, column: 8, row: 5 },
    };
    const defaultPositions = [
      { id: '@zeiss/zeisslet-med-quick-search://imt-quick-search', initialColumns: 12, initialRows: 5 },
      { id: '@zeiss/zeisslet-imt-sdp://sdp-tile', initialColumns: 4, initialRows: 5 },
      { id: '@zeiss/zeisslet-imt-sma://sma-tile', initialColumns: 4, initialRows: 5 },
      { id: '@zeiss/zeisslet-imt-sri://imt-sri-tile', initialColumns: 4, initialRows: 5 },
      { id: '@zeiss/zeisslet-imt-ibase://mysystems-tile', initialColumns: 8, initialRows: 5 },
      { id: '@zeiss/zeisslet-imt-announcements://imt-announcements', initialColumns: 4, initialRows: 10 },
      { id: '@zeiss/zeisslet-cct://cct', initialColumns: 4, initialRows: 5 },
      { id: '@zeiss/zeisslet-imt-forum://forum', initialColumns: 4, initialRows: 5 },
      { id: '@zeiss/zeisslet-imt-tssr://tssr', initialColumns: 4, initialRows: 5 },
      { id: '@zeiss/zeisslet-med-software-releases://imt-quick-search', initialColumns: 4, initialRows: 5 },
      { id: '@zeiss/zeisslet-med-service-and-support://imt-quick-search', initialColumns: 4, initialRows: 5 },
      { id: '@zeiss/zeisslet-imt-ecademy://imt-ecademy-tile', initialColumns: 4, initialRows: 5 },
      { id: '@zeiss/zeisslet-imt-software-center://software-center-tile', initialColumns: 4, initialRows: 5 },
      { id: '@zeiss/zeisslet-imt-webshop://imt-webshop-tile', initialColumns: 4, initialRows: 5 },
      { id: '@zeiss/zeisslet-imt-zmc-finder://zmcfinder', initialColumns: 4, initialRows: 5 },
      { id: '@zeiss/zeisslet-my-dashboard://toggle-button', initialColumns: 0, initialRows: 0 },
      { id: '@zeiss/zeisslet-sip-fitness-challenge://fitchallenge', initialColumns: 4, initialRows: 5 },
      { id: '@zeiss/zeisslet-sip-photos://photo-show-tile', initialColumns: 12, initialRows: 7 },
      { id: '@zeiss/zeisslet-sip-twitter-feed://sip-twitter-feed', initialColumns: 3, initialRows: 8 },
      { id: '@zeiss/zeisslet-my-promotions://promotions-tile', initialColumns: 4, initialRows: 5 },
    ];
    const items: Array<any> = [];
    const children: Array<React.ReactChild> = [];

    for (const defaultPosition of defaultPositions) {
      const position = remotePositions[defaultPosition.id] || {};
      items.push({
        ...position,
        id: defaultPosition.id,
        colSpan: defaultPosition.initialColumns,
        rowSpan: defaultPosition.initialRows,
      });

      children.push(<div key={defaultPosition.id}>Hello</div>);
    }

    const wrapper = enzyme.mount<Dashboard>(
      <Dashboard defaultTiles={items} spacing={16} rowHeight={67} columnCount={12} disabled>
        {children}
      </Dashboard>,
    );

    const { layout } = wrapper.instance() as any;
    expect(layout.allocation).toEqual([
      { colSpan: 12, column: 0, row: 0, rowSpan: 5 },
      { colSpan: 4, column: 8, row: 5, rowSpan: 5 },
      { colSpan: 4, column: 0, row: 5, rowSpan: 5 },
      { colSpan: 4, column: 4, row: 5, rowSpan: 5 },
      { colSpan: 8, column: 0, row: 10, rowSpan: 5 },
      { colSpan: 4, column: 8, row: 10, rowSpan: 10 },
      { colSpan: 4, column: 0, row: 15, rowSpan: 5 },
      { colSpan: 4, column: 4, row: 15, rowSpan: 5 },
      { colSpan: 4, column: 0, row: 20, rowSpan: 5 },
      { colSpan: 4, column: 4, row: 20, rowSpan: 5 },
      { colSpan: 4, column: 8, row: 20, rowSpan: 5 },
      { colSpan: 4, column: 0, row: 25, rowSpan: 5 },
      { colSpan: 4, column: 4, row: 25, rowSpan: 5 },
      { colSpan: 4, column: 8, row: 25, rowSpan: 5 },
      { colSpan: 4, column: 0, row: 30, rowSpan: 5 },
      { colSpan: 0, column: 12, row: 4, rowSpan: 0 },
      { colSpan: 4, column: 4, row: 30, rowSpan: 5 },
      { colSpan: 12, column: 0, row: 35, rowSpan: 7 },
      { colSpan: 3, column: 0, row: 42, rowSpan: 8 },
      { colSpan: 4, column: 8, row: 30, rowSpan: 5 },
    ]);
  });
});
