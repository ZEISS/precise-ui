module.exports = {
  setupFilesAfterEnv: ['./test-environment-setup.js'],
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  setupTestFrameworkScriptFile: undefined,
  testEnvironment: './testEnvironment.js',
  preset: 'jest-puppeteer-docker',
  testRegex: './*\\.test\\.(?:t|j)s$',
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
