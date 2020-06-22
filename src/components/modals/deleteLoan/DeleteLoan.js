import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Button } from '@material-ui/core';
import '../deleteLoan/DeleteLoan.scss';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BaseUrl, headers} from "../../../Environment"

const axios = require('axios')


class DeleteLoan extends Component {
    constructor() {
        super();
        this.state = {

        }
        this.closeprofilemodal = this.closeprofilemodal.bind(this);
    }
    closeprofilemodal() {
        this.props.close()
    }
    savechanges() {

        axios.delete(BaseUrl + '/loanType/deleteLoanType?loanTypeId=' + this.props.rowData.loanTypeId, {
            headers: headers,
        }).then(resp => {
            if (resp.status === 200) {
                toast.success("Loan type deleted successfully !", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });

                this.props.allloan()
            } else {
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
            if (err.request.status !== 200) {
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
        toast.configure({});

        return (
            <div onClick={this.closeprofilemodal} >
                {/* <div> */}
                    <Dialog open={this.props.open} className="deleteloanpage" style={{ borderRadius: '5px' }}>
                        <DialogTitle id="customized-dialog-title" className="TitleDiv">
                            <div className="deleteconfirmation">
                                <p className="Fonts btnSizeFont confrmmessage">Are you sure to Delete?</p>
                                {this.props.rowData && <h6 className="Fonts UserName">{this.props.rowData.loanType}</h6>}
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
                {/* </div> */}
            </div>
        )
    }
}
export default withRouter(DeleteLoan);