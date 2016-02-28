var path = require('path');
var fs = require('fs');

var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var compiler = webpack({
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.join(__dirname, '../client/index.js'),
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
    loaders: [{
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
    }],
  },
});

var app = express();
var router = express.Router();

router.get(
  '/',
  (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, '../index.html')).toString());
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
