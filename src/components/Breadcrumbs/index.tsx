import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { Breadcrumb } from '../Breadcrumb';
import { dark } from '../../colors';
import { StandardProps } from '../../common';
import { distance } from '../../distance';
import { OverflowMenu } from '../OverflowMenu';
import { getFontStyle } from '../../textStyles';

const BreadcrumbContainer = styled.div`
  ${getFontStyle({ size: 'small' })}
  
  color: ${themed(props => props.theme.ui8)};
`;

const BreadcrumbSeparator = styled.span`
  padding: 0 ${distance.medium};
  color: ${dark};
  font-size: inherit;
  &:after {
    content: '/';
  }
`;

export interface BreadcrumbsProps extends StandardProps {
  /**
   * The maximum number of elements. By default, set to 5.
   * @default 5
   */
  size?: number;
  /**
   * The breadcrumb items to display.
   */
  children?: React.ReactNode;
}

function collapse(items: Array<React.ReactChild>, target: number, size: number) {
  items[target] = (
    <OverflowMenu
      items={items.splice(target, 1 + items.length - size, '')}
      button={<Breadcrumb title="..." href="#" />}
    />
  );
}

function insertSeparators(items: Array<React.ReactChild>) {
  for (let i = items.length; i-- > 1; ) {
    items.splice(i, 0, <BreadcrumbSeparator />);
  }
}

/**
 * Display a list of Breadcrumb elements with optional grouping.
 */
export const Breadcrumbs: React.SFC<BreadcrumbsProps> = ({ size = 5, children, ...props }) => {
  const displayElements: Array<React.ReactChild> = [];
  const count = Math.max(size, 1);

  React.Children.forEach(children, child => {
    if (child) {
      displayElements.push(child as React.ReactChild);
    }
  });

  if (displayElements.length > count) {
    collapse(displayElements, +(count > 2), count);
  }

  insertSeparators(displayElements);

  return (
    <BreadcrumbContainer {...props}>
      {displayElements.map((element, i) => (
        <span key={i}>{element}</span>
      ))}
    </BreadcrumbContainer>
  );
};
Breadcrumbs.displayName = 'Breadcrumbs';
