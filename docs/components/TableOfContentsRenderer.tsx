import * as React from 'react';
import { SearchField, styled } from '../../src';

interface TableOfContentsRendererProps {
  children: React.ReactNode;
  searchTerm: string;
  onSearchTermChange(term: string): void;
}

const NavItems = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const TableOfContentsRenderer: React.SFC<TableOfContentsRendererProps> = ({
  children,
  searchTerm,
  onSearchTermChange,
}) => {
  return (
    <>
      <SearchField defaultValue={searchTerm} onSearch={e => onSearchTermChange(e.query)} />
      <NavItems>{children}</NavItems>
    </>
  );
};

export default TableOfContentsRenderer;
