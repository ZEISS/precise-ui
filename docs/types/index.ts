export interface Dict {
  [key: string]: any;
}

export interface ComponentEntity {
  filepath: string;
  hasExamples: boolean;
  metadata: Dict;
  module: Dict;
  name: string;
  pathLine: string;
  props: Dict;
  slug: string;
  visibleName: string;
}

export interface SectionEntity {
  components: Array<ComponentEntity>;
  content?: Array<Dict>;
  description?: string;
  exampleMode: string;
  external?: boolean;
  filepath?: string;
  href?: string;
  name?: string;
  sectionDepth: number;
  sections: Array<SectionEntity>;
  slug: string;
  usageMode: string;
  visibleName?: string;
}

export interface ConfigType {
  title: string;
  version: string;
  showSidebar: boolean;
}

export interface PathParams {
  section?: string;
  component?: string;
  example?: string;
}
