import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import modalprofile from '../../../assets/images/modalprofile.svg';
import editpencil from '../../../assets/images/editpencil.svg';
import buildingline from '../../../assets/images/buildingline.svg';
import administratorline from '../../../assets/images/administratorline.svg';
import administratorgreen from '../../../assets/images/administratorgreen.svg';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import '../profile modal/profileModal.scss';
import {withRouter} from "react-router-dom";
import ls from 'local-storage'

class ProfileModal extends Component {
    constructor() {
        super();
        this.state = {
            userTextcolor: "",
            companyTextcolor:"",
            GettingloginToken:"",
            loginToken:ls.get('token'),
        }
        this.closeprofilemodal = this.closeprofilemodal.bind(this);
        this.userManagement = this.userManagement.bind(this);
    }
    closeprofilemodal() {
        this.props.close()
    }
    userManagement() {
        this.setState({
            userTextcolor:"#00D95E",
            companyTextcolor:"#3E4664"
        })
        this.props.history.push('/usermanagement')
    }
    editadminprofile() {
        this.props.history.push('/updateadmin')
    }
    companyprofile(){
        this.setState({
            companyTextcolor:"#00D95E",
            userTextcolor:"#3E4664",
        })
        this.props.history.push('/companyprofile')
    }
    componentDidMount() {
        console.log('token is:',this.state.loginToken )
    }
    logout(){
        this.setState({
            GettingloginToken: ls.clear('token')
        })
        
        console.log('logout value is:',this.state.GettingloginToken)
        this.props.history.push('/')
    }
    render() {
        return (
            <div onClick={this.closeprofilemodal}>
                <Dialog open={this.props.open}  className="mainDiv">
                    <DialogTitle id="customized-dialog-title" className="TitleDiv">
                        <div style={{display:'flex'}}>
                        <Grid item xs={4}>
                            <CloseIcon style={{cursor:'pointer'}} onClick={this.closeprofilemodal} />
                        </Grid>
                        <Grid item xs={3} className="profileimagepart">
                            <img src={modalprofile} alt="profilepic" />
                        </Grid>
                        <Grid item xs={4} className="editimagepart">
                            <img src={editpencil} alt="profilepic" onClick={this.editadminprofile.bind(this)} />
                        </Grid>
                        </div>
                        <div className="ProfilePersonNameDiv">
                            <h5 className="ProfilePersonName">Robert albert</h5>
                        </div>
                        <div  style={{display:'flex'}}>
                        <Grid item xs={7} className="emailcontainer">
                            <h6 className="emailtext">Robertalbert019@gmail.com</h6>
                        </Grid>
                        <Grid item xs={4} className="signoutbuttonDiv">
                            <Button className="Fonts SizeFont btnbackgroundcolor signoutbutton" onClick={this.logout.bind(this)}>Sign Out</Button>
                        </Grid>
                        </div>
                    </DialogTitle>
                    <DialogContent  className="bottomPart">
                        <div  className="companyprofile Fonts">
                            <img src={buildingline} alt="buildingImage" />
                            <h6 className="companyprofiletext" style={{color:this.state.companyTextcolor}} onClick={this.companyprofile.bind(this)}>Company Profile</h6>
                        </div>
                        <div  className="usermanagement Fonts" onClick={this.userManagement}>
                        <img src={administratorline} alt="buildingImage" />
                        <h6 className="usermanagementtext"  style={{color:this.state.userTextcolor}} >User Management</h6>                          
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}
export default withRouter(ProfileModal);