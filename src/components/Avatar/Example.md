**Elementary**

A simple Avatar component using the user's image.

```jsx
const { Avatar } = require('precise-ui');
const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAACkVBMVEX+65b35ZKyqXCEgVlvb07XyYN6eFRoaEqDgFj+8bX+76/+7J/++N7////+/fj++uf+99b+9MX+8LX+7aT+65f+99X+/vz+++z++Nz+9cv+8br+7qn+65r+/v7+/PH++eH+9tD+88D+7J7+88H++ub+8LT+8LL++Nv+9cr+8bn+65n+7aL++eD+8r/+767+7J3+/vr+/ff++uX+88T+7aP+++r+/vv+++v++Nr+9Mn+7qj+9c/+8r7+763+/fX+9tT+8LP+7qf+99n+8bj+65j+/v3+/PD++N/+9c7+8r36wJn6uav6xrr708n839j97Oj++Pf++eT+88P+7aH8y5D4nIf4oY35rp36u637yLz81Mv84dv97er++fj+4pT4o5D5sJ/6va/7yb781s7949397+z++/r5qor4pZL5sqH6vrH7y8D82M/95N/+8e7+/Pz7w474p5T5tKT6wLP7zcL82tL95uH+8/D+/f3+88L935T4nYj4qZf5tab6wrX7z8X829T96OP+9PL5ror4nor5qpj5t6j6xLf70Mf83db96uX+9vX4n4v5rJv6uar6xbn70sn96+f+55X4oIj6u6z7x7z71Mv84dr97en7wI74o4/6vK781s384tz+45T4nYf5saH93p76uYz6t4z+45X6vY38ypD+5ZX4oYj5sYv7x4/4p4n+5pX+6pb5rIr935P93pT4n4f805L7yI/7xo/5qIn6uIz915L4noj7xI791ZL4n4j8z5H92ZP4ooj925P+6ZX6vI34pIj80JH80pH4pIn6vo76tYz93ZT93JP+4ZT7v477wo78zpD81JL+6Jb7vo35r4r4pon6toz+4JT8zJD7xY/6uo36uY37v4392pPZ0b/yAAACmklEQVR4AezWg5UEQRRA0bZtr51/fOuxDqca7yZQ+JQAAAAAAAAAAAAAAAAwI7KiapqqyNJI6Ib5y9BHch9zbRQ3kg1zzRhD1BRziyKJZ5lbVEk8zdyicaFDqrlFHX9SU/anGyOjY0NWrM1wxTixZ9FO2LPYs2zHHdeFPN8PwihO0mwke1bu/yvKqm7aTnhS1/6Ofri5vXPuBZb9g39M8JjHT6mQxvjsn1aUL69v7ft1R8eHf0k/fPFaT+kVRDEAgPPeL7Vt27at63Ft27bNrdZ2mzP9dxAn1DMsPOLf/qxI/JmoaLsYv1hQXxz+RnxCYlJQcjCoyBJ/4bmKKalpEaCKMPyz9OiMmMwQYCwLiSLjspNyknOBGXNkIS+/oLCITRWLS0rLyisqkYn0qoxq/xogqdXc0er0BqOJ45GByAwgEDSviJKs1NU3NCJFDlA0aT7S3NLa1t7R2YV/kA8k3Zqv9PT29Q8MDg3jL4wAyajmB8bGJyanpmdm3X5yZVyBZk7zc/MLi0vLK6tr+AUnIKrV/N76xubWdvnOR9vC3gyIdvc0f6bV7R8cHh3z9AS9dKIhO5XOlPOL222RHwxkl9ft1LVBBFEABNBpclJiargydiOSc3d397vFHaohxW3no/8V8UJU2Q1HIBClTAwKgRBF3DgkEhRJQiOVpkQGKlkq5PJQKRTpn1uCTrlC36pQqtGvOrQygoGk8g360SxALZDm5yVgQKvNz+rAiG5PGrRAy+UnhPowZjDkh+VGMGinyA9qOjBqPOFHTGcwbr7guy0dfAFnL8R3Wa3xRcrNEN+02uALbT2Xr1nsb/HFnINVj8+bTg4L+A5H8+MTlw+dntVG+Fbn84tL72oVu57c1Ga3KfxUlmVZlmXdAber1Qd03DKcAAAAAElFTkSuQmCC';

<table>
  <thead>
    <tr>
      <td width="80" align="center">XL</td>
      <td width="80" align="center">L</td>
      <td width="80" align="center">M</td>
      <td width="80" align="center">S</td>
      <td width="80" align="center">XS</td>
      <td width="80" align="center">XXS</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><Avatar image={image} description="Sample" size="x-large" /></td>
      <td align="center"><Avatar image={image} description="Sample" size="large" /></td>
      <td align="center"><Avatar image={image} description="Sample" size="medium" /></td>
      <td align="center"><Avatar image={image} description="Sample" size="small" /></td>
      <td align="center"><Avatar image={image} description="Sample" size="x-small" /></td>
      <td align="center"><Avatar image={image} description="Sample" size="xx-small" /></td>
    </tr>
  </tbody>
</table>
```

**Default Display**

Without a proper image the initials should be used.

```jsx
const { Avatar } = require('precise-ui');

<table>
  <thead>
    <tr>
      <td width="80" align="center">XL</td>
      <td width="80" align="center">L</td>
      <td width="80" align="center">M</td>
      <td width="80" align="center">S</td>
      <td width="80" align="center">XS</td>
      <td width="80" align="center">XXS</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><Avatar initials="FR" description="Sample" size="x-large" /></td>
      <td align="center"><Avatar initials="AC" description="Sample" size="large" /></td>
      <td align="center"><Avatar initials="ZV" description="Sample" size="medium" /></td>
      <td align="center"><Avatar initials="QW" description="Sample" size="small" /></td>
      <td align="center"><Avatar initials="KL" description="Sample" size="x-small" /></td>
      <td align="center"><Avatar initials="MK" description="Sample" size="xx-small" /></td>
    </tr>
  </tbody>
</table>
```

**Badge Display**

Displaying a badge to indicate some status.

```jsx
const { Avatar } = require('precise-ui');
const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAACkVBMVEX+65b35ZKyqXCEgVlvb07XyYN6eFRoaEqDgFj+8bX+76/+7J/++N7////+/fj++uf+99b+9MX+8LX+7aT+65f+99X+/vz+++z++Nz+9cv+8br+7qn+65r+/v7+/PH++eH+9tD+88D+7J7+88H++ub+8LT+8LL++Nv+9cr+8bn+65n+7aL++eD+8r/+767+7J3+/vr+/ff++uX+88T+7aP+++r+/vv+++v++Nr+9Mn+7qj+9c/+8r7+763+/fX+9tT+8LP+7qf+99n+8bj+65j+/v3+/PD++N/+9c7+8r36wJn6uav6xrr708n839j97Oj++Pf++eT+88P+7aH8y5D4nIf4oY35rp36u637yLz81Mv84dv97er++fj+4pT4o5D5sJ/6va/7yb781s7949397+z++/r5qor4pZL5sqH6vrH7y8D82M/95N/+8e7+/Pz7w474p5T5tKT6wLP7zcL82tL95uH+8/D+/f3+88L935T4nYj4qZf5tab6wrX7z8X829T96OP+9PL5ror4nor5qpj5t6j6xLf70Mf83db96uX+9vX4n4v5rJv6uar6xbn70sn96+f+55X4oIj6u6z7x7z71Mv84dr97en7wI74o4/6vK781s384tz+45T4nYf5saH93p76uYz6t4z+45X6vY38ypD+5ZX4oYj5sYv7x4/4p4n+5pX+6pb5rIr935P93pT4n4f805L7yI/7xo/5qIn6uIz915L4noj7xI791ZL4n4j8z5H92ZP4ooj925P+6ZX6vI34pIj80JH80pH4pIn6vo76tYz93ZT93JP+4ZT7v477wo78zpD81JL+6Jb7vo35r4r4pon6toz+4JT8zJD7xY/6uo36uY37v4392pPZ0b/yAAACmklEQVR4AezWg5UEQRRA0bZtr51/fOuxDqca7yZQ+JQAAAAAAAAAAAAAAAAwI7KiapqqyNJI6Ib5y9BHch9zbRQ3kg1zzRhD1BRziyKJZ5lbVEk8zdyicaFDqrlFHX9SU/anGyOjY0NWrM1wxTixZ9FO2LPYs2zHHdeFPN8PwihO0mwke1bu/yvKqm7aTnhS1/6Ofri5vXPuBZb9g39M8JjHT6mQxvjsn1aUL69v7ft1R8eHf0k/fPFaT+kVRDEAgPPeL7Vt27at63Ft27bNrdZ2mzP9dxAn1DMsPOLf/qxI/JmoaLsYv1hQXxz+RnxCYlJQcjCoyBJ/4bmKKalpEaCKMPyz9OiMmMwQYCwLiSLjspNyknOBGXNkIS+/oLCITRWLS0rLyisqkYn0qoxq/xogqdXc0er0BqOJ45GByAwgEDSviJKs1NU3NCJFDlA0aT7S3NLa1t7R2YV/kA8k3Zqv9PT29Q8MDg3jL4wAyajmB8bGJyanpmdm3X5yZVyBZk7zc/MLi0vLK6tr+AUnIKrV/N76xubWdvnOR9vC3gyIdvc0f6bV7R8cHh3z9AS9dKIhO5XOlPOL222RHwxkl9ft1LVBBFEABNBpclJiargydiOSc3d397vFHaohxW3no/8V8UJU2Q1HIBClTAwKgRBF3DgkEhRJQiOVpkQGKlkq5PJQKRTpn1uCTrlC36pQqtGvOrQygoGk8g360SxALZDm5yVgQKvNz+rAiG5PGrRAy+UnhPowZjDkh+VGMGinyA9qOjBqPOFHTGcwbr7guy0dfAFnL8R3Wa3xRcrNEN+02uALbT2Xr1nsb/HFnINVj8+bTg4L+A5H8+MTlw+dntVG+Fbn84tL72oVu57c1Ga3KfxUlmVZlmXdAber1Qd03DKcAAAAAElFTkSuQmCC';

class Badge extends React.Component {
  constructor() {
    this.state = {
      mails: 1
    };
    this.newMail = (e) => this.setState({
      mails: this.state.mails + 1
    });
  }

  render() {
    const style = {
      background: this.props.color
    };

    return (
      <div style={style} onClick={this.newMail}>
        {this.state.mails}
      </div>
    );
  }
}

<table>
  <thead>
    <tr>
      <td width="80" align="center">XL</td>
      <td width="80" align="center">L</td>
      <td width="80" align="center">M</td>
      <td width="80" align="center">S</td>
      <td width="80" align="center">XS</td>
      <td width="80" align="center">XXS</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><Avatar initials="FR" description="Sample" size="x-large"><Badge color="red" /></Avatar></td>
      <td align="center"><Avatar initials="AC" description="Sample" size="large"><Badge color="orange" /></Avatar></td>
      <td align="center"><Avatar initials="ZV" description="Sample" size="medium"><Badge color="green" /></Avatar></td>
      <td align="center"><Avatar initials="QW" description="Sample" size="small"><Badge color="red" /></Avatar></td>
      <td align="center"><Avatar initials="KL" description="Sample" size="x-small"><Badge color="red" /></Avatar></td>
      <td align="center"><Avatar initials="MK" description="Sample" size="xx-small"><Badge color="red" /></Avatar></td>
    </tr>
    <tr>
      <td align="center"><Avatar image={image} description="Sample" size="x-large"><Badge color="orange" /></Avatar></td>
      <td align="center"><Avatar image={image} description="Sample" size="large"><Badge color="orange" /></Avatar></td>
      <td align="center"><Avatar image={image} description="Sample" size="medium"><Badge color="orange" /></Avatar></td>
      <td align="center"><Avatar image={image} description="Sample" size="small"><Badge color="orange" /></Avatar></td>
      <td align="center"><Avatar image={image} description="Sample" size="x-small"><Badge color="orange" /></Avatar></td>
      <td align="center"><Avatar image={image} description="Sample" size="xx-small"><Badge color="orange" /></Avatar></td>
    </tr>
  </tbody>
</table>
```
