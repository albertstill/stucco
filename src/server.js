import path from 'path';
import fs from 'fs';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const stuccoEntry = path.join(process.cwd(), '.stucco-entry.js');
const appEntry = path.join(process.cwd(), 'src/index.js');

function runServer() {
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
          exclude: /node_modules/,
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
          exclude: /node_modules/,
          loaders: ['style', 'css?modules', 'sass'],
        },
      ],
    },
  });

  const app = express();
  const router = new express.Router();

  router.get(
    '/',
    (req, res) => {
      res.send(fs.readFileSync(path.join(__dirname, 'index.html')).toString());
    }
  );

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
    const Component = require('${appEntry}');
    const mountNode = document.querySelector('.app');

    ReactDOM.render(
      <Playground component={ Component.Component } fixtures={ Component.fixtures } />,
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