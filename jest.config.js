// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.types.ts',
    '!src/types.ts',
    '!src/**/*.stories.tsx',
    '!src/app.jsx',
    '!src/index.tsx',
  ],
  testEnvironment: 'jsdom',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: './temp/testResult.html',
      },
    ],
  ],
  setupFilesAfterEnv: ['<rootDir>/settings/JestSetup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/settings/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/settings/__mocks__/styleMock.js',
  },
};
