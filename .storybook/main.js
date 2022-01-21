module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    '@storybook/addon-actions',
    "@storybook/addon-links",
    '@storybook/addon-knobs',
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  }
}
