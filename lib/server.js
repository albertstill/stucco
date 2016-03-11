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

var stuccoConfig = JSON.parse(_fs2.default.readFileSync(_path2.default.join(process.cwd(), '.stuccorc')));
var stuccoEntry = _path2.default.join(process.cwd(), '.stucco-entry.js');

var componentPath = _path2.default.join(process.cwd(), stuccoConfig.component);
var fixturesPath = _path2.default.join(process.cwd(), stuccoConfig.fixtures);
var routesPath = _path2.default.join(process.cwd(), stuccoConfig.routes);

var compiler = (0, _webpack2.default)({
  entry: ['webpack/hot/dev-server', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', stuccoEntry],
  output: {
    path: '/'
  },
  plugins: [new _webpack2.default.optimize.OccurrenceOrderPlugin(), new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoErrorsPlugin()],
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
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
      loaders: ['style', 'css?modules', 'sass']
    }]
  }
});

function runServer() {
  var app = (0, _express2.default)();
  var router = new _express2.default.Router();
  var routes = require(routesPath).default;

  router.get('/', function (req, res) {
    res.send(_fs2.default.readFileSync(_path2.default.join(__dirname, 'index.html')).toString());
  });

  routes.forEach(function (_ref) {
    var pattern = _ref.pattern;
    var method = _ref.method;
    var handler = _ref.handler;

    router[method](pattern, handler);
  });

  app.use(router);
  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/'
  }));

  app.use((0, _webpackHotMiddleware2.default)(compiler));

  app.listen(3000, function () {});
}

function template() {
  var playgroundPath = _path2.default.join(__dirname, 'playground.js');

  return '\n    import React from \'react\';\n    import ReactDOM from \'react-dom\';\n    import Playground from \'' + playgroundPath + '\';\n    const Component = require(\'' + componentPath + '\').default;\n    const fixtures = require(\'' + fixturesPath + '\').default;\n    const mountNode = document.querySelector(\'.app\');\n\n    ReactDOM.render(\n      <Playground component={ Component } fixtures={ fixtures } />,\n      mountNode\n    );\n  ';
}

function createEntryFile() {
  return new Promise(function (res, rej) {
    _fs2.default.writeFile(stuccoEntry, template(), { encoding: 'utf-8' }, _path2.default.join(process.cwd(), '.stucco-entry.js'), function (err) {
      if (err) {
        return rej(err);
      }

      return res();
    });
  });
}

createEntryFile().then(function () {
  return runServer();
});