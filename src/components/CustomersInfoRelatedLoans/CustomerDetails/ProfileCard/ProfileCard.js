import { Call } from '@material-ui/icons';
import moment from 'moment';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { fetchAPIData } from '../../../../service/service';
import PaymentProcess from '../../../modals/PaymentProcess/PaymentProcess';
import PersoanlInfoModel from '../../../modals/PersonInfo modal/PersonInfoModal';
import "./ProfileCard.scss";

import {
    redcross as redCross, message as Sms, infoimag as profileImg,
    greentick as greenTick, backArrowWhite as backArrow
} from '../../../../assets/images';







class ProfileCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            personalDetails: { name: null, phoneNo: null, loanID: null, otherLoanIDs: [1] },
            nextDue: { dueDate: null, dueAmount: null, installment: null, penalty: null },
            previousDue: { dueDate: null, tobePaid: null, paid: null, paymentMode: null },
            previousDueList: [],
            isPayProcessOpen: false,
            paymentAction: null,
            isPersonalInfoActive: false,
            customerInfo: {},

        };

    }

    componentWillReceiveProps(nextProps) {

        const { personalDetails, nextDue, previousDueList, loanStatus, isLastDue } = nextProps.personalCardDetail
        const { isLoanActive, cancellationReason, customerInfo } = nextProps
        customerInfo.noOfLoans = personalDetails.otherLoanIDs.length;


        this.setState({
            personalDetails: personalDetails,
            nextDue: nextDue,
            previousDueList: previousDueList,
            customerInfo: customerInfo,
            loanStatus: loanStatus,
            cancellationReason: cancellationReason,
            isLoanActive: isLoanActive,
            isLastDue: isLastDue
        });
    }

    onBackArrowClick = () => {
        this.props.history.goBack()
    }

    onPersonalInfoClick = async () => {
        let customerInfo = []
        let { isPersonalInfoActive } = this.state
        isPersonalInfoActive = !isPersonalInfoActive
        this.setState({ isPersonalInfoActive });
        console.log('thursday persoanl info check...', customerInfo)
        if (isPersonalInfoActive) {
            customerInfo = await fetchAPIData('customerDetailByID', this.state.personalDetails.customerID)
            this.setState({ customerInfo });
        }

    }

    changePaymentProcessStatus = (value) => {
        if (value === 'pay' || value === 'notpay') {
            this.setState({ isPayProcessOpen: true, paymentAction: value });
        }
        else
            this.setState({ isPayProcessOpen: false, paymentAction: null });
    }

    notDone = () => {
        alert("Oops! sorry, this features is under construction")
    }

    onPaymentBtnClk = async (nextDue, loanID) => {
        const { action } = this.props
        await fetchAPIData("paymentAction", { nextDue, loanID })

        action(loanID)

    }


    render() {

        const { isPayProcessOpen, customerInfo, isPersonalInfoActive,
            paymentAction, personalDetails, nextDue, previousDueList, isLoanActive,
            isLastDue, cancellationReason } = this.state
        console.log('many weeks ' ,personalDetails)

        return (
            <div className="ProfileCard Fonts"  >

                <PaymentProcess
                    isOpen={isPayProcessOpen}
                    paymentAction={paymentAction}
                    changePaymentProcessStatus={this.changePaymentProcessStatus}
                    onPaymentBtnClk={this.onPaymentBtnClk}
                    loanId={personalDetails.loanID}
                    method={this.props.method}
                    nextDue={nextDue} />

                <PersoanlInfoModel open={isPersonalInfoActive} close={this.onPersonalInfoClick} customerInfo={customerInfo} />

                <div className="InsideProfileCard">
                    <div className="Header" >
                        <img className="BackArrow" onClick={this.onBackArrowClick} src={backArrow} alt={'backarrow'} />
                        <div className="PersonalInfo Fonts">

                            <div className="InfoLink Fonts" onClick={this.onPersonalInfoClick} >Personal Info</div>
                        </div>
                    </div>
                    <div className="Profile Fonts" >
                        <div className="ProfileCardLayout Fonts">
                            <img className="ProfileImg" src={personalDetails.profilePhoto} alt={'profileImg'} ></img>
                            <h2 className="PersonName Fonts">{personalDetails.name}</h2>
                            <LoanItemList action={this.props.action} active={personalDetails.loanID} otherLoanIDs={personalDetails.otherLoanIDs} />
                            <h6 className="LoanNumber Fonts" > Loan Number</h6>
                            <div className="Contact Fonts">
                                <h4 className="phoneNo Fonts" >
                                    <Call className="ContactIcon Fonts" onClick={this.notDone} />
                                    {personalDetails.phoneNo}  </h4>
                                <img className="ContactIcon" onClick={this.notDone} src={Sms} alt={'sms'} />
                            </div>
                        </div>
                    </div>

                    {(nextDue.installment && isLoanActive) &&

                        <div className="NextPayment Fonts">
                            <div className="PaymentDetails Fonts" >
                                <h4 className="PaymentHeader Fonts" >NEXT PAYMENT</h4>
                                <span className="PaymentHeader1 Fonts">{nextDue.dueDate ? moment(nextDue.dueDate).format("DD MMM  YYYY") : ""}</span><br />
                                <div className="PaymentHeader2 Fonts"> {nextDue.collectionAmount}</div>
                                <div className="PaymentHeader3 Fonts"><span style={{ color: "white" }}>{nextDue.collectionAmount - nextDue.penalty}</span> Principal &nbsp;&nbsp;&nbsp; | &nbsp;<span style={{ color: "white" }}>{nextDue.penalty}</span> Penalty</div><br /><br />
                            </div>
                            <div className="PaymentLayout Fonts">
                                <button
                                    // onClick={() => this.onPaymentBtnClk(nextDue, "Paid", personalDetails.loanID)}
                                    onClick={() => { this.changePaymentProcessStatus('pay') }}
                                    className="PaidButton Fonts">
                                    Receive Payment
                                </button>

                                {!isLastDue &&
                                    <button
                                        //  onClick={() => this.onPaymentBtnClk(nextDue, "Not Paid", personalDetails.loanID)}
                                        onClick={() => { this.changePaymentProcessStatus('notpay') }}
                                        className="NotPaidButton Fonts">
                                        Not Paid
                                    </button>
                                }
                            </div>
                        </div>
                    }
                    {!isLoanActive && cancellationReason !== null && <CancelReason reason={cancellationReason} />}




                    <div className="PreviousTransaction">
                        <h4 className="TransactionHisHeader" >TRANSACTION&nbsp; HISTORY</h4>
                        <div className="TransactionHisBody" >
                            {previousDueList.map((previousDue, index) =>
                                <CardHistory key={index} previousDue={previousDue} onResonClick={this.notDone} />
                            )}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ProfileCard);

let CardHistory = (props) => {
    const { previousDue } = props
    const isPaid = previousDue.collectionStatus === 'Paid';
    return (
        <div className="historyCard" >
            <div className="calenderLayout">
                {moment(previousDue.updatedAt).format("MMM")}
                <br />
                {moment(previousDue.updatedAt).format("DD")}

            </div>
            <div className="InstallmentLayout">
                <div className="InstallmentHeader">
                    <h4 className="Installment" >{previousDue.collectionAmount}</h4>
                </div>
                <div className="Payment">{previousDue.Installment}<span className="PaymentText">&nbsp; Installment</span></div>
            </div>
            <div className="paymentStatus" >
                {isPaid && <span>&bull; {previousDue.paymentType}</span>}

                {/* <div style={{ marginLeft: 'auto' }}> */}

                <div className={isPaid ? "green" : "red"} >
                    {isPaid ? `${previousDue.paymentMode.toLowerCase()} ` : `Not Paid `}
                    <img src={isPaid ? greenTick : redCross} alt={'paidIcon'} />
                </div>

                {/* Since Not Paid is not shown in Transaction history, below 4 lines are commented */}
                {/* {!isPaid &&
                        <Tooltip title="Reason for not paid" placement="right">
                            <div className="reasonLayout" onClick={onResonClick} >Reason</div>
                        </Tooltip>
                    } 
                </div> */}
            </div>
        </div>
    )
}


let LoanItemList = (props) => {

    const { otherLoanIDs, active } = props

    let handleSelectChange = (event) => {
        const { action } = props
        let loanID = event.target.value
        localStorage.setItem('loanId', loanID)
        action(loanID)

    }

    return (
        <div>
            <select className="dropDown" value={active || ""} onChange={(e) => { handleSelectChange(e) }}>
                {otherLoanIDs
                    .map((obj, index) => (
                        <option className="dropDownOption" key={index} value={obj.loanId}  >{obj.loanId}</option>
                    ))}
            </select>
        </div>
    )
}



const CancelReason = props => {
    const { reason } = props

    return (
        <div className='cancelReasonLayout' >
            <div className='innerLayout' >
                <h3> REASON FOR CANCELLATION</h3>
                <p>{reason}</p>
            </div>
        </div>
    )

}