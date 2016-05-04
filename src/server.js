import path from 'path';
import fs from 'fs';
import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const stuccoEntry = path.join(process.cwd(), '.stucco-entry.js');

const stuccoConfig = () => JSON.parse(fs.readFileSync(path.join(process.cwd(), '.stuccorc')));
const componentPath = () => path.join(process.cwd(), stuccoConfig().component);
const fixturesPath = () => path.join(process.cwd(), stuccoConfig().fixtures);
const routesPath = () => path.join(process.cwd(), stuccoConfig().routes);

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
        test: /(\.css|\.scss)$/,
        loaders: ['style', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]', 'sass'],
      },
    ],
  },
  sassLoader: {
    includePaths: ['node_modules'],
  },
});

function runServer() {
  const app = express();
  const router = new express.Router();
  const routes = require(routesPath()).default;
  // parse application/json
  app.use(bodyParser.json({ limit: Number.MAX_VALUE }));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true, limit: Number.MAX_VALUE }));

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
    const Component = require('${componentPath()}').default;
    const fixtures = require('${fixturesPath()}').default;
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

export default function run() {
  createEntryFile().then(() => runServer()).catch(err => console.log(err));
}
