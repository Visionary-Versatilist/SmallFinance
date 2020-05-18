import React, { Component } from 'react';
import { Button, DialogTitle, DialogContent, Dialog } from '@material-ui/core/';
import '../NotPaidModal/NotPaid.scss';
import { withRouter } from "react-router-dom";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';


class NotPaid extends Component {
    constructor() {
        super();
        this.state = {
            principalBorder: "1px solid #D4D4D5",
            interestBorder: "1px solid #D4D4D5",
            penaltyBorder: "1px solid #D4D4D5",
            Date: new Date()

        };
        // this.handleCloseModal = this.handleCloseModal.bind(this);

    }

    handleCloseModal() {
        this.props.close()
    }
    savechanges() {
        this.props.close()
    }
    cancelchanges() {
        this.props.close()
    }

    render() {
        return (
            <div onClick={this.receivePayment}>
                <div className="receivepaymentpage">
                    <Dialog open={this.props.open} className="dialogboxnotpaid">
                        <DialogTitle id="customized-dialog-title" className="TitleDiv1">
                            <b><div className="mainTitleDiv">Not Paid</div></b>
                            <div className="headerDiv1">
                                <div className="dateDiv">{moment(this.state.Date).format("DD MMM YYYY")}</div>

                                <div className="closeButtonDiv"><CloseIcon onClick={this.handleCloseModal.bind(this)} /></div>
                            </div>
                            <div className="numaricTextField">
                                <div className="numariconeone">
                                    <div className="numariconeoneText1">700</div>
                                    <div className="numariconeoneText2">600 Principal | 100 Interest</div>
                                    <TextareaAutosize
                                        rowsMax={4}
                                        style={{ height: '60px' }}
                                        aria-label="maximum height"
                                        placeholder="Type the status here for not paid status"
                                        className="numarictextBox"

                                    />
                                    {/* <TextareaAutosize  rowsMax={4} placeholder="Type the status here for not paid status"  className="numarictextBox"  /> */}
                                </div>
                            </div>
                        </DialogTitle>
                        <DialogContent className="bottomPart" >
                            <div className="bottomDivone">
                                <div className="bottomDivtwo">
                                    <Button className="cancelbutton Fonts" onClick={this.cancelchanges.bind(this)}>
                                        Cancel
                            </Button>
                                    <Button className="savebutton Fonts" onClick={this.savechanges.bind(this)}>
                                        Confirm
                            </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        )
    }
}
export default withRouter(NotPaid);