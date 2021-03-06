import React, { Component } from "react";
import Icon from "bee-icon";
import DatePicker from "bee-datepicker";
import moment from "moment";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class DateRender extends Component {
  state = {
    value: this.props.value,
    editable: false
  };
  handleChange = e => {
    let { format } = this.props || "YYYY-MM-DD";
    const value = e ? e.format(format) : "";
    this.setState({ value, editable: false });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };
  edit = () => {
    this.setState({ editable: true });
  };
  handleKeydown = event => {
    if (event.keyCode == 13) {
      this.check();
    }
  };
  render() {
    const { value, editable } = this.state;
    let { isclickTrigger, type } = this.props;
    let cellContent = "";
    let TComponent;
    switch (type.toLowerCase()) {
      case "monthpicker":
        TComponent = MonthPicker;
        break;
      // case "rangepicker":
      //   TComponent = RangePicker;
      //   break;
      case "weekpicker":
        TComponent = WeekPicker;
        break;
      default:
      TComponent = DatePicker;
        break;
    }
    TComponent;
    let date_value = value ? moment(value) : value;
    if (editable) {
      cellContent = isclickTrigger ? (
        <div className="editable-cell-input-wrapper">
          <TComponent
            {...this.props}
            value={date_value}
            onChange={this.handleChange}
          />
          <Icon
            type="uf-correct"
            className="editable-cell-icon-check"
            onClick={this.check}
          />
        </div>
      ) : (
        <div className="editable-cell-input-wrapper">
          <TComponent
            {...this.props}
            value={date_value}
            onChange={this.handleChange}
          />
          <Icon
            type="uf-correct"
            className="editable-cell-icon-check"
            onClick={this.check}
          />
        </div>
      );
    } else {
      cellContent = isclickTrigger ? (
        <div className="editable-cell-text-wrapper" onClick={this.edit}>
          {value || " "}
        </div>
      ) : (
        <div className="editable-cell-text-wrapper">
          {value || " "}
          <Icon
            type="uf-pencil"
            className="editable-cell-icon"
            onClick={this.edit}
          />
        </div>
      );
    }
    return <div className="editable-cell">{cellContent}</div>;
  }
}
DateRender.defaultProps = {
  type: "DatePicker"
};
