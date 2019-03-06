import * as React from 'react';
import { ActionLink, Expander, styled, distance, Icon, ActionLinkProps } from '../../src';

// @ts-ignore
import getUrl from 'react-styleguidist/lib/utils/getUrl';
import { themed } from '../../src';

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
  sectionDepth?: number;
}

interface MenuItemProps extends ActionLinkProps {
  selected: boolean;
}

const NavItems = styled.div``;

const MenuItem = styled(ActionLink)<MenuItemProps>(
  themed(
    ({ selected, theme }) => `
  position: relative;
  display: block;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 ${distance.medium};
  ${
    selected
      ? `
    color: ${theme.text2};
    background: ${theme.ui2};
  `
      : ''
  }
  border-bottom: 1px solid #eeefee;
  justify-content: space-between;
  font-weight: 500;
  color: ${theme.text1};
`,
  ),
);

const SubMenuContainer = styled.div`
  > div {
    background: ${themed(({ theme }) => theme.ui2)};
  }
`;

const SubMenuItem = styled(MenuItem)(
  ({ selected, theme }) => `
    padding: 0 ${distance.large};
    font-weight: 400;
    ${
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
        : ''
    }
`,
);

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

function useSelected(items: Array<SectionDefinition>) {
  let initSelected = '';
  for (const item of items) {
    if (window.location.hash.match(item.name)) {
      initSelected = item.name;
      break;
    }
  }

  const [state, setState] = React.useState(initSelected);

  const changeSelected = (name: string) => setState(state !== name ? name : '');

  return {
    selected: state,
    changeSelected,
  };
}

interface ComponentsListProps {
  items: Array<SectionDefinition>;
  hashPath: Array<string>;
  useRouterLinks: boolean;
  useHashId: boolean;
}

const ComponentsList: React.SFC<ComponentsListProps> = ({ items, useRouterLinks = false, hashPath }) => {
  const { selected, changeSelected } = useSelected(items);

  return (
    <NavItems>
      {items
        .filter(item => item.visibleName)
        .map(item => {
          const Item = item.sectionDepth === undefined ? SubMenuItem : MenuItem;
          return item.components && item.components.length > 0 ? (
            <React.Fragment key={item.name}>
              <MenuItem selected={item.name === selected} onClick={() => changeSelected(item.name)}>
                <MenuWithIcon>{item.visibleName}</MenuWithIcon>
                <StyledIcon name="KeyboardArrowDown" selected={item.name !== selected} />
              </MenuItem>
              <Expander timeout={500} expand={item.name === selected}>
                <SubMenuContainer>{item.content}</SubMenuContainer>
              </Expander>
            </React.Fragment>
          ) : (
            <Item
              key={item.name}
              selected={item.name === selected}
              href={getUrl({
                name: item.name,
                slug: item.slug,
                anchor: !useRouterLinks,
                hashPath: useRouterLinks ? hashPath : false,
                id: false,
              })}
              onClick={() => changeSelected(item.name)}>
              {item.visibleName}
            </Item>
          );
        })}
    </NavItems>
  );
};

export default ComponentsList;
