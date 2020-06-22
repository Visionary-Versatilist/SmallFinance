import { Button, DialogActions } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import "../CancelLoan/CancelLoan.scss";
import { fetchAPIData } from "../../../service/service";
class CancelLoan extends Component {
  constructor() {
    super();
    this.state = {
      isConfirmCancel: false,
      cancelReason: ''
    };
  }

  onSubmitClk = async () => {
    let reason = this.state.cancelReason;
    let obj = {
      loanStatus: "Cancelled",
      cancellationReason: reason,
      loanId: this.props.loanId,

    };
    const res = await fetchAPIData("cancelLoan", obj);


    res &&
      this.props.cancel('confirm')
  };

  confirmCancelToogle = event => {
    let value = event.target.innerHTML
    if (value.toLowerCase() === 'yes')
      this.onSubmitClk()
    this.setState(prevState => ({ isConfirmCancel: !prevState.isConfirmCancel }));
  }

  render() {
    const { cancel } = this.props;
    const { isConfirmCancel, cancelReason } = this.state
    return (
      <div onClick={this.closecancelLaonmodal}>
        <div className="deleteuserpage">
          <Dialog
            open={this.props.open}
            className="closeCustomerDialogbox"
          >
            <DialogTitle id="customized-dialog-title" className="TitleDiv">
              <div className="deleteconfirmation">
                <div className="Fonts btnSizeFont confrmmessage">
                 By cancelling the loan, you cannot proceed the further loan process for this customer.
                </div>
                <div className="closeButtonDiv"><CloseIcon /* onClick={this.handleCloseModal.bind(this)} */ /></div>
                <TextareaAutosize id="reason"
                  rowsMax={4}
                  style={{ height: "60px" }}
                  aria-label="maximum height"
                  placeholder="Type the status here for not paid status"
                  className="cancelnumarictextBox"
                  value={cancelReason}
                  onChange={(e) => this.setState({ cancelReason: e.target.value })}
                />
              </div>
            </DialogTitle>
            <DialogContent className="bottomPart">
              <div className="buttonDiv">
                <Button className="cancelbutton Fonts" onClick={() => cancel('cancel')}>
                  Close
                </Button>
                <Button className="savebutton Fonts" onClick={this.confirmCancelToogle}  >
                  Confirm
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <ConfirmCancel open={isConfirmCancel} closeAction={this.confirmCancelToogle} />
        </div>
      </div>
    );
  }
}
export default withRouter(CancelLoan);


const ConfirmCancel = props => {
  const { open, closeAction } = props

  return (
    <Dialog open={open} >
      <DialogTitle>Are you sure?</DialogTitle>

      <DialogActions>
        <Button className='confirm' onClick={closeAction}>Yes</Button>
        <Button className='confirm' onClick={closeAction}  >No</Button>
      </DialogActions>
    </Dialog>
  )
}