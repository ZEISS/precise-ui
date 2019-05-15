**Elementary**

The builder can be used with the static array of suggestions.

```jsx
const { AutoTagBuilder } = require('precise-ui');
let suggestions =  ['one', 'two', 'tree', 'foure'];

function getSuggestionKey(data) {
  return data;
}

<AutoTagBuilder suggestions={suggestions} getSuggestionKey={getSuggestionKey} />
```

**Dynamic Suggestions**

The suggestions can be computed when the input changes. 

```jsx
const { AutoTagBuilder, Button } = require('precise-ui');

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
      value: [],
    };
  }

  onInputChange(query) {
    this.setState({
      suggestions: getSuggestions(query),
    });
  };

  onChange({value}) {
    this.setState({
      value
    })
  }

  reset() {
    this.setState({
      value: []
    })
  }

  render() {
    const { suggestions } = this.state;

    return (
      <>
        <AutoTagBuilder
          label="Programming Language"
          placeholder="Type 'c'"
          value={this.state.value}
          suggestions={suggestions}
          getSuggestionValue={getSuggestionValue}
          getSuggestionKey={getSuggestionKey}
          onInputChange={(e) => this.onInputChange(e)}
          renderSuggestion={renderSuggestion}
          onChange={(e) => this.onChange(e)}
          delay={200}
        />
        <br/>
        <Button onClick={() => this.reset()}>Reset</Button>
      </>
    );
  }
}

<App />
