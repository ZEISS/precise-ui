import * as React from 'react';
import { withResponsive } from '../../hoc/withResponsive';
import { Container, Content, Header, Headers, OverflowItems } from './ContentSwitch.part';
import { ContentSwitchOrientation, ContentSwitchPropsInt } from './ContentSwitchTypes.part';
import { OverflowMenu } from '../OverflowMenu';
import { Icon } from '../Icon';

const defaultOrientation: ContentSwitchOrientation = 'horizontal';
const overflowButtonWidth = 50;

const ContentSwitchInt: React.FC<ContentSwitchPropsInt> = ({
  orientation = defaultOrientation,
  children,
  theme,
  headers,
  activeIndex,
  onSelect,
  ...rest
}) => {
  const [overflowItems, setOverflowItems] = React.useState<typeof headers>([]);
  const containerRef = React.createRef<HTMLDivElement>();
  const headerRef = React.createRef<HTMLUListElement>();

  React.useLayoutEffect(() => {
    if (headerRef.current && containerRef.current && orientation === 'horizontal') {
      const { offsetWidth: containerWidth } = containerRef.current;
      const headerNodesWidth = Array.from(headerRef.current.childNodes).map((node: HTMLLIElement) => node.offsetWidth);
      const headersUlWidth = headerNodesWidth.reduce((acc, cur) => (acc += cur), 0);

      if (headersUlWidth > containerWidth) {
        const overflowItems: typeof headers = [];

        let visibleItemsWidth = overflowButtonWidth;
        headerNodesWidth.forEach((nodeWidth, index) => {
          visibleItemsWidth += nodeWidth;
          if (visibleItemsWidth > containerWidth) {
            overflowItems.push(headers[index]);
          }
        });

        setOverflowItems(overflowItems);
      }
    }

    return () => setOverflowItems([]);
  }, [headerRef.current, containerRef.current, orientation]);

  return (
    <Container theme={theme} {...rest} ref={containerRef}>
      <Headers theme={theme} orientation={orientation} ref={headerRef}>
        {headers.slice(0, headers.length - overflowItems.length).map((element, index) => (
          <Header
            theme={theme}
            key={`head-${index}`}
            active={index === activeIndex}
            onClick={() => onSelect(index)}
            orientation={orientation}>
            {element}
          </Header>
        ))}
        {overflowItems.length > 0 && (
          <OverflowMenu
            key="overflowButton"
            items={overflowItems.map((element, index, { length }) => (
              <OverflowItems onClick={() => onSelect(headers.length - length + index)}>{element}</OverflowItems>
            ))}
            button={
              <Header>
                <Icon name="MoreVert" />
              </Header>
            }
          />
        )}
      </Headers>
      <Content theme={theme}>{children}</Content>
    </Container>
  );
};

export interface ResponsiveContentSwitchProps extends React.FC<ContentSwitchPropsInt> {
  (props: ContentSwitchPropsInt & { children?: React.ReactNode }, context?: any): JSX.Element;
}

export const ResponsiveSwitchPanel: ResponsiveContentSwitchProps = withResponsive(ContentSwitchInt) as any;
