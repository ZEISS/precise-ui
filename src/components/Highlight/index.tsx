import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { StandardProps } from '../../common';

export interface HighlightProps extends StandardProps {
  /**
   * String that needs to be rendered
   */
  text: string;
  /**
   * String that needs to be highlighted
   */
  highlight?: string;
  /**
   * Array that defines the indices to highlight, each element is an array of [start, end]
   * In case this is procided then highlight will be ignored.
   */
  matches?: Array<Array<number>>;
  /**
   * Defines if the search will be case insensitive
   */
  ignoreCase?: boolean;
}

const Highlighted = styled.span`
  background-color: ${themed(props => props.theme.highlightColor)};
`;

/**
 * Validates that the matches provided are valid, if not it will throw an error
 *
 * @param matches
 */
function validateMatches(matches: Array<Array<number>>) {
  let lastMatch = -1;

  if (!Array.isArray(matches)) {
    throw Error(`match must be an Array of [start, end], but provided ${JSON.stringify(matches)}`);
  }

  matches.forEach(match => {
    if (!Array.isArray(match) || match.length !== 2) {
      throw Error('match must be an Array of [start, end]');
    }

    if (!Number.isInteger(match[0]) || !Number.isInteger(match[1]) || match[0] < 0 || match[1] < 0) {
      throw Error('match [start] and [end] must be a positive integers.');
    }

    if (match[0] >= match[1]) {
      throw Error('[start] must be lower than [end].');
    }

    if (match[0] <= lastMatch) {
      throw Error('match indices cannot overlap.');
    }

    lastMatch = match[1];
  });
}

/**
 * Highlight component is meant to be a simple component to display text with highlighted search.
 * Component will render a SPAN or series of SPAN with the content and highlights
 */
export const Highlight: React.FC<HighlightProps> = ({ text, matches, highlight, ignoreCase = true, theme }) => {
  if (!matches && undefined === highlight) {
    throw new Error('You must set either indices or highlight');
  }

  if (matches) {
    validateMatches(matches);

    let lastMatch = 0;
    return (
      <>
        {matches.map((match, i) => {
          const r = (
            <React.Fragment key={i}>
              <span>{text.substring(lastMatch, match[0])}</span>
              <Highlighted theme={theme}>{text.substring(match[0], match[1])}</Highlighted>
            </React.Fragment>
          );
          lastMatch = match[1];
          return r;
        })}
        <span>{text.substring(lastMatch, text.length)}</span>
      </>
    );
  }

  if (highlight === '') {
    return <>{text}</>;
  }

  // Sanitized the user input to prevent them from using RegEx patterns
  const sanitized = highlight && highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${sanitized})`, ignoreCase ? 'gi' : 'g')).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === (highlight && highlight.toLowerCase()) ? (
          <Highlighted theme={theme} key={i}>
            {part}
          </Highlighted>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
};

Highlight.displayName = 'Highlight';
