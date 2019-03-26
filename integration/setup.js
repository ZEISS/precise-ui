const { setup: setupPuppeteer } = require('jest-puppeteer-docker');
const exec = require('child_process').exec;

const buildDemo = () =>
  new Promise(resolve => {
    exec('npm run build:demo:test', undefined, resolve);
  });

module.exports = async jestConfig => {
  await buildDemo();
  await setupPuppeteer(jestConfig);
};
