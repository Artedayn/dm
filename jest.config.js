module.exports = {
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.jest/mocks/fileMock.js',
    '\\.(.+ss|stylus)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '.+\\.(ts)$': 'ts-jest',
    '.+\\.(vue)$': 'vue-jest',
    '^.+\\.(js)$': '<rootDir>/.jest/jest.transform.js',
  },

  testRegex: '.+/__tests__/.+\\.(spec|test).ts$',
  transformIgnorePatterns: ['/node_modules/(?!@babel/runtime)'],
  setupFiles: ['<rootDir>/.jest/jest.setup.js'],

  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!**/*.{test,spec}.{ts,tsx}',
    '!**/*.d.ts',
    '!**/*.stories.{ts,tsx}',
  ],
  coverageReporters: ['text-summary', 'html', 'lcov', 'clover'],
};
