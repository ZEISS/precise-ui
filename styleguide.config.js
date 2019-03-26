const path = require('path');
const fs = require('fs');
const rdts = require('react-docgen-typescript');
const { version } = require('./package');
const componentRoot = path.join(__dirname, 'docs/components');
const styleguideComponents = {};
const componentFiles = fs.readdirSync(componentRoot);
const env = process.env.NODE_ENV;

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
  pagePerSection: true,
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
      name: 'Getting Started',
      sectionDepth: 0,
      content: path.resolve(__dirname, './docs/introduction/index.md'),
      sections: [
        {
          name: 'Installation',
          content: path.resolve(__dirname, 'docs/introduction/installation.md'),
        },
        {
          name: 'Usage',
          content: path.resolve(__dirname, 'docs/introduction/usage.md'),
        },
        {
          name: 'Available Components',
          content: path.resolve(__dirname, 'docs/introduction/components.md'),
        },
        {
          name: 'Support',
          content: path.resolve(__dirname, 'docs/introduction/support.md'),
        },
      ],
    },
    {
      name: 'Components',
      sectionDepth: 0,
      components: path.resolve(__dirname, 'src/components/**/*.tsx'),
    },
    {
      name: 'Styleguide',
      sectionDepth: 0,
      content: path.resolve(__dirname, './docs/styleguide/index.md'),
      sections: [
        {
          name: 'Colors',
          content: path.resolve(__dirname, 'docs/styleguide/colors.md'),
        },
        {
          name: 'Pattern Library',
          content: path.resolve(__dirname, 'docs/styleguide/pattern.md'),
        },
        {
          name: 'Types',
          content: path.resolve(__dirname, 'docs/styleguide/types.md'),
        },
        {
          name: 'Typography',
          content: path.resolve(__dirname, 'docs/styleguide/typography.md'),
        },
      ],
    },
    {
      name: 'Theme',
      sectionDepth: 0,
      content: path.resolve(__dirname, './docs/theme/index.md'),
      sections: [
        {
          name: 'Colors',
          content: path.resolve(__dirname, 'docs/theme/colors.md'),
        },
      ],
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
        backgroundImage: 'url(logo.svg)',
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
  styleguideDir: path.join(__dirname, `${env === 'test' ? 'integration/' : ''}styleguide`),
};
