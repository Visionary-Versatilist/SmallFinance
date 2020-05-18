import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import '../MessageForCustomer/MessageForCustomer.scss';
import { withRouter } from "react-router-dom";
import {BaseUrl, headers} from "../../../Environment";
import { withNamespaces } from 'react-i18next';


const axios = require('axios')
class MessageForCustomer extends Component {
    constructor() {
        super();
        this.state = {
            message:"",
        }
        // this.closeprofilemodal = this.closeprofilemodal.bind(this);
        // this.userManagement = this.userManagement.bind(this);
    }
    // closeprofilemodal() {
    //     this.props.close()
    // }
    savechanges(){
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
          }
          const messageData={
            customerId:this.props.rowData.customerId,
            message:this.state.message
          }
        axios.post(BaseUrl +"/loan/sendSMS",messageData,{
            headers: headers,
        }).then(resp => {
            console.log("message", resp)
            if(resp.status==200) {
                toast.success("Message Sent Successfully !", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });            
            }else{
                toast.error("Something went wrong!", {
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
            toast.error("Something went wrong!", {
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
        toast.configure({});
        const { t } = this.props;

        return (
            <div>
                <div className="messagePopup">
                <Dialog open={this.props.open} className="messagedialogbox" style={{borderRadius:'5px'}}>
                    <div className="messagedialogboxContainer">
                    <DialogTitle id="customized-dialog-title" className="TitleDiv">
                        <div className="deleteconfirmation">
                            <p className="Fonts btnSizeFont confrmmessage">{t('sendMsg.content')}</p>
                            <TextareaAutosize className="messagePopuptextArea" aria-label="emptytextarea" onChange={(event) => this.setState({ message: event.target.value })} />
                        </div>
                    </DialogTitle>
                    <DialogContent className="bottomPart">
                        <div className="bottomPartOne">
                            <Button className="cancelbutton Fonts" onClick={this.cancelchanges.bind(this)}>
                                Cancel
                            </Button>
                            <Button className="savebutton Fonts" onClick={this.savechanges.bind(this)}>
                                Send
                            </Button>
                        </div>
                    </DialogContent>
                    </div>
                </Dialog>
                </div>
            </div>
        )
    }
}
export default withNamespaces()(withRouter(MessageForCustomer));