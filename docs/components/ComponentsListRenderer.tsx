import * as React from 'react';
import { ActionLink, Expander, styled, distance, Icon, ActionLinkProps, themed } from '../../src';

interface ComponentDefinition {
  hasExamples: boolean;
  metadata: any;
  parent?: string;
  name: string;
  pathLine: string;
  props: any;
  slug: string;
  visibleName: string;
}

interface SectionDefinition {
  visibleName: string;
  name: string;
  heading: boolean;
  href: string;
  content: string;
  external: boolean;
  components: Array<ComponentDefinition>;
  sections: Array<SectionDefinition>;
  slug: string;
  exampleMode: 'collapse';
  usageMode: 'collapse';
}

interface ComponentsListRendererProps {
  items: Array<SectionDefinition>;
}

interface ComponentsListRendererState {
  selected?: string;
  cachedPath: string;
}

interface MenuItemProps extends ActionLinkProps {
  selected: boolean;
}

const NavItems = styled.div``;

const MenuItem = styled<MenuItemProps>(ActionLink)`
  position: relative;
  display: block;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 ${distance.medium};
  ${themed(({ selected, theme }) =>
    selected
      ? `
  color: ${theme.text2};
  background: ${theme.ui2};
`
      : '',
  )}
  border-bottom: 1px solid #eeefee;
  justify-content: space-between;
  font-weight: 500;
  color: ${themed(({ theme }) => theme.text1)};
`;

const SubMenuContainer = styled.div`
  > div {
    background: ${themed(({ theme }) => theme.ui2)};
  }
`;

const SubMenuItem = MenuItem.extend`
  padding: 0 ${distance.large};
  font-weight: 400;
  ${themed(({ selected, theme }) =>
    selected
      ? `
  &:after {
    position: absolute;
    left: 0;
    content: '';
    width: 4px;
    height: 100%;
    background: ${theme.ui0};
  }`
      : '',
  )}
`;

const MenuWithIcon = styled.div`
  display: flex;
  align-items: center;
`;

interface StyledIconProps {
  selected: boolean;
}

const StyledIcon = styled(Icon)`
  transform: rotate(${({ selected }: StyledIconProps) => (selected ? '0deg' : '180deg')});
  transition: 0.5s ease-in-out;
`;

function isMatch(slug: string) {
  const path = window.location.pathname;

  if (path === slug) {
    return true;
  }
  return path.substring(0, slug.length + 1) === `${slug}/`;
}

export default class ComponentsListRenderer extends React.Component<
  ComponentsListRendererProps,
  ComponentsListRendererState
> {
  constructor(props: ComponentsListRendererProps) {
    super(props);
    const { items } = props;
    this.state = {
      selected: items.reduce((acc, cur) => {
        if (isMatch(`/${cur.slug}`)) {
          acc = cur.slug;
        }
        return acc;
      }, ''),
      cachedPath: window.location.pathname,
    };
  }

  static getDerivedStateFromProps(_nextProps: ComponentsListRendererProps, prevState: ComponentsListRendererState) {
    const path = window.location.pathname;

    if (path !== prevState.cachedPath) {
      return {
        cachedPath: path,
        selected: path.replace(/^\/([^\/]*).*$/, '$1'),
      };
    }
    // tslint:disable-next-line
    return null;
  }

  private changeActive = (slug: string) => {
    const { selected: slugState } = this.state;

    this.setState({
      selected: slugState !== slug ? slug : '',
    });
  };

  render() {
    const { items } = this.props;
    const { selected } = this.state;

    return (
      <NavItems>
        {items
          .filter(item => item.visibleName)
          .map(item =>
            item.components.length > 0 ? (
              <React.Fragment key={item.slug}>
                <MenuItem selected={item.slug === selected} onClick={() => this.changeActive(item.slug)}>
                  <MenuWithIcon>{item.visibleName}</MenuWithIcon>
                  <StyledIcon name="KeyboardArrowDown" selected={item.slug !== selected} />
                </MenuItem>
                <Expander timeout={500} expand={item.slug === selected}>
                  <SubMenuContainer>
                    {item.components.map(component => {
                      return (
                        <SubMenuItem
                          selected={isMatch(`/${item.slug}/${component.slug}`)}
                          key={component.slug}
                          to={`/${item.slug}/${component.slug}`}>
                          {component.visibleName}
                        </SubMenuItem>
                      );
                    })}
                  </SubMenuContainer>
                </Expander>
              </React.Fragment>
            ) : (
              <MenuItem key={item.slug} selected={item.slug === selected} to={`/${item.slug}`}>
                {item.visibleName}
              </MenuItem>
            ),
          )}
      </NavItems>
    );
  }
}
