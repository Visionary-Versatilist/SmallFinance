import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Button } from '@material-ui/core';
import '../receivePayment modal/ReceivePayment.scss';
import { withRouter } from "react-router-dom";
import Input from '@material-ui/core/Input';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
const PaymentType = [
    {
        value: 'Cash',
        label: 'Cash',
    },
    {
        value: 'Check',
        label: 'Check',
    },
    {
        value: 'Others',
        label: 'Others',
    },
];
class ReceivePayment extends Component {
    constructor() {
        super();
        this.state = {
            principalBorder: "1px solid #D4D4D5",
            interestBorder: "1px solid #D4D4D5",
            penaltyBorder: "1px solid #D4D4D5",
            payment: "full",
            paymentMode:"",
            Date: new Date()
        };
        // this.handleCloseModal = this.handleCloseModal.bind(this)
    }
    handleChange = event => {
        this.setState({
            payment: event.target.value
        });
    };
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
                    <Dialog open={this.props.open} className="dialogbox1">
                        <DialogTitle id="customized-dialog-title" className="TitleDiv1">
                            <div className="headerDiv1">
                                <div className="dateDiv">{moment(this.state.Date).format("DD MMM YYYY")}</div>
                                <b><div className="mainTitleDiv">Receive Payment</div></b>
                                <div className="closeButtonDiv"><CloseIcon onClick={this.handleCloseModal.bind(this)} /></div>
                            </div>

                            <FormControl component="fieldset" style={{border:"none"}}>
                                <RadioGroup aria-label="position" name="position" value={this.state.payment} onChange={this.handleChange} row>
                                    <FormControlLabel
                                        value="full"
                                        control={<Radio style={{color:"green"}} />}
                                        label="Full Payment"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="partial"
                                        className="partialPayment"
                                        control={<Radio style={{color:"green"}} />}
                                        label="Partial Payment"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <div className="numaricTextField">
                                <div className="principalDiv">
                                    <h6 className="InputLabel Fonts SizeFont">Principal</h6>
                                    <Input type="text" className="textBox" style={{ border: this.state.principalBorder }} />
                                </div>
                                <div className="penaltyDiv">
                                    <h6 className="InputLabel Fonts SizeFont">Penalty</h6>
                                    <Input type="text" className="textBox" style={{ border: this.state.penaltyBorder }} />
                                </div>
                                <div className="textFieldStyle" style={{width:"100%"}}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{width:"100%"}} >Payment mode</h6>
                                            <TextField
                                                id="standard-select-currency"
                                                select
                                                className="incomefield"
                                                value={this.state.paymentMode}
                                                onChange={(event) => this.setState({ paymentMode: event.target.value })}
                                            >
                                                {PaymentType.map(option => (
                                                    <MenuItem key={option.value} value={option.value} style={{width:"100%"}}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                            </div>
                        </DialogTitle>
                        <DialogContent className="bottomPart" style={{marginTop:"3rem"}}>
                            <div className="bottomDivone">
                                <div className="bottomDivoneone">
                                    <h3 className="bottonDivoneoneText1">36,000</h3>
                                    <h6 className="bottonDivoneoneText2">Total</h6>
                                </div>
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
export default withRouter(ReceivePayment);