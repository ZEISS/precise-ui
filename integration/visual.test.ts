import { ElementHandle } from 'puppeteer';
import console = require('console');

const componentsUrl = 'http://host.docker.internal:6065/#/Components';

function getPreviewInfo($preview: ElementHandle<Element>) {
  return page.evaluate(obj => {
    let link: string;
    const { nextElementSibling } = obj;
    if (nextElementSibling) {
      const links = nextElementSibling.getElementsByTagName('a');
      if (links[1]) {
        link = links[1].href;
      }
    }

    const match = link && link.match(/[0-9]+$/);
    const index = match ? match[0] : 0;
    const name = obj.getAttribute('data-preview');

    return {
      identifier: `${name}_${index}`,
      skip: obj.getAttribute('data-skip'),
      name,
      link,
    };
  }, $preview);
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Visual testing', async () => {
  beforeAll(async () => {
    await page.goto(componentsUrl, { waitUntil: 'networkidle2' });
  });

  test('Snapshots', async () => {
    const fails = [];
    const $components = await page.$$('[data-preview]');
    const data = (await Promise.all($components.map(getPreviewInfo))).filter(({ skip }) => !skip);
    for (const { identifier, link } of data) {
      await page.goto(link);
      await wait(100);

      const $component = await page.$('[data-preview]');

      console.log(`Making screenshot of \`${identifier}\``);

      const screenshot = await $component.screenshot();
      try {
        expect(screenshot).toMatchImageSnapshot({
          customSnapshotIdentifier: identifier,
        });
      } catch (e) {
        fails.push(`${e}\n${link}`);
      }
    }

    if (fails.length) {
      throw new Error(fails.join('\n'));
    }
  });
});
