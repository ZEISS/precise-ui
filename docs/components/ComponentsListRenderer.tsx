import * as React from 'react';
import { ActionLink, Expander, styled, distance, css, colors, Icon } from '../../src';

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
  active?: string;
  cachedPath: string;
}

interface MenuItemProps {
  active: boolean;
}

const NavItems = styled.div``;

const MenuItem = styled<MenuItemProps, 'div'>('div')`
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 ${distance.medium};
  ${({ active }) => (active ? ActiveMenuItem : '')}
  border-bottom: 1px solid #eeefee;
  justify-content: space-between;
`;

const ActiveMenuItem = css`
  background: ${colors.whiterSmoke};
`;

const SubMenuContainer = styled.div`
  > div {
    background: ${colors.whiterSmoke};
  }
`;

const ActiveSubMenuItem = css`
  &:after {
    position: absolute;
    left: 0;
    content: '';
    width: 4px;
    height: 100%;
    background: ${colors.cyan};
  }
`;

const SubMenuItem = MenuItem.extend`
  padding: 0 ${distance.large};
  ${({ active }) => (active ? ActiveSubMenuItem : '')}
`;

const MenuWithIcon = styled.div`
  display: flex;
  align-items: center;
`;

interface StyledIconProps {
  active: boolean;
}

const StyledIcon = styled(Icon)`
  transform: rotate(${({ active }: StyledIconProps) => (active ? '0deg' : '180deg')});
  transition: 0.5s ease-in-out;
`;

const StyledActionLink = styled(ActionLink)`
  font-weight: ${({ nested }: { nested?: boolean }) => (nested ? 400 : 500)};
  color: ${colors.eclipse};
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
      active: items.reduce((acc, cur) => {
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
        active: path.replace(/^\/([^\/]*).*$/, '$1'),
      };
    }
    // tslint:disable-next-line
    return null;
  }

  private changeActive = (slug: string) => {
    const { active: slugState } = this.state;

    this.setState({
      active: slugState !== slug ? slug : '',
    });
  };

  render() {
    const { items } = this.props;
    const { active } = this.state;

    return (
      <NavItems>
        {items
          .filter(item => item.visibleName)
          .map(item =>
            item.components.length > 0 ? (
              <>
                <MenuItem active={item.slug === active} key={item.slug}>
                  <MenuWithIcon>
                    <StyledActionLink onClick={() => this.changeActive(item.slug)}>{item.visibleName}</StyledActionLink>
                  </MenuWithIcon>
                  <StyledIcon name="KeyboardArrowDown" active={item.slug !== active} />
                </MenuItem>
                <Expander timeout={500} expand={item.slug === active}>
                  <SubMenuContainer>
                    {item.components.map(component => {
                      component.parent = item.slug;
                      return (
                        <SubMenuItem active={isMatch(`/${item.slug}/${component.slug}`)} key={component.slug}>
                          <StyledActionLink nested to={`/${item.slug}/${component.slug}`}>
                            {component.visibleName}
                          </StyledActionLink>
                        </SubMenuItem>
                      );
                    })}
                  </SubMenuContainer>
                </Expander>
              </>
            ) : (
              <MenuItem active={item.slug === active} key={item.slug}>
                <StyledActionLink to={`/${item.slug}`}>{item.visibleName}</StyledActionLink>
              </MenuItem>
            ),
          )}
      </NavItems>
    );
  }
}
