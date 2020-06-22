import { Button, Dialog } from '@material-ui/core';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import React, { Component } from 'react';
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import { withRouter } from "react-router-dom";
import '../customdaterange/customdaterange.scss';
import crosscancel from "../../../assets/images/crosscancel.svg"
// import  {DateRangePicker}  from 'material-ui-datetime-range-picker';
const moment = extendMoment(originalMoment);

class Customdaterange extends Component {
  constructor(props, context) {
    super(props, context);
    const today = moment();
    this.state = {
      isOpen: false,
      isDateValid: true,
      isOnlyPast: false,
      value: moment.range(today.clone().subtract(7, "days"), today.clone())
    };
  }

  componentDidMount() {
    console.log('custom date component did mount ', this.props.isOnlyPast)
    const { isOnlyPast } = this.props
    isOnlyPast && this.setState({ isOnlyPast });
  }
  onSelect = (value, states) => {
    this.setState({ value, states });
  };
  closeprofilemodal() {
    this.props.close()
  }
  save() {
    const { isOnlyPast } = this.state
    console.log('isOnlyPAst ', isOnlyPast)
    let isDatePast
    //check 'isOnlyPast' is true, validate for past date or date will be without any restriction
    isDatePast = isOnlyPast ? this.state.value.end.isSameOrBefore(moment().endOf('D')) : true

    if (isDatePast) {
      this.props.save({
        start: this.state.value.start.startOf('d').format("DD MMM YYYY HH:mm:mm"),
        end: this.state.value.end.endOf('d').format("DD MMM YYYY HH:mm:mm")
      })
      this.closeprofilemodal()
    } else {
      this.setState({ isDateValid: false });
    }
  }
  render() {
    const { isDateValid } = this.state
    return (
      <div className="daterange">
        <Dialog open={this.props.open}>
          <div style={{ display: "flex" }}>
            <div
              style={{ marginTop: "1rem", marginLeft: "11rem", color: "#3e4664 !important" }}
              className="Fonts"
            >
              Custom Date Range
             {!isDateValid && <div className='invalidDate' >Please select a date that is atleast 1 business day from now</div>}
            </div>
            <img src={crosscancel} alt="crosscancel" onClick={this.closeprofilemodal.bind(this)} style={{ marginLeft: "7rem", marginTop: "1rem" }} />
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <div style={{ marginTop: "4rem", marginLeft: "1rem" }}>
                <div>
                  From:&nbsp;&nbsp;<span style={{ border: "1px solid lightgrey", borderRadius: "5px", padding: "5px" }}> {this.state.value.start.format("DD-MM-YYYY")} </span>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ border: "1px solid lightgrey", borderRadius: "5px", padding: "5px" }}> {this.state.value.end.format("DD-MM-YYYY")} </span>
                </div>
              </div>
              <div style={{ marginTop: "26px", marginLeft: "4rem" }}>
                {/* <Button onClick={this.closeprofilemodal.bind(this)}>Cancel</Button> */}
                <Button onClick={this.save.bind(this)} style={{ backgroundColor: "#00D95E", color: "#ffff" }}>Go!</Button>
              </div>
            </div>
            <div style={{ marginTop: "3rem" }}>
              <DateRangePicker
                value={this.state.value}
                onSelect={this.onSelect}
                singleDateRange={true}
              />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}
export default withRouter(Customdaterange);