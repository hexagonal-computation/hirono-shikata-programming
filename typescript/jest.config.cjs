module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.[tj]s?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['jest-expect-message', 'jest-extended/all'],
}
