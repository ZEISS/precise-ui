module.exports = {
  setupFiles: ['./test/setup.ts'],
  setupFilesAfterEnv: ['./test/setupTest.ts'],
  transform: {
    '^.+\\.(ts|tsx?)$': 'ts-jest',
    "^.+\\.js$": "babel-jest",
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  roots: ['src'],
  "transformIgnorePatterns": [
    "/node_modules/(?!date-fns).+\\.js$"
  ]
};
