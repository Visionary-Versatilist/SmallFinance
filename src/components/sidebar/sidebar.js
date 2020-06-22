import Tooltip from "@material-ui/core/Tooltip";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import customerloan from "../../assets/images/customerloan.svg";
import dashboard from "../../assets/images/dashboard.svg";
import details from "../../assets/images/details.svg";
import help from "../../assets/images/help.svg";
import loan from "../../assets/images/loan.svg";
import members from "../../assets/images/members.svg";
import share from "../../assets/images/share.svg";
import userdefault from '../../assets/images/userdefault.svg';
import ProfileModal from "../modals/profile modal/profileModal";
import "../sidebar/sidebar.scss";
import { withRouter } from "react-router-dom";
import {BaseUrl,ImageBaseUrl } from "../../Environment"


const axios = require('axios')

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      openmodal: false,
      dashboardStyle:false,
      allnewcustomersStyle:false,
      customerStyle:false,
      loantypeStyle:false,
      collectionreportStyle:false,
      shareStyle:false,
      helpStyle:false,
      ProfileStyle:false,
      loggedinUserDetails:"",
      profilecard:"2px solid lightgrey"
    };
    this.openprofileModal = this.openprofileModal.bind(this);
    this.closemodal = this.closemodal.bind(this);
    this.GetData = this.GetData.bind(this);
  }
  openprofileModal() {
    this.setState({
      openmodal: true,
      profilecard:"1px solid 00D95E"

    });
  }
  closemodal() {
    this.setState({
      openmodal: false
    });
  }
  GetData() {
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
    }
    let details = JSON.parse(localStorage.getItem("loggedinUser"))

    axios.get(BaseUrl + '/user/getUserDetails?userId=' + details.userId, {
        headers: headers,
    }).then(resp => {
        if (resp.status === 200) {
            this.setState({
                loggedinUserDetails: resp.data,
            })
            if (resp.data.userType == "Admin") {
                this.setState({
                    adminaccess: ""
                })
            } else {
                this.setState({
                    adminaccess: "none"
                })
            }            } else {
            toast.error("Please try again later!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        }
    })
}


  componentDidMount(){
    if(localStorage.getItem('token')){
    this.GetData()
    if(window.location.href.split('#')[1] === "/dashboard" ){
      this.setState({
        dashboardStyle:true,
      allnewcustomersStyle:false,
      customerStyle:false,
      loantypeStyle:false,
      collectionreportStyle:false,
      shareStyle:false, 
      helpStyle:false,
      ProfileStyle:false,
      profilecard:"2px solid lightgrey"
     })
    } else if(window.location.href.split('#')[1] === "/allnewcustomers" || window.location.href.split('#')[1] === "/customers/addcustomer" || window.location.href.split('#')[1] === "/addloannointerest"  ) {
      this.setState({
        dashboardStyle:false,
        allnewcustomersStyle:true,
        customerStyle:false,
        loantypeStyle:false,
        collectionreportStyle:false,
        shareStyle:false,
        helpStyle:false,
        ProfileStyle:false,
        profilecard:"2px solid lightgrey"

      })
    }else if(window.location.href.split('#')[1] === "/customer" || window.location.href.split('#')[1] === "/addloannointerest" || window.location.href.split('#')[1] === "/customers/customerinfo"  || window.location.href.split('#')[1] === "/customer/duecustomer"  || window.location.href.split('#')[1] === "/customer/overduecustomer" || window.location.href.split('#')[1] === "/customer/closedcustomer"|| window.location.href.split('#')[1] === "/customer/newcustomer" ) {
      this.setState({
        dashboardStyle:false,
        allnewcustomersStyle:false,
        customerStyle:true,
        loantypeStyle:false,
        collectionreportStyle:false,
        shareStyle:false,
        ProfileStyle:false,
        profilecard:"2px solid lightgrey"

      })
    }else if(window.location.href.split('#')[1] === "/loantype" || window.location.href.split('#')[1] === "/loan/editloan" || window.location.href.split('#')[1] === "/addloan"  ) {
      this.setState({
        dashboardStyle:false,
        allnewcustomersStyle:false,
        customerStyle:false,
        loantypeStyle:true,
        collectionreportStyle:false,
        shareStyle:false,
        helpStyle:false,
        ProfileStyle:false,
        profilecard:"2px solid lightgrey"

      })
    }else if(window.location.href.split('#')[1] === "/collectionreport") {
      this.setState({
        dashboardStyle:false,
        allnewcustomersStyle:false,
        customerStyle:false,
        loantypeStyle:false,
        collectionreportStyle:true,
        shareStyle:false,
        ProfileStyle:false,
        profilecard:"2px solid lightgrey"

      })
    }else if(window.location.href.split('#')[1] === "/share" ) {
      this.setState({
        dashboardStyle:false,
        allnewcustomersStyle:false,
        customerStyle:false,
        loantypeStyle:false,
        collectionreportStyle:false,
        shareStyle:true,
        helpStyle:false,
        ProfileStyle:false,
        profilecard:"2px solid lightgrey"

      })
    }else if(window.location.href.split('#')[1] === "/help" ) {
      this.setState({
        dashboardStyle:false,
        allnewcustomersStyle:false,
        customerStyle:false,
        loantypeStyle:false,
        collectionreportStyle:false,
        shareStyle:false,
        helpStyle:true,
        ProfileStyle:false,
        profilecard:"2px solid lightgrey"

      })
    }else if(window.location.href.split('#')[1] === "/usermanagement" || window.location.href.split('#')[1] === "/usermanagement/adduser" || window.location.href.split('#')[1] === "/registercompanyprofile" || window.location.href.split('#')[1] === "/companyprofile" || window.location.href.split('#')[1] === "/companyprofile/edit"  || window.location.href.split('#')[1] === "/updateadmin" || window.location.href.split('#')[1] === "/updatepassword") {
      this.setState({
        dashboardStyle:false,
        allnewcustomersStyle:false,
        customerStyle:false,
        loantypeStyle:false,
        collectionreportStyle:false,
        shareStyle:false,
        helpStyle:false,
        ProfileStyle:true,
        profilecard:"2px solid 00D95E"
      })
    }
  }else {
    this.props.history.push("/")
  }  
  }



  render() {
    // const theme = createMuiTheme({
    //     overrides: {
    //       // Style sheet name ⚛️
    //       MuiTooltip: {
    //         // Name of the rule
    //         tooltip: {
    //           // Some CSS
    //           rippleBackgroundColor:' #3E4664',
    //         },
    //       },
    //     },
    //   });
    return (
      <div className="sidepage">
        <div className="area"></div>
        <nav className="main-menu" style={{ position: "fixed" }}>
          <ul>
          <div
              className="borderLeft"
              style={{ borderLeft: this.state.dashboardStyle ? "3px solid #00D95E" : '' }}
            >

            <li
              className="liClass"
              style={{ backgroundColor: this.state.dashboardStyle ? "#1fab98" : ''}}
            >
              <Link to="/dashboard">
                <Tooltip title="Dashboard" placement="top">
                  <img className="fa fa-2x" src={dashboard} alt="dashboard" />
                </Tooltip>
              </Link>
            </li>
            </div>
            <div
              className="borderLeft"
              style={{ borderLeft: this.state.allnewcustomersStyle ? "3px solid #00D95E" : '' }}
            >

            <li
              className="liClass"
              style={{ backgroundColor: this.state.allnewcustomersStyle ? "#1fab98" : ''}}
            >
              <Link to="/allnewcustomers">
                <Tooltip title="Customers" placement="top">
                  <img className="fa fa-2x" src={members} alt="customer"/>
                </Tooltip>
              </Link>
            </li>
            </div>
            <div
              className="borderLeft"
              style={{ borderLeft: this.state.customerStyle ? "3px solid #00D95E" : '' }}
            >

            <li
              className="liClass"
              style={{ backgroundColor: this.state.customerStyle ? "#1fab98" : ''}}
            >
              <Link to="/customer">
                <Tooltip title="Loans" placement="top">
                  <img className="fa fa-2x" src={customerloan} alt="loans" style={{width: "26px"}} />
                </Tooltip>
              </Link>
            </li>
            </div>
            <div
              className="borderLeft"
              style={{ borderLeft: this.state.loantypeStyle ? "3px solid #00D95E" : '' }}
            >

            <li
              className="liClass"
              style={{ backgroundColor: this.state.loantypeStyle ? "#1fab98" : ''}}
            >
              <Link to="/loantype">
                <Tooltip title="Loan Type" placement="top">
                  <img className="fa fa-2x" src={loan} alt="loan" />
                </Tooltip>
              </Link>
            </li>
            </div>
            <div
              className="borderLeft"
              style={{ borderLeft: this.state.collectionreportStyle ? "3px solid #00D95E" : '' }}
            >

            <li
              className="liClass"
              style={{ backgroundColor: this.state.collectionreportStyle ? "#1fab98" : ''}}
            >
              <Link to="/collectionreport">
                <Tooltip title="Collection Reports" placement="top">
                  <img className="fa fa-2x" src={details} alt="details" />
                </Tooltip>
              </Link>
            </li>
            </div>
            <div
              className="borderLeft"
              style={{ borderLeft: this.state.shareStyle ? "3px solid #00D95E" : '' }}
            >

            <li
              className="liClass"
              style={{ backgroundColor: this.state.shareStyle ? "#1fab98" : ''}}
            >
              <Link to="/share">
                <Tooltip title="Messaging Services" placement="top">
                  <img className="fa fa-2x" src={share} alt="share" />
                </Tooltip>
              </Link>
            </li>
            </div>
          </ul>

          <ul className="logout">
         
          <li
              className="liClass"
            >
              <Link to="/help">
                <Tooltip title="Help" placement="top">
                  <img className="fa fa-2x" src={help} alt="help"  style={{marginLeft:"15px"}}/>
                </Tooltip>
              </Link>
            </li>
            <li onClick={this.openprofileModal}   >
              {/* <Link> */}
                <Tooltip
                  title="Profile"
                  placement="top"
                  className="tooltipdetails"
                >
                  <img
                    className="fa fa-2x"       
                    src={this.state.loggedinUserDetails.userImagePath?ImageBaseUrl + this.state.loggedinUserDetails.userImagePath:userdefault}
                    alt="profile"
                    style={{ Display: "table-cell", left: "-8px", width:"29px", height: "34px", borderRadius:"10px", border:this.state.profilecard }}
                  />
                </Tooltip>
              {/* </Link> */}
            </li>
            
          </ul>
          <ProfileModal open={this.state.openmodal} close={this.closemodal} />
        </nav>
      </div>
    );
  }
}
export default withRouter(Sidebar);
