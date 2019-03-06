import { ElementHandle } from 'puppeteer';

const componentsUrl = 'http://host.docker.internal:6065/#/Components';

async function getPreviewInfo($preview: ElementHandle<Element>) {
  const { name, link, skip } = await page.evaluate(obj => {
    let link: string;
    const { nextElementSibling } = obj;
    if (nextElementSibling) {
      const links = nextElementSibling.getElementsByTagName('a');
      if (links[1]) {
        link = links[1].hash;
      }
    }

    return {
      skip: obj.getAttribute('data-skip'),
      name: obj.getAttribute('data-preview'),
      link,
    };
  }, $preview);

  const match = link && link.match(/[0-9]+$/);
  const index = match ? match[0] : 0;

  return {
    boundingBox: await $preview.boundingBox(),
    identifier: `${name}_${index}`,
    link,
    skip,
  };
}

describe('Visual testing', async () => {
  beforeAll(async () => {
    await page.goto(componentsUrl, { waitUntil: 'networkidle2' });
  });

  test('Snapshots', async () => {
    const $components = await page.$$('[data-preview]');
    const testDada = await Promise.all(await $components.map(getPreviewInfo));

    const result = await Promise.all(
      testDada
        .filter(({ skip }) => !skip)
        .map(async ({ boundingBox, identifier, link }) => {
          const screenshot = await page.screenshot({ clip: boundingBox });
          try {
            expect(screenshot).toMatchImageSnapshot({
              customSnapshotIdentifier: identifier,
            });
          } catch (e) {
            return `${e}\n/${link}`;
          }

          return;
        }),
    );

    const errors = result.filter(error => !!error);
    if (errors.length) {
      throw new Error(errors.join('\n'));
    }
  });
});
