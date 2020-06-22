import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import {withRouter} from "react-router-dom";
import plusgreen from '../../../assets/images/plusgreen.svg';
import Avatar from '@material-ui/core/Avatar';
import tablecus from '../../../assets/images/tablecus.svg';
import {BaseUrl} from "../../../Environment"

import './NewCustomerListView.scss'
const axios = require('axios')




class NewCustomerListview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginToken:"",
      allCustomer:[],
      status:""
    }
    // this.context =this.context.bind(this)
  }
    // createData(Month, Opening, Amt, Principal, Interest,  Closing, Due) {
    //     return { Month, Opening, Amt, Principal, Interest, Closing, Due };
    //   }
      componentDidMount() {
        
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
}
        this.setState({
            loginToken: localStorage.getItem('token'),
            extrafield1:"none",
            extrafield2:"none",
        })
        // const addressId = localStorage.getItem("addressId")
      axios.get(BaseUrl + '/customer/getAllCustomers?name=',{
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
              toast.error("Please try again!", {
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
    } 
    OnShow(){
      this.props.history.push('/customers/addloan')
    } 
    // edit(customerId){
    //   this.props.history.push({pathname:'/customers/addcustomer',params:customerId})
    // } 
    render(){
        // const rows = [
        //     this.createData('01', '5,00,000', '1,60,459', '1,02,179', '58,280', '3,97,821', '12 Aug 2019 '),
        //     this.createData('02', '3,97,821', '1,60,459', '1,16,088', '44,371', '2,81,733', '12 Sep 2019 '),
        //     this.createData('03', '2,81,733', '1,60,459', '1,31,890', '28,569', '1,49,843', '12 Oct 2019 '),
        //     this.createData('04', '1,49,843', '1,60,459', '1,49,843', '10,616', '0', '12 Nov 2019 '),
        //     this.createData('05', '1,49,843', '1,60,459', '1,49,843', '10,616', '0', '12 Nov 2019 '),
        //   ];
        toast.configure({
        });

        return(
            <div>
            <Card className="cardDiv2">
                <div>
      <Table className='table'>
        <TableHead>
          <TableRow style={{backgroundColor:"#E1F0FA", color:'#B2B2B2'}}>
            <TableCell style={{width:"22%"}}>Customer Name</TableCell>
            <TableCell align="left" style={{width:"22%"}}>Status</TableCell>
            <TableCell align="left" style={{width:"22%"}}>Created On</TableCell>
            <TableCell align="left"></TableCell>
            {/* <TableCell align="right">Interest</TableCell>
            <TableCell align="right">Closing Balance</TableCell>
            <TableCell align="right">Due Date</TableCell> */}
         </TableRow>
        </TableHead>
        <TableBody>
          {this.state.allCustomer.map(row => (
            <TableRow className="Roww TextColour" style={{marginBottom:'30px'}} key={row.customerId}>
              <TableCell align="left" style={{width:"22%", display:"flex",  border:"none"}} className="changetext">
              <Avatar aria-label="recipe">
                <img src={tablecus} alt="tablecus" className="newcustomer2" />            
              </Avatar>
              <div className="nameDiv Fonts">
                {row.firstName}
                </div>
                </TableCell>     

              <TableCell component="th" className="Fonts" style={{width:"22%"}} scope="row">{row.status}
                {/* <div style={{display:'flex'}}> */}
               {/* <p className="changetext"> {row.status} </p> */}
               {/* </div> */}
              </TableCell>
              <TableCell align="left" style={{width:"22%"}} className="changetext Fonts" >{moment(row.createdAt).format("DD MMM YYYY")}</TableCell>
              <TableCell align="left" className="changetext">
              <div>
                  <button className="AddloanButton" onClick={this.OnShow.bind(this)}><img src={plusgreen} alt="plusgreen" className="plusgreenButton" />
                  <span>Add loan</span></button>
              </div>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </Card>
            </div>
        )
    }
}
export default withRouter(NewCustomerListview);