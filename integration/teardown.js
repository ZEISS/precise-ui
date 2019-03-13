const { teardown: teardownPuppeteer } = require('jest-puppeteer-docker');
const exec = require('child_process').exec;
const path = require('path');

const removeDemo = () =>
  new Promise(resolve => {
    exec(`rm -rf ${path.join(__dirname, 'styleguide')}`, undefined, resolve);
  });

module.exports = async jestConfig => {
  await teardownPuppeteer(jestConfig);
  await removeDemo();
};
