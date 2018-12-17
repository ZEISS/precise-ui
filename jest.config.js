module.exports = {
  setupFiles: [
    './test/unit/temp-polyfills.ts',
    './test/unit/setup.ts'
  ],
  transform: {
    '^.+\\.(ts|tsx?)$': './node_modules/ts-jest/preprocessor.js',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
