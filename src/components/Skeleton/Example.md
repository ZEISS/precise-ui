**Elementary**

The `Skeleton` component is quite flexible. It displays a low fidelity UI into which information will be gradually loaded.

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

const image = 'https://api.adorable.io/avatars/200/skeleton.png';

const imageStyle = {
  width: '130px',
  borderRadius: '50%',
};

const avatarWrapper = {
  marginBottom: '10px',
  height: '130px',
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
