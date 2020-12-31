const useLessLoader = require('storybook-less-loader')
module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async (config) => {
    const includeLessConfig = useLessLoader(config)
    return includeLessConfig
  },
};