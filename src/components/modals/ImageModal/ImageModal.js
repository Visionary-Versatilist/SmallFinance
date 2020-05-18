import { Button, Dialog } from '@material-ui/core';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import React, { Component } from 'react';
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import { withRouter } from "react-router-dom";
import '../customdaterange/customdaterange.scss';
import crosscancel from "../../../assets/images/crosscancel.svg";
// import ImageOne from "../../../assets/images/sharepageImage.svg"
// import  {DateRangePicker}  from 'material-ui-datetime-range-picker';
const moment = extendMoment(originalMoment);
class ImageModal extends Component {
  constructor(props) {
    super(props);
      this.state = {
      isOpen: false,
    };
  }
  closeprofilemodal() {
    this.props.close()
  }
  render() {
    console.log("image", this.props.image)
    return (
      <div className="imageDdi">
        <Dialog open={this.props.open}>
          {/* <div style={{display:"flex"}}> */}
          <div>
             <img src={crosscancel} alt="crosscancel" onClick={this.closeprofilemodal.bind(this)} style={{ float: "right", marginTop: "1rem" }} />
          </div>
             <div style={{width:"36rem", height:"36rem"}}>
             <img src={this.props.image} />
            </div>
          {/* </div> */}
        </Dialog>
      </div>
    )
  }
}
export default withRouter(ImageModal);