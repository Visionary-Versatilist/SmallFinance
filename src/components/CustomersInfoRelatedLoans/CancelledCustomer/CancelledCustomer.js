import React, { Component } from 'react';
import './CancelledCustomer.scss';
// import cardimage from '../../../assets/images/cardimage.svg';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import {withRouter} from "react-router-dom";
import DeleteCustomer from '../../modals/deletecustomer/deletecustomer';
import CancelledCustomerListview from '../CustomersListView/CancelledCustomerListView/CancelledCustomerListView';
import Grid from '@material-ui/core/Grid';
import handset from '../../../assets/images/handset.svg';
import whitehandset from '../../../assets/images/whitehandset.svg';
import messageblack from '../../../assets/images/messageblack.svg';
import message from '../../../assets/images/message.svg';
import {BaseUrl, headers, ImageBaseUrl} from "../../../Environment";
import userdefault from '../../../assets/images/userdefault.svg';
import MessageForCustomer from '../../modals/MessageForCustomer/MessageForCustomer';
import { withNamespaces } from 'react-i18next';

const axios = require('axios')



class NewCustomerCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openmodal : false,
      loginToken:"",
      allCustomer:[],
      status:"",
      row:"",
      whiteimage:"none",
      phoneimage:"",
      messageblack:"",
      message:"none",
      interest:"16%",
      openmodalmessage: false,
      row: "",
    }
    // this.context =this.context.bind(this)
    this.closemodal = this.closemodal.bind(this)

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

    componentDidMount() {
      this.setState({
          loginToken: localStorage.getItem('token'),
          extrafield1:"none",
          extrafield2:"none",
      })

      // const addressId = localStorage.getItem("addressId")
    axios.get(BaseUrl + '/customer/getAllCustomers',{
        headers: headers,
    }).then(resp => {
        if(resp.status===200) {
          resp.data.forEach((item,i)=>{
            if(item.customerId === (item.customerId % 2)) {
              resp.data[i].status = 'complete'
              // this.setState({
              //   status:"complete"
              // })
            } else {
              resp.data[i].status = 'incomplete'
            }
          })
          this.setState({
            allCustomer: resp.data
          })
        }else{
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
  OnShow(customerId){
    this.props.history.push({pathname:'/addloannointerest',params:customerId})
  } 
  edit(customerId){
    this.props.history.push({pathname:'/customers/addcustomer',params:customerId})
  } 
  closemodal(){
    this.setState({
        openmodal : false
    })
} 
detailspage(loanid) {
  this.props.history.push({
    pathname: '/customers/customerinfo',
    state: { loanID: loanid }
  })
}
  deletecustomer=(details, value) =>{
    this.setState({
        openmodal : true,
        row: details
    })
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
  render(){
    const { t } = this.props;

    toast.configure({
    });
    const percentage = 66;
    let newData = this.props.cancelData.map(data => {
      let amount = 0;
      let totalAmount = 0;
      let percent = 0;
      if (data.loanCollections.length > 0) {
        data.loanCollections.map((collection, index) => {
          amount = Number(collection.collectionAmount)
          if (index === data.loanCollections.length - 1) {
            // && data.loanCollections.PenaltyApplied
            // if(PenaltyApplied){
              // debugger;
            totalAmount += amount - Number(data.loanCollections.PenaltyApplied?data.loanCollections.PenaltyApplied:0)
            //  }
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
        return(
          <div>
            {this.props.list !== "list" ?
            <div>
                <div  className="Cancellcardviewpage">
              <Grid container spacing={1} style={{margin:"0px",marginRight: "43px"}}>
                {this.props.cancelData &&   this.props.cancelData.map((details, index) => {
                 return  <Grid item xs={3} key={index}>
                      <Card className="CardDiv"  onMouseOver={(event) => this.CardOver(index)} onMouseOut={(event) => this.CardOut(index)}>
                           <CardHeader
                             avatar={
                               <Avatar aria-label="recipe">
                               <img src={details.customer.proofs[0] && details.customer.proofs[0].proofImagePath? ImageBaseUrl+ details.customer.proofs[0].proofImagePath: userdefault } alt="cardimage" className="cardimage" style={details.customer.proofs[0] && details.customer.proofs[0].proofImagePath?{ width: "40px" }:{ width: "31px" }} />
                               </Avatar>
                             }
                             action={
                               <div>
                            <div >
                            <img src={messageblack} alt="message" className="messageblack" id={"messageblack"+index} style={{display:''}}/>
                            <img src={message} alt="message" className="message" id={"message"+index} style={{display:'none'}} onClick={this.messagecustomer.bind(this, details)}/>
                            </div>
                          </div>
                        }
        title={
          <div className="NameDiv Fonts">{details.customer.firstName} {details.customer.lastName}</div>
        }
        subheader={
          <div className="subheadingnameDiv Fonts">
            {details.loanId} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            <img src={handset} alt="handset" id={"handset"+index} className="handset" style={{ width: "8px", marginRight: "5px", marginLeft: "5px", display:'' }} />
                              <img src={whitehandset} alt="whitehandset" id={"whitehandset" +index} className="whitehandset" style={{ width: "8px", marginRight: "5px", marginLeft: "5px", display:'none' }} />
            {details.customer.phone}
          </div>          
        }
      />
      <CardContent  onClick={this.detailspage.bind(this, details.loanId)}>
      <CardHeader
         avatar={
          <div style={{borderRadius:'50%', backgroundColor:'transparent', width:'53px'}}>
          <CircularProgressbar value={details.totalAmount ? details.totalAmount : 0} text={`${details.totalAmount ? details.totalAmount : 0}%`} styles={buildStyles({  textColor: '#3E4664',  pathColor: '#00D95E',  trailColor: '#D2D2DC', textSize: '30px'})} />
          </div>
        } 
       
        title={
          <div style={{display:"flex"}}>
          <div className="MoneydetailsDiv Fonts">{details.loanAmount}</div>
          {details.rateOfInterest? <div className="MoneydetailsDiv Fonts">&nbsp; at &nbsp;{details.rateOfInterest || ""} %</div>:" "}
          </div>
          }
        subheader= {
          <div>
          <div className="subheaderDiv">
          <div className="subheaderStatus Fonts">{details.loanStatus}</div>
          <div className="subheaderDays Fonts">{details.method ==="Installment Calculator"?"EMI":"CMI"}</div>
          </div>
          <div style={{textTransform:"capitalize"}} className="loantypename">{details.loanType.loanType} | {details.user.firstName}</div>
          </div>
        }
      />
      </CardContent>
      <CardActions disableSpacing>
      <div style={{display:'flex', width: '100%', marginTop: '5px'}}>
        <div className="footerDiv1">
          <div  className="footerDivdate Fonts">{moment(details.nextDueDate? details.nextDueDate:details.startDate).format("DD MMM YYYY")}</div>
          <div  className="footerDivdatedetails Fonts">{t('Loans.Date')}</div>
        </div>
        <div  className="footerDiv2">
        <div  className="footerDivmonth Fonts">{details.loanTenureType}</div>
          <div  className="footerDivmonthdetails Fonts"> {t('Loans.Collseq')}</div>
        </div>
      </div>
        </CardActions>
       
     
    </Card>
    </Grid>
                  })}
                  </Grid>
                  <MessageForCustomer open={this.state.openmodal} close={this.closemodal} rowData={this.state.row} />

    </div>
            </div> 
            :
            <CancelledCustomerListview/>
            }; 
            </div>       
        )
    }
}
export default withNamespaces()(withRouter(NewCustomerCardView));