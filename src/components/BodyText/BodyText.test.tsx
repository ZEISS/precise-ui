import * as React from 'react';
import { mount } from 'enzyme';
import { BodyText } from './';
import 'jest-styled-components';

describe('<BodyText />', () => {
  it('should render default <BodyText> component', () => {
    const wrapper = mount(
      <BodyText>
        Dolore id excepteur id aute amet enim aute esse eu quis anim aliquip officia. Do Lorem sit quis anim velit
        cillum magna aliquip aliquip officia cupidatat ex. Cupidatat esse labore cupidatat est non adipisicing
        reprehenderit non veniam duis mollit.
      </BodyText>,
    );
    expect(wrapper).toHaveStyleRule('text-align', 'left');
  });

  it('text should have right alignment', () => {
    const wrapper = mount(
      <BodyText align="right">
        Dolore id excepteur id aute amet enim aute esse eu quis anim aliquip officia. Do Lorem sit quis anim velit
        cillum magna aliquip aliquip officia cupidatat ex. Cupidatat esse labore cupidatat est non adipisicing
        reprehenderit non veniam duis mollit.
      </BodyText>,
    );
    expect(wrapper).toHaveStyleRule('text-align', 'right');
  });
});
