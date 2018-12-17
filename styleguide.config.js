const path = require('path');
const fs = require('fs');
const rdts = require('react-docgen-typescript');
const { version } = require('./package');
const componentRoot = path.join(__dirname, 'docs/components');
const styleguideComponents = {};
const componentFiles = fs.readdirSync(componentRoot);

for (const componentFile of componentFiles) {
  const refName = componentFile.replace('.tsx', '');
  styleguideComponents[refName] = path.join(componentRoot, refName);
}

module.exports = {
  version,
  title: 'Precise UI',
  propsParser: rdts.withDefaultConfig().parse,
  assetsDir: path.resolve(__dirname, 'docs', 'assets'),
  skipComponentsWithoutExample: true,
  pagePerSection: false,
  compilerConfig: {
    transforms: {
      dangerousTaggedTemplateString: true,
    },
    objectAssign: 'Object.assign',
  },
  ribbon: {
    url: 'https://github.com/ZEISS/precise-ui',
    text: 'GitHub repository',
  },
  usageMode: 'expand',
  sections: [
    {
      name: 'Basics',
      content: path.resolve(__dirname, './docs/basics/index.md'),
      sections: [
        {
          name: 'Colors',
          content: path.resolve(__dirname, 'docs/basics/colors.md'),
        },
        {
          name: 'Types',
          content: path.resolve(__dirname, 'docs/basics/types.md'),
        },
      ],
      sectionDepth: 0,
    },
    {
      name: 'Components',
      sectionDepth: 1,
      components: path.resolve(__dirname, 'src/components/**/*.tsx'),
    },
  ],
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto',
        },
        {
          rel: 'stylesheet',
          href: '/style.css',
        },
      ],
      meta: [
        {
          name: 'description',
          content: 'Precise UI React component library.',
        },
      ],
      raw: ['<base href="/" />'],
    },
  },
  styleguideComponents,
  getExampleFilename(componentPath) {
    const dir = path.dirname(componentPath);
    return path.join(dir, `Example.md`);
  },
  getComponentPathLine(componentPath) {
    const dir = path.dirname(componentPath);
    const name = path.basename(dir);
    return `import { ${name} } from 'precise-ui';`;
  },
  ignore: [path.resolve(__dirname, 'src/**/*.test.tsx'), path.resolve(__dirname, 'src/**/*.part.tsx')],
  theme: {
    color: {},
  },
  styles: {
    Logo: {
      logo: {
        backgroundImage: 'url(precise-logo.svg)',
        backgroundRepeat: 'no-repeat',
        paddingTop: '85px',
        backgroundPosition: 'center 0',
        textAlign: 'center',
        backgroundSize: '80px 80px',
      },
    },
    Version: {
      version: {
        textAlign: 'center',
      },
    },
  },
};
