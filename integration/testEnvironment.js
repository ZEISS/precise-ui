const PuppeteerEnvironment = require('jest-puppeteer-docker');

const componentsUrl = 'http://host.docker.internal:6065/#/Components';

class PuppeteerExtendedEnvironment extends PuppeteerEnvironment {
  getPreviewInfo($preview) {
    return this.global.page.evaluate(obj => {
      let link;
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
        link,
        ...obj.dataset,
      };
    }, $preview);
  }

  async setup() {
    await super.setup();
    await this.setupComponents();
    await this.global.jestPuppeteer.resetPage();
  }

  async setupComponents() {
    const { page } = this.global;
    await page.goto(componentsUrl, { waitUntil: 'networkidle2' });
    const $components = await page.$$('[data-preview]');
    this.global.components = await Promise.all($components.map($preview => this.getPreviewInfo($preview)));
  }
}

module.exports = PuppeteerExtendedEnvironment;
