import * as React from 'react';
import * as enzyme from 'enzyme';
import { InfiniteScroll } from './';

const getData = length =>
  Array.apply(undefined, { length }).map((item, index) => {
    const x = `X${index}`;
    return (
      <div key={x}>
        X:
        {x}
      </div>
    );
  });

describe('<InfiniteScroll />', () => {
  const mockCallback = jest.fn();
  it('should render an empty <InfiniteScroll>', () => {
    const wrapper = enzyme.shallow(<InfiniteScroll loadItems={mockCallback} data={[]} containerHeight={500} hasMore />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <InfiniteScroll> with "Show More" button and data elements', () => {
    const wrapper = enzyme
      .shallow(<InfiniteScroll loadItems={mockCallback} data={getData(10)} containerHeight={500} hasMore button />)
      .setState({
        isLoading: false,
      });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <InfiniteScroll> with custom button', () => {
    const wrapper = enzyme
      .shallow(
        <InfiniteScroll
          loadItems={mockCallback}
          containerHeight={500}
          data={getData(10)}
          hasMore
          button={({ onClick }) => (
            <button onClick={onClick} type="button">
              more
            </button>
          )}
        />,
      )
      .setState({
        isLoading: false,
      });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <InfiniteScroll> without fixed height container', () => {
    const wrapper = enzyme
      .shallow(<InfiniteScroll loadItems={mockCallback} data={getData(10)} hasMore useWindow />)
      .setState({
        isLoading: false,
      });
    expect(wrapper).toMatchSnapshot();
  });
});
