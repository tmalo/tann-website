// next.config.js
const { error: envError, parsed: localEnv } = require('dotenv').config()
const prod = process.env.NODE_ENV === "production";
const { withPlugins, optional } = require('next-compose-plugins');
const sass = require('@zeit/next-sass');
const webpack = require('webpack');
const pino = require("next-pino");
const rawloader = require('raw-loader');

// if (envError) {
//     throw envError;
// }

const nextConfig = {
  webpack: (config, options) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    // modify the `config` here
    config.module.rules.push({
      test: /\.md$/i,
      use: 'raw-loader'
    });

	config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
  
  return config;
  },
  env: {
    feedURL : process.env.FEED_URL,
    apiServer : process.env.API_SERVER,
    clientSecretKey: process.env.CLIENT_SECRETKEY
  }
};

module.exports = withPlugins([
  [sass],
  [pino]
], nextConfig);

