function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Visual testing', () => {
  test('Components available', () => expect(components && components.length > 0).toBeTruthy());

  if (components && components.length) {
    for (const { identifier, link, skip, wait: waitMs } of components) {
      const testFunction = skip ? test.skip : test;

      testFunction(identifier, async () => {
        await page.goto(link);
        if (waitMs) {
          await wait(waitMs);
        }

        const $component = await page.$('[data-preview]');

        const screenshot = await $component.screenshot();
        try {
          expect(screenshot).toMatchImageSnapshot({
            customSnapshotIdentifier: identifier,
          });
        } catch (e) {
          throw new Error(`${e}\n${link}`);
        }
      });
    }
  }
});
