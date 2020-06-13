import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import React, { Component } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import whitehandset from '../../../assets/images/whitehandset.svg';
import { BaseUrl, ImageBaseUrl } from "../../../Environment";
import { fetchAPIData } from '../../../service/service';
import MessageForCustomer from '../../modals/MessageForCustomer/MessageForCustomer';
import PersoanlInfoModel from '../../modals/PersonInfo modal/PersonInfoModal';
import NewCustomerListView from '../NewCustomerListView/NewCustomerListView';
import './NewCustomer.scss';
import { check, cross, editwhite, handset, userdefault, message, plusgreen } from '../../../assets/images';
import { withNamespaces } from 'react-i18next';

const axios = require('axios')
class NewCustomerCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openmodal: false,
      opendetailmodal: false,
      loginToken: "",
      allCustomer: [],
      status: "",
      row: "",
      cross: "",
      check: "",
      isPersonalInfoActive: false,
      customerInfo: {},
      whiteimage: "none",
      phoneimage: "",
    }
    // this.context =this.context.bind(this)
    this.closemodal = this.closemodal.bind(this)
    this.closedetailmodal = this.closedetailmodal.bind(this)
    this.AllCustomerGet = this.AllCustomerGet.bind(this)

  }
  CardOver = (index) => {
    document.getElementById('handset' + index).style.display = "none"
    document.getElementById('whitehandset' + index).style.display = ""
  }
  CardOut = (index) => {
    document.getElementById('handset' + index).style.display = ""
    document.getElementById('whitehandset' + index).style.display = "none"
  }
  AllCustomerGet() {
    let loggedinUser = localStorage.getItem("loggedinUserCompany")
    // const addressId = localStorage.getItem("addressId")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    }
    axios.get(BaseUrl + '/customer/getAllCustomers?name=&companyId=' + loggedinUser, {
      headers: headers,
    }).then(resp => {
      if (resp.status === 200) {
        resp.data.forEach((item, i) => {
          resp.data[i].count = Object.keys(item.loans).length;
          if (item.verified === true) {
            this.setState({
              cross: "none",
              check: "initial",
            })
          } else {
            this.setState({
              cross: "initial",
              check: "none",
            })
          }
        })
        // resp.data.forEach((item,i)=>{
        //   let loan = [];
        //   loan = item.loans

        //  let count =  Object.keys(loan).length;
        //  this.setState({
        //    count:count
        //  })
        // })
        this.setState({
          allCustomer: resp.data
        })
        let loan = [];
        loan = resp.data[0].loans

        let count = Object.keys(loan).length;
      } else {
        toast.error("Something went wrong. Please try again later!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    }).catch(err => {
      // if(err.request.status!==200){
      // toast.error("Something went wrong. Please try again later!", {
      //     position: "top-center",
      //     autoClose: 2000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: false,
      //     draggable: true,
      //     });
      // }
    })
  }
  componentDidMount() {
    this.setState({
      loginToken: localStorage.getItem('token'),
      extrafield1: "none",
      extrafield2: "none",
    })
    this.AllCustomerGet()

  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      allCustomer: nextProps.searchResults
    })
  }
  OnShow(customerId) {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    }
    if (customerId.verified === null) {
      customerId.verified = true;
      axios.put(BaseUrl + '/customer/verifyCustomer', customerId, {
        headers: headers,
      }).then(res => {
        if (res.request.status === 200) {
          // {this.state.choosecustomer}
          let custname = customerId.firstName
          toast.success(custname + " " + "verified Successfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
          // window.location.reload()
          this.AllCustomerGet()
        }
      })
    } else {
      this.props.history.push({ pathname: '/addloannointerest', params: customerId })
    }
  }
  edit(details) {
    this.props.history.push({ pathname: '/customers/addcustomer', params: details })
  }
  closemodal() {
    this.setState({
      openmodal: false
    })
  }
  closedetailmodal() {
    this.setState({
      opendetailmodal: false
    })
  }
  customerDetails(details) {
    this.setState({
      opendetailmodal: true
    })

  }
  messagecustomer = (details, value) => {
    this.setState({
      openmodal: true,
      row: details
    })
  }

  onProfileCardClk = async customerId => {
    let { isPersonalInfoActive } = this.state
    isPersonalInfoActive = !isPersonalInfoActive
    this.setState({ isPersonalInfoActive });
    let customerInfo = {}
    if (isPersonalInfoActive) {
      customerInfo = await fetchAPIData('customerDetailByID', customerId)
      this.setState({ customerInfo });
    }
  }

  render() {
    const { t } = this.props;

    toast.configure({});
    const { isPersonalInfoActive, customerInfo } = this.state
    return (
      <div>
        {this.props.list !== "list" ?
          <div>
            <div className="Newcustomercardviewpage">
              <Grid container spacing={1} style={{display: "grid", gridTemplateColumns: "repeat( auto-fill, minmax(250px, 1fr) )"}}>
                {this.state.allCustomer && this.state.allCustomer.map((details, index) => {
                  return <Grid  key={index}>
                    <Card className="CardDiv" onMouseOver={(event) => this.CardOver(index)} onMouseOut={(event) => this.CardOut(index)}>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="recipe">
                            {details.proofs &&
                              <img src=
                                {
                                  details.proofs[0] &&
                                    details.proofs[0].proofImagePath ? ImageBaseUrl + details.proofs[0].proofImagePath : userdefault}
                                  alt="newcustomer2" className="newcustomer2" style={details.proofs[0] && details.proofs[0].proofImagePath ? { width: "40px" } : { width: "31px" }} />
                                }
                          </Avatar>
                        }
                        action={
                          <div>
                            <div >
                              <img src={message} alt="message" className="editwhite" onClick={this.messagecustomer.bind(this, details)} /> <br></br>
                            </div>
                            <div>
                              <img src={editwhite} alt="editwhite" onClick={this.edit.bind(this, details.customerId)} className="editwhite" /> <br></br>
                            </div>
                            {/* <div>
                              <img src={deletewhite} alt="deletewhite" className="deletewhite"/>            
                            </div> */}
                          </div>
                        }
                        title={
                          details.firstName && <div className="NameDiv Fonts">{details.firstName} {details.lastName}</div>
                        }
                        subheader={
                          <div onClick={() => this.onProfileCardClk(details.customerId)} style={{cursor:"pointer"}}>
                            <div className="subheadingnameDiv Fonts">
                              {details.verified ? t('NewCustomer.verify') : t('NewCustomer.notver')}<span style={{ paddingLeft: "3px" }}>
                                {details.verified ?
                                  <img src={check} alt="check" className="checkImage" style={{ width: "10px" }} />
                                  :
                                  <img src={cross} alt="cross" className="crossImage" style={{ width: "10px" }} />

                                }
                              </span>
                            </div>
                            <div className="subheadingnameDiv Fonts">
                              <img src={handset} alt="handset" id={"handset" + index} className="handset" style={{ width: "8px", marginRight: "5px", marginLeft: "5px", display: '' }} />
                              <img src={whitehandset} alt="whitehandset" id={"whitehandset" + index} className="whitehandset" style={{ width: "8px", marginRight: "5px", marginLeft: "5px", display: 'none' }} />
                              {details.phone}<span style={{ paddingLeft: "3px" }}>
                              </span>
                            </div>
                          </div>
                        }
                      />
                      <CardContent>
                        <div style={details.verified === true ? { display: "initial" } : { display: "none" }}>
                          <button className="AddloanButton" onClick={this.OnShow.bind(this, details)}><img src={plusgreen} alt="plusgreen" className="plusgreenButton" />
                            <span>{t('NewCustomer.addloanbtn')}</span></button>
                        </div>
                        <div style={details.verified === null ? { display: "initial" } : { display: "none" }}>
                          <button className="VerifyButton" onClick={this.OnShow.bind(this, details)}>
                            <span>{t('NewCustomer.verifybtn')}</span></button>
                        </div>
                      </CardContent>
                      <CardActions disableSpacing>
                        <div style={{ display: 'flex', width: '100%', cursor:"pointer" }} onClick={() => this.onProfileCardClk(details.customerId)}>
                          <div className="footerDiv1">
                            {details.createdAt && <div className="footerDivdate Fonts">{moment(details.createdAt).format("DD MMM YYYY")}</div>}
                            <div className="footerDivdatedetails Fonts">{t('NewCustomer.Date')}</div>
                          </div>
                          <div className="footerDiv2">
                            {details.count && <div className="footerDivmonth Fonts">{(details.count)}</div>}
                            <div className="footerDivmonthdetails Fonts">{t('NewCustomer.loans')}</div>
                          </div>
                        </div>
                      </CardActions>
                    </Card>
                  </Grid>
                })
                }
              </Grid>
              <MessageForCustomer open={this.state.openmodal} close={this.closemodal} rowData={this.state.row} />
              {<PersoanlInfoModel open={isPersonalInfoActive} close={this.onProfileCardClk} customerInfo={customerInfo} />}
              {/* <DeleteCustomer open={this.state.openmodal} close={this.closemodal} rowData={this.state.row}/> */}
              {/* <PersonInfoModal open={this.state.opendetailmodal} close={this.closedetailmodal} /> */}
            </div>
          </div>
          :
          <NewCustomerListView />
        }

      </div>
    )
  }
}
export default withNamespaces()(withRouter(NewCustomerCardView));