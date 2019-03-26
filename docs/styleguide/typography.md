## Typography

Library exports helper functions `getFontLineHeight`, `getFontSize`, `getFontWeight`, `getFontStyle` which allow to use standardized and optimised for different screen sizes font styles together with `styled-components`.

### Font weights:

```
const { styled, getFontStyle } = require('precise-ui');

const fontWeights = ['light', 'regular', 'medium', 'bold'];

const StyledText = styled.p`
  ${({ size, weight, lineHeight }) => getFontStyle({ size, weight, lineHeight })}
`;

<div>
  {fontWeights.map((weight) => <StyledText key={weight} size='xxLarge' weight={weight}>Lorem ipsum dolor sit amet [{weight}]</StyledText>)}
</div>;

```


### Font sizes:

```
const { styled, getFontStyle } = require('precise-ui');

const fontSizes = ['xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'xxxLarge'];


const StyledText = styled.p`
  ${({ size, weight, lineHeight }) => getFontStyle({ size, weight, lineHeight })}
`;

<div>
  {fontSizes.map((size) => <StyledText key={size} size={size}>Lorem ipsum dolor sit amet [{size}]</StyledText>)}
</div>;

```