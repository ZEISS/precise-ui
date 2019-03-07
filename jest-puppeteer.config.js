const getConfig = require('jest-puppeteer-docker/lib/config');

const baseConfig = getConfig();

module.exports = Object.assign({}, baseConfig, {
  server: {
    command: 'npm run serve:test',
    port: 6065,
  },
});
