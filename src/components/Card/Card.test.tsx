import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from '../Button';
import { Image } from '../Image';
import { Sticky } from '../Sticky';
import { CardBody } from '../CardBody';
import { Card } from '../Card';

const image =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

describe('<Card />', () => {
  it('child elements should have grow property set to 0 by default', () => {
    const wrapper = shallow(
      <Card>
        <Image src={image} alt="" />
        <CardBody>
          Labore mollit proident culpa aliqua. Fugiat excepteur occaecat eu ex est nulla est sit dolore magna. Velit ut
          sunt deserunt occaecat proident adipisicing commodo. Officia adipisicing quis nisi irure pariatur ut velit ut
          aliqua ea do minim enim deserunt.
        </CardBody>
      </Card>,
    );
    React.Children.map(wrapper.children(), (child: React.ComponentElement<any, any>, index) => {
      expect(child.props.grow).toEqual(0);
    });
  });

  it('child elements should have grow property set correctly', () => {
    const wrapper = shallow(
      <Card layout={[2, 1]}>
        <Image src={image} alt="" />
        <CardBody>
          Labore mollit proident culpa aliqua. Fugiat excepteur occaecat eu ex est nulla est sit dolore magna. Velit ut
          sunt deserunt occaecat proident adipisicing commodo. Officia adipisicing quis nisi irure pariatur ut velit ut
          aliqua ea do minim enim deserunt.
        </CardBody>
      </Card>,
    );
    expect(wrapper.childAt(0).props().grow).toEqual(2);
    expect(wrapper.childAt(1).props().grow).toEqual(1);
  });

  it('sticky component inside card component should not have grow property', () => {
    const wrapper = shallow(
      <Card layout={[2, 1, 3]}>
        <Image src={image} alt="" />
        <CardBody>
          Labore mollit proident culpa aliqua. Fugiat excepteur occaecat eu ex est nulla est sit dolore magna. Velit ut
          sunt deserunt occaecat proident adipisicing commodo. Officia adipisicing quis nisi irure pariatur ut velit ut
          aliqua ea do minim enim deserunt.
        </CardBody>
        <Sticky>
          <Button>Click me</Button>
        </Sticky>
      </Card>,
    );
    expect(wrapper.childAt(0).props().grow).toEqual(2);
    expect(wrapper.childAt(1).props().grow).toEqual(1);
    expect(wrapper.childAt(2).props().grow).toBeUndefined();
  });

  it('sticky component inside card should not have wrapper div', () => {
    const wrapper = shallow(
      <Card layout={[3]}>
        <Sticky>
          <Button>Click me</Button>
        </Sticky>
      </Card>,
    );
    expect(wrapper.childAt(0).props().grow).toEqual(undefined);
  });
});
