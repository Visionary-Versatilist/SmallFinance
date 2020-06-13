import React, { Component } from 'react';
import Sidebar from '../sidebar/sidebar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Loan.scss';
import LoanHeader from './Loanheader/LoanHeader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BaseUrl} from "../../Environment";
import penciledit from "../../assets/images/penciledit.svg";
import { withNamespaces } from 'react-i18next';

const axios = require('axios')

class Loan extends Component {
  constructor(){
    super();
    this.state ={
      openmodal : false,
      allLoan:[],
      row:"",
    }
    this.closemodal = this.closemodal.bind(this)
    this.GetAllLoanType = this.GetAllLoanType.bind(this)
}
deleteLoanType=(value) =>{
    this.setState({
        openmodal : true,
        row: value
    })
}
  closemodal(){
    this.setState({
        openmodal : false
    })
}
GetAllLoanType(){
 let  loggedinUser= localStorage.getItem("loggedinUserCompany")
 
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
}
axios.get(BaseUrl + '/loanType/getAllLoanTypes?loanType=&companyId=' + loggedinUser ,{
    headers: headers,
}).then(resp => {
    if(resp.status===200) {
      resp.data.forEach((item,i)=>{
        if(item.loanType === "Business Loan") {
          resp.data[i].image = require('../../assets/images/businessicon.svg')
        } else if(item.loanType === "Agriculture Loan") {
          resp.data[i].image = require('../../assets/images/agricultureicon.svg')
        } else if(item.loanType === "Home Loan"){
          resp.data[i].image = require('../../assets/images/homeicon.svg')
        } else if(item.loanType === "Personal Loan"){
          resp.data[i].image = require('../../assets/images/personalicon.svg')
        } else if(item.loanType === "Two - Wheeler Loan"){
          resp.data[i].image = require('../../assets/images/twoweelericon.svg')
        } else if(item.loanType === "Export Credit Loan"){
          resp.data[i].image = require('../../assets/images/exportcrediticon.svg')
        } else if(item.loanType === "Micro Credit Loan"){
          resp.data[i].image = require('../../assets/images/educationalicon.svg')
        } else if(item.loanType === "Education Loan"){
          resp.data[i].image = require('../../assets/images/educationalicon.svg')
        } else if(item.loanType === "Loan against Fixed Deposits"){
          resp.data[i].image = require('../../assets/images/loanagainstfixeddeposit.svg')
        } else if(item.loanType === "Renewable Energy Loan"){
          resp.data[i].image = require('../../assets/images/renewableenargyloan.svg')
        } else if(item.loanType === "Loan Against Gold"){
          resp.data[i].image = require('../../assets/images/loanagainstgold.svg')
        }  else if(item.loanType === "Women Entreprenuer Loan"){
          resp.data[i].image = require('../../assets/images/womenentrepreneuricon.svg')
        }  else {
          resp.data[i].image = require('../../assets/images/loanagainstgold.svg')
        } 
      })
       this.setState({
         allLoan: resp.data
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
    if(err.request.status!==200){
    toast.error("Something went wrong. Please try again later!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });
    }
})
}
  componentDidMount(){
    this.GetAllLoanType()
  }
  addloan(loanData){
    // '/addloannointerest'
    this.props.history.push({pathname:'/addloannointerest',params:loanData})
  }
  addloantype(){
    this.props.history.push('/addloan')
  }
  editLoanType(loanTypeId){
    // this.props.history.push('/loan/editloan')
    localStorage.setItem("EditLoanTypeID", loanTypeId)
    this.props.history.push({pathname:'/loan/editloan',params:loanTypeId})

  }
  getDataFromChild = (value) =>{
    this.setState({
      allLoan: value
    })
}

    render(){
      const { t } = this.props;

      toast.configure({ });

        return(
            <div>
            <Sidebar/>
            <LoanHeader reciveData={this.getDataFromChild} />
            <div className="loancomponent">
        <div className="addButton"><Button className="addLoan Fonts" onClick={this.addloantype.bind(this)}>+{t('AddLoanType.subtitle')}</Button></div><br />
            <div className="cards">
        <div className="loanCards">
          {this.state.allLoan.map((type,index)=>(
              <div key={index}>          
          <Card className="card2">
            <CardActionArea>    
              <CardContent style={{height:"105px"}}>
                <div className="icons">
                <img src={penciledit} alt="editicon" className="editIcon" onClick={this.editLoanType.bind(this, type.loanTypeId)} />
                {/* <img src={deleteicon} alt="deleteicon" className="deleteIcon" onClick={this.deleteLoanType.bind(this, type)}/> */}
                </div>
                <div style={{height:"fit-content"}}  onClick={this.addloan.bind(this,type)}>
                <div>
                <img src={type.image} className="Applogo" alt="logo" />
                </div>
                <Typography gutterBottom variant="h5" component="div">
                  <h4 className="loans Fonts">{type.loanType}</h4>
                </Typography>
                </div>
              </CardContent>
            </CardActionArea>
          </Card> 
          {/* <DeleteLoan open={this.state.openmodal} allloan={this.GetAllLoanType.bind(this)} close={this.closemodal} rowData={this.state.row}/>   */}
      </div>
            ))
          }  
    </div>
 </div>
 </div>
 </div>
        );
    }
} 
export default withNamespaces()(Loan);