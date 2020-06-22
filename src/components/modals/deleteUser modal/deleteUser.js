import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Button } from '@material-ui/core';
import ls from 'local-storage';
import {  toast } from 'react-toastify';
import '../deleteUser modal/deleteUser.scss';
import { withRouter } from "react-router-dom";
import {BaseUrl, headers} from "../../../Environment";
import { withNamespaces } from 'react-i18next';


const axios = require('axios')



class DeleteUser extends Component {
    constructor() {
        super();
        this.state = {

        }
        this.closeprofilemodal = this.closeprofilemodal.bind(this);
        // this.userManagement = this.userManagement.bind(this);
    }
    closeprofilemodal() {
        this.props.close()
    }
    savechanges(){
        axios.delete(BaseUrl + '/user/deleteUser?userId=' + this.props.rowData.userId,{
            headers: headers,
        }).then(resp => {
            if(resp.status===200) {
                toast.success("User deleted successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });

                    this.props.allUser()
            }else{
                toast.error("Please try again!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
            }
        }).catch(err => {
            if(err.request.status!==200){
            toast.error("Please try again!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                });
            }
        })
        this.props.close()
    }
    cancelchanges() {
        this.props.close()
    }

    render() {
        toast.configure({
        });
        const { t } = this.props;

        return (
            <div onClick={this.closeprofilemodal} className="Deleteuserpage">
                <div>
                <Dialog open={this.props.open} style={{borderRadius:'5px'}}>
                    <DialogTitle id="customize-dialog-title" className="TitleuserDiv" style={{width:"307px",height:"113px"}}>
                        <div className="deleteuserconfirmation">
                            <p className="Fonts btnSizeFont confrmusermessage" style={{ marginTop: "20px",marginBottom: "5px"}}>{t('DeleteUser.content')}</p>
                            {this.props.rowData && <h6 className="Fonts UserName" style={{textTransform:"capitalize",color: "#3E4664",margin: "0px",fontSize:" 17px !important"}}>{this.props.rowData.firstName} {this.props.rowData.lastName}</h6>}

                        </div>
                    </DialogTitle>
                    <DialogContent className="bottomPart" style={{textAlign: "end"}}>
                        <div>
                            <Button className="cancelbutton Fonts" style={{border: "1px solid #E4E4E4",textTransform: "capitalize",color: "#8E8E98",height: "30px",paddingLeft: "20px",paddingRight: "20px",paddingTop: "2px",margin: "3%"}} onClick={this.cancelchanges.bind(this)}>
                                Cancel
                            </Button>
                            <Button className="savebutton Fonts" style={{ backgroundColor: "#00D95E",textTransform: "capitalize",color: "#fff",height: "30px",paddingLeft: "25px",paddingRight: "25px",paddingTop: "2px"}} onClick={this.savechanges.bind(this)}>
                                Delete
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
                </div>
            </div>
        )
    }
}
export default withNamespaces()(withRouter(DeleteUser));