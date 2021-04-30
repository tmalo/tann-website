
// next.config.js
const { error: envError, parsed: localEnv } = require('dotenv').config()
const prod = process.env.NODE_ENV === "production";
//const { withPlugins, optional } = require('next-compose-plugins');
//const sass = require('sass');
//const webpack = require('webpack');
//const pino = require("next-pino");
const rawloader = require('raw-loader');

// if (envError) {
//     throw envError;
// }

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    config.module.rules.push({
      test: /\.md$/i,
      use: 'raw-loader'
    });

    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    // Important: return the modified config
    return config
  },
  env: {
    feedURL : process.env.FEED_URL,
    apiServer : process.env.API_SERVER,
    clientSecretKey: process.env.CLIENT_SECRETKEY
  },
}
