import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import backimag from '../../../../assets/images/backimag.svg';
import infoimag from '../../../../assets/images/infoimag.svg';
import messageIcon from '../../../../assets/images/noun_message_160429.svg';
import callIcon from '../../../../assets/images/phone-handset-solid.svg';
// import PersonInfoModal from '../../../modals/personInfo modal/PersonInfoModal';
import PersonInfoModal from '../../../modals/PersonInfo modal/PersonInfoModal';
import ReceivePayment from '../../../modals/receivePayment modal/ReceivePayment';
import './Personalinfo.scss';

const accType = [
    {
        value: 'Savings',
        label: 'Savings',
    },
    {
        value: 'Current',
        label: 'Current',
    },
];
const history = [
    {
        date: "Mar 16",
        money: "12,000",
        TotalAmount: "1Lack",
        MoneyType: "Cheque",
        LoanType: "Home Lone"
    },
    {
        date: "Jan 16",
        money: "18,000",
        TotalAmount: "2Lack",
        MoneyType: "Cash",
        LoanType: "Car Lone"
    },
    {
        date: "Feb 16",
        money: "22,000",
        TotalAmount: "5Lack",
        MoneyType: "Cheque",
        LoanType: "Education Lone"
    },
    {
        date: "Jan 16",
        money: "20,000",
        TotalAmount: "4Lack",
        MoneyType: "Cheque",
        LoanType: "Home Lone"
    },
    {
        date: "Jan 16",
        money: "20,000",
        TotalAmount: "4Lack",
        MoneyType: "Cheque",
        LoanType: "Home Lone"
    },
    {
        date: "Jan 16",
        money: "20,000",
        TotalAmount: "4Lack",
        MoneyType: "Cheque",
        LoanType: "Home Lone"
    },
    {
        date: "Jan 16",
        money: "20,000",
        TotalAmount: "4Lack",
        MoneyType: "Cheque",
        LoanType: "Home Lone"
    },
];
class PersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openmodal: false,
            // openmodal1:true
        };
        this.closemodal = this.closemodal.bind(this)
    }
    closemodal = () => {
        this.setState({
            openmodal: false,
        })
    }
    receivePayment = (value) => {
        console.log(value)

        console.log('click is working')
        this.setState({
            openmodal: true,
            // openmodal1:false
        })
    }
    personInfo = (value) => {
        console.log(value)
        console.log('click is working')
        this.setState({
            openmodal1: true,
            // openmodal:false
        })
    }
    render() {

        return (
            <Scrollbars className="personInfoScrolling" >
                <div className="personalinfocomponent">
                    <div className="mainDiv Fonts">
                        <div className="TopDiv">
                            <div className="firstTopDiv">
                                <img src={backimag} alt="backimag" className="firstTopDivImage" />
                            </div>
                            <div className="secTopDiv"><span onClick={this.personInfo.bind(this)}>Personal Info.</span></div>
                        </div>
                        <div className="secDiv">
                            <img src={infoimag} alt="infoimag" />
                        </div>
                        <div className="secDivOne">
                            <div className="thirdDiv">Eross candra</div>
                            <div className="fourthDiv">
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    className="incomefield"
                                    value={this.state.anualincome}
                                    style={{ border: this.state.annual }}
                                    // onClick={this.annualBox}
                                    //    onChange={(event) => this.setState({ anualincome: event.target.value })}
                                    SelectProps={{
                                        MenuProps: {
                                            className: "",
                                        },
                                    }}
                                >
                                    {accType.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>



                            </div>
                            <div className="fifthDiv">Home Loan</div>
                            <div className="MobileNumberDiv">
                                <div className="callIcon"><img src={callIcon}     ></img></div>
                                <div>123678896</div>
                                <div className="messageIcon"><img src={messageIcon}     ></img></div>
                            </div>
                        </div>
                        <div className="sixthDivTop">
                            <div className="sixthDiv">
                                <div>
                                    <div className="sixthDivone">NEXT PAYMENT</div>
                                    <div className="sevenDiv">21 feb 2019</div>
                                    <div className="eightDiv">2,500</div>
                                    <div className="nineDiv"><div className="nineDivLetter">2000 </div>&nbsp;&nbsp; <div className="nineDivText"> Principal</div>&nbsp;&nbsp; |&nbsp;&nbsp; &nbsp;<div className="nineDivLetter"> 500</div> &nbsp; &nbsp; <div className="nineDivText">Interest</div></div>
                                    {/* <div className="tenthDiv">TRANSACTION HISTORY</div> */}

                                </div>


                                <div>

                                    <div className="PaidButton">
                                        <Button className="firstbtn" onClick={this.receivePayment.bind(this)}>Paid</Button>
                                    </div>
                                    <div className="NotPaidButton">
                                        <Button className="secondbtn" onClick={this.receivePayment.bind(this)}>Not Paid</Button>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <div className="tenthDiv">TRANSACTION HISTORY</div>
                                {history.map(option => (
                                    <div className="elevenDiv">
                                        <div className="elevenDivone">{option.date} </div>
                                        <div className="elevenDivtwo">
                                            <div className="elevenDivtwoone">
                                                <div className="elevenDivtwooneone">{option.money}</div>
                                                <div className="elevenDivtwoonetwo">&nbsp;&nbsp;&nbsp;&nbsp;<label className="elevenDivtwoonetwoLabel">.</label>{option.MoneyType}</div>
                                            </div>
                                            <div className="elevenDivtwotwo">
                                                <div className="elevenDivtwotwoone">{option.TotalAmount} &nbsp;&nbsp;&nbsp;&nbsp;</div><div className="elevenDivtwotwoTwo">{option.LoanType}</div>
                                            </div>
                                        </div>
                                    </div>))}
                            </div>


                        </div>
                    </div>
                    <ReceivePayment open={this.state.openmodal} close={this.closemodal} />
                    <PersonInfoModal open={this.state.openmodal1} close={this.closemodal1} />
                </div>
            </Scrollbars>
        )
    }
}
export default PersonalInfo;