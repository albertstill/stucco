import path from 'path';
import fs from 'fs';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const stuccoConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.stuccorc')));
const stuccoEntry = path.join(process.cwd(), '.stucco-entry.js');

const componentPath = path.join(process.cwd(), stuccoConfig.component);
const fixturesPath = path.join(process.cwd(), stuccoConfig.fixtures);
const routesPath = path.join(process.cwd(), stuccoConfig.routes);

const compiler = webpack({
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    stuccoEntry,
  ],
  output: {
    path: '/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          plugins: [[
            'react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              }],
            },
          ]],
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?modules', 'sass'],
      },
    ],
  },
});

function runServer() {
  const app = express();
  const router = new express.Router();
  const routes = require(routesPath).default;

  router.get(
    '/',
    (req, res) => {
      res.send(fs.readFileSync(path.join(__dirname, 'index.html')).toString());
    }
  );

  routes.forEach(({ pattern, method, handler }) => {
    router[method](pattern, handler);
  });

  app.use(router);
  app.use(webpackDevMiddleware(
    compiler,
    {
      path: '/',
      filename: 'bundle.js',
      publicPath: '/',
    }
  ));

  app.use(webpackHotMiddleware(compiler));

  app.listen(3000, () => {});
}

function template() {
  const playgroundPath = path.join(__dirname, 'playground.js');

  return `
    import React from 'react';
    import ReactDOM from 'react-dom';
    import Playground from '${playgroundPath}';
    const Component = require('${componentPath}').default;
    const fixtures = require('${fixturesPath}').default;
    const mountNode = document.querySelector('.app');

    ReactDOM.render(
      <Playground component={ Component } fixtures={ fixtures } />,
      mountNode
    );
  `;
}

function createEntryFile() {
  return new Promise((res, rej) => {
    fs.writeFile(
      stuccoEntry,
      template(),
      { encoding: 'utf-8' },
      path.join(process.cwd(), '.stucco-entry.js'),
      err => {
        if (err) {
          return rej(err);
        }

        return res();
      });
  });
}

createEntryFile().then(() => runServer());
