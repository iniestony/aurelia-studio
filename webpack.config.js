"use strict";

const easyWebpack = require('@easy-webpack/core');
const generateConfig = easyWebpack.default;
const get = easyWebpack.get;
const path = require('path');
const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config;

// basic configuration:
const title = "Studio";
const baseUrl = '/';
const rootDir = path.resolve();
const srcDir = path.resolve('src');
const outDir = path.resolve('dist');
const devPort = 8080;

const coreBundles = {
  bootstrap: [
    'aurelia-bootstrapper-webpack',
    'aurelia-polyfills',
    'aurelia-pal',
    'aurelia-pal-browser',
    'regenerator-runtime',
    'bluebird'
  ],
  // these will be included in the 'aurelia' bundle (except for the above bootstrap packages)
  aurelia: [
    'aurelia-bootstrapper-webpack',
    'aurelia-binding',
    'aurelia-dependency-injection',
    'aurelia-event-aggregator',
    'aurelia-framework',
    'aurelia-history',
    'aurelia-history-browser',
    'aurelia-loader',
    'aurelia-loader-webpack',
    'aurelia-logging',
    'aurelia-logging-console',
    'aurelia-metadata',
    'aurelia-pal',
    'aurelia-pal-browser',
    'aurelia-path',
    'aurelia-polyfills',
    'aurelia-route-recognizer',
    'aurelia-router',
    'aurelia-task-queue',
    'aurelia-templating',
    'aurelia-templating-binding',
    'aurelia-templating-router',
    'aurelia-templating-resources'
  ]
};

const baseConfig = {
  entry: {
    'app': [],
    'aurelia-bootstrap': coreBundles.bootstrap,
    'aurelia': coreBundles.aurelia.filter(pkg => coreBundles.bootstrap.indexOf(pkg) === -1)
  },
  output: {
    path: outDir
  }
};

// advanced configuration:
switch (ENV) {
  case 'production':
    config = generateConfig(
      baseConfig,

      require('@easy-webpack/config-env-production')
        ({compress: true}),
        
      require('@easy-webpack/config-aurelia')
        ({root: rootDir, src: srcDir, title: title, baseUrl: baseUrl}),

      require('@easy-webpack/config-babel')(),
      require('@easy-webpack/config-html')(),

      {
        plugins: [
          new ExtractTextPlugin({
            filename: 'studio.css',
            allChunks: true
          })
        ]
      },

      {
        module: {
          loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: 'css-loader'
            })
          }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: 'css-loader!sass-loader'
            })
          }]
        }
      },

      require('@easy-webpack/config-fonts-and-images')(),
      require('@easy-webpack/config-global-bluebird')(),
      require('@easy-webpack/config-global-jquery')(),
      require('@easy-webpack/config-global-regenerator')(),
      require('@easy-webpack/config-generate-index-html')
        ({minify: true}),

      // require('@easy-webpack/config-copy-files')
      //   ({patterns: [{ from: 'favicon.ico', to: 'favicon.ico' }]}),

      require('@easy-webpack/config-common-chunks-simple')
        ({appChunkName: 'app', firstChunk: 'aurelia-bootstrap'}),

      require('@easy-webpack/config-uglify')
        ({debug: false})
    );
    break;
  
  case 'test':
    config = generateConfig(
      baseConfig,

      require('@easy-webpack/config-env-development')
        ({devtool: 'inline-source-map'}),

      require('@easy-webpack/config-aurelia')
        ({root: rootDir, src: srcDir, title: title, baseUrl: baseUrl}),

      require('@easy-webpack/config-babel')(),
      require('@easy-webpack/config-html')(),

      {
        plugins: [
          new ExtractTextPlugin({
            filename: 'studio.css',
            allChunks: true
          })
        ]
      },

      {
        module: {
          loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: 'css-loader?sourceMap'
            })
          }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: 'css-loader?sourceMap!sass-loader?sourceMap'
            })
          }]
        }
      },

      require('@easy-webpack/config-fonts-and-images')(),
      require('@easy-webpack/config-global-bluebird')(),
      require('@easy-webpack/config-global-jquery')(),
      require('@easy-webpack/config-global-regenerator')(),
      require('@easy-webpack/config-generate-index-html')(),

      require('@easy-webpack/config-test-coverage-istanbul')()
    );
    break;
  
  default:
  case 'development':
    process.env.NODE_ENV = 'development';
    process.env.WEBPACK_PORT = devPort;
    config = generateConfig(
      baseConfig,

      require('@easy-webpack/config-env-development')(),

      require('@easy-webpack/config-aurelia')
        ({root: rootDir, src: srcDir, title: title, baseUrl: baseUrl}),

      require('@easy-webpack/config-babel')(),
      require('@easy-webpack/config-html')(),

      {
        plugins: [
          new ExtractTextPlugin({
            filename: 'studio.css',
            allChunks: true
          })
        ]
      },

      {
        module: {
          loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: 'css-loader?sourceMap'
            })
          }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: 'css-loader?sourceMap!sass-loader?sourceMap'
            })
          }]
        }
      },
      

      require('@easy-webpack/config-fonts-and-images')(),
      require('@easy-webpack/config-global-bluebird')(),
      require('@easy-webpack/config-global-jquery')(),
      require('@easy-webpack/config-global-regenerator')(),
      require('@easy-webpack/config-generate-index-html')
        ({minify: false}),

      // require('@easy-webpack/config-copy-files')
      //   ({patterns: [{ from: 'favicon.ico', to: 'favicon.ico' }]}),

      require('@easy-webpack/config-common-chunks-simple')
        ({appChunkName: 'app', firstChunk: 'aurelia-bootstrap'})
    );
    break;
}

module.exports = config;
