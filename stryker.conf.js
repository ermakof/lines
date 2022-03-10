/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  coverageAnalysis: 'perTest',
  tsconfigFile: 'tsconfig.json',
  mutate: [
    'src/modules/HitParade/PlayerListRow.ts?(x)',
    '!src/**/*@(.test|.spec|Spec|stories).ts?(x)',
    '!src/store/index.ts',
    '!src/index.tsx',
  ],
  buildCommand: 'npm run build',
  tempDirName: 'stryker-tmp',
  checkers: ['typescript'],
  jest: {
    configFile: 'jest.config.js',
    enableFindRelatedTests: false,
  },
};
