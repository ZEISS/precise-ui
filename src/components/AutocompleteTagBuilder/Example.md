**Elementary**

The builder can be used with the static array of suggestions.

```jsx
const { AutocompleteTagBuilder } = require('precise-ui');
let suggestions =  ['one', 'two', 'three', 'four'];

<AutocompleteTagBuilder suggestions={suggestions}/>
```
**Controlled mode**

In controlled mode we can also prevent from value or input value changes.

```jsx
const { AutocompleteTagBuilder } = require('precise-ui');
const suggestions =  ['one', 'two', 'three', 'four'];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: [],
    };
  }

  selectedValueChange(selectedValue) {
    const value = selectedValue.value.length ? [selectedValue.value[selectedValue.value.length-1]] : [];
    this.setState({
      value,
    })
  }

  render() {
    const { value } = this.state;

    return (
      <>
        <AutocompleteTagBuilder suggestions={suggestions} value={value} onChange={(x) => this.selectedValueChange(x)}/>
      </>
    );
  }
}

<App />

```
**Dynamic Suggestions**

The suggestions can be computed when the input changes. 

```jsx
const { AutocompleteTagBuilder, Button } = require('precise-ui');

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'JavaScript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue !== '') {
    const regex = new RegExp('^' + escapedValue, 'i');
    return languages.filter(language => regex.test(language.name));
  }

  return [];
}

function renderSuggestion(suggestion) {
  return {
    key: getSuggestionKey(suggestion),
    content: `${suggestion.name} - ${suggestion.year}`
  };
}

function getSuggestionKey(suggestion) {
  return suggestion.name;
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
    };
  }

  inputChangeHandler({value}) {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  render() {
    const { suggestions } = this.state;

    return (
      <>
        <AutocompleteTagBuilder
          label="Programming Language"
          placeholder="Type 'c'"
          suggestions={suggestions}
          getSuggestionValue={getSuggestionValue}
          getSuggestionKey={getSuggestionKey}
          renderSuggestion={renderSuggestion}
          onInputChange={(e) => this.inputChangeHandler(e)}
          delay={200}
        />
      </>
    );
  }
}

<App />
```
**Form example**

```jsx
const { Form, Button, TextField, AutocompleteTagBuilder } = require('precise-ui');


<Form onSubmit={e => alert(JSON.stringify(e.data))}>
  <div>
    Numbers
  </div>
  <div>
    <AutocompleteTagBuilder name="numbers" getSuggestionKey={(x) => x} getSuggestionValue={(x) => x} suggestions={['1','2','3','4','5','6','7']}/>
  </div>
  <div>
    <Button>Submit</Button>
  </div>
</Form>
```
**Tag Presentation**

Here you can see a demo of custom tag building with help of `tagRenderer` method.

```jsx
const { AutocompleteTagBuilder } = require('precise-ui');

const tagRenderer = e => (<Button type={e.index % 2 === 0 ? "primary" : "secondary"}>{e.item}</Button>);

let suggestions =  ['one', 'two', 'three', 'four'];

<AutocompleteTagBuilder	suggestions={suggestions} tagRenderer={tagRenderer} />
```
