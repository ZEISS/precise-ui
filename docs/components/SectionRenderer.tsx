import * as React from 'react';

// @ts-ignore
import SectionHeading from 'react-styleguidist/lib/rsg-components/SectionHeading';
// @ts-ignore
import Markdown from 'react-styleguidist/lib/rsg-components/Markdown';

interface SectionRendererProps {
  name: string;
  description: string;
  slug: string;
  filepath: string;
  content: React.ReactNode;
  components: React.ReactNode;
  sections: React.ReactNode;
  isolated: boolean;
  depth: number;
  pagePerSection: boolean;
}

const SectionRenderer: React.SFC<SectionRendererProps> = props => {
  const { description, content, sections, components, depth, slug, pagePerSection } = props;

  return (
    <section>
      {name && (
        <SectionHeading
          depth={depth}
          id={slug}
          slotName="sectionToolbar"
          pagePerSection={pagePerSection}
          slotProps={props}>
          {name}
        </SectionHeading>
      )}
      {description && <Markdown text={description} />}
      {content}
      {sections}
      {components}
    </section>
  );
};

export default SectionRenderer;
