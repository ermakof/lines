/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  tsconfigFile: 'tsconfig.json',
  buildCommand: 'npm run build',
  tempDirName: 'stryker-tmp',
  checkers: ['typescript'],
};
