/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  tsconfigFile: 'tsconfig.json',
  mutate: ['src/**/*.ts?(x)', '!src/**/*@(.test|.spec|Spec|stories).ts?(x)'],
  buildCommand: 'npm run build',
  tempDirName: 'stryker-tmp',
  checkers: ['typescript'],
};
