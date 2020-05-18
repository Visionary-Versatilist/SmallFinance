import React, { Component } from 'react';
import './ClosedCustomerCardView.scss';
import clsx from 'clsx';
import cardimage from '../../../assets/images/cardimage.svg';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { CircularProgressbar, buildStyles,   CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ClosedCustomerListview from '../CustomersListView/ClosedCustomerListView/ClosedCustomerListView';
import {withRouter} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import handset from '../../../assets/images/handset.svg';
import whitehandset from '../../../assets/images/whitehandset.svg';
import messageblack from '../../../assets/images/messageblack.svg';
import message from '../../../assets/images/message.svg';
import userdefault from '../../../assets/images/userdefault.svg';
import moment from 'moment';
import MessageForCustomer from '../../modals/MessageForCustomer/MessageForCustomer';
import {BaseUrl, headers, ImageBaseUrl} from "../../../Environment";
import { withNamespaces } from 'react-i18next';


class ClosedCustomerCardview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whiteimage:"none",
      phoneimage:"",
      messageblack:"",
      message:"none",
      interest:"16%",
      openmodal: false,
      row: "",
    }
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
  detailspage(loanid) {
    this.props.history.push({
      pathname: '/customers/customerinfo',
      state: { loanID: loanid }
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

      const percentage = 100;

        return(
            <div>
            {this.props.list !== "list" ?
            <div>
                <div className="Allcustomercardviewpage">
                <Grid container spacing={1} style={{margin:"0px",marginRight: "43px"}}>
                {this.props.closeData &&   this.props.closeData.map((details, index) => {
                 return  <Grid item xs={3} key={index}>
                 <Card className="CardDiv"  onMouseOver={(event) => this.CardOver(index)} onMouseOut={(event) => this.CardOut(index)}>

      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
          <img src={details.customer.proofs[0] && details.customer.proofs[0].proofImagePath? ImageBaseUrl + details.customer.proofs[0].proofImagePath: userdefault } alt="cardimage" className="cardimage" style={details.customer.proofs[0] && details.customer.proofs[0].proofImagePath?{ width: "40px" }:{ width: "31px" }} />
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
          <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({  textColor: '#3E4664',  pathColor: '#00D95E',  trailColor: '#D2D2DC', textSize: '30px'})} />
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
          <div  className="footerDivmonthdetails Fonts">{t('Loans.Collseq')}</div>
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
    <ClosedCustomerListview/>
            }; 
            </div>         
        )
    }
}
export default withNamespaces()(withRouter(ClosedCustomerCardview));