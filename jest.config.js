module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src', '<rootDir>/src/test'],
    testMatch: ['<rootDir>/src/test/**/*.spec.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
      '^.+\\.ts$': ['ts-jest', {
        tsconfig: '<rootDir>/tsconfig.json',
        diagnostics: true,
      }],
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    reporters: [
      'default',
      ['jest-stare', {
        resultDir: 'jest-stare',
        reportTitle: 'NotifyLog Test Results',
        coverageLink: '../coverage/lcov-report/index.html',
      }],
    ],
  };