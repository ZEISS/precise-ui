module.exports = {
  setupFilesAfterEnv: ['./test-environment-setup.js'],
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  setupTestFrameworkScriptFile: undefined,
  preset: 'jest-puppeteer-docker',
  testRegex: './*\\.test\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx?)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
