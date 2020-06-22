import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import editpencil from '../../../assets/images/editpencil.svg';
import buildingline from '../../../assets/images/buildingline.svg';
import administratorline from '../../../assets/images/administratorline.svg';
import userdefault from '../../../assets/images/userdefault.svg';

import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import '../profile modal/profileModal.scss';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BaseUrl,ImageBaseUrl} from "../../../Environment"
import { withNamespaces } from 'react-i18next';



const axios = require('axios')

class ProfileModal extends Component {

    constructor() {
        super();
        this.state = {
            userTextcolor: "",
            companyTextcolor: "",
            GettingloginToken: "",
            loginToken: localStorage.getItem('token'),
            loggedinUserDetails: [],
            adminaccess: "",
        }
        this.closeprofilemodal = this.closeprofilemodal.bind(this);
        this.userManagement = this.userManagement.bind(this);
    }
    closeprofilemodal() {
        this.props.close()
    }
    userManagement() {
        this.setState({
            userTextcolor: "#00D95E",
            companyTextcolor: "#3E4664"
        })
        this.props.history.push('/usermanagement')
    }
    editadminprofile() {

        this.props.history.push({ pathname: '/updateadmin', params: this.state.loggedinUserDetails })
    }
    companyprofile() {
        this.setState({
            companyTextcolor: "#00D95E",
            userTextcolor: "#3E4664",
        })
        // if (localStorage.getItem("companyId")) {
            this.props.history.push('/companyprofile')
        // } else {
            // this.props.history.push('/registercompanyprofile')
        // }
    }
    GetData() {
        let details = JSON.parse(localStorage.getItem("loggedinUser"))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
          }
        axios.get(BaseUrl + '/user/getUserDetails?userId=' + details.userId, {
            headers: headers,
        }).then(resp => {
            if (resp.status === 200) {
                this.setState({
                    loggedinUserDetails: resp.data,
                })
                if (resp.data.userType === "Admin" || resp.data.userType === "superAdmin") {
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
    componentDidMount() {
        if(localStorage.getItem('token')){
        this.GetData() 
    }else {
            this.props.history.push("/")
          }      
    }

    logout() {
        this.setState({
            GettingloginToken: localStorage.removeItem('token')
        })
        localStorage.removeItem('loggedinUser')
        localStorage.removeItem('userid')
        localStorage.removeItem('loggedinUserCompany')
        this.props.history.push('/')
    }
    render() {
        const { t } = this.props;

        return (
            <div onClick={this.closeprofilemodal}>
                <Dialog open={this.props.open} className="mainDiv">
                    <DialogTitle id="customized-dialog-title" className="TitleDiv">
                        <div style={{ display: 'flex' }}>
                            <Grid item xs={4}>
                                <CloseIcon style={{ cursor: 'pointer' }} onClick={this.closeprofilemodal} />
                            </Grid>
                            <Grid item xs={3} className="profileimagepart">
                                <div style={{ width: "80px", height: "80px", borderRadius: "50%", border:"1px solid lightgrey" }}>
                                {this.state.loggedinUserDetails && <img src={this.state.loggedinUserDetails.userImagePath ? ImageBaseUrl + this.state.loggedinUserDetails.userImagePath : userdefault} alt="profilepic" style={this.state.loggedinUserDetails.userImagePath ?{ width: "100%",height: "100%",borderRadius: "50%"}:{ width: "55px", paddingTop:"4px"}} />}
                            </div>
                            </Grid>
                            <Grid item xs={4} className="editimagepart">
                                <img src={editpencil} alt="profilepic" onClick={this.editadminprofile.bind(this)} />
                            </Grid>
                        </div>
                        <div className="ProfilePersonNameDiv">
                        {this.state.loggedinUserDetails && <h5 className="ProfilePersonName">{this.state.loggedinUserDetails.firstName} {this.state.loggedinUserDetails.lastName}</h5>}
                        {this.state.loggedinUserDetails && <h6 className="languagetext">{this.state.loggedinUserDetails.language || "English"}</h6>}
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Grid item xs={7} className="emailcontainer">
                            {this.state.loggedinUserDetails && <h6 className="emailtext">{this.state.loggedinUserDetails.userEmail}</h6>}
                            {this.state.loggedinUserDetails && <h6 className="phonetext">{this.state.loggedinUserDetails.userPhone}</h6>}
                            </Grid>
                            <Grid item xs={4} className="signoutbuttonDiv">
                                <Button className="Fonts SizeFont btnbackgroundcolor signoutbutton" onClick={this.logout.bind(this)}>{t('ProfileModal.signout')}</Button>
                            </Grid>
                        </div>
                    </DialogTitle>
                    <DialogContent className="bottomPart">
                        <div style={{ display: this.state.adminaccess }}>
                            <div className="companyprofile Fonts">
                                <img src={buildingline} alt="buildingImage" />
                                <h6 className="companyprofiletext" style={{ color: this.state.companyTextcolor }} onClick={this.companyprofile.bind(this)}>{t('ProfileModal.Company')}</h6>
                            </div>
                            <div className="usermanagement Fonts" onClick={this.userManagement}>
                                <img src={administratorline} alt="buildingImage" />
                                <h6 className="usermanagementtext" style={{ color: this.state.userTextcolor }}>{t('ProfileModal.Management')}</h6>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                
            </div>
        )
    }
}
export default withNamespaces()(withRouter(ProfileModal));