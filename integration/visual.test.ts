import { ElementHandle } from 'puppeteer';

const componentsUrl = 'http://host.docker.internal:6065/#/Components';

function getPreviewInfo($preview: ElementHandle<Element>) {
  return page.evaluate(obj => {
    let link: string;
    const { nextElementSibling } = obj;
    if (nextElementSibling) {
      const links = nextElementSibling.getElementsByTagName('a');
      if (links[1]) {
        link = links[1].hash;
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

describe('Visual testing', async () => {
  beforeAll(async () => {
    await page.goto(componentsUrl, { waitUntil: 'networkidle2' });
    const bodyHandle = await page.$('body');
    const boundingBox = await bodyHandle.boundingBox();
    await page.setViewport({
      width: 741,
      height: Math.ceil(boundingBox.height),
    });
  });

  test('Snapshots', async () => {
    const fails = [];
    const $components = await page.$$('[data-preview]');
    for (const $component of $components) {
      const { identifier, link, skip } = await getPreviewInfo($component);
      if (skip) {
        continue;
      }

      console.log(`Making screenshot of \`${identifier}\``);
      const screenshot = await $component.screenshot();
      try {
        expect(screenshot).toMatchImageSnapshot({
          customSnapshotIdentifier: identifier,
        });
      } catch (e) {
        fails.push(`${e}\n/${link}`);
      }
    }

    if (fails.length) {
      throw new Error(fails.join('\n'));
    }
  });
});
