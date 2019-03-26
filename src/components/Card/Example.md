**Elementary**

Basic usage of the Card defaults the layout property to `[0, ..., 0]`, meaning that the child elements want be resized, and the card orientation is set to be vertical.

```jsx
const { Card, CardBody, Image, Button } = require('precise-ui');

<Card>
  <Image src="/pexels-photo-248797.jpeg" alt="image" />
  <CardBody>
    <p>Consectetur veniam quis dolor ea nostrud irure amet. Dolor enim commodo aliquip eu. Ullamco sit ut magna velit eiusmod enim qui dolor labore reprehenderit. Et officia et adipisicing aliquip anim nostrud nisi ipsum proident esse irure aute Lorem voluptate. Nostrud ex enim cupidatat sit sint sint qui pariatur sint occaecat est.
    </p>
  </CardBody>
  <CardBody>
    <Button>Click me</Button>
  </CardBody>
</Card>
```

**Layout**

Cards could be layed-out vertically by setting the `orientation="vertical"`, which is default behaviour, and horizontally  `orientation="horizontal"`.

```jsx
const { Card, CardBody, Image, Headline} = require('precise-ui');

<Card orientation="horizontal" style={{ maxHeight: '250px' }} layout={[2, 1, 2]}>
  <Image src="/pexels-photo-248797.jpeg" alt="image" />
  <CardBody>
    <Headline>Nostrud commodo in labore ipsum.</Headline>
    <p>Cillum veniam sit proident ut velit. Cillum aliqua laboris culpa aute commodo ut. Reprehenderit duis occaecat id anim officia in consectetur consequat id cillum dolor laborum sit ipsum. Fugiat consectetur incididunt non cupidatat elit irure quis culpa eiusmod qui minim Lorem non. Ullamco officia aliqua culpa nulla commodo enim ea laborum deserunt cillum mollit magna est. Nisi sit qui consequat dolore sint duis proident in ex.</p>
  </CardBody>
</Card>
```

When using `Sticky` component inside the `Card`, the layout property for that component will not want be taken into calculation, since it's absolutely positioned.

```jsx
const { Card, CardBody, Sticky, Image, Headline, Button} = require('precise-ui');

<Card orientation="horizontal" style={{ maxHeight: '250px' }} layout={[2, 1, 2]}>
  <Image src="/pexels-photo-248797.jpeg" alt="image" />
  <CardBody>
    <Headline>Nostrud commodo in labore ipsum.</Headline>
    <p>Cillum veniam sit proident ut velit. Cillum aliqua laboris culpa aute commodo ut. Reprehenderit duis occaecat id anim officia in consectetur consequat id cillum dolor laborum sit ipsum. Fugiat consectetur incididunt non cupidatat elit irure quis culpa eiusmod qui minim Lorem non. Ullamco officia aliqua culpa nulla commodo enim ea laborum deserunt cillum mollit magna est. Nisi sit qui consequat dolore sint duis proident in ex.</p>
  </CardBody>
  <Sticky><Button>Stick button</Button></Sticky>
</Card>
```
