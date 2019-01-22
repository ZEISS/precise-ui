**Elementary**

The `Rating` component provides the ability to gather ratings from user in a common way. By default 5 hearts are displayed to signal the rating from 1 to 5.

```jsx
const { Rating } = require('precise-ui');

<Rating />
```

Alternatively, the name of the icon and the number of levels can be set.

```jsx
const { Rating } = require('precise-ui');

<Rating levels={10} icon="CheckCircle" />
```

**Controlled Mode**

Or we can transform the `Rating` into a standard "like" Button.

```jsx
const { Rating } = require('precise-ui');

class MyRating extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		value: 0,
        };
        this.onChange = ({ value }) => {
        	if (value === 1 && this.state.value === 1) {
            	value = 0;
            }

        	this.setState({
            	value,
            });
        };
    }
	render() {
    	const { value } = this.state;
    	return <Rating levels={1} value={value} onChange={this.onChange} />
    }
}


<MyRating />
```
