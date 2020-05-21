module.exports = {
  globalSetup: '<rootDir>/testing/globalSetup.js',
  moduleDirectories: ['<rootDir>/src', '<rootDir>/node_modules'],
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/testing/envSetup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/*.test.js'],
  transform: {'^.+\\.js$': '<rootDir>/testing/babelizer.js'},
  transformIgnorePatterns: ['.*/signal-exit/.*', '.*/is-typedarray/.*'],
  verbose: true,
}
