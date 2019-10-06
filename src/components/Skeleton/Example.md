**Elementary**

The `Skeleton` component is quite flexible. It is block that can be use to display a loading skeleton instead of actual content. It will automatically adapt to your component.

By default it has a pulsing animation running infinitely. You could also pause it and show only the `Sekeleton`.

```js { "props": { "data-skip": true } }
const { Skeleton } = require('precise-ui');

const exampleWrapper = {
  display: 'flex',
  justifyContent: 'space-between',
};

const skeletonWrapper = {
  flex: '1 1 100%',
  padding: '10px',
  overflow: 'hidden'
};

<div style={exampleWrapper}>
  <div style={skeletonWrapper}><Skeleton /></div>
  <div style={skeletonWrapper}><Skeleton isPulsing={false} /></div>
</div>
```

You can display many `Skeletons` to replicate rows or text.

```js { "props": { "data-skip": true } }
const { Skeleton } = require('precise-ui');

const exampleWrapper = {
  display: 'flex',
  justifyContent: 'space-between',
};

const skeletonWrapper = {
  flex: '1 1 100%',
  padding: '10px',
  alignSelf: 'flex-start',  
};

<div style={exampleWrapper}>
  <div style={skeletonWrapper}><Skeleton count={6} /></div>
  <div style={skeletonWrapper}><Skeleton count={6} isText /></div>
</div>
```

You can also adapt it for circle elements.

```js { "props": { "data-skip": true } }
const { Skeleton } = require('precise-ui');

<Skeleton width="100px" height="100px" isCircle />
```

**Card Loading**

If you are using the `Card` component you could easily display it like this while loading.

```js { "props": { "data-skip": true } }
const { CardBody, Skeleton } = require('precise-ui');

const exampleWrapper = {
  display: 'flex',
  justifyContent: 'space-between',
};

const cardWrapper = {
  flex: '1 1 100%',
  padding: '10px',
  overflow: 'hidden'
};

const imageWrapperStyle = {
  position: 'relative',
  height: '0',
  paddingBottom: '40%',
  overflow: 'hidden',
};

const imageStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
};

<div style={exampleWrapper}>
  <div style={cardWrapper}>
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
  </div>

  <div style={cardWrapper}>
    <Card>
      <div style={imageWrapperStyle}>
        <div style={imageStyle}>
          <Skeleton />
        </div>
      </div>
      <CardBody>
        <p><Skeleton count={7} /></p>
      </CardBody>
      <CardBody>
        <Skeleton height={'40px'} width={'100px'}/>
      </CardBody>
    </Card>
  </div>

  <div style={cardWrapper}>
    <Card>
      <div style={imageWrapperStyle}>
        <div style={imageStyle}>
          <Skeleton />
        </div>
      </div>
      <CardBody>
        <p><Skeleton count={7} isText /></p>
      </CardBody>
      <CardBody>
        <Skeleton height={'40px'} width={'100px'}/>
      </CardBody>
    </Card>
  </div>
</div>
```

**Custom Layouts**

For more complex layouts it is up to you how to position the `Skeleton` elements.

```js { "props": { "data-skip": true } }
const { Skeleton } = require('precise-ui');

const exampleWrapper = {
  display: 'flex',
  justifyContent: 'space-between',
};

const profileWrapper = {
  flex: '1 1 100%',
  maxWidth: '300px',
  padding: '10px',
  textAlign: 'center',
  overflow: 'hidden'
};

const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAACkVBMVEX+65b35ZKyqXCEgVlvb07XyYN6eFRoaEqDgFj+8bX+76/+7J/++N7////+/fj++uf+99b+9MX+8LX+7aT+65f+99X+/vz+++z++Nz+9cv+8br+7qn+65r+/v7+/PH++eH+9tD+88D+7J7+88H++ub+8LT+8LL++Nv+9cr+8bn+65n+7aL++eD+8r/+767+7J3+/vr+/ff++uX+88T+7aP+++r+/vv+++v++Nr+9Mn+7qj+9c/+8r7+763+/fX+9tT+8LP+7qf+99n+8bj+65j+/v3+/PD++N/+9c7+8r36wJn6uav6xrr708n839j97Oj++Pf++eT+88P+7aH8y5D4nIf4oY35rp36u637yLz81Mv84dv97er++fj+4pT4o5D5sJ/6va/7yb781s7949397+z++/r5qor4pZL5sqH6vrH7y8D82M/95N/+8e7+/Pz7w474p5T5tKT6wLP7zcL82tL95uH+8/D+/f3+88L935T4nYj4qZf5tab6wrX7z8X829T96OP+9PL5ror4nor5qpj5t6j6xLf70Mf83db96uX+9vX4n4v5rJv6uar6xbn70sn96+f+55X4oIj6u6z7x7z71Mv84dr97en7wI74o4/6vK781s384tz+45T4nYf5saH93p76uYz6t4z+45X6vY38ypD+5ZX4oYj5sYv7x4/4p4n+5pX+6pb5rIr935P93pT4n4f805L7yI/7xo/5qIn6uIz915L4noj7xI791ZL4n4j8z5H92ZP4ooj925P+6ZX6vI34pIj80JH80pH4pIn6vo76tYz93ZT93JP+4ZT7v477wo78zpD81JL+6Jb7vo35r4r4pon6toz+4JT8zJD7xY/6uo36uY37v4392pPZ0b/yAAACmklEQVR4AezWg5UEQRRA0bZtr51/fOuxDqca7yZQ+JQAAAAAAAAAAAAAAAAwI7KiapqqyNJI6Ib5y9BHch9zbRQ3kg1zzRhD1BRziyKJZ5lbVEk8zdyicaFDqrlFHX9SU/anGyOjY0NWrM1wxTixZ9FO2LPYs2zHHdeFPN8PwihO0mwke1bu/yvKqm7aTnhS1/6Ofri5vXPuBZb9g39M8JjHT6mQxvjsn1aUL69v7ft1R8eHf0k/fPFaT+kVRDEAgPPeL7Vt27at63Ft27bNrdZ2mzP9dxAn1DMsPOLf/qxI/JmoaLsYv1hQXxz+RnxCYlJQcjCoyBJ/4bmKKalpEaCKMPyz9OiMmMwQYCwLiSLjspNyknOBGXNkIS+/oLCITRWLS0rLyisqkYn0qoxq/xogqdXc0er0BqOJ45GByAwgEDSviJKs1NU3NCJFDlA0aT7S3NLa1t7R2YV/kA8k3Zqv9PT29Q8MDg3jL4wAyajmB8bGJyanpmdm3X5yZVyBZk7zc/MLi0vLK6tr+AUnIKrV/N76xubWdvnOR9vC3gyIdvc0f6bV7R8cHh3z9AS9dKIhO5XOlPOL222RHwxkl9ft1LVBBFEABNBpclJiargydiOSc3d397vFHaohxW3no/8V8UJU2Q1HIBClTAwKgRBF3DgkEhRJQiOVpkQGKlkq5PJQKRTpn1uCTrlC36pQqtGvOrQygoGk8g360SxALZDm5yVgQKvNz+rAiG5PGrRAy+UnhPowZjDkh+VGMGinyA9qOjBqPOFHTGcwbr7guy0dfAFnL8R3Wa3xRcrNEN+02uALbT2Xr1nsb/HFnINVj8+bTg4L+A5H8+MTlw+dntVG+Fbn84tL72oVu57c1Ga3KfxUlmVZlmXdAber1Qd03DKcAAAAAElFTkSuQmCC';

const imageStyle = {
  width: '130px',
  borderRadius: '50%',
};

const avatarWrapper = {
  marginBottom: '10px',
};

const titleStyle = {
  color: 'grey',
  fontSize: '18px',
};

const contantInfoStyle = {
  margin: '24px 0',
};

const buttonStyle = {
  margin: '0.5rem 0',
};

<div style={exampleWrapper}>
  <div style={profileWrapper}>
    <div style={avatarWrapper}>
      <img src={image} alt="Avatar" style={imageStyle} />
    </div>

    <Headline>John Doe</Headline>
    <Headline level={4} subheader>Coder, Innovation Partners</Headline>
    <Headline level={5}>Carl Zeiss AG</Headline>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi nibh, porttitor facilisis ornare a, tempor sed odio.</p>

    <p>
      <IconLink icon="Public" />
      <IconLink icon="Phone" />
      <IconLink icon="Place" />
    </p>

    <p><Button>Contact</Button></p>
  </div>

  <div style={profileWrapper}>
    <div style={avatarWrapper}>
      <Skeleton width="130px" height="130px" isCircle />
    </div>

    <Headline><Skeleton width={100} /></Headline>
    <Headline level={4} subheader><Skeleton width={220} /></Headline>
    <Headline level={5}><Skeleton width={150} /></Headline>

    <p><Skeleton height={54} /></p>

    <p>
      <Skeleton width={80} height={22} />
    </p>

    <p><Skeleton width={100} height={38} style={buttonStyle} /></p>
  </div>

  <div style={profileWrapper}>
    <div style={avatarWrapper}>
      <Skeleton width="130px" height="130px" isCircle />
    </div>

    <Headline><Skeleton width={100} /></Headline>
    <Headline level={4} subheader><Skeleton width={220} /></Headline>
    <Headline level={5}><Skeleton width={150} /></Headline>

    <p><Skeleton count={3} isText /></p>

    <p>
      <IconLink><Skeleton isCircle width={22} height={22} /></IconLink>
      <IconLink><Skeleton isCircle width={22} height={22} /></IconLink>
      <IconLink><Skeleton isCircle width={22} height={22} /></IconLink>
    </p>

    <p><Skeleton width={100} height={38} style={buttonStyle} /></p>
  </div>
</div>
```
