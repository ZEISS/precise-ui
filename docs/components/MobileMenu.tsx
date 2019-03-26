import * as React from 'react';
import { Icon, WindowPopup, styled, distance, colors } from '../../src';

const Hamburger = styled.div`
  font-size: 30px;
  cursor: pointer;
  margin-left: 1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  i {
    vertical-align: text-bottom;
  }
  span {
    margin-left: ${distance.small};
  }
  &:hover {
    color: ${colors.cyan};
  }
`;

export interface MobileMenuProps {
  toc?: React.ReactNode;
}

export const MobileMenu: React.SFC<MobileMenuProps> = ({ toc }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('hashchange', close);
    return () => {
      window.removeEventListener('hashchange', close);
    };
  }, []);

  return (
    <>
      {open && <WindowPopup onClose={() => setOpen(false)}>{toc}</WindowPopup>}
      <Hamburger onClick={() => setOpen(true)}>
        <Icon name="Menu" />
      </Hamburger>
    </>
  );
};
