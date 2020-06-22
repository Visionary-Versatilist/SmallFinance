import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import companylogo from '../../../assets/images/companylogo.svg';
import plusicon from '../../../assets/images/plusicon.svg';
import searchicon from '../../../assets/images/searchicon.svg';
import { BaseUrl} from "../../../Environment";
import { withNamespaces } from 'react-i18next';
import './AllNewCustomerHeader.scss';

const axios = require('axios')



class AllNewCustomerHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCustomer:[],
            error: null, 
            errorInfo: null
        };
    }
    componentDidCatch(error, info) {
        // Catch errors in any components below and re-render with error message
        console.log("componentDidCatch")
        console.log(error)
        console.log(info)
        this.setState({
          error: error,
          errorInfo: info
        })
        // You can also log error messages to an error reporting service here
      }
      addcustomer(){
        this.props.history.push('/customers/addcustomer')
      }
      searchlist=(e)=>{
        let  loggedinUser= localStorage.getItem("loggedinUserCompany")
        
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
        }
      axios.get(BaseUrl + '/customer/getAllCustomers?name='+e.target.value+'&companyId='+loggedinUser,{
          headers: headers,
      }).then(resp => {
          if(resp.status===200) {
            //   this.setState({
            //     allCustomer: resp.data,
            //   })
            resp.data && resp.data.forEach((item,i)=>{
                resp.data[i].count =  Object.keys(item.loans).length; 
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
            loan = resp.data[0]?resp.data[0].loans:null
  
           
  
              this.props.reciveData(resp.data)
          }else{
              toast.error("Please try again!", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  });
          }
      })
    // .catch(err => {
    //       if(err.request.status!==200){
    //       toast.error("Please try again!", {
    //           position: "top-center",
    //           autoClose: 2000,
    //           hideProgressBar: true,
    //           closeOnClick: true,
    //           pauseOnHover: false,
    //           draggable: true,
    //           });
    //       }
    //   })
      }
    


    render(){
      const { t } = this.props;

        return(
            <div className="allCustomerHeader">
            <section className='Customerheader'>
                <AppBar position="static" className='bar'>
                    <Toolbar>
                        <Typography variant="h6" className='title' style={{width:"67%"}}>
                        <img style={{width:"19%"}} src={companylogo} alt="logo"/>
                        </Typography>
                        <div className="searchDiv">
                    <IconButton className='iconButton' aria-label="search">
                    <img src={searchicon} alt="searchicon" className="iconButton" />
                    </IconButton>
                    <InputBase className='input' placeholder="Search by Customer Name" onChange={this.searchlist} />
                </div>        
                    </Toolbar>         
                </AppBar>
            </section>
            <section className="Headerthing">
                <div className="ButtonDiv">
                  <Button className="Fonts btnSizeFont adduserbutton" onClick={this.addcustomer.bind(this)}>
                    <img src={plusicon} alt="plusicon" className="plusiconButton" />
                    {t('NewCustomer.addbutton')}
                           </Button>
                </div>        
            </section>
            </div>         
        )
    }
}
export default withNamespaces()(withRouter(AllNewCustomerHeader));