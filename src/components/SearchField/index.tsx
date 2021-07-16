import * as React from 'react';
import { Autocomplete, AutocompleteProps, AutosuggestSelectEvent } from '../Autocomplete';
import { InputChangeEvent } from '../../common';
import { debounce } from '../../utils/debounce';
import { Icon, IconName } from '../Icon';
import { light } from '../../themes';
import { Button } from '../Button';
import styled from '../../utils/styled';
import { KeyCodes } from '../../utils/keyCodes';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchButton = styled(Button)`
  height: 54px;
  width: 54px;
  margin: 0;
`;

export interface SearchEvent {
  query: string;
}

export interface SearchFieldProps<T> extends AutocompleteProps<T> {
  /**
   * @ignore
   */
  children?: void;
  /**
   * The icon to be used for the search.
   * @default Search
   */
  icon?: IconName;
  /**
   * Defines whether the search triggers onSearch on every keystroke or
   * by manually clicking on a button or pressing enter.
   *
   * @default "auto"
   */
  triggerMode?: 'auto' | 'manual';
  /**
   * The debounce time in milliseconds.
   * @default 200
   */
  delay?: number;
  /**
   * The event fired when the search is triggered.
   */
  onSearch?(ev: SearchEvent): void;
  /**
   * Always `true` on Searchfield components.
   * @ignore
   */
  clearable?: boolean;
}
const defaultDebounceDelay = 200;

type SearchFieldState = SearchEvent;

/**
 * A search field for user search queries.
 */
export class SearchField<T> extends React.Component<SearchFieldProps<T>, SearchFieldState> {
  private fireSearch: (q: string) => void;

  constructor(props: SearchFieldProps<T>) {
    super(props);
    const { delay = defaultDebounceDelay } = props;
    this.state = { query: '' };

    this.fireSearch = debounce((query: string) => {
      const { onSearch } = this.props;
      typeof onSearch === 'function' && onSearch({ query });
    }, delay);
  }

  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.keyCode === KeyCodes.enter && this.fireSearch(this.state.query);
  };

  private onSearchClick = () => {
    const { onSearch } = this.props;
    typeof onSearch === 'function' && onSearch({ query: this.state.query });
  };

  private onClear = () => {
    const { onClear, triggerMode = 'auto' } = this.props;
    typeof onClear === 'function' && onClear();

    // In case, triggerMode is set to manual, clicking on clear should also trigger the search.
    triggerMode === 'manual' && this.fireSearch('');
  };

  private onSuggestionSelected = (e: AutosuggestSelectEvent<T>) => {
    const { onSuggestionSelected, triggerMode = 'auto' } = this.props;
    typeof onSuggestionSelected === 'function' && onSuggestionSelected(e);

    // In case, triggerMode is set to manual, selecting a suggestion should also trigger the search.
    triggerMode === 'manual' && this.fireSearch(String(e.value));
  };

  private change = (e: InputChangeEvent<string>) => {
    const { onChange, triggerMode = 'auto' } = this.props;
    this.setState({ query: e.value });
    typeof onChange === 'function' && onChange(e);
    triggerMode === 'auto' && this.fireSearch(e.value);
  };

  render() {
    const { onSearch, delay, icon = 'Search', triggerMode = 'auto', ...rest } = this.props;
    const autoTrigger = triggerMode === 'auto';
    const fieldIconColor = (rest.theme && rest.theme.text2) || light.text2;
    const buttonIconColor = (rest.theme && rest.theme.text4) || light.text4;

    const searchFieldIcon = <Icon name={icon} color={fieldIconColor} size="22px" />;
    const searchButtonIcon = <Icon name={icon} color={buttonIconColor} size="22px" />;
    return (
      <SearchContainer onKeyDown={this.handleKeyDown}>
        <Autocomplete
          {...rest}
          onClear={this.onClear}
          onChange={this.change}
          onSuggestionSelected={this.onSuggestionSelected}
          icon={autoTrigger ? searchFieldIcon : <></>}
        />
        {!autoTrigger && (
          <SearchButton disabled={rest.disabled} onClick={this.onSearchClick}>
            {searchButtonIcon}
          </SearchButton>
        )}
      </SearchContainer>
    );
  }
}
