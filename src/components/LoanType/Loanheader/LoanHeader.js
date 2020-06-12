import React, { Component } from 'react';
import './LoanHeader.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import companylogo from '../../../assets/images/companylogo.svg';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import searchicon from '../../../assets/images/searchicon.svg';
import {withRouter} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BaseUrl} from "../../../Environment"

const axios = require('axios')

class LoanHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: "Any time",
            filter:"Filters",
            AllCustomer:"",
            dueCustomer:"",
            overdueCustomer:"",
            filterCustomer:"",
            allText:"",
            dueText:"",
            overdueText:"",
            overduebackground:"",
            duebackground:"",
            allbackground:"",
            closeText:"",
            openText:"",
            newText:"",
            overdueWeight:"",
            dueWeight:"",
            allWeight:"",
            closeWeight:"",
            newWeight:"",
            openWeight:"",
            SelectedtimeColour:"#00D95E",
            SelectedColour:"#00D95E",
            allloantype:""
        };
    }
    opencustomer(){
      this.props.history.push('/customer')
      this.setState({
        AllCustomer:"initial",
        dueCustomer:"initial",
        overdueCustomer:"initial",
        filterCustomer:"initial",
        closeText:"#D4D4D5",
        openText:"#4D66F0",
        newText:"#D4D4D5",
        closeWeight:"",
        newWeight:"",
        openWeight:"900",
      })
    }
    closedcustomer(){
      this.props.history.push('/customer/closedcustomer')
      this.setState({
        AllCustomer:"none",
        dueCustomer:"none",
        overdueCustomer:"none",
        filterCustomer:"",
        closeText:"#4D66F0",
        openText:"#D4D4D5",
        newText:"#D4D4D5",
        closeWeight:"900",
        newWeight:"",
        openWeight:"",
      })
    }
    newcustomer(){
      this.props.history.push('/customer/newcustomer')
      this.setState({
        AllCustomer:"none",
        dueCustomer:"none",
        overdueCustomer:"none",
        filterCustomer:"none",
        closeText:"#D4D4D5",
        openText:"#D4D4D5",
        newText:"#4D66F0",
        closeWeight:"",
        newWeight:"900",
        openWeight:"",
      })
    }
    // opencustomer(){
      
    // }
    allcustomer(){
        this.props.history.push('/customer')
        this.setState({
            allText:"#3E4664",
            dueText:"#757575",
            overdueText:"#757575",
            overduebackground:"",
            duebackground:"",
            allbackground:"#E8E9EF",
            overdueWeight:"",
            dueWeight:"",
            allWeight:"900",
        })
      }
      duecustomer(){
        this.props.history.push('/customer/duecustomer')
        this.setState({
            allText:"#757575",
            dueText:"#3E4664",
            overdueText:"#757575",
            overduebackground:"",
            duebackground:"#E8E9EF",
            allbackground:"",
            overdueWeight:"",
            dueWeight:"900",
            allWeight:"",
        })
      }
      overduecustomer(){
        this.props.history.push('/customer/overduecustomer')
        this.setState({
            allText:"#757575",
            dueText:"#757575",
            overdueText:"#3E4664",
            overduebackground:"#E8E9EF",
            duebackground:"",
            allbackground:"",
            overdueWeight:"900",
            dueWeight:"",
            allWeight:"",
        })
      }
      addcustomer(){
        this.props.history.push('/customers/addcustomer')
      }
      componentDidMount(){
          this.setState({
            allCustomer:"initial",
            dueCustomer:"initial",
            overdueCustomer:"initial",
            filterCustomer:"initial",
          })
          if(window.location.pathname ==="/customer/duecustomer"){
            this.setState({
                allText:"#757575",
                dueText:"#3E4664",
                overdueText:"#757575",
                overduebackground:"",
                duebackground:"#E8E9EF",
                allbackground:"",
                overdueWeight:"",
                dueWeight:"900",
                allWeight:"",
            })
         
        } else if(window.location.pathname ==="/customer/overduecustomer"){
            this.setState({
                allText:"#757575",
                dueText:"#757575",
                overdueText:"#3E4664",
                overduebackground:"#E8E9EF",
                duebackground:"",
                allbackground:"",
                overdueWeight:"900",
                dueWeight:"",
                allWeight:"",
            })

        } else {
            this.setState({
                allText:"#3E4664",
                dueText:"#757575",
                overdueText:"#757575",
                overduebackground:"",
                duebackground:"",
                allbackground:"#E8E9EF",
                overdueWeight:"",
                dueWeight:"",
                allWeight:"900",
              })
        }
        if(window.location.pathname ==="/customer/closedcustomer"){
            this.setState({
                AllCustomer:"none",
                dueCustomer:"none",
                overdueCustomer:"none",
                filterCustomer:"",
                closeText:"#4D66F0",
                openText:"#D4D4D5",
                newText:"#D4D4D5",
                closeWeight:"900",
                newWeight:"",
                openWeight:"",
              })

        } else if(window.location.pathname ==="/customer/newcustomer"){
            this.setState({
                AllCustomer:"none",
                dueCustomer:"none",
                overdueCustomer:"none",
                filterCustomer:"none",
                closeText:"#D4D4D5",
                openText:"#D4D4D5",
                newText:"#4D66F0",
                closeWeight:"",
                newWeight:"900",
                openWeight:"",
              })

        } else {
            this.setState({
                AllCustomer:"initial",
                dueCustomer:"initial",
                overdueCustomer:"initial",
                filterCustomer:"initial",
                closeText:"#D4D4D5",
                openText:"#4D66F0",
                newText:"#D4D4D5",
                closeWeight:"",
                newWeight:"",
                openWeight:"900",
              })

        }
      }
        handleChangetime = event => {
          this.setState({ 
                time: event.target.value,
                SelectedtimeColour:"#00D95E",
                // SelectedColour:"#3E4664 !important"
             });
      };
      handleChangefilter = event => {
        this.setState({ 
            filter: event.target.value,
            // SelectedtimeColour:"#3E4664 !important",
            SelectedColour:"#00D95E" 
        });
      };
      time(){
        this.setState({ 
            SelectedColour:"#00D95E" 
        });
      }
      searchlist=(e)=>{
        let  loggedinUser= localStorage.getItem("loggedinUserCompany")
        
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
}
      axios.get(BaseUrl + '/loanType/getAllLoanTypes?loanType='+e.target.value+'&companyId='+loggedinUser,{
          headers: headers,
      }).then(resp => {
          if(resp.status===200) {
            resp.data.forEach((item,i)=>{
              if(item.loanType === "BusinessLoan") {
                resp.data[i].image = require('../../../assets/images/businessicon.svg')
              } else if(item.loanType === "AgricultureLoan") {
                resp.data[i].image = require('../../../assets/images/agricultureicon.svg')
              } else if(item.loanType === "HousingLoan"){
                resp.data[i].image = require('../../../assets/images/homeicon.svg')
              } else if(item.loanType === "PersonalLoan"){
                resp.data[i].image = require('../../../assets/images/personalicon.svg')
              } else if(item.loanType === "TwoWeelerLoan"){
                resp.data[i].image = require('../../../assets/images/twoweelericon.svg')
              } else if(item.loanType === "ExportCreditLoan"){
                resp.data[i].image = require('../../../assets/images/exportcrediticon.svg')
              } else if(item.loanType === "MicroCreditLoan"){
                // resp.data[i].image = require('../../assets/images/microcrediticon.svg')
              } else if(item.loanType === "EductionLoan"){
                resp.data[i].image = require('../../../assets/images/educationalicon.svg')
              } else if(item.loanType === "LoanAgainstFixedDeposits"){
                resp.data[i].image = require('../../../assets/images/loanagainstfixeddeposit.svg')
              } else if(item.loanType === "RenewableEnergyLoan"){
                resp.data[i].image = require('../../../assets/images/renewableenargyloan.svg')
              } else if(item.loanType === "LoanAgainstGold"){
                resp.data[i].image = require('../../../assets/images/loanagainstgold.svg')
              }  else if(item.loanType === "WomenEntrepreneurLoan"){
                resp.data[i].image = require('../../../assets/images/womenentrepreneuricon.svg')
              }  else {
                resp.data[i].image = require('../../../assets/images/loanagainstgold.svg')
              } 
            })
              this.setState({
                allloantype: resp.data,
              })
              this.props.reciveData(resp.data)
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
    


    render(){
      return(
        <div>
        <section className='LoanCustomerheader'>
            <div position="static" className='bar'>
                <Toolbar>
                  <div className="headerDiv">
                    <div className="headerDivOne">
                    <Typography variant="h6" className='title' style={{width:"67%"}}>
                    <img style={{width:"187%"}} src={companylogo} alt="logo"/>
                    </Typography>
                    </div>
                    {/* <div className="OptionDiv">
                    <div style={{color:this.state.openText, fontWeight:this.state.openWeight}} onClick={this.opencustomer.bind(this)} className="option Fonts btnSizeFont">
                        <span >Open</span>
                    </div>
                    <div  style={{color:this.state.closeText, fontWeight:this.state.closeWeight}} onClick={this.closedcustomer.bind(this)} className="option Fonts btnSizeFont">
                        <span>Closed</span>
                    </div>
                    <div  style={{color:this.state.newText, fontWeight:this.state.newWeight}} onClick={this.newcustomer.bind(this)} className="option Fonts btnSizeFont">
                        <span>New Customer</span>
                    </div>
                    </div> */}
​
                    <div className="searchDiv">
                <IconButton className='iconButton' aria-label="search">
                <img src={searchicon} alt="searchicon" className="iconButton" />
                </IconButton>
                <InputBase className='input' placeholder="Search..." onChange={this.searchlist} />
            </div>    
            </div>    
                </Toolbar>        
            </div>
        </section>                                                                  
        {/* <section className='Customerfilter'>
      <AppBar position="static" className='bar'>
        <Toolbar>
          <Typography variant="h6" className='title'>
            <Button variant="outlined" className="Tabbutton Fonts" style={{display:this.state.AllCustomer, color:this.state.allText, backgroundColor:this.state.allbackground, fontWeight:this.state.allWeight}} onClick={this.allcustomer.bind(this)}>
              All
            </Button>
            <Button variant="outlined" className="Tabbutton Fonts" style={{display:this.state.dueCustomer, color:this.state.dueText, backgroundColor:this.state.duebackground, fontWeight:this.state.dueWeight}} onClick={this.duecustomer.bind(this)}>
              Due
            </Button>
            <Button variant="outlined" className="Tabbutton Fonts" style={{display:this.state.overdueCustomer, color:this.state.overdueText, backgroundColor:this.state.overduebackground, fontWeight:this.state.overdueWeight}} onClick={this.overduecustomer.bind(this)}>
              Overdue
            </Button>
          </Typography>
          <div className="OptionDiv">
          <TextField id="standard-select" select value={this.state.time} style={{display:this.state.filterCustomer, color:this.state.SelectedtimeColour, marginLeft: '20px'}}  className="textBox" 
              onChange={this.handleChangetime}>
              {time.map(option => (
                  <MenuItem key={option.label} value={option.label}>
                      {option.label}
                  </MenuItem>
              ))}
          </TextField>
          <TextField id="standard-select" select value={this.state.filter} style={{display:this.state.filterCustomer, color:this.state.SelectedColour, marginLeft: '20px'}}  className="textBox" 
              onChange={this.handleChangefilter} onClick={this.time.bind(this)}>
              {filter.map(option => (
                  <MenuItem key={option.label} value={option.label}>
                      {option.label}
                  </MenuItem>
              ))}
          </TextField>
            <div className="ButtonDiv">
              <Button className="Fonts btnSizeFont btnbackgroundcolor adduserbutton" onClick={this.addcustomer.bind(this)}>
                <img src={plusicon} alt="plusicon" className="plusiconButton" />
                Add Customer
                       </Button>
            </div>
            <div className="imagediv">
              <img src={cardviewgreen} alt="cardtype" className="cardtypeicon" />
            </div>
            <div className="gridDiv">
              <img src={gridview} alt="gridtype" className="gridtypeicon" />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </section> */}
        </div>         
    )

    }
}
export default withRouter(LoanHeader);