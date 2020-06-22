import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import './AddLoanWithoutInterest.scss';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Sidebar from '../../sidebar/sidebar';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import 'date-fns';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';        
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import AddLoan from '../AddLoans/AddLoan';
import {BaseUrl} from "../../../Environment";
import { withNamespaces } from 'react-i18next';


const axios = require('axios')
const EntryLoanType = [
  {
    value: 'Manual Entry',
    label: 'Manual Entry',
  },
  {
    value: 'Installment Calculator',
    label: 'Installment Calculator',
  }
]
class AddLoanWithoutInterest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      changeColorname: '1px solid #D4D4D5',
      changeColoremail: '1px solid #D4D4D5',
      changeColoremail1: "1px solid #D4D4D5",
      changeColoremail2: "1px solid #D4D4D5",
      changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #D4D4D5",
      changeColornumber: '1px solid #D4D4D5',
      // changeColoremail: '1px solid #D4D4D5',
      changeColorcategory: '1px solid #D4D4D5',
      category: "collector",
      collectionagent: "",
      SelectedDate: new Date().toLocaleString(),
      brands: [{ id: 1, name: "Monthly" }, { id: 2, name: "Weekly" }, { id: 3, name: "Daily" }],
      loantenure: "",
      distamount: "",
      installment: "",
      totalAmount: "",
      tenure: "",
      OpeningBalance: "",
      ClosingBalance: "",
      laontype: "",
      LaonType: [],
      method: "",
      penalty: "",
      customerId: "",
      userId: "",
      Collectors: [],
      collectionArr: [],
      scheduleArr: [],
      userdetails: [],
      choosecustmr: "",
      rows: [],
      choosecustomer: "",
      allCustomer: [],
      path: "",
      afterSelect: "",
      loanTypeId: "",
      amountfrom: "0",
      amountto: "0",
      daysfrom: "0",
      daysto: "0",
      weeksfrom: "0",
      weeksto: "0",
      monthsfrom: "0",
      monthsto: "0",
      days: "none",
      weeks: "none",
      months: "",
      Entrylaontype: "Manual Entry",
      calInterest:"none",
      InterestButtonAction:"none",
      ButtonAction:""
    };
    this.nameBox = this.nameBox.bind(this)
    this.numberBox = this.numberBox.bind(this)
    this.annualBox1 = this.annualBox1.bind(this)
    this.annualBox = this.annualBox.bind(this)
    this.emailBox = this.emailBox.bind(this)
    this.emailBox1 = this.emailBox1.bind(this)
    this.emailBox2 = this.emailBox2.bind(this)
    this.emailBox3 = this.emailBox3.bind(this)
    this.emailBox4 = this.emailBox4.bind(this)
    this.emailBox5 = this.emailBox5.bind(this)
    this.calculationwithnointerest = this.calculationwithnointerest.bind(this)
    this.AllLoanTypeList = this.AllLoanTypeList.bind(this)
    this.allCollectionagent = this.allCollectionagent.bind(this)
  }

  searchSubmit = e => {
    if (e.target.value === "Monthly") {
      this.setState({
        tenure: "monthly",
        days: "none",
        weeks: "none",
        months: "",
      })
    } else if (e.target.value === "Weekly") {
      this.setState({
        tenure: "weekly",
        days: "none",
        weeks: "",
        months: "none",
      })
    } else {
      this.setState({
        tenure: "daily",
        days: "",
        weeks: "none",
        months: "none",
      })
    }
  };
  allCollectionagent() {
    let loggedinUser = localStorage.getItem("loggedinUserCompany")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
    }
    axios.get(BaseUrl + '/user/getAllCollectors?companyId=' + loggedinUser, {
      headers: headers,
    }).then(resp => {
      if (resp.status === 200 || resp.status === 304) {
        this.setState({
          Collectors: resp.data,

        })
      } else {
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
      if (err.request.status !== 200) {
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

  searchlist = (e) => {
    let loggedinUser = localStorage.getItem("loggedinUserCompany")

    this.setState({
      choosecustomer: e.target.value,
      afterSelect: ""
    })

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
    }
    // BaseUrl + '/customer/getVerifiedCustomers?name='
    axios.get(BaseUrl + '/customer/getVerifiedCustomers?name=' + e.target.value + '&companyId=' + loggedinUser, {
      headers: headers,
    }).then(resp => {
      if (resp.status === 200) {
        this.setState({
          allCustomer: resp.data,
        })
      } else {
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
      if (err.request.status !== 200) {
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
  selectName(selectedData) {
    this.setState({
      choosecustomer: selectedData.firstName + " " + selectedData.lastName,
      customerId: selectedData.customerId,
      afterSelect: "none"
    })

  }

  componentDidMount() {
    if (this.props.location.params) {
      if (this.props.location.params.loanType) {
        this.setState({
          // customerId: this.props.location.params.customerId,
          // choosecustomer: this.props.location.params.firstName,
          laontype: this.props.location.params.loanType,
          amountfrom: this.props.location.params.loanAmtRangeFrom,
          amountto: this.props.location.params.loanAmtRangeTo,
          daysfrom: this.props.location.params.tenureDaysFrom,
          daysto: this.props.location.params.tenureDaysTo,
          weeksfrom: this.props.location.params.tenureWeeksFrom,
          weeksto: this.props.location.params.tenureWeeksTo,
          monthsfrom: this.props.location.params.tenureMonthsFrom,
          monthsto: this.props.location.params.tenureMonthsTo,
          path: "Loan Type"

          // choosecustmr:"none"
        })
      } else if (this.props.location.params.customerId) {
        this.setState({
          customerId: this.props.location.params.customerId,
          choosecustomer: this.props.location.params.firstName,
          laontype: this.props.location.params.loanType,
          path: "New Customer"

          // choosecustmr:"none"
        })
      }
    } else {
      this.setState({
        path: "Loans"
      })
    }
    this.setState({
      tenure: "monthly",
      userId: localStorage.getItem('userid')
    })
    this.AllLoanTypeList();
    this.allCollectionagent();
  }
  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }


  handleChange = event => {
    this.setState({ category: event.target.value });
    // this.setState({ vehiclemodel: event.target.value })
  };
  nameBox() {
    this.setState({
      changeColorname: "1px solid #00D95E",
      changeColornumber: "1px solid #D4D4D5",
      changeColoremail: "1px solid #D4D4D5",
      changeColorcategory: "1px solid #D4D4D5"
    })
  }
  numberBox() {
    this.setState({
      changeColornumber: "1px solid #00D95E",
      changeColorname: "1px solid #D4D4D5",
      changeColoremail: "1px solid #D4D4D5",
      changeColorcategory: "1px solid #D4D4D5"
    })
  }
  emailBox() {
    this.setState({
      changeColoremail: "1px solid #00D95E",
      changeColoremail1: "1px solid #D4D4D5",
      changeColoremail2: "1px solid #D4D4D5",
      changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColorcategory: "1px solid #D4D4D5",
      annual: '1px solid #D4D4D5',
      annual1: '1px solid #D4D4D5'
    })
  }
  emailBox1() {
    this.setState({
      changeColoremail: "1px solid #D4D4D5",
      changeColoremail1: "1px solid #00D95E",
      changeColoremail2: "1px solid #D4D4D5",
      changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColorcategory: "1px solid #D4D4D5",
      annual: '1px solid #D4D4D5',
      annual1: '1px solid #D4D4D5'
    })
  }
  emailBox2() {
    this.setState({
      changeColoremail: "1px solid #D4D4D5",
      changeColoremail1: "1px solid #D4D4D5",
      changeColoremail2: "1px solid #00D95E",
      changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColorcategory: "1px solid #D4D4D5",
      annual: '1px solid #D4D4D5',
      annual1: '1px solid #D4D4D5'
    })
  }
  emailBox3() {
    this.setState({
      changeColoremail: "1px solid #D4D4D5",
      changeColoremail1: "1px solid #D4D4D5",
      changeColoremail2: "1px solid #D4D4D5",
      changeColoremail3: "1px solid #00D95E",
      changeColoremail4: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColorcategory: "1px solid #D4D4D5",
      annual: '1px solid #D4D4D5',
      annual1: '1px solid #D4D4D5'
    })
  }
  emailBox4() {
    this.setState({
      changeColoremail: "1px solid #D4D4D5",
      changeColoremail1: "1px solid #D4D4D5",
      changeColoremail2: "1px solid #D4D4D5",
      changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #00D95E",
      changeColoremail5: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColorcategory: "1px solid #D4D4D5",
      annual: '1px solid #D4D4D5',
      annual1: '1px solid #D4D4D5'
    })
  }
  emailBox5() {
    this.setState({
      changeColoremail: "1px solid #D4D4D5",
      changeColoremail1: "1px solid #D4D4D5",
      changeColoremail2: "1px solid #D4D4D5",
      changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #00D95E",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColorcategory: "1px solid #D4D4D5",
      annual: '1px solid #D4D4D5',
      annual1: '1px solid #D4D4D5'
    })
  }
  annualBox() {
    this.setState({
      changeColoremail: "1px solid #D4D4D5",
      changeColoremail1: "1px solid #D4D4D5",
      changeColoremail2: "1px solid #D4D4D5",
      changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColorcategory: "1px solid #D4D4D5",
      annual: '1px solid #00D95E',
      annual1: '1px solid #D4D4D5'
    })
  }
  annualBox1() {
    this.setState({
      changeColoremail: "1px solid #D4D4D5",
      changeColoremail1: "1px solid #D4D4D5",
      changeColoremail2: "1px solid #D4D4D5",
      changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColorcategory: "1px solid #D4D4D5",
      annual: '1px solid #D4D4D5',
      annual1: '1px solid #00D95E'
    })
  }
  categoryBox() {
    this.setState({
      changeColorcategory: "1px solid #00D95E",
      changeColoremail: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
    })
  }
  backLinkAction() {
    // this.props.history.push('/allnewcustomers')
    window.history.back()
  }
  handleDateChange = date => {
    this.setState({
      SelectedDate: date
    })
  };


  handleInputChange = event => {
    this.setState({
      amountvalues: event.target.value === '' ? '' : Number(event.target.value)
    })
    // setValue(event.target.value === '' ? '' : Number(event.target.value));
  };
  handleSliderChange = (event, newValue) => {
    this.setState({
      amountvalues: newValue
    })
    // setValue(newValue);
  };
  handleSlidertenureChange = (event, newValue) => {
    this.setState({
      tenurevalues: newValue
    })

  }
  handleInputtenureChange = event => {
    this.setState({
      tenurevalues: event.target.value === '' ? '' : Number(event.target.value)
    })

  }
  handleInputinterestChange = event => {
    this.setState({
      interestvalues: event.target.value === '' ? '' : Number(event.target.value)
    })

  }
  handleSliderinterestChange = (event, newValue) => {
    this.setState({
      interestvalues: newValue
    })
  }
  AllLoanTypeList() {
    
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
}
    let loggedinUser = localStorage.getItem("loggedinUserCompany")
    axios.get(BaseUrl + '/loanType/getAllLoanTypes?loanType=&companyId=' + loggedinUser, {
      headers: headers,
    }).then(resp => {
      if (resp.status === 200) {
        this.setState({
          LaonType: resp.data,
        })
      } else {
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
      if (err.request.status !== 200) {
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
  betweenRange = () => {
    if ((this.state.distamount >= this.state.amountfrom) && (this.state.distamount <= parseInt(this.state.amountto))) {
      if (this.state.tenure === "monthly") {
        if (this.state.loantenure >= this.state.monthsfrom && this.state.loantenure <= this.state.monthsto) {
          this.calculationwithnointerest()
        } else {
          toast.error("Loan Tenure must be in range", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
        }
      } else if (this.state.tenure === "weekly") {
        if (this.state.loantenure >= this.state.weeksfrom && this.state.loantenure <= this.state.weeksto) {
          this.calculationwithnointerest()
        } else {
          toast.error("Loan Tenure must be in range", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
        }
      } else if (this.state.tenure === "daily") {
        if (this.state.loantenure >= this.state.daysfrom && this.state.loantenure <= this.state.daysto) {
          this.calculationwithnointerest()
        } else {
          toast.error("Loan Tenure must be in range", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
        }
      }
    } else {
      toast.error("Loan Amount must be in range", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  }

  calculationwithnointerest() {
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))
    this.state.userdetails = {
      "loanTypeId": this.state.loanTypeId,
      "method": "Collection method",
      "penalty": parseInt(this.state.penalty),
      "loanAmount": parseInt(this.state.distamount),
      "loanTenureType": this.state.tenure,
      "loanTenure": parseInt(this.state.loantenure),
      "collectionAmount": parseInt(this.state.installment),
      "startDate": this.state.SelectedDate,
      "totalAmountToCollect": this.state.loantenure * this.state.installment,
      "createdByUserId": parseInt(this.state.userId),
      "updatedByUserId": parseInt(this.state.userId),
      "customerId": this.state.customerId,
      loanStatus: "Open",
      "createdByUserId": localStorage.getItem("userid"),
      "updatedByUserId": localStorage.getItem("userid"),
      "companyId": loggedinUser.companyId
    }
    
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
}
    axios.post(BaseUrl + '/loan/calculate', this.state.userdetails, {
      headers: headers,
    }).then(resp => {
      this.state.scheduleArr = resp.data.map((item) => ({
        ...item,
        openingBalance: item.openingBalance,
        scheduledDate: item.scheduledDate,
        loanTenure: parseInt(this.state.loantenure),
        closingBalance: item.closingBalance,
        collectionAmount: item.collectionAmount,
        // collectorId: this.state.collectionagent,
        createdByUserId: parseInt(this.state.userId),
        updatedByUserId: parseInt(this.state.userId),
        customerId: this.state.customerId,
        "companyId": loggedinUser.companyId

      }))

      this.state.collectionArr = resp.data.map((item, index) => (
        {
          dueDate: item.scheduledDate,
          nextSchedule: resp.data.length === (index + 1) ? resp.data[index].scheduledDate : resp.data[(index + 1)].scheduledDate,
          Installment: item.collectionAmount,
          collectionAmount: item.collectionAmount,
          openingBalance: item.openingBalance,
          closingBalance: item.closingBalance,
          collectionStatus: null,
          PenaltyApplied: null,
          // openingBalance: item.openingBalance,
          // closingBalance: item.closingBalance,

          // collectorId: this.state.collectionagent,
          createdByUserId: parseInt(this.state.userId),
          updatedByUserId: parseInt(this.state.userId),
          customerId: this.state.customerId ? this.state.customerId : '',
          "companyId": loggedinUser.companyId

        }
      ))
      if (resp.request.status === 200) {
        this.setState({
          rows: this.state.scheduleArr
        })


      } else {

      }
    }).catch(err => {
      console.log("catch err==>", err)
      toast.error("Choose Customer to assign loan", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    })
    this.setState({
      totalAmount: this.state.loantenure * this.state.installment
    })
  }
  postLoannoInterest() {
    this.state.userdetails.loanSchedules = this.state.scheduleArr;
    this.state.userdetails.loancollections = this.state.collectionArr;
    this.state.userdetails.collectorId = this.state.collectionagent;
    this.state.userdetails.loanPaymentStatus = "Due";
    this.state.userdetails.loancollections.forEach((item, index) => {
      this.state.userdetails.loanSchedules[index].collectorId = this.state.collectionagent;
      this.state.userdetails.loancollections[index].collectorId = this.state.collectionagent;
    })

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
    }
    axios.post(BaseUrl + '/loan/postLoan', this.state.userdetails, {
      headers: headers,
    }).then(res => {
      if (res.request.status === 200) {
        // {this.state.choosecustomer}
        let custname = this.state.choosecustomer
        let laontype = this.state.laontype
        toast.success(laontype + " " + "Assigned Successfully to" + " " + custname, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        window.history.back(); }
    })

  }
  cancel() {
    this.props.history.push("/allnewcustomers")
  }
  collectionangentChange(event) {
    this.setState({ collectionagent: event.target.value });
  }
  clear() {
    this.setState({
      loantenure: "",
      installment: "",
      distamount: "",
      laontype: "",
      penalty: "",
    })
  }
  checking() {
    this.setState({ afterSelect: "none" })
  }
  LoanChange = (event) => {
    this.setState({
      laontype: event.target.value
    })
    this.state.LaonType.map(item => {
      if (event.target.value === item.loanType) {
        this.setState({
          loanTypeId: item.loanTypeId,
          amountfrom: item.loanAmtRangeFrom,
          amountto: item.loanAmtRangeTo,
          daysfrom: item.tenureDaysFrom,
          daysto: item.tenureDaysTo,
          weeksfrom: item.tenureWeeksFrom,
          weeksto: item.tenureWeeksTo,
          monthsfrom: item.tenureMonthsFrom,
          monthsto: item.tenureMonthsTo,
        })
      }

    })

  }
  TableData=(rows)=>{
    console.log("parent row",rows)
    this.setState({
      rows:rows
    })
  }
  // componentWillReceiveProps=(nextProps)=>{
  //   console.log("nextProps",nextProps)
  //   this.setState({
  //     rows:nextProps.rows
  //   })
  // }
  EntryLoanTypeChange = (event) => {
    this.setState({
      Entrylaontype: event.target.value
    })
    if(event.target.value !== "Manual Entry"){
      this.setState({
        calInterest:"",
        InterestButtonAction:"",
        ButtonAction:"none"
      })
    } else {
      this.setState({
        calInterest:"none",
        InterestButtonAction:"none",
        ButtonAction:""
      })
    }
  }
  postLoanInterest=()=>{
    this.child.postLoan() 
  }
  render() {
    const { t } = this.props;

    toast.configure({});
    const { brands } = this.state;
    return (
      <div>
        <Sidebar />
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <div>
            <h3 className="Fonts headFontSize" style={{ marginLeft: '45px' }}><span className="backLink" onClick={this.backLinkAction.bind(this)}>{this.state.path}</span> / Add Loan</h3>
          </div>
        </div>

        <div className="addloancomponent">
          {/* <Grid item xs={10} style={{display:"none"}}><div></div></Grid> */}
          <div style={{marginLeft:'auto'}} className="xyz">
          <div className="LaontypeEntryDiv">
              <TextField
                id="standard-select-currency"
                select
                value={this.state.Entrylaontype || ""}
                onChange={this.EntryLoanTypeChange}
                className="LaontypeEntry"
              >
                {EntryLoanType.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
          </div>
          </div>
          {this.state.Entrylaontype === "Manual Entry" ?
            <div>
              <Card className="cardDiv" onClick={this.checking.bind(this)}>
                <div className="previewComponent">
                  <form onSubmit={(e) => this._handleSubmit(e)}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ margin: '3rem', textAlign: "left", width: "50%" }}>
                        <div className="textFieldStyle Loan">
                          <h6 className="InputLabel Fonts SizeFont">{t('AddLoanType.Type')}</h6>
                          {/* <Input className="textBox" style={{ height: '35px', border: this.state.changeColorname }} onClick={this.nameBox} onChange={(event) => this.setState({ name: event.target.value })} /> */}
                          <TextField
                            id="standard-select-currency"
                            select
                            className="incomefield"
                            value={this.state.laontype || ""}
                            style={{ border: this.state.annual, width: "80%", height: "35px", border: "1px solid rgb(212, 212, 213)", borderRadius: "5px" }}
                            onClick={this.annualBox}
                            onChange={this.LoanChange}
                          >
                            {/* (event) => this.setState({ laontype: event.target.value }) */}
                            {this.state.LaonType.map(option => (
                              <MenuItem key={option.loanTypeId} value={option.loanType}>
                                {option.loanType}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                        <div className="textFieldStyle">
                          <h6 className="InputLabel Fonts SizeFont">{t('AddLoan.method')}</h6>
                          <Input className="textBox" value="Collection method" style={{ height: '35px', border: this.state.changeColoremail }} onClick={this.emailBox} onChange={(event) => this.setState({ method: event.target.value })} disabled />
                        </div>

                        <div className="textFieldStyle">
                          <h6 className="InputLabel Fonts SizeFont">{t('AddLoan.penality')}</h6>
                          <div className="textBox" style={{ height: '35px', border: this.state.changeColoremail1, display: "flex" }}><span className="aboutfield">&#x20b9;</span>
                            <Input type="number" value={this.state.penalty || ""} onClick={this.emailBox1} onChange={(event) => this.setState({ penalty: event.target.value })} />
                          </div>
                        </div>
                        <div className="textFieldStyle" style={{ width: '95%' }}>
                          <h6 className="InputLabel Fonts SizeFont" >{t('AddLoan.date')}</h6>
                          <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal" id="date-picker-inline" value={this.state.SelectedDate} onChange={this.handleDateChange.bind(this)} KeyboardButtonProps={{ 'aria-label': 'change date' }} />
                          </MuiPickersUtilsProvider>
                        </div>
                        <div style={{ marginTop: "9rem" }}>
                          <Button className="savebutton btnSizeFont Fonts" onClick={this.betweenRange}>
                            {t('AddLoan.buttn1')}
                          </Button>
                          <Button className="cancelbutton btnSizeFont Fonts" onClick={this.clear.bind(this)}>
                            {t('AddLoan.buttn2')}
                          </Button>
                        </div>
                      </div>

                      <div style={{ margin: '3rem', textAlign: "left", width: "50%" }}>
                        <div className="textFieldStyle">
                          <div style={{ display: "flex" }}>
                            <h6 className="InputLabel Fonts SizeFont">{t('AddLoan.tenure')}</h6>
                            <select onChange={this.searchSubmit} className="monthlySelect">
                              {brands.map(brand => (
                                <option value={brand.name} key={brand.name}>
                                  {brand.name}
                                </option>
                              ))}
                            </select>
                            <span className="InputLabel Fonts linkFontSize" style={{ paddingLeft: "10px", textTransform: "capitalize"}}>{this.state.tenure + " " + "range is:" + " "}
                              <span style={{ display: this.state.days }}> {this.state.daysfrom + "-" + this.state.daysto}</span>
                              <span style={{ display: this.state.months }}> {this.state.monthsfrom + "-" + this.state.monthsto}</span>
                              <span style={{ display: this.state.weeks }}> {this.state.weeksfrom + "-" + this.state.weeksto}</span>
                            </span>
                          </div>
                          <div style={{ height: '35px', border: this.state.changeColoremail2, display: "flex" }} className="textBox">
                            <Input type="number" onClick={this.emailBox2} value={this.state.loantenure || ""} onChange={(event) => this.setState({ loantenure: event.target.value })} /><span className="aboutfield">{this.state.tenure}</span>
                          </div>
                        </div>
                        <div className="textFieldStyle">
                          <h6 className="InputLabel Fonts SizeFont">{t('AddLoan.amount')}</h6>
                          <div style={{ height: '35px', border: this.state.changeColoremail3, display: "flex" }} className="textBox"><span className="aboutfield">&#x20b9;</span>
                            <Input type="number" onClick={this.emailBox3} value={this.state.distamount || ""} onChange={(event) => this.setState({ distamount: event.target.value })} />
                          </div>
                          <span className="InputLabel Fonts linkFontSize" style={{ paddingLeft: "10px" }}> NOTE: {" " + "Amount Range is:" + " " + this.state.amountfrom + "-" + this.state.amountto}</span>
                        </div>
                        <div className="textFieldStyle">
                          <h6 className="InputLabel Fonts SizeFont">{t('AddLoan.instal')}</h6>
                          <div style={{ height: '35px', border: this.state.changeColoremail4, display: "flex" }} className="textBox"><span className="aboutfield">&#x20b9;</span>
                            <Input type="number" onClick={this.emailBox4} value={this.state.installment || ""} onChange={(event) => this.setState({ installment: event.target.value })} />
                          </div>
                        </div>
                        <div className="textFieldStyle" style={{ display: this.state.choosecustmr }}>
                          <h6 className="InputLabel Fonts SizeFont">{t('AddLoan.customer')}</h6>
                          <div style={{ height: '35px', border: this.state.changeColoremail5 }} className="textBox">
                            <Input list="browsers" className="textBox" placeholder="Choose Customer" value={this.state.choosecustomer || ""} onClick={this.emailBox5} onChange={this.searchlist} />
                          </div>
                          {this.state.allCustomer.length > 0 ? (
                            <div id="browsers" style={{ border: "1px solid lightgrey", borderRadius: "5px", display: this.state.afterSelect, width: "80%" }}>
                              {this.state.allCustomer.map((option, index) => (
                                <option key={option.firstName} value={option.firstName} className="Fonts" style={{ padding: "8px", cursor: "pointer" }} onClick={this.selectName.bind(this, option)}>{option.firstName} {option.lastName}</option>
                              ))}
                            </div>
                          ) : null}
                        </div>
                        <div className="TotalMoney">
                          <input placeholder="&#x20b9;" value={this.state.totalAmount || ""} className="displaytotalmoney" disabled style={{ backgroundColor: "transparent" }} />
                        </div>
                        <span className="Fonts instalment">{t('AddLoan.circle')}</span>
                      </div>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
            :
            <AddLoan onRef={ref => (this.child = ref)} collectionagent={this.state.collectionagent} TableData={this.TableData}/>
          }
          <div style={{ display: "flex", paddingBottom: "10px" }}>
            <div style={{ paddingLeft: "10rem", paddingTop: "11px", width: "60.5%" }} className="Fonts">{t('AddLoan.tablename')}</div>
          </div>
          <Card className="cardDiv2">
            <div>
              <Table className='table'>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#E1F0FA", color: '#B2B2B2' }}>
                    <TableCell>{this.state.tenure}</TableCell>
                    <TableCell align="right">Due Date</TableCell>
                    <TableCell align="right">Opening Balance</TableCell>
                    <TableCell align="right">Installment</TableCell>
                    <TableCell align="right" style={{display:this.state.calInterest}}>Principal Amt.</TableCell>
                    <TableCell align="right" style={{display:this.state.calInterest}}>Interest</TableCell>
                    <TableCell align="right">Closing Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Month, Opening, Amt, Interest, Principal, Closing, Due */}
                  {this.state.rows && this.state.rows.map((row, index) => (
                    <TableRow className="Roww TextColour" style={{ marginBottom: '30px' }}>
                      <TableCell align="right" className="changetext">{index + 1}</TableCell>
                      <TableCell align="right" className="changetext">{moment(row.scheduledDate).format("DD MMM YYYY")}</TableCell>
                      <TableCell component="th" scope="row">
                        <div style={{ display: 'flex' }}>
                          <p style={{ paddingLeft: '10px', fontWeight: '800', color: '#3E4664' }} className="changetext"> {row.openingBalance} </p>
                        </div>
                      </TableCell>
                      <TableCell align="right" className="changetext" >{row.collectionAmount}</TableCell>
                      <TableCell align="right" className="changetext" style={{display:this.state.calInterest}}>{row.principal}</TableCell>
                      <TableCell align="right" className="changetext" style={{display:this.state.calInterest}}>{row.interest}</TableCell>
                      <TableCell align="right" className="changetext">{row.closingBalance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
          {/* <div style={{display:"flex", marginLeft:"10.5rem", color: "#3E4664"}} className="Fonts">
          <div style={{width:"40.5%", color: "#3E4664"}} className="Fonts">Total</div>
          <div style={{width:"14%", color: "#3E4664"}} className="Fonts">66541551565</div>
          <div className="Fonts" style={{color: "#3E4664"}}>9884</div>
      </div> */}
          <Card className="cardDiv3">
            <div>
              <h6 className="Fonts assign">{t('AddLoan.agents')} </h6>
              <div>
                <TextField
                  id="standard-select-currency"
                  select
                  className="field"
                  value={this.state.collectionagent}
                  style={{ border: this.state.annual, width: "37%", height: "35px", border: "1px solid rgb(212, 212, 213)", borderRadius: "5px" }}
                  onClick={this.annualBox}
                  onChange={this.collectionangentChange.bind(this)}
                >
                  {this.state.Collectors && this.state.Collectors.map(option => (
                    <MenuItem key={option.userId} value={option.userId}>
                      {option.firstName} {option.lastName}
                    </MenuItem>
                  ))}
                  
        </TextField>
              </div>
            </div>
            <div style={{ textAlign: "end" }}>
              <Button className="cancel btnSizeFont Fonts" onClick={this.cancel.bind(this)}>
                Cancel
              </Button>
              <Button style={{display:this.state.ButtonAction}} className="save btnSizeFont Fonts" onClick={this.postLoannoInterest.bind(this)}>
                Save
              </Button>
              <Button style={{display:this.state.InterestButtonAction}} className="save btnSizeFont Fonts" onClick={this.postLoanInterest}>
                Save
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}
export default withNamespaces()(AddLoanWithoutInterest);