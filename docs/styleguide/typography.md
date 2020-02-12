## Typography

Library exports helper functions `getFontLineHeight`, `getFontSize`, `getFontWeight`, `getFontStyle` which allow to use standardized and optimised for different screen sizes font styles together with `styled-components`.

### Font weights:

```
import { getFontStyle } from 'precise-ui';
import styled from 'styled-components';

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
import { getFontStyle } from 'precise-ui';
import styled from 'styled-components';

const fontSizes = ['xSmall', 'small', 'medium', 'large', 'xLarge', 'xxLarge', 'xxxLarge'];


const StyledText = styled.p`
  ${({ size, weight, lineHeight }) => getFontStyle({ size, weight, lineHeight })}
`;

<div>
  {fontSizes.map((size) => <StyledText key={size} size={size}>Lorem ipsum dolor sit amet [{size}]</StyledText>)}
</div>;

```
