import * as React from 'react';
import { Autocomplete, AutocompleteProps } from '../Autocomplete';
import { InputChangeEvent } from '../../common';
import { debounce } from '../../utils/debounce';
import { Icon, IconName } from '../Icon';
import { light } from '../../themes';

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

      if (typeof onSearch === 'function') {
        onSearch({
          query,
        });
      }
    }, delay);
  }

  private change = (e: InputChangeEvent<string>) => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(e);
    }

    this.fireSearch(e.value);
  };

  render() {
    const { onSearch, delay, icon = 'Search', theme, ...rest } = this.props;
    const color = (theme && theme.text2) || light.text2;
    const img = <Icon name={icon} color={color} size="22px" />;
    return <Autocomplete {...rest} theme={theme} onChange={this.change} icon={img} />;
  }
}
