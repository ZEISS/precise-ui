const { setup: setupPuppeteer } = require('jest-puppeteer-docker');
const exec = require('child_process').exec;

const buildDemo = () =>
  new Promise((resolve, reject) => {
    const builder = exec('npm run build:demo:test', undefined, resolve);
    builder.on('error', reject)
    builder.stdout.pipe(process.stdout)
    builder.stderr.pipe(process.stderr)
  });

module.exports = jestConfig => Promise.all([buildDemo(), setupPuppeteer(jestConfig)]);
