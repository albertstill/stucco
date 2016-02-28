'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compiler = (0, _webpack2.default)({
  entry: ['webpack/hot/dev-server', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', _path2.default.join(process.cwd(), 'src/index.js')],
  output: {
    path: '/'
  },
  plugins: [new _webpack2.default.optimize.OccurrenceOrderPlugin(), new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoErrorsPlugin()],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015'],
        plugins: [['react-transform', {
          transforms: [{
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
          }]
        }]]
      }
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ['style', 'css', 'sass']
    }]
  }
});

var app = (0, _express2.default)();
var router = new _express2.default.Router();

router.get('/', function (req, res) {
  res.send(_fs2.default.readFileSync(_path2.default.join(__dirname, 'index.html')).toString());
});

app.use(router);
app.use((0, _webpackDevMiddleware2.default)(compiler, {
  path: '/',
  filename: 'bundle.js',
  publicPath: '/'
}));

app.use((0, _webpackHotMiddleware2.default)(compiler));

app.listen(3000, function () {});