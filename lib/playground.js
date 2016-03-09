'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _playground = require('./playground.scss');

var _playground2 = _interopRequireDefault(_playground);

var _reactDock = require('react-dock');

var _reactDock2 = _interopRequireDefault(_reactDock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function toggleDock() {
  this.setState({ dockVisible: !this.state.dockVisible });
}

var Playground = function (_Component) {
  _inherits(Playground, _Component);

  function Playground(props) {
    _classCallCheck(this, Playground);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Playground).call(this, props));

    _this.state = { active: 0, dockVisible: false };
    _this.toggleDock = toggleDock.bind(_this);
    return _this;
  }

  _createClass(Playground, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var fixtureLinks = this.props.fixtures.map(function (_ref, i) {
        var label = _ref.label;
        var props = _ref.props;

        var itemClass = _this2.state.active === i ? '' + _playground2.default.active : _playground2.default.inactive;
        var key = label + JSON.stringify(props);
        var clickHandler = function clickHandler() {
          _this2.setState({ active: i });
        };

        return _react2.default.createElement(
          'li',
          { className: itemClass, key: key },
          _react2.default.createElement(
            'div',
            { style: { height: '100%' }, onClick: clickHandler },
            _react2.default.createElement(
              'div',
              { className: _playground2.default.label },
              _this2.state.active === i ? '* ' + label : label
            ),
            _react2.default.createElement(
              'div',
              { className: _playground2.default.props },
              'Props: ',
              JSON.stringify(props)
            )
          )
        );
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: _playground2.default.dockContainer },
          _react2.default.createElement(
            'div',
            { className: _playground2.default.dock },
            _react2.default.createElement(
              _reactDock2.default,
              { position: 'right', isVisible: true, dimMode: 'none' },
              _react2.default.createElement(
                'ul',
                { className: _playground2.default['fixture-list'] },
                fixtureLinks
              )
            )
          )
        ),
        _react2.default.createElement(this.props.component, this.props.fixtures[this.state.active].props)
      );
    }
  }]);

  return Playground;
}(_react.Component);

exports.default = Playground;