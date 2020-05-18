import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import React, { Component } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { withRouter } from "react-router-dom";
import cardimage from '../../../assets/images/cardimage.svg';
import userdefault from '../../../assets/images/userdefault.svg';
import AllCustomerListView from '../CustomersListView/AllCustomerListView/AllCustomerListView';
import handset from '../../../assets/images/handset.svg';
import whitehandset from '../../../assets/images/whitehandset.svg';
import messageblack from '../../../assets/images/messageblack.svg';
import message from '../../../assets/images/message.svg';
import MessageForCustomer from '../../modals/MessageForCustomer/MessageForCustomer';
import { ImageBaseUrl } from "../../../Environment";
import { withNamespaces } from 'react-i18next';

import './AllCustomerCardview.scss';


class AllCustomerCardview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whiteimage:"none",
      phoneimage:"",
      messageblack:"",
      message:"none",
      openmodal: false,
      row: "",
    }
  //  this.CardOver =  this.CardOver.bind(this)
  //  this.CardOut = this.CardOut.bind(this)
  }
  detailspage(loanid) {
    this.props.history.push({
      pathname: '/customers/customerinfo',
      state: { loanID: loanid }
    })
    localStorage.setItem('loanId',loanid)
  }
  CardOver = (index) => {
    document.getElementById('messageblack'+ index).style.display="none"
    document.getElementById('message'+ index).style.display=""

    document.getElementById('handset'+ index).style.display="none"
    document.getElementById('whitehandset'+ index).style.display=""  
  }
  CardOut = (index) => {
    document.getElementById('messageblack'+ index).style.display = ''
    document.getElementById('message'+ index).style.display = 'none'

    document.getElementById('handset'+ index).style.display=""
    document.getElementById('whitehandset'+ index).style.display="none" 
  }

  messagecustomer = (details, value) => {
    this.setState({
      openmodal: true,
      row: details
    })
  }
  closemodal=()=> {
    this.setState({
      openmodal: false
    })
  }

  render() {
    const { t } = this.props;

    let newData = this.props.allData.map(data => {
      let amount = 0;
      let totalAmount = 0;
      let percent = 0;
      if (data.loanCollections.length > 0) {
        data.loanCollections.map((collection, index) => {
          amount = Number(collection.collectionAmount)
          if (index === data.loanCollections.length - 1) {

            totalAmount += amount - Number(data.loanCollections.PenaltyApplied ? data.loanCollections.PenaltyApplied : 0)

          }
          else {
            totalAmount = amount
          }

        })
        percent = totalAmount / (data.totalAmountToCollect) * 100
        data.totalAmount = Math.round(percent);
      }
      return data;
    })
  
    return (
      <div>
        {this.props.list !== "list" ?
          <div>
            <div className="Allcustomercardviewpage">
              <Grid container spacing={1} style={{ margin: "0px",marginRight: "43px" }}>
                {this.props.allData && newData.map((open, index) => {
                  return <Grid item xs={3} key={index}>
                    <div>
                      <Card className="CardDiv"  onMouseOver={(event) => this.CardOver(index)} onMouseOut={(event) => this.CardOut(index)}>
                        <CardHeader
                          avatar={
                            <Avatar aria-label="recipe">
                              <img
                                src={open.customer.proofs[0] && open.customer.proofs[0].proofImagePath ? ImageBaseUrl + open.customer.proofs[0].proofImagePath : userdefault}
                                alt="cardimage" className="cardimage" style={open.customer.proofs[0] && open.customer.proofs[0].proofImagePath?{ width: "40px" }:{ width: "31px" }} />
                            </Avatar>
                          }
                          action={
                          <div>
                            <div >
                            <img src={messageblack} alt="message" className="messageblack" id={"messageblack"+index} style={{display:''}}/>
                            <img src={message} alt="message" className="message" id={"message"+index} style={{display:'none'}} onClick={this.messagecustomer.bind(this, open)}/>
                            </div>
                          </div>
                        }
                          title={
                            <div className="NameDiv Fonts">{open.customer.firstName} {open.customer.lastName}</div>
                          }
                          subheader={
                            <div className="subheadingnameDiv Fonts">{open.loanId} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <img src={handset} alt="handset" id={"handset"+index} className="handset" style={{ width: "8px", marginRight: "5px", marginLeft: "5px", display:'' }} />
                              <img src={whitehandset} alt="whitehandset" id={"whitehandset" +index} className="whitehandset" style={{ width: "8px", marginRight: "5px", marginLeft: "5px", display:'none' }} />
                              {open.customer.phone}
                            </div>
                          }
                        />
                        <CardContent onClick={this.detailspage.bind(this, open.loanId)}>
                          <CardHeader
                            avatar={
                              <div style={{ borderRadius: '50%', backgroundColor: 'transparent', width: '53px' }}>
                                <CircularProgressbar value={open.totalAmount ? open.totalAmount : 0} text={`${open.totalAmount ? open.totalAmount : 0}%`} styles={buildStyles({ textColor: '#3E4664', pathColor: '#00D95E', trailColor: '#D2D2DC', textSize: '30px' })} />
                              </div>
                            }

                            title={
                              <div style={{display:"flex"}}>
                              <div className="MoneydetailsDiv Fonts">{open.loanAmount}</div>
                             {open.rateOfInterest? <div className="MoneydetailsDiv Fonts">&nbsp; at &nbsp;{open.rateOfInterest || ""} %</div>:" "}
                              </div>
                            }
                            subheader={
                              <div>
                                <div className="subheaderDiv">
                                  <div className="subheaderStatus Fonts" style={open.loanPaymentStatus === "OverDue" ? { backgroundColor: "#FFE5E5", color: "#FF0000" } : { backgroundColor: "#EDEFFE", color: "#4D66F0" }}>{open.loanPaymentStatus ? open.loanPaymentStatus : "Due"}</div>
                                  <div className="subheaderDays Fonts">{open.method ==="Installment Calculator"?"EMI":"CMI"}</div>
                                </div>
                                <div style={{ textTransform: "capitalize" }} className="loantypename Fonts">{open.loanType.loanType} | {open.user.firstName}</div>
                              </div>
                            }
                          />
                        </CardContent>
                        <CardActions disableSpacing>
                          <div style={{ display: 'flex', width: '100%', marginTop: '5px' }}>
                            <div className="footerDiv1">
                              <div className="footerDivdate Fonts">{moment(open.nextDueDate ? open.nextDueDate : open.startDate).format("DD MMM YYYY")}</div>
                              <div className="footerDivdatedetails Fonts">{t('Loans.Date')}</div>
                            </div>
                            <div className="footerDiv2">
                              <div className="footerDivmonth Fonts">{open.loanTenureType}</div>
                              <div className="footerDivmonthdetails Fonts">{t('Loans.Collseq')}</div>
                            </div>
                          </div>
                        </CardActions>
                      </Card>
                    </div>

                  </Grid>
                })}
              </Grid>
              <MessageForCustomer open={this.state.openmodal} close={this.closemodal} rowData={this.state.row} />
            </div>
          </div>

          :
          <AllCustomerListView />
        };
            </div>
    )
  }
}
export default withNamespaces()(withRouter(AllCustomerCardview));