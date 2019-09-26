import React, { Component } from 'react';
import './usermanagement.scss';
import searchicon from '../../assets/images/searchicon.svg';
import plusicon from '../../assets/images/plusicon.svg';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import listimage from '../../assets/images/listimage.svg';
import penciledit from '../../assets/images/penciledit.svg';
import deleteicon from '../../assets/images/deleteicon.svg';
import backbuttn from '../../assets/images/backbuttn.svg';
import pdf from '../../assets/images/pdf.svg';
import excel from '../../assets/images/excel.svg';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteUser from '../modals/deleteUser modal/deleteUser';
import Sidebar from '../sidebar/sidebar';



class Usermanagement extends Component {
  constructor(){
    super();
    this.state ={
      openmodal : false,
    }
    this.closemodal = this.closemodal.bind(this)
}
    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      addUser(){
        this.props.history.push('/usermanagement/adduser')
      }
      deleteuser(){
        console.log('click is working')
        this.setState({
            openmodal : true
        })
    }
    edituser(){
      this.props.history.push('/usermanagement/editcollector')      
    }
    closemodal(){
        this.setState({
            openmodal : false
        })
    }
    // back(){
    //   window.history.back();
    // }
    render() {
        const rows = [
            this.createData('Krsnvyan', '01234567895', 'erosscandra019@gmail.com', 'Collector'),
            this.createData('Krsnvyan', '01234567895', 'erosscandra019@gmail.com', 'Collector'),
            this.createData('Krsnvyan', '01234567895', 'erosscandra019@gmail.com', 'Collector'),
            this.createData('Krsnvyan', '01234567895', 'erosscandra019@gmail.com', 'Collector'),
            this.createData('Krsnvyan', '01234567895', 'erosscandra019@gmail.com', 'Collector'),
          ];
        return (
            <div>
              <Sidebar/>
              <div className='mainBodyDiv'>
              <div style={{textAlign:'center', marginTop: '15px'}}>
                {/* <div style={{width:'40%'}}>
                <img src={backbuttn} alt="backicon" style={{paddingLeft: '50px',paddingTop: '23px', cursor:'pointer'}} onClick={this.back.bind(this)} />
                </div> */}
                <div>
                  <h3 className="Fonts headFontSize">User Management</h3>
                </div>
              </div>
                <div className="TopDiv">
                <div className="searchDiv">
                    <IconButton className='iconButton' aria-label="search">
                    <img src={searchicon} alt="searchicon" className="iconButton" />
                    </IconButton>
                    <InputBase className='input' placeholder="Search..."/>
                    {/* <Divider className='divider' orientation="vertical" /> */}
                </div>
                <div className="ButtonDiv">
                <Button className="Fonts btnSizeFont btnbackgroundcolor adduserbutton" onClick={this.addUser.bind(this)}>
                <img src={plusicon} alt="plusicon" className="plusiconButton" />
                    Add User
                </Button>                    
                </div>
                </div>
                <div className="secondDiv">
                  <div className="membercountDiv Fonts btnSizeFont">
                    <h6>05 Members</h6>
                  </div>
                  <div className="exportDiv Fonts btnSizeFont">
                    <h6>Export to:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <img src={pdf} alt="pdf" className="pdficon" />&nbsp;&nbsp;&nbsp;
                    <img src={excel} alt="excel" className="excelicon" />
                  </div>
                </div>
                <Card className="cardDiv">
                <div>
      <Table className='table'>
        <TableHead>
          <TableRow style={{backgroundColor:"#E1F0FA", color:'#B2B2B2'}}>
            <TableCell>Collector name</TableCell>
            <TableCell align="right">Mobile Number</TableCell>
            <TableCell align="right">Email Id</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Status</TableCell>
            {/* <TableCell align="right"></TableCell> */}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}  className="Roww TextColour" style={{marginBottom:'30px'}}>
              <TableCell component="th" scope="row">
                <div style={{display:'flex'}}>
              <img src={listimage} alt="listimage" className="iconButton" />                
               <p style={{paddingLeft:'10px', fontWeight:'800', color:'#3E4664'}} className="changetext"> {row.name} </p>
               </div>
              </TableCell>
              <TableCell align="right" className="changetext" >{row.calories}</TableCell>
              <TableCell align="right" className="changetext">{row.fat}</TableCell>
              <TableCell align="right" className="changetext">{row.carbs}</TableCell>
              <TableCell align="right"><FormControlLabel
        control={
               // checked={state.checkedB}      // onChange={handleChange('checkedB')} 
          <Switch value="checkedB" className="switchBtton" style={{color: "#00D95E"}} color="primary" />
        }
      />
      {/* <div style={{display:'flex'}}> */}
      <img src={penciledit} alt="searchicon" className="iconedit" onClick={this.edituser.bind(this)} />
      <img src={deleteicon} alt="deleteicon" className="icondelet" onClick={this.deleteuser.bind(this)} />
      {/* </div> */}
      </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </Card>
    <DeleteUser open={this.state.openmodal} close={this.closemodal}/>
            </div>
            </div>
        )
    }
}
export default Usermanagement;
