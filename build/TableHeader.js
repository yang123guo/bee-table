'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  clsPrefix: _propTypes2["default"].string,
  rowStyle: _propTypes2["default"].object,
  rows: _propTypes2["default"].array
};

var TableHeader = function (_Component) {
  _inherits(TableHeader, _Component);

  function TableHeader(props) {
    _classCallCheck(this, TableHeader);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  TableHeader.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !(0, _shallowequal2["default"])(nextProps, this.props);
  };

  TableHeader.prototype.render = function render() {
    var _props = this.props,
        clsPrefix = _props.clsPrefix,
        rowStyle = _props.rowStyle,
        rows = _props.rows;

    return _react2["default"].createElement(
      'thead',
      { className: clsPrefix + '-thead' },
      rows.map(function (row, index) {
        return _react2["default"].createElement(
          'tr',
          { key: index, style: rowStyle },
          row.map(function (cellProps, i) {
            return _react2["default"].createElement('th', _extends({}, cellProps, { key: i }));
          })
        );
      })
    );
  };

  return TableHeader;
}(_react.Component);

;

TableHeader.propTypes = propTypes;

exports["default"] = TableHeader;
module.exports = exports['default'];