import * as React from 'react';
import * as enzyme from 'enzyme';
import { PaddedContainer } from '.';
import { distance } from '../../distance';

describe('<PaddedContainer />', () => {
  it('Should render PaddedContainer', () => {
    const wrapper = enzyme.mount(<PaddedContainer>Content</PaddedContainer>);
    expect(wrapper.contains('Content')).toBeTruthy();
  });

  it('Should have respective styles', () => {
    const wrapper = enzyme.mount(
      <PaddedContainer top="large" bottom="small" left="large" right="xxlarge" gutter="medium">
        Content
      </PaddedContainer>,
    );
    const container = wrapper.find('div').first();

    expect(container).toHaveStyleRule('padding-top', distance.large);
    expect(container).toHaveStyleRule('padding-bottom', distance.small);
    expect(container).toHaveStyleRule('padding-left', distance.large);
    expect(container).toHaveStyleRule('padding-right', distance.xxlarge);
    expect(container).toHaveStyleRule('padding', distance.medium);
  });
});
