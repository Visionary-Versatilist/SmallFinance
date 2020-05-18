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
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import '../cancelCustomer/cancelCustomer.scss';
import { withRouter } from "react-router-dom"


class CancelCustomer  extends Component {
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
        this.props.close()
    }
    cancelchanges() {
        this.props.close()
    }

    render() {
        return (
            <div onClick={this.closeprofilemodal}>
                <div className="deleteuserpage">
                <Dialog open={this.props.open} className="dialogbox" style={{borderRadius:'5px'}}>
                    <DialogTitle id="customized-dialog-title" className="TitleDiv">
                        <div className="deleteconfirmation">
                            <p className="Fonts btnSizeFont confrmmessage">Are you sure to Delete?</p>
                            {this.props.rowData && <h6 className="Fonts UserName">{this.props.rowData.firstName}</h6>}

                        </div>
                    </DialogTitle>
                    <DialogContent className="bottomPart">
                        <div>
                            <Button className="cancelbutton Fonts" onClick={this.cancelchanges.bind(this)}>
                                Cancel
                            </Button>
                            <Button className="savebutton Fonts" onClick={this.savechanges.bind(this)}>
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
export default withRouter(CancelCustomer);