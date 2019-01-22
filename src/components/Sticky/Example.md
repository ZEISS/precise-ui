**Elementary**

Sticky component enables positioning absolute elements. The default sticking position is bottom left.

```jsx
const { Sticky, Container, Button } = require('precise-ui');

<Container style={{ position: 'relative', minHeight: '120px' }}>
  <Sticky>
    <Button>Click me</Button>
  </Sticky>
</Container>
```

As expected, sticky container could be placed on `top`, `left`, `right` or `bottom`.

Here is an example of sticky placed on the right side:

```jsx
const { Sticky, Container, Avatar } = require('precise-ui');
const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAACkVBMVEX+65b35ZKyqXCEgVlvb07XyYN6eFRoaEqDgFj+8bX+76/+7J/++N7////+/fj++uf+99b+9MX+8LX+7aT+65f+99X+/vz+++z++Nz+9cv+8br+7qn+65r+/v7+/PH++eH+9tD+88D+7J7+88H++ub+8LT+8LL++Nv+9cr+8bn+65n+7aL++eD+8r/+767+7J3+/vr+/ff++uX+88T+7aP+++r+/vv+++v++Nr+9Mn+7qj+9c/+8r7+763+/fX+9tT+8LP+7qf+99n+8bj+65j+/v3+/PD++N/+9c7+8r36wJn6uav6xrr708n839j97Oj++Pf++eT+88P+7aH8y5D4nIf4oY35rp36u637yLz81Mv84dv97er++fj+4pT4o5D5sJ/6va/7yb781s7949397+z++/r5qor4pZL5sqH6vrH7y8D82M/95N/+8e7+/Pz7w474p5T5tKT6wLP7zcL82tL95uH+8/D+/f3+88L935T4nYj4qZf5tab6wrX7z8X829T96OP+9PL5ror4nor5qpj5t6j6xLf70Mf83db96uX+9vX4n4v5rJv6uar6xbn70sn96+f+55X4oIj6u6z7x7z71Mv84dr97en7wI74o4/6vK781s384tz+45T4nYf5saH93p76uYz6t4z+45X6vY38ypD+5ZX4oYj5sYv7x4/4p4n+5pX+6pb5rIr935P93pT4n4f805L7yI/7xo/5qIn6uIz915L4noj7xI791ZL4n4j8z5H92ZP4ooj925P+6ZX6vI34pIj80JH80pH4pIn6vo76tYz93ZT93JP+4ZT7v477wo78zpD81JL+6Jb7vo35r4r4pon6toz+4JT8zJD7xY/6uo36uY37v4392pPZ0b/yAAACmklEQVR4AezWg5UEQRRA0bZtr51/fOuxDqca7yZQ+JQAAAAAAAAAAAAAAAAwI7KiapqqyNJI6Ib5y9BHch9zbRQ3kg1zzRhD1BRziyKJZ5lbVEk8zdyicaFDqrlFHX9SU/anGyOjY0NWrM1wxTixZ9FO2LPYs2zHHdeFPN8PwihO0mwke1bu/yvKqm7aTnhS1/6Ofri5vXPuBZb9g39M8JjHT6mQxvjsn1aUL69v7ft1R8eHf0k/fPFaT+kVRDEAgPPeL7Vt27at63Ft27bNrdZ2mzP9dxAn1DMsPOLf/qxI/JmoaLsYv1hQXxz+RnxCYlJQcjCoyBJ/4bmKKalpEaCKMPyz9OiMmMwQYCwLiSLjspNyknOBGXNkIS+/oLCITRWLS0rLyisqkYn0qoxq/xogqdXc0er0BqOJ45GByAwgEDSviJKs1NU3NCJFDlA0aT7S3NLa1t7R2YV/kA8k3Zqv9PT29Q8MDg3jL4wAyajmB8bGJyanpmdm3X5yZVyBZk7zc/MLi0vLK6tr+AUnIKrV/N76xubWdvnOR9vC3gyIdvc0f6bV7R8cHh3z9AS9dKIhO5XOlPOL222RHwxkl9ft1LVBBFEABNBpclJiargydiOSc3d397vFHaohxW3no/8V8UJU2Q1HIBClTAwKgRBF3DgkEhRJQiOVpkQGKlkq5PJQKRTpn1uCTrlC36pQqtGvOrQygoGk8g360SxALZDm5yVgQKvNz+rAiG5PGrRAy+UnhPowZjDkh+VGMGinyA9qOjBqPOFHTGcwbr7guy0dfAFnL8R3Wa3xRcrNEN+02uALbT2Xr1nsb/HFnINVj8+bTg4L+A5H8+MTlw+dntVG+Fbn84tL72oVu57c1Ga3KfxUlmVZlmXdAber1Qd03DKcAAAAAElFTkSuQmCC';

<Container style={{ position: 'relative', minHeight: '120px' }}>
  <Sticky position="right">
    <Avatar image={image} description="Sample" size="x-large" />
  </Sticky>
</Container>
```
