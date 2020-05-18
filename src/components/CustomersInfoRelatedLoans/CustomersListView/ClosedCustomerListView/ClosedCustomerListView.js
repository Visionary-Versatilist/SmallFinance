import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import {withRouter} from "react-router-dom";





class ClosedCustomerListview extends Component {
  detailspage(){
    this.props.history.push('/customers/customerinfo')
  }
    createData(Month, Opening, Amt, Principal, Interest,  Closing, Due) {
        return { Month, Opening, Amt, Principal, Interest, Closing, Due };
      }

    render(){
        const rows = [
            this.createData('01', '5,00,000', '1,60,459', '1,02,179', '58,280', '3,97,821', '12 Aug 2019 '),
            this.createData('02', '3,97,821', '1,60,459', '1,16,088', '44,371', '2,81,733', '12 Sep 2019 '),
            this.createData('03', '2,81,733', '1,60,459', '1,31,890', '28,569', '1,49,843', '12 Oct 2019 '),
            this.createData('04', '1,49,843', '1,60,459', '1,49,843', '10,616', '0', '12 Nov 2019 '),
            this.createData('05', '1,49,843', '1,60,459', '1,49,843', '10,616', '0', '12 Nov 2019 '),
          ];

        return(
            <div>
            <Card className="cardDiv2">
                <div>
      <Table className='table'>
        <TableHead>
          <TableRow style={{backgroundColor:"#E1F0FA", color:'#B2B2B2'}}>
            <TableCell>Month</TableCell>
            <TableCell align="right">Opening Balance</TableCell>
            <TableCell align="right">Amt. to be Paid</TableCell>
            <TableCell align="right">Principal Amt.</TableCell>
            <TableCell align="right">Interest</TableCell>
            <TableCell align="right">Closing Balance</TableCell>
            <TableCell align="right">Due Date</TableCell>
         </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.Month}  onClick={this.detailspage.bind(this)}  className="Roww TextColour" style={{marginBottom:'30px'}}>
              <TableCell align="right" className="changetext">{row.Month}</TableCell>     

              <TableCell component="th" scope="row">
                <div style={{display:'flex'}}>
               <p style={{paddingLeft:'10px', fontWeight:'800', color:'#3E4664'}} className="changetext"> {row.Opening} </p>
               </div>
              </TableCell>
              <TableCell align="right" className="changetext" >{row.Amt}</TableCell>
              <TableCell align="right" className="changetext">{row.Principal}</TableCell>
              <TableCell align="right" className="changetext">{row.Interest}</TableCell>
              <TableCell align="right" className="changetext">{row.Closing}</TableCell>     
              <TableCell align="right" className="changetext">{row.Due}</TableCell>     
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
export default withRouter(ClosedCustomerListview);