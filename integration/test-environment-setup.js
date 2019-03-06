require('expect-puppeteer');

const { configureToMatchImageSnapshot } = require('jest-image-snapshot');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: '0.001',
  failureThresholdType: 'percent',
});

expect.extend({ toMatchImageSnapshot });

jest.setTimeout(1000 * 60 * 60);
