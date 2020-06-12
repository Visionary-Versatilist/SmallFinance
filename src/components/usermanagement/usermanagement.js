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
import Card from '@material-ui/core/Card';
import penciledit from '../../assets/images/penciledit.svg';
import deleteicon from '../../assets/images/deleteicon.svg';
import pdf from '../../assets/images/pdf.svg';
import excel from '../../assets/images/excel.svg';
import DeleteUser from '../modals/deleteUser modal/deleteUser';
import Sidebar from '../sidebar/sidebar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Workbook from 'react-excel-workbook';
import userdefault from '../../assets/images/userdefault.svg';
import {BaseUrl, ImageBaseUrl} from "../../Environment"
import { withNamespaces } from 'react-i18next';


const axios = require('axios')



class Usermanagement extends Component {
  constructor(){
    super();
    this.state ={
      openmodal : false,
      loginToken:"",
      alluserdata:[],
      isActive:"",
      row:"",
      rowindex:"",
      usercount:""
    }
    this.closemodal = this.closemodal.bind(this)
    this.alluserGet = this.alluserGet.bind(this)
    // this.handleChangeactive = this.handleChangeactive.bind(this)
}
    // createData(name, calories, fat, carbs, protein) {
    //     return { name, calories, fat, carbs, protein };
    //   }
      addUser(){
        this.props.history.push('/usermanagement/adduser')
      }
      deleteuser=(row,i, value) =>{
        console.log(value)
        console.log('click is working')
        this.setState({
            openmodal : true,
            row: row,
            rowindex:i
        })
    }
    
    closemodal(){
        this.setState({
            openmodal : false
        })
    }
    searchlist=(e)=>{
      let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))

      console.log("search is:", e.target.value)
      this.setState({
        loginToken: localStorage.getItem('token')
    })
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
    }
    axios.get(BaseUrl + '/user/getAllUsers?userName='+ e.target.value + '&companyId='+loggedinUser.companyId,{
        headers: headers,
    }).then(resp => {
        console.log('registeration response is:', resp);
        if(resp.status===200) {
            this.setState({
                alluserdata: resp.data.result,
                usercount:resp.data.TotalRecords
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
        console.log("registeration error is:", err);
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
    alluserGet(){
      let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))

      this.setState({
          loginToken: localStorage.getItem('token')
      })
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
      }
      axios.get(BaseUrl + '/user/getAllUsers?userName=&companyId='+loggedinUser.companyId,{
          headers: headers,
      }).then(resp => {
          console.log('registeration response is:', resp);
          if(resp.status===200) {
            resp.data.result.forEach((item,i)=>{
              resp.data.result[i].fullName = item.firstName + " " + item.lastName
            })
              this.setState({
                  alluserdata: resp.data.result,
                usercount:resp.data.TotalRecords
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
          console.log("registeration error is:", err);
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
      if(localStorage.getItem('token')){
      console.log('component did mount')
      this.alluserGet()
      } else {
        this.props.history.push("/")
      }
    }
    handleChangeactive(e){
      console.log('event', e.target.checked)
      this.setState({
        isActive:false
      })
    }
    edituser= (row, value) =>{
      console.log(value)
      this.setState({
        row: row
      })
      this.props.history.push({pathname:'/usermanagement/editcollector', params: row})      
    }
    // enableCustomerDetail = (row, value) => {
    //   console.log(value)
    //   this.setState({
    //     row: row
    //   })
    // }
    printDocument() {
      const input = document.getElementById('divToPrint');
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('landscape');
          pdf.addImage(imgData, 'JPEG', 0, 0);
          // pdf.output('dataurlnewwindow');
          pdf.save("userManagementList.pdf");
        })
      ;

    }
    render() {
      toast.configure({ });
      const { t } = this.props;
        var columnWidths = [
          { wch: 200 },
          { wch: 200 },
          { wch: 250 }
        ]
        // console.log("image", ImageBaseUrl+this.state.alluserdata[1].userImagePath)
        return (
          <div className="usermanagementpage">
            <Sidebar/>
            <div className='mainBodyDiv'>
            <div style={{textAlign:'center', marginTop: '15px'}}>
              {/* <div style={{width:'40%'}}>
              <img src={backbuttn} alt="backicon" style={{paddingLeft: '50px',paddingTop: '23px', cursor:'pointer'}} onClick={this.back.bind(this)} />
              </div> */}
              <div>
                <h3 className="Fonts headFontSize">{t('UserManagement.title')}</h3>
              </div>
            </div>
              <div className="TopDiv">
              <div className="searchDiv">
                  <IconButton className='iconButton' aria-label="search">
                  <img src={searchicon} alt="searchicon" className="iconButton" />
                  </IconButton>
                  <InputBase className='input' placeholder="Search..." onChange={this.searchlist}/>
                  {/* <Divider className='divider' orientation="vertical" /> */}
              </div>
              <div className="ButtonDiv">
              <Button className="Fonts btnSizeFont btnbackgroundcolor adduserbutton" onClick={this.addUser.bind(this)}>
              <img src={plusicon} alt="plusicon" className="plusiconButton" />
              {t('UserManagement.Button')}
              </Button>                    
              </div>
              </div>
              <div className="secondDiv">
                <div className="membercountDiv Fonts btnSizeFont">
                 {this.state.usercount && <h6>{this.state.usercount} {t('UserManagement.member')}</h6>}
                </div>
                <div className="exportDiv Fonts btnSizeFont">
                  <h6>{t('UserManagement.Export')}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                  <img src={pdf} alt="pdf" className="pdficon" onClick={this.printDocument.bind(this)} />&nbsp;&nbsp;&nbsp;
                  <Workbook filename="userManagementList.xlsx" element={<img src={excel} alt="excel" className="excelicon" />}>
                    <Workbook.Sheet data={this.state.alluserdata} columsWidths={ columnWidths } name="List of User Management">
                    <Workbook.Column label="Collection Agent" value="fullName"/>
                    <Workbook.Column label="Mobile Number" value="userPhone"/>
                    <Workbook.Column label="Email Id" value="userEmail"/>
                    <Workbook.Column label="Category" value="userType"/>
                    </Workbook.Sheet>
                  </Workbook>
                </div>
              </div>
              <div className="tableCard">
              <Card className="cardDiv">
              <div id="divToPrint" className="mt4">
              <div>
    <Table className='table'>
      <TableHead>
        <TableRow style={{backgroundColor:"#E1F0FA", color:'#B2B2B2'}}>
          <TableCell>Collection Agent Name</TableCell>
          <TableCell align="right">Mobile Number</TableCell>
          <TableCell align="right">Email Id</TableCell>
          <TableCell align="right">Category</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {this.state.alluserdata && this.state.alluserdata.map((row, i) => (
          <TableRow   className="Roww TextColour" style={{marginBottom:'30px'}} key={i}>
            <TableCell component="th" scope="row">
              <div style={{display:'flex'}}>
                <div className="imgButton">
            <img src={row.userImagePath?ImageBaseUrl+row.userImagePath: userdefault} alt="profile" style={row.userImagePath?{width:"32px", borderRadius:"50%", height:"35px"}:{width:"22px",paddingLeft:"5px",paddingTop:"2px"}} />                
             </div>
             <p style={{paddingLeft:'10px', fontWeight:'800', color:'#3E4664', textTransform:"capitalize"}} className="changetext"> {row.firstName} {row.lastName} </p>
             </div>
            </TableCell>
            <TableCell align="right" className="changetext" >{row.userPhone}</TableCell>
            <TableCell align="right" className="changetext">{row.userEmail}</TableCell>
            <TableCell align="right" className="changetext">{row.userType === "superAdmin"? "Super Admin":"Collection Agent"}</TableCell>
            <TableCell align="right">
            <img src={penciledit} alt="searchicon" className="iconedit" style={row.userType === "superAdmin" ? { display:"none" } : { display:"initial" }} onClick={this.edituser.bind(this,row)} />
            <img src={deleteicon} alt="deleteicon" className="icondelet" style={row.userType === "superAdmin" ? { display:"none" } : { display:"initial" }} onClick={this.deleteuser.bind(this, row, i)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    </div>
  </Card>
  </div>
  <DeleteUser open={this.state.openmodal} allUser={this.alluserGet.bind(this)} close={this.closemodal} rowData={this.state.row} tableindex={this.state.rowindex}/>
          </div>
          </div>
      )
    }
}
export default withNamespaces()(Usermanagement);
