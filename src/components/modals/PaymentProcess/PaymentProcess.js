import React, { Component } from 'react';
import CloseIcon from "@material-ui/icons/Close";
import './PaymentProcess.scss'
import '../../../index.scss'
import moment from 'moment';
import { Dialog, DialogContent } from '@material-ui/core';


class PaymentProcess extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            mode: 'full',
            notPaidReason: '',
            readOnly: true,
            totalAmount: 0,
            backupTotalAmount: 0,
            penalty: 0,
            backupPenalty: 0,
            selectedValue: 'cash',
            collectionAmount: 0,
            minPenalty: 0,
            isPartialPay: false,
            isDisabled: false,
            isAmountInvalid: false,
            isPenaltyInvalid: false,
            isNotPaidReasonInvalid: false,
            isReceive: true,
            isPayModeInvalid: false,
            isPayTypeOther: false,
            otherMode: '',
            isPayTypeCheque: false,
            countryCurrency: {}
        };
    }

    //reset the values
    resetValues = () => {

        this.setState({
            mode: 'full',
            isPartialPay: false,
            readOnly: true,
            totalAmount: 0,
            backupTotalAmount: 0,
            penalty: 0,
            selectedValue: 'cash',
            collectionAmount: 0,
            minPenalty: 0,

            isDisabled: false,
            isAmountInvalid: false,
            isPenaltyInvalid: false,
            isNotPaidReasonInvalid: false,
            notPaidReason: '',
            isReceive: true,
            isPayModeInvalid: false,
            isPayTypeOther: false,
            otherMode: '',
            isPayTypeCheque: false
        });


    }

    onPayModeChange = event => {
        let mode = event.currentTarget.value
        let { backupTotalAmount, backupPenalty } = this.state
        this.setState({
            mode,
            isPartialPay: (mode !== 'full'),
            readOnly: (mode === 'full')
        });

        mode === 'full'
            && this.setState({
                totalAmount: backupTotalAmount,
                penalty: backupPenalty,
                isAmountInvalid: false,
                isPenaltyInvalid: false,
                isDisabled: false
            });
    }

    onSubmitClick = () => {

        let { changePaymentProcessStatus, paymentAction, nextDue, onPaymentBtnClk, loanId } = this.props
        let { selectedValue, mode, penalty, totalAmount, otherMode, notPaidReason } = this.state
        let isDisabled
        isDisabled = this.valueValidation();

        if (!isDisabled) {
            let status
            //status to update due Paid/Not Paid
            if (paymentAction === 'pay') {
                status = 'Paid'
                nextDue.paymentType = mode.toUpperCase()
                nextDue.paymentMode = selectedValue

                selectedValue === 'others' && (nextDue.additionalComments = otherMode)

            } else {
                status = 'Not Paid'
                nextDue.additionalComments = notPaidReason
            }

            nextDue.collectionStatus = status;


            //checking mode Full or partial
            if (mode !== 'full') {
                nextDue.collectionAmount = totalAmount
                nextDue.PenaltyApplied = penalty
            } else {
                nextDue.PenaltyApplied = 0
            }


            onPaymentBtnClk(nextDue, loanId)
            changePaymentProcessStatus()

            this.resetValues()

        }

    }
    componentDidMount=()=>{
        let countryCurrency = JSON.parse(localStorage.getItem("companyCountry"))
        console.log("country currency", countryCurrency)
        this.setState({
            countryCurrency:countryCurrency
        })
    }

    componentWillReceiveProps(props) {
        const { nextDue, paymentAction } = props
        let totalAmount = 0, backupTotalAmount = 0, penalty = 0, minPenalty = 0, backupPenalty = 0, isReceive = true
        totalAmount = parseInt(nextDue.collectionAmount)
        backupTotalAmount = nextDue.collectionAmount
        // penalty = nextDue.penalty
        backupPenalty = nextDue.penalty
        minPenalty = nextDue.basicPenalty
        isReceive = paymentAction === 'pay'
        this.setState({ totalAmount, backupTotalAmount, penalty, minPenalty, backupPenalty, isReceive });

    }

    handleSelectChange = event => {
        let value = event.target.value;
        let isPayTypeOther = value === 'others'
        let isPayTypeCheque = value === 'cheque'

        if (!isPayTypeOther || !isPayTypeCheque) { this.setState({ otherMode: '', isPayModeInvalid: false }) }

        this.setState({ selectedValue: value, isPayTypeOther, isPayTypeCheque, isDisabled: false, otherMode: '' });
    }


    validateCheque = chequeNum => {
        // send negative response, like return false if chequeNum is not 6.
        const isNot6Dight = chequeNum.length !== 6
        return isNot6Dight
    }

    handleOtherMode = value => {
        const { isPayTypeCheque } = this.state
        if (isPayTypeCheque) {
            !parseInt(value[value.length - 1]) && (value = value.substring(0, value.length - 1))
            if (value.length > 6)
                value = value.substring(0, 6);
        }

        this.setState({ otherMode: value })

        this.valueValidation(value)
    }

    //validating the inputs
    valueValidation = otherMode => {

        // let isAmountInvalid = false, isPenaltyInvalid = false, isDisabled = false, isNotPaidReasonInvalid = false, isPayModeInvalid = false
        let { penalty, totalAmount, backupTotalAmount, minPenalty, isPayTypeCheque,
            notPaidReason, isReceive, isPayTypeOther, mode,
            isAmountInvalid, isPenaltyInvalid, isDisabled, isNotPaidReasonInvalid, isPayModeInvalid
        } = this.state

        isAmountInvalid = 0 > totalAmount || totalAmount > backupTotalAmount
        isPenaltyInvalid = penalty > minPenalty
        isNotPaidReasonInvalid = notPaidReason === null || notPaidReason.length < 3

        // valueValidation is called from multiple places, 
        //otherMode is undefined and isPayTypeOther is true , during partial value is been validated.

        if (otherMode !== undefined) {
            isPayModeInvalid = (isPayTypeOther && otherMode.length < 3)
                || (isPayTypeCheque && this.validateCheque(otherMode))
        }


        if (isReceive)
            // //other and partial payment 
            // if (isPayTypeOther && mode !== 'full')
            //     isDisabled = isPayModeInvalid || isAmountInvalid || isPenaltyInvalid

            // //other and full payment
            // else if (isPayTypeOther && mode === 'full')
            //     isDisabled = isPayModeInvalid || isAmountInvalid

            // //cash/cheque and full payment
            // else if (isPayTypeOther === false && mode !== 'full')
            //     isDisabled = isAmountInvalid || isPenaltyInvalid

            // else if(isPayTypeCheque )
            if (mode === 'full')
                isDisabled = isAmountInvalid || isPayModeInvalid
            else if (mode !== 'full')
                isDisabled = isAmountInvalid || isPayModeInvalid || isPenaltyInvalid
            else
                isDisabled = false
        else
            isDisabled = isNotPaidReasonInvalid

        this.setState({ isAmountInvalid, isPenaltyInvalid, isDisabled, isNotPaidReasonInvalid, isPayModeInvalid });
        return isDisabled;
    }

    render() {
        const { mode, totalAmount, isPartialPay, readOnly, selectedValue, penalty, isDisabled,
            backupTotalAmount, isAmountInvalid, isPenaltyInvalid, minPenalty,
            isPayTypeOther, isPayModeInvalid, isPayTypeCheque, otherMode, isReceive, notPaidReason, isNotPaidReasonInvalid } = this.state

        const { changePaymentProcessStatus, isOpen, nextDue, method } = this.props
        const { isLastDue, dueDate } = nextDue
        const isInstallmentCalculator = method === 'Installment Calculator'


        return (
            <Dialog
                open={isOpen}
            >
                <DialogContent>
                    <div className="receivePaymentlayout Fonts" >

                        <div className='receivePayment Fonts'>

                            <div className='closeButton Fonts' >
                                <CloseIcon
                                    onClick={() => {
                                        this.resetValues();
                                        changePaymentProcessStatus();
                                    }}
                                />
                            </div>

                            <div className='rpHeader Fonts'>
                                <span className='rpDate Fonts'>{moment(dueDate).format('DD MMM YYYY')}</span>
                                <h3 className='rphead Fonts' >{isReceive ? 'Receive Payment' : '  Not Paid'}</h3>
                            </div>


                            {isReceive &&
                                <div>
                                    <section className='paymentLayout payMode Fonts' >
                                        <div className='optionLayout radioOption Fonts' >
                                            <input
                                                type='radio'
                                                name='paymentmode'
                                                checked={mode === 'full'}
                                                value={'full'}
                                                onChange={this.onPayModeChange}
                                            />
                                            <div className='radioText Fonts' >Full Payment</div>
                                        </div>
                                        {(!isLastDue && !isInstallmentCalculator) &&
                                            <div className='optionLayout radioOption  Fonts' >
                                                <input
                                                    type='radio'
                                                    name='paymentmode'
                                                    checked={mode === 'partial'}
                                                    value={'partial'}
                                                    onChange={this.onPayModeChange} />
                                                <div className='radioText Fonts' >Partial Payment</div>
                                            </div>}
                                    </section>

                                    <section className='paymentLayout paymentDetail Fonts'>
                                        <div className='payMode Fonts' >
                                            <div className='optionLayout Fonts'>
                                                <div className='amountLabel Fonts' >Amount to be Paid </div>
                                                <input
                                                    type='tel'
                                                    className='inputAmountLabel Fonts'
                                                    value={totalAmount}
                                                    onChange={(e) => {
                                                        this.setState({ totalAmount: parseInt(e.target.value) || 0 });
                                                        // this.valueValidation()
                                                    }}
                                                    readOnly={readOnly}
                                                    onBlur={() => { this.valueValidation() }}
                                                />
                                                {isAmountInvalid && <div className='errorMsg'>{`Amount range: 0 to ${backupTotalAmount}`}</div>}
                                            </div>


                                            <div className='optionLayout Fonts'>
                                                <div className='amountLabel Fonts'>Payment Mode </div>
                                                <select
                                                    className='selectLayout Fonts'
                                                    value={selectedValue}
                                                    onChange={this.handleSelectChange}
                                                >
                                                    <option className='selectOptionLayout Fonts' value="cheque">Cheque</option>
                                                    <option className='selectOptionLayout Fonts' value="cash">Cash</option>
                                                    <option className='selectOptionLayout Fonts' value="others">Others</option>
                                                </select>
                                            </div>

                                            {(isPayTypeOther || isPayTypeCheque) &&
                                                <div className='optionLayout Fonts'>
                                                    <div className='amountLabel Fonts' >
                                                        {isPayTypeOther && <span>Other Mode</span>}
                                                        {isPayTypeCheque && <span>Cheque Number</span>}
                                                    </div>
                                                    <input type='text' className='inputAmountLabel Fonts' value={otherMode}
                                                        onChange={(e) => this.handleOtherMode(e.target.value)}
                                                    />
                                                    {isPayModeInvalid && isPayTypeOther && <div className='errorMsg Fonts'>{`Minimun 3 Characters`}</div>}
                                                    {isPayModeInvalid && isPayTypeCheque && <div className='errorMsg Fonts'>{`Should be 6 digit number.`}</div>}
                                                </div>}

                                        </div>

                                        {isPartialPay && <div className='optionLayout Fonts'>
                                            <div className='amountLabel Fonts' >Penalty to be applied for next Payment </div>
                                            <input
                                                className='inputAmountLabel penaltyLabel Fonts'
                                                type='tel'
                                                value={penalty}
                                                onChange={(e) => {
                                                    this.setState({ penalty: parseInt(e.target.value) || 0 });
                                                    // this.valueValidation()
                                                }}
                                                onBlur={() => { this.valueValidation() }}
                                            />
                                            {isPenaltyInvalid && <div className='errorMsg Fonts'>{`Penalty range: 0 to ${minPenalty}`}</div>}
                                        </div>}
                                    </section>

                                </div>
                            }

                            <div className={isReceive ? 'totalAmountLayout' : ''}>
                                <div className='totalAmount Fonts' >{this.state.countryCurrency.symbol} {parseInt(totalAmount)}</div>
                                <span className="totalAmountText"> {isReceive ? 'Total' : `${this.state.countryCurrency.symbol} ${totalAmount - penalty} Principal | ${penalty} Penalty`}</span>
                            </div>

                            {!isReceive &&
                                <div>
                                    <textarea
                                        className='notPaidReasonBox Fonts'
                                        rows="4"
                                        cols="75"
                                        placeholder='Reason for Not Paid'
                                        value={notPaidReason}
                                        onChange={(e) => {
                                            this.setState({ notPaidReason: e.target.value });
                                            this.valueValidation()
                                        }}
                                    // onBlur={this.valueValidation}
                                    />
                                    {isNotPaidReasonInvalid && <div className='errorMsg Fonts'>{`Minimum 3 characters required...`}</div>}
                                </div>
                            }

                            <div style={{ margin: '30px', padding: "28px" }} ></div>
                            <div className='footerButton Fonts' >
                                <button
                                    className='buttonLayout Fonts'
                                    onClick={() => { this.resetValues(); changePaymentProcessStatus() }}
                                >
                                    Cancel
                        </button>
                                <button
                                    className={`greenLayout Fonts buttonLayout ${isDisabled ? 'disabledButton' : ''}`}
                                    onClick={this.onSubmitClick}
                                    disabled={isDisabled}
                                >
                                    Confirm
                        </button>
                            </div>

                        </div></div>
                </DialogContent>

            </Dialog>

        );
    }
}

export default PaymentProcess;
