import * as React from 'react';
import styled, { themed } from '../../utils/styled';
import { Breadcrumb } from '../Breadcrumb';
import { dark } from '../../colors';
import { remCalc } from '../../utils/remCalc';
import { InteractiveList, InteractiveListItem, InteractiveListWrapperProps } from '../InteractiveList';
import { StandardProps } from '../../common';
import { Flyout } from '../Flyout';
import { distance } from '../../distance';
import onClickOutside, { AdditionalProps } from 'react-onclickoutside';

const BreadcrumbContainer = styled.div`
  font-size: ${remCalc('14px')};
  color: ${themed(props => props.theme.fillSecondary)};
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

interface BreadcrumbPlaceholderProps {
  group: Array<React.ReactChild>;
}

interface BreadcrumbPlaceholderState {
  open: boolean;
  items: Array<InteractiveListItem>;
}

const CustomWrapper: React.SFC<InteractiveListWrapperProps> = props => {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};

function getItems(group: Array<React.ReactChild>): Array<InteractiveListItem> {
  return group.map((item, index) => ({
    content: item,
    key: index.toString(),
  }));
}

class BreadcrumbPlaceholderInt extends React.Component<BreadcrumbPlaceholderProps, BreadcrumbPlaceholderState> {
  constructor(props: BreadcrumbPlaceholderProps) {
    super(props);
    this.state = {
      open: false,
      items: getItems(props.group),
    };
  }

  handleClickOutside = () => {
    this.state.open &&
      this.setState({
        open: false,
      });
  };

  componentWillReceiveProps(nextProps: BreadcrumbPlaceholderProps) {
    this.setState({
      items: getItems(nextProps.group),
    });
  }

  private toggleGroup = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { open } = this.state;

    this.setState({
      open: !open,
    });

    e.preventDefault();
  };

  private closeList = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { open, items } = this.state;
    return (
      <Flyout
        content={
          <InteractiveList
            open={open}
            autoFocus
            data={items}
            onBlur={this.closeList}
            onChange={this.closeList}
            customWrapper={CustomWrapper}
          />
        }
        open={open}>
        <Breadcrumb title="..." onClick={this.toggleGroup} />
      </Flyout>
    );
  }
}

const BreadcrumbPlaceholder: React.ComponentClass<BreadcrumbPlaceholderProps & AdditionalProps> = onClickOutside(
  BreadcrumbPlaceholderInt,
);

function collapse(items: Array<React.ReactChild>, target: number, size: number) {
  const group = items.splice(target, 1 + items.length - size, '');
  items[target] = <BreadcrumbPlaceholder group={group} />;
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
    displayElements.push(child);
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
