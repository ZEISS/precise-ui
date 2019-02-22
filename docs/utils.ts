import { SectionEntity, ComponentEntity } from './types';
import { isArray } from 'util';
import memoizeOne from 'memoize-one';

export interface ComponentTree {
  [componentName: string]: ComponentEntity & {
    section: SectionEntity;
    examples: Array<any>;
  };
}

export const getComponentTree = memoizeOne((sections: Array<SectionEntity>) => {
  const tree: ComponentTree = {};

  for (const section of sections) {
    for (const component of section.components) {
      tree[component.name] = {
        ...component,
        section,
        examples: component.props && isArray(component.props.examples) ? component.props.examples : [],
      };
    }
  }

  return tree;
});

export const getExampleDetails = (sections: Array<SectionEntity>, component: string, example: number) => {
  const tree = getComponentTree(sections);

  if (tree[component] && tree[component].examples[example]) {
    return {
      example: tree[component].examples[example],
      component: tree[component],
    };
  }

  return undefined;
};
