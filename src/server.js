import path from 'path';
import fs from 'fs';
import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { getStuccorcJSON } from './util';

function generateWebpackCompiler(entryPath) {
  return webpack({
    entry: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      entryPath,
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
          loaders: [
            'style',
            'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'sass',
          ],
        },
      ],
    },
    sassLoader: {
      includePaths: ['node_modules'],
    },
  });
}

export default function runServer() {
  const stuccoEntry = getStuccorcJSON().entry;
  if (!stuccoEntry) {
    throw new Error('No `entry` field found in .stuccorc');
  }
  const stuccoEntryPath = path.join(process.cwd(), stuccoEntry);
  const compiler = generateWebpackCompiler(stuccoEntryPath);

  const app = express();
  const router = new express.Router();

  const routesPath = getStuccorcJSON().routes;
  if (!routesPath) {
    throw new Error('No `routes` field found in .stuccorc');
  }
  const routes = require(path.join(process.cwd(), routesPath)).default;
  // parse application/json
  app.use(bodyParser.json({ limit: Number.MAX_VALUE }));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true, limit: Number.MAX_VALUE }));

  routes.forEach(({ pattern, method, handler }) => {
    router[method](pattern, handler);
  });

  // default to index.html if no root path is set in the users Stucco config
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

  // returns static files. Paths are relative to where the Node process is started.
  app.use(express.static('./'));

  app.listen(3000, () => {});
}
