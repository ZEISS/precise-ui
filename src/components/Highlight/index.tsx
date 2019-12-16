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
 * Highlight component is meant to be a simple component to display text with highlighted search.
 * Component will render a SPAN or series of SPAN with the content and highlights
 */
export const Highlight: React.FC<HighlightProps> = ({ text, matches, highlight, ignoreCase = true, theme }) => {
  if (!matches && !highlight) {
    throw new Error('You must set either indices or highlight');
  }

  if (matches) {
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
