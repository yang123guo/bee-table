import React, { Component } from "react";
import Checkbox from "bee-checkbox";
/**
 * multiSelect={
 *  type--默认值为checkbox
 *  param--可以设置返回的选中的数据属性；默认值：null；
 * }
 * getSelectedDataFunc--function，能获取到选中的数据
 * 使用全选时得注意，data中的key值一定要是唯一值
 */
export default function multiSelect(Table) {
  Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
    }
    return -1;
  };
  Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
  return class multiSelect extends Component {
    constructor(props) {
      super(props);
      let { data } = props,
        checkedObj = this.initCheckedObj(props);
      this.state = {
        checkedAll: false,
        checkedObj: checkedObj,
        selIds: [],
        data: this.props.data
      };
    }
    componentWillReceiveProps(nextProps) {
      let props = this.props,
        { selectDisabled, selectedRow, data } = props,
        checkedObj = {};
      if (
        nextProps.data !== data ||
        nextProps.selectDisabled !== selectDisabled ||
        nextProps.selectedRow !== selectedRow
      ) {
        checkedObj = this.initCheckedObj(nextProps);
        this.setState({
          checkedAll: false,
          checkedObj: checkedObj,
          selIds: [],
          data: nextProps.data
        });
      }
    }
    getRowKey=(record, index) => {
      const rowKey = this.props.rowKey || 'key';
      const key = (typeof rowKey === 'function') ?
        rowKey(record, index) : record[rowKey];
      return key;
    }
    initCheckedObj = props => {
      let checkedObj = {},
        { selectDisabled, selectedRow, data } = props;
      for (var i = 0; i < data.length; i++) {
        let bool = (selectDisabled && selectDisabled(data[i], i)) || false;
        let rowKey = data[i]["key"] ? data[i]["key"] : this.getRowKey(data[i],i);
        if (!bool) {
          checkedObj[rowKey] =
            (selectedRow && selectedRow(data[i], i)) || false;
        }
      }
      return checkedObj;
    };
    onAllCheckChange = () => {
      let self = this;
      let listData = self.state.data.concat();
      let checkedObj = Object.assign({}, self.state.checkedObj);
      let { data } = self.props;
      let selIds = [];
      let id = self.props.multiSelect.param;
      if (self.state.checkedAll) {
        selIds = [];
      } else {
        for (var i = 0; i < listData.length; i++) {
          if (id) {
            selIds[i] = listData[i][id];
          } else {
            selIds[i] = listData[i];
          }
        }
      }
      for (var i = 0; i < data.length; i++) {
        let rowKey = data[i]["key"] ? data[i]["key"] : this.getRowKey(data[i],i);
        let bool = checkedObj.hasOwnProperty(rowKey);
        if (!bool) {
          selIds.splice(i, 1);
        } else {
          checkedObj[rowKey] = !self.state.checkedAll;
        }
      }
      self.setState({
        checkedAll: !self.state.checkedAll,
        checkedObj: checkedObj,
        selIds: selIds
      });
      self.props.getSelectedDataFunc(selIds);
    };
    onCheckboxChange = (text, record, index) => {
      let self = this;
      let allFlag = false;
      let selIds = self.state.selIds;
      let id = self.props.multiSelect
        ? self.props.multiSelect.param
          ? record[self.props.multiSelect.param]
          : record
        : record;
      let checkedObj = Object.assign({}, self.state.checkedObj);
      let checkedArray = Object.keys(checkedObj);
      let { getSelectedDataFunc } = self.props;
      let rowKey = record["key"] ? record["key"] : this.getRowKey(record,i);
      if (checkedObj[rowKey]) {
        selIds.remove(id);
      } else {
        selIds.push(id);
      }
      checkedObj[rowKey] = !checkedObj[rowKey];
      for (var i = 0; i < checkedArray.length; i++) {
        if (!checkedObj[checkedArray[i]]) {
          allFlag = false;
          break;
        } else {
          allFlag = true;
        }
      }
      self.setState({
        checkedAll: allFlag,
        checkedObj: checkedObj,
        selIds: selIds
      });
      if (typeof getSelectedDataFunc === "function") {
        getSelectedDataFunc(selIds);
      }
    };
    renderColumnsMultiSelect(columns) {
      const { data } = this.state;
      let checkedObj = Object.assign({}, this.state.checkedObj);
      let checkedArray = Object.keys(checkedObj);
      let { multiSelect } = this.props;
      let select_column = {};
      let indeterminate_bool = false;
      if (!multiSelect || !multiSelect.type) {
        multiSelect = Object.assign({}, multiSelect, { type: "checkbox" });
      }
      if (multiSelect && multiSelect.type === "checkbox") {
        let i = checkedArray.length;
        while (i--) {
          if (checkedObj[checkedArray[i]]) {
            indeterminate_bool = true;
            break;
          }
        }
        let defaultColumns = [
          {
            title: (
              <Checkbox
                className="table-checkbox"
                checked={this.state.checkedAll}
                indeterminate={indeterminate_bool && !this.state.checkedAll}
                onChange={this.onAllCheckChange}
              />
            ),
            key: "checkbox",
            dataIndex: "checkbox",
            width: "100px",
            render: (text, record, index) => {
              let rowKey = record["key"] ? record["key"] : this.getRowKey(record,i);
              let bool = checkedObj.hasOwnProperty(rowKey);
              return (
                <Checkbox
                  className="table-checkbox"
                  checked={checkedObj[rowKey]}
                  disabled={!bool}
                  onChange={this.onCheckboxChange.bind(
                    this,
                    text,
                    record,
                    index
                  )}
                />
              );
            }
          }
        ];
        columns = defaultColumns.concat(columns);
      }
      return columns;
    }
    render() {
      let columns = this.renderColumnsMultiSelect(this.props.columns).concat();
      return <Table ref={(table_ref) => { this.table_ref = table_ref; }} {...this.props} columns={columns} />;
    }
  };
}
