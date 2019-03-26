**Elementary**

The autocomplete can be used in a very simple, non-interactive fashion.

```jsx
const { Autocomplete } = require('precise-ui');

<Autocomplete suggestions={['one', 'two', 'three']} defaultValue="five" />
```

**Dynamic Suggestions**

The autocomplete component renders a textfield with an interactive list. The suggestions can be computed when the input changes.

```jsx
const { Autocomplete, Button } = require('precise-ui');

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
    key: suggestion.name,
    content: suggestion.name
  };
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      value: '',
      selected: '',
    };
  }

  onChange({ value }) {
    this.setState({
      suggestions: getSuggestions(value),
      value,
    });

    if (value.length === 0) {
      this.setState({
        selected: '',
      });
    }
  };

  onSuggestionSelected({ value }) {
    this.setState({
      selected: value.name + ' -> ' + value.year,
      value: value.name,
    });
  };

  reset() {
    this.setState({
      value: '',
      suggestions: [],
    })
  }

  render() {
    const { suggestions, selected } = this.state;

    return (
      <>
        <Autocomplete
          label="Programming Language"
          placeholder="Type 'c'"
          value={this.state.value}
          suggestions={suggestions}
          getSuggestionValue={getSuggestionValue}
          onSuggestionSelected={e => this.onSuggestionSelected(e)}
          onChange={(e) => this.onChange(e)}
          renderSuggestion={renderSuggestion}
        />
        <br/>
        <span>Selected Value: {selected}</span>
        <Button onClick={() => this.reset()}>Reset</Button>
      </>
    );
  }
}

<App />
```
