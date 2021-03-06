'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TableCell = require('./TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _ExpandIcon = require('./ExpandIcon');

var _ExpandIcon2 = _interopRequireDefault(_ExpandIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  onDestroy: _propTypes2["default"].func,
  onRowClick: _propTypes2["default"].func,
  onRowDoubleClick: _propTypes2["default"].func,
  record: _propTypes2["default"].object,
  clsPrefix: _propTypes2["default"].string,
  expandIconColumnIndex: _propTypes2["default"].number,
  onHover: _propTypes2["default"].func,
  columns: _propTypes2["default"].array,
  height: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].number]),
  visible: _propTypes2["default"].bool,
  index: _propTypes2["default"].number,
  hoverKey: _propTypes2["default"].any,
  expanded: _propTypes2["default"].bool,
  expandable: _propTypes2["default"].any,
  onExpand: _propTypes2["default"].func,
  needIndentSpaced: _propTypes2["default"].bool,
  className: _propTypes2["default"].string,
  indent: _propTypes2["default"].number,
  indentSize: _propTypes2["default"].number,
  expandIconAsCell: _propTypes2["default"].bool,
  expandRowByClick: _propTypes2["default"].bool,
  store: _propTypes2["default"].object.isRequired
};

var defaultProps = {
  onRowClick: function onRowClick() {},
  onRowDoubleClick: function onRowDoubleClick() {},
  onDestroy: function onDestroy() {},

  expandIconColumnIndex: 0,
  expandRowByClick: false,
  onHover: function onHover() {}
};

var TableRow = function (_Component) {
  _inherits(TableRow, _Component);

  function TableRow(props) {
    _classCallCheck(this, TableRow);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      hovered: false
    };
    _this.onRowClick = _this.onRowClick.bind(_this);
    _this.onRowDoubleClick = _this.onRowDoubleClick.bind(_this);
    _this.onMouseEnter = _this.onMouseEnter.bind(_this);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this);

    return _this;
  }

  TableRow.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _props = this.props,
        store = _props.store,
        hoverKey = _props.hoverKey;

    this.unsubscribe = store.subscribe(function () {
      if (store.getState().currentHoverKey === hoverKey) {
        _this2.setState({ hovered: true });
      } else if (_this2.state.hovered === true) {
        _this2.setState({ hovered: false });
      }
    });
  };

  TableRow.prototype.componentWillUnmount = function componentWillUnmount() {
    var _props2 = this.props,
        record = _props2.record,
        onDestroy = _props2.onDestroy,
        index = _props2.index;

    onDestroy(record, index);
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  TableRow.prototype.onRowClick = function onRowClick(event) {
    var _props3 = this.props,
        record = _props3.record,
        index = _props3.index,
        onRowClick = _props3.onRowClick,
        expandable = _props3.expandable,
        expandRowByClick = _props3.expandRowByClick,
        expanded = _props3.expanded,
        onExpand = _props3.onExpand;

    if (expandable && expandRowByClick) {
      onExpand(!expanded, record, index, event);
    }
    onRowClick(record, index, event);
  };

  TableRow.prototype.onRowDoubleClick = function onRowDoubleClick(event) {
    var _props4 = this.props,
        record = _props4.record,
        index = _props4.index,
        onRowDoubleClick = _props4.onRowDoubleClick;

    onRowDoubleClick(record, index, event);
  };

  TableRow.prototype.onMouseEnter = function onMouseEnter() {
    var _props5 = this.props,
        onHover = _props5.onHover,
        hoverKey = _props5.hoverKey;

    onHover(true, hoverKey);
  };

  TableRow.prototype.onMouseLeave = function onMouseLeave() {
    var _props6 = this.props,
        onHover = _props6.onHover,
        hoverKey = _props6.hoverKey;

    onHover(false, hoverKey);
  };

  TableRow.prototype.render = function render() {
    var _props7 = this.props,
        clsPrefix = _props7.clsPrefix,
        columns = _props7.columns,
        record = _props7.record,
        height = _props7.height,
        visible = _props7.visible,
        index = _props7.index,
        expandIconColumnIndex = _props7.expandIconColumnIndex,
        expandIconAsCell = _props7.expandIconAsCell,
        expanded = _props7.expanded,
        expandRowByClick = _props7.expandRowByClick,
        expandable = _props7.expandable,
        onExpand = _props7.onExpand,
        needIndentSpaced = _props7.needIndentSpaced,
        indent = _props7.indent,
        indentSize = _props7.indentSize;
    var className = this.props.className;


    if (this.state.hovered) {
      className += ' ' + clsPrefix + '-hover';
    }

    var cells = [];

    var expandIcon = _react2["default"].createElement(_ExpandIcon2["default"], {
      expandable: expandable,
      clsPrefix: clsPrefix,
      onExpand: onExpand,
      needIndentSpaced: needIndentSpaced,
      expanded: expanded,
      record: record
    });

    for (var i = 0; i < columns.length; i++) {
      if (expandIconAsCell && i === 0) {
        cells.push(_react2["default"].createElement(
          'td',
          {
            className: clsPrefix + '-expand-icon-cell',
            key: 'rc-table-expand-icon-cell'
          },
          expandIcon
        ));
      }
      var isColumnHaveExpandIcon = expandIconAsCell || expandRowByClick ? false : i === expandIconColumnIndex;
      cells.push(_react2["default"].createElement(_TableCell2["default"], {
        clsPrefix: clsPrefix,
        record: record,
        indentSize: indentSize,
        indent: indent,
        index: index,
        column: columns[i],
        key: columns[i].key,
        expandIcon: isColumnHaveExpandIcon ? expandIcon : null
      }));
    }
    var style = { height: height };
    if (!visible) {
      style.display = 'none';
    }

    return _react2["default"].createElement(
      'tr',
      {
        onClick: this.onRowClick,
        onDoubleClick: this.onRowDoubleClick,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        className: clsPrefix + ' ' + className + ' ' + clsPrefix + '-level-' + indent,
        style: style
      },
      cells
    );
  };

  return TableRow;
}(_react.Component);

;

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;

exports["default"] = TableRow;
module.exports = exports['default'];