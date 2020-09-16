const getConfig = require('jest-puppeteer-docker/lib/config');

const baseConfig = getConfig();

module.exports = Object.assign({}, baseConfig, {
  chromiumFlags: ["–ignore-certificate-errors"],
  server: {
    command: 'npm run serve:test',
    port: 6065,
  },
  connect: {
    ...baseConfig.connect,
    defaultViewport: {
      width: 900,
      height: 800,
    },
  },
});
