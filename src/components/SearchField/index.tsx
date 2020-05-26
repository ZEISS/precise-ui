import * as React from 'react';
import { Autocomplete, AutocompleteProps } from '../Autocomplete';
import { InputChangeEvent } from '../../common';
import { debounce } from '../../utils/debounce';
import { Icon, IconName } from '../Icon';
import { light } from '../../themes';
import { Button } from '../Button';
import styled from '../../utils/styled';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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
}

/**
 * A search field for user search queries.
 */
export class SearchField<T> extends React.Component<SearchFieldProps<T>> {
  private fireSearch: (q: string) => void;

  constructor(props: SearchFieldProps<T>) {
    super(props);
    const { delay = 200 } = props;
    this.fireSearch = debounce((query: string) => {
      const { onSearch } = this.props;

      typeof onSearch === 'function' && onSearch({ query });
    }, delay);
  }

  private change = (e: InputChangeEvent<string>) => {
    const { onChange, triggerMode } = this.props;

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
      <SearchContainer>
        <Autocomplete {...rest} onChange={this.change} icon={autoTrigger ? searchFieldIcon : <></>} />
        {!autoTrigger && <SearchButton onClick={() => this.fireSearch}>{searchButtonIcon}</SearchButton>}
      </SearchContainer>
    );
  }
}
