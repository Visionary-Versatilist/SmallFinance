import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import './AddLoan.scss';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import 'date-fns';
import Slider from '@material-ui/core/Slider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BaseUrl} from "../../../Environment";
import { withNamespaces } from 'react-i18next';



const axios = require('axios')

class AddLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeColorname: '1px solid #D4D4D5',
      changeColornumber: '1px solid #D4D4D5',
      
      changeColoremail: '1px solid #D4D4D5',
      changeColorcategory: '1px solid #D4D4D5',
      changeColoremail5: "1px solid #D4D4D5",
      changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #D4D4D5",

      category: "collector",
      collectionagent: "",
      SelectedDate: new Date(),
      amountvalues: 0,
      tenurevalues: 0,
      interestvalues: 0,
      brands: [{ id: 1, name: "Monthly" }, { id: 2, name: "Weekly" }, { id: 3, name: "Daily" }],
      monthlyRange: "",
      weeklyRange: "",
      dailyRange: "",
      minValue: 0,
      maxValue: 0,
      step: 1,
      mintenureValue: 0,
      maxtenureValue: 0,
      steptenure: 1,
      mininterestValue: 0,
      maxinterestValue: 0,
      stepinterest: 1,
      LaonType:[],
      allCustomer:[],
      loanTypeId: "",
      amountfrom: 0,
      amountto: 0,
      mintenureDaysValue: 0,
      maxtenureDaysValue: 0,
      mintenureWeekValue: 0,
      maxtenureWeekValue: 0,
      mintenureMonthValue: 0,
      maxtenureMonthValue: 0,
      // monthsfrom: 0,
      // monthsto: 0,
      // rateofInterestfrom:0,
      // rateofInterestto:0,
      tenure: "Monthly",
      collectionArr: [],
      scheduleArr: [],
      userdetails: [],
      userdetailPostLoan:[],
      collectionagent: "",
      valueAftermoratorium:"",
      rows: [],
      collectionAmount:""
    };
    this.nameBox = this.nameBox.bind(this)
    this.numberBox = this.numberBox.bind(this)
    this.emailBox = this.emailBox.bind(this)
    this.categoryBox = this.categoryBox.bind(this)
    this.emailBox5 = this.emailBox5.bind(this)
    this.emailBox4 = this.emailBox4.bind(this)
    this.emailBox3 = this.emailBox3.bind(this)
    this.calculationwithnointerest = this.calculationwithnointerest.bind(this)

  }
  

  searchSubmit = (e) => {
    document.getElementById('test1').addEventListener("change", function () {
      document.getElementById('test2').selectedIndex = document.getElementById('test1').selectedIndex;
  }, false);
  document.getElementById('test2').addEventListener("change", function () {
      document.getElementById('test1').selectedIndex = document.getElementById('test2').selectedIndex;
  }, false);
    const { value } = e.target;
    if (parseInt(value) === 1) {
      this.setState({
        monthlyRange: "",
        weeklyRange: "none",
        dailyRange: "none",
        tenure: "Monthly",
        mintenureValue:this.state.mintenureMonthValue,
        maxtenureValue:this.state.maxtenureMonthValue,
      })
    } else if (parseInt(value) === 2) {
      this.setState({
        monthlyRange: "none",
        weeklyRange: "",
        dailyRange: "none",
        tenure: "Weekly",
        mintenureValue: this.state.mintenureWeekValue,
        maxtenureValue: this.state.maxtenureWeekValue,
      })
    } else {
      this.setState({
        monthlyRange: "none",
        weeklyRange: "none",
        dailyRange: "",
        tenure: "Daily",
        mintenureValue: this.state.mintenureDaysValue,
        maxtenureValue: this.state.maxtenureDaysValue,
      })
    }
  }

  handleChange = event => {
    this.setState({ category: event.target.value });
  };
  nameBox() {
    this.setState({
      changeColorname: "1px solid #00D95E",
      changeColornumber: "1px solid #D4D4D5",
      changeColoremail: "1px solid #D4D4D5",
      changeColorcategory: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #D4D4D5",
      // changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #D4D4D5",
    })
  }
  numberBox() {
    this.setState({
      changeColornumber: "1px solid #00D95E",
      changeColorname: "1px solid #D4D4D5",
      changeColoremail: "1px solid #D4D4D5",
      changeColorcategory: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #D4D4D5",
      // changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #D4D4D5",
    })
  }
  emailBox() {
    this.setState({
      changeColoremail: "1px solid #00D95E",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColorcategory: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #D4D4D5",
      // changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #D4D4D5",
    })
  }
  categoryBox() {
    this.setState({
      changeColorcategory: "1px solid #00D95E",
      changeColoremail: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #D4D4D5",
      // changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #D4D4D5",
    })
  }
  emailBox5() {
    this.setState({
      changeColorcategory: "1px solid #D4D4D5",
      changeColoremail: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #00D95E",
      // changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #D4D4D5",
    })
  }
  emailBox3() {
    this.setState({
      changeColorcategory: "1px solid #D4D4D5",
      changeColoremail: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #D4D4D5",
      // changeColoremail3: "1px solid #00D95E",
      changeColoremail4: "1px solid #D4D4D5",
    })
  }
  emailBox4() {
    this.setState({
      changeColorcategory: "1px solid #D4D4D5",
      changeColoremail: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColoremail5: "1px solid #D4D4D5",
      // changeColoremail3: "1px solid #D4D4D5",
      changeColoremail4: "1px solid #00D95E",
    })
  }
  // back(){
  //     window.history.back();
  //   }

  handleDateChange = date => {
    this.setState({
      SelectedDate: date
    })
  };
  componentDidMount() {
    this.setState({
      monthlyRange: "",
      weeklyRange: "none",
      dailyRange: "none",
    })
    this.AllLoanTypeList();
    this.props.onRef(this)
  }
 
  componentWillUnmount() {
    this.props.onRef(null)
  }
  handleBlur = () => {
    // if (amountvalue < 0) {
    //   setValue(0);
    // } else if (amountvalue > 100) {
    //   setValue(100);
    // }
  };
  handleInputChange = event => {
    this.setState({
      amountvalues: event.target.value === '' ? '' : Number(event.target.value),
      // maxValue:event.target.value === '' ? 0 :parseInt(event.target.value)
    })
  };
  handleSliderChange = (event, newValue) => {
    this.setState({
      amountvalues: newValue
    })
  };
  handleSlidertenureChange = (event, newValue) => {
    this.setState({
      tenurevalues: newValue
    })

  }
  handleInputtenureChange = event => {
    this.setState({
      tenurevalues: event.target.value === '' ? '' : Number(event.target.value),
      // maxtenureDaysValue:event.target.value === '' ? 0 :parseInt(event.target.value),
      // maxtenureMonthValue:event.target.value === '' ? 0 :parseInt(event.target.value),
      // maxtenureWeekValue:event.target.value === '' ? 0 :parseInt(event.target.value),
      // maxtenureValue:event.target.value === '' ? 0 :parseInt(event.target.value),

    })

  }
  handleInputinterestChange = event => {
    this.setState({
      interestvalues: event.target.value === '' ? '' : Number(event.target.value),
      // maxinterestValue:event.target.value === '' ? 0 :parseInt(event.target.value),
    })

  }
  handleSliderinterestChange = (event, newValue) => {
    console.log("event",event.target.value)
    console.log("newvalue",newValue)
    console.log("this.state.interestvalues",this.state.interestvalues)
    this.setState({
      interestvalues: newValue
    })
  }
  createData(Month, Opening, Amt, Principal, Interest, Closing, Due) {
    return { Month, Opening, Amt, Principal, Interest, Closing, Due };
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
      if (err.request.status !== 200) {
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
  selectName(selectedData) {
    this.setState({
      choosecustomer: selectedData.firstName + " " + selectedData.lastName,
      customerId: selectedData.customerId,
      afterSelect: "none"
    })
  }
  LoanChange = (event) => {
    this.setState({
      laontype: event.target.value
    })
    this.state.LaonType.map(item => {
      if (event.target.value === item.loanType) {
        this.setState({
          loanTypeId: item.loanTypeId,
          minValue: parseInt(item.loanAmtRangeFrom),
          maxValue: parseInt(item.loanAmtRangeTo),
          mintenureDaysValue: parseInt(item.tenureDaysFrom),
          maxtenureDaysValue: parseInt(item.tenureDaysTo),
          mintenureWeekValue: parseInt(item.tenureWeeksFrom),
          maxtenureWeekValue: parseInt(item.tenureWeeksTo),
          mintenureMonthValue: parseInt(item.tenureMonthsFrom),
          maxtenureMonthValue: parseInt(item.tenureMonthsTo),
          mintenureValue: parseInt(item.tenureMonthsFrom),
          maxtenureValue: parseInt(item.tenureMonthsTo),
          mininterestValue:parseInt(item.roiFrom),
          maxinterestValue:parseInt(item.roiTo),
        })
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
      "loanAmount":this.state.amountvalues.toFixed(2),
    	"rateOfInterest":this.state.interestvalues.toFixed(2),
    	"moratoriumMonths":parseInt(this.state.moratorium).toFixed(2),
      "periods":this.state.tenurevalues.toFixed(2),
      "startDate":this.state.SelectedDate,
    }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
  }
      axios.post(BaseUrl + '/loan/calculateEmi', this.state.userdetails, {
        headers: headers,
      }).then(resp => {
        this.state.scheduleArr = resp.data.map((item) => ({
          ...item,
          openingBalance: item.openingBalance,
          scheduledDate: item.scheduledDate,
          loanTenure: parseInt(this.state.loantenure),
          closingBalance: item.closingBalance,
          collectionAmount: item.EMI,
          // collectorId: this.state.collectionagent,
          createdByUserId: localStorage.getItem("userid"),
          updatedByUserId: localStorage.getItem("userid"),
          customerId: this.state.customerId,
          companyId: loggedinUser.companyId,
          interest:item.interest,
          EMI:item.EMI,
          principal:item.principal 
        }))
  
        this.state.collectionArr = resp.data.map((item, index) => (
          {
            dueDate: item.scheduledDate,
            nextSchedule: resp.data.length === (index + 1) ? resp.data[index].scheduledDate : resp.data[(index + 1)].scheduledDate,
            Installment: item.EMI,
            collectionAmount: item.EMI,
            openingBalance: item.openingBalance,
            closingBalance: item.closingBalance,
            collectionStatus: null,
            PenaltyApplied: null,
            // collectorId: this.state.collectionagent,
            createdByUserId: localStorage.getItem("userid"),
            updatedByUserId: localStorage.getItem("userid"),
            customerId: this.state.customerId,
            "companyId": loggedinUser.companyId,
            interest:item.interest,
            principal:item.principal   
          }
        ))
        if (resp.request.status === 200) {
          this.setState({
            rows: this.state.scheduleArr,
          })
         let LastData = resp.data[resp.data.length-1]
         this.setState({
           valueAftermoratorium:LastData.valueafterMoratorium,
           collectionAmount:LastData.EMI
         })
          this.props.TableData(this.state.scheduleArr);
        } else {
  
        }
      }).catch(err => {
        toast.error("Please fill correct data!", {
          position: "top-center",
          autoClose: 2000,
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
    postLoan=()=>{
      this.postLoanwithInterest()
    }
    postLoanwithInterest=()=> {

      let loggedinUser = localStorage.getItem("loggedinUserCompany")
      
      // this.state.userdetailPostLoan.loanTypeId = this.state.loanTypeId;
      // this.state.userdetailPostLoan.method= "Installment Calculator";
      // this.state.userdetailPostLoan.penalty= null;
      // this.state.userdetailPostLoan.loancollections = this.state.collectionArr;
      // this.state.userdetailPostLoan.loanAmount= parseInt(this.state.amountvalues);
      // this.state.userdetailPostLoan.loanTenureType= "montly";
      // this.state.userdetailPostLoan.loanTenure= parseInt(this.state.tenurevalues);
      // this.state.userdetailPostLoan.collectionAmount= parseInt(this.state.collectionAmount);
      // this.state.userdetailPostLoan.totalAmountToCollect= this.state.valueAfterMoratorium;
      // this.state.userdetailPostLoan.customerId= this.state.customerId;
      // this.state.userdetailPostLoan.loanStatus= "Open";
      // this.state.userdetailPostLoan.createdByUserId= localStorage.getItem("userid");
      // this.state.userdetailPostLoan.updatedByUserId= localStorage.getItem("userid");
      // this.state.userdetailPostLoan.companyId= loggedinUser; 
      // this.state.userdetailPostLoan.loanSchedules = this.state.scheduleArr;
      // this.state.userdetailPostLoan.moratoriumPeriods = this.state.tenurevalues;
      // this.state.userdetailPostLoan.collectorId = this.state.collectionagent;
      // this.state.userdetailPostLoan.loanPaymentStatus = "Due";
      this.state.collectionArr.forEach((item, index) => {
      this.state.collectionArr[index].collectorId = this.state.collectionagent;
      })
      this.state.scheduleArr.forEach((item, index) => {
        this.state.scheduleArr[index].collectorId = this.state.collectionagent;
        })
      

      const userdetailPostLoan = {
        loanTypeId : this.state.loanTypeId,
        method: "Installment Calculator",
        penalty: null,
        loancollections : this.state.collectionArr,
        loanAmount: parseInt(this.state.amountvalues),
        loanTenureType: "monthly",
        loanTenure: parseInt(this.state.tenurevalues),
        collectionAmount: parseInt(this.state.collectionAmount),
        totalAmountToCollect: this.state.valueAftermoratorium,
        customerId: this.state.customerId,
        loanStatus: "Open",
        createdByUserId: localStorage.getItem("userid"),
        updatedByUserId: localStorage.getItem("userid"),
        companyId: loggedinUser, 
        loanSchedules : this.state.scheduleArr,
        moratoriumPeriods : this.state.tenurevalues,
        collectorId : this.state.collectionagent,
        loanPaymentStatus : "Due",
        nextDueDate:this.state.SelectedDate,
        startDate:this.state.SelectedDate,
        "rateOfInterest":this.state.interestvalues,
        // loancollections.forEach((item, index) => {
        // loanSchedules[index].collectorId = this.state.collectionagent,
        // loancollections[index].collectorId = this.state.collectionagent,
        // })     
       }
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
      }
      // if(this.state.userdetailPostLoan !== " "){
        console.log("this.state.userdetailPostLoan", userdetailPostLoan)
      axios.post(BaseUrl + '/loan/postLoan', userdetailPostLoan, {
        headers: headers,
      }).then(res => {
        console.log("Interest", res)
        if (res.request.status === 200) {
          let custname = this.state.choosecustomer
          let laontype = this.state.laontype
          toast.success(laontype + " " + "Added Successfully to" + " " + custname, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
          window.history.back(); 
        }
      })  
    }

  AllLoanTypeList() {
    let loggedinUser = localStorage.getItem("loggedinUserCompany")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
    }
    axios.get(BaseUrl + '/loanType/getAllLoanTypes?loanType=&companyId=' + loggedinUser, {
      headers: headers,
    }).then(resp => {
      if (resp.status === 200) {
        this.setState({
          LaonType: resp.data,
        })
      } else {
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
      if (err.request.status !== 200) {
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
  clear() {
    this.setState({
      loantenure: "",
      installment: "",
      distamount: "",
      laontype: "",
    })
  }
  componentWillReceiveProps=(nextProps)=>{
    this.setState({
      collectionagent:nextProps.collectionagent
    })
  }

  render() {
    console.log("this.state.maxValue", this.state.maxValue)
    const { t } = this.props;

    const { brands ,tenure} = this.state;
    return (
      <div>
        <div className="addloaninterestcomponent">
          <Card className="cardDiv">
            <div className="previewComponent">
              <form onSubmit={(e) => this._handleSubmit(e)}>
                <div style={{ display: 'flex' }}>
                  <div style={{ margin: '3rem', textAlign: "left", width: "50%" }}>
                  <div className="textFieldStyle Loan">
                          <h6 className="InputLabel Fonts SizeFont">{t('AddLoanType.Type')}</h6>
                          <TextField
                            id="standard-select-currency"
                            select
                            className="incomefield"
                            value={this.state.laontype || ""}
                            style={{ border: this.state.annual, width: "80%", height: "35px", border: "1px solid rgb(212, 212, 213)", borderRadius: "5px" }}
                            onClick={this.annualBox}
                            onChange={this.LoanChange}
                          >
                            {this.state.LaonType.map(option => (
                              <MenuItem key={option.loanTypeId} value={option.loanType}>
                                {option.loanType}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>

                    {/* <div className="textFieldStyle">
                      <h6 className="InputLabel Fonts SizeFont">penalty</h6>
                      <Input className="textBox" placeholder="Penaly Charges on Default" style={{ height: '35px', border: this.state.changeColoremail }} onClick={this.emailBox} onChange={(event) => this.setState({ fees: event.target.value })} />
                    </div> */}
                    <div className="textFieldStyle" style={{ width: '95%' }}>
                      <h6 className="InputLabel Fonts SizeFont" > {t('AddLoan.loandate')}</h6>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal" id="date-picker-inline" value={this.state.SelectedDate} onChange={this.handleDateChange.bind(this)} KeyboardButtonProps={{ 'aria-label': 'change date' }} />
                      </MuiPickersUtilsProvider>
                    </div>
                    <div className="textFieldStyle">
                      <div style={{display:"flex"}}>
                      <h6 className="InputLabel Fonts SizeFont"> {t('AddLoan.moratorm')}</h6>
                      <select disabled onChange={this.searchSubmit}  name="test1" id="test1"  className="monthlySelect" >
                              {brands.map(brand => (
                                <option value={brand.id} key={brand.id}>
                                  {brand.name}
                                </option>
                              ))}
                            </select>
                      </div>
                      <Input className="textBox" style={{ height: '35px', border: this.state.changeColoremail4 }} onClick={this.emailBox4} onChange={(event) => this.setState({ moratorium: event.target.value })} />
                    </div>
                    <div className="textFieldStyle">
                      <h6 className="InputLabel Fonts SizeFont"> {t('AddLoan.value')}</h6>
                      <Input className="textBox" value={this.state.valueAftermoratorium || ""} style={{ height: '35px', border: this.state.changeColoremail3 }} disabled />
                    </div>
                    <div style={{ marginTop: "6rem" }}>
                      <Button className="savebutton btnSizeFont Fonts" onClick={this.calculationwithnointerest}>
                         {t('AddLoan.buttn1')}
                      </Button>
                      <Button className="cancelbutton btnSizeFont Fonts" onClick={this.clear.bind(this)}>
                         {t('AddLoan.buttn2')}
                      </Button>
                    </div>
                  </div>
                  <div style={{ width: "50%", margin: '3rem', textAlign: "left" }}>
                    <div style={{ display: "flex" }}>
                      <h6 className="InputLabel Fonts SizeFont" style={{ marginBottom: "1px" }}> {t('AddLoan.amount')}</h6>
                      <div className="outputDivLoan">
                        &#x20b9; <Input className="output" value={this.state.amountvalues} margin="dense" onChange={this.handleInputChange} onBlur={this.handleBlur} inputProps={{ type: 'number', 'aria-labelledby': 'input-slider', }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", }}>
                      <Slider value={typeof this.state.amountvalues === 'number' ? this.state.amountvalues : null}  min={this.state.minValue} step={this.state.step} max={this.state.maxValue} onChange={this.handleSliderChange} aria-labelledby="input-slider" />
                      <span className="MoneyDisplay Money Fonts">&#x20b9;{this.state.minValue}</span>
                      <span className="Fonts Money">&#x20b9;{this.state.maxValue}</span>
                    </div><br></br>
                    <div style={{ display: "flex" }}>
                      <h6 className="InputLabel Fonts SizeFont" style={{ marginBottom: "1px" }}> {t('AddLoan.tenure')}</h6>
                      <select disabled onChange={this.searchSubmit}  name="test2" id="test2"  className="monthlySelect">
                              {brands.map(brand => (
                                <option value={brand.id} key={brand.id}>
                                  {brand.name}
                                </option>
                              ))}
                            </select>
                      <div className="outputDivLoan">
                        <Input className="output" value={this.state.tenurevalues} margin="dense" onChange={this.handleInputtenureChange} inputProps={{ step: 3, min: 3, max: 20, type: 'number', 'aria-labelledby': 'input-slider', }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", }}>
                      <Slider value={typeof this.state.tenurevalues === 'number' ? this.state.tenurevalues : null} max={this.state.maxtenureValue} min={this.state.mintenureValue}  step={this.state.steptenure} onChange={this.handleSlidertenureChange} aria-labelledby="input-slider" />
                      <span className="MoneyDisplay Money Fonts" style={{ display: this.state.monthlyRange }}>{this.state.mintenureMonthValue} Months</span>
                      <span className="Fonts Money" style={{ display: this.state.monthlyRange }}>{this.state.maxtenureMonthValue} Months</span>
                      <span className="MoneyDisplay Money Fonts" style={{ display: this.state.weeklyRange }}>{this.state.mintenureWeekValue} Weeks</span>
                      <span className="Fonts Money" style={{ display: this.state.weeklyRange }}>{this.state.maxtenureWeekValue} Weeks</span>
                      <span className="MoneyDisplay Money Fonts" style={{ display: this.state.dailyRange }}>{this.state.mintenureDaysValue} Days</span>
                      <span className="Fonts Money" style={{ display: this.state.dailyRange }}>{this.state.maxtenureDaysValue} Days</span>

                    </div><br></br>
                    <div style={{ display: "flex" }}>
                      <h6 className="InputLabel Fonts SizeFont" style={{ marginBottom: "1px" }}>{t('AddLoan.emi')} </h6>
                      <div className="outputDivLoan">
                        <Input className="output" value={this.state.interestvalues} margin="dense" onChange={this.handleInputinterestChange} inputProps={{ step: 11, min: 11, max: 21, type: 'number', 'aria-labelledby': 'input-slider', }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                      <Slider value={typeof this.state.interestvalues === 'number' ? this.state.interestvalues : null} max={this.state.maxinterestValue} min={this.state.mininterestValue} step={this.state.stepinterest} onChange={this.handleSliderinterestChange} aria-labelledby="input-slider" />

                      <span className="MoneyDisplay Money Fonts" style={{ marginRight: '22rem' }}>{this.state.mininterestValue}</span>
                      <span className="Fonts Money">{this.state.maxinterestValue}</span>

                    </div>
                    <div className="textFieldStyle" style={{ display: this.state.choosecustmr }}>
                      <h6 className="InputLabel Fonts SizeFont"> {t('AddLoan.customer')}</h6>
                      <div style={{ height: '35px', width:"100%", border: this.state.changeColoremail5 }} className="textBox">
                        <Input list="browsers" placeholder="Choose Customer" value={this.state.choosecustomer || ""} onClick={this.emailBox5} onChange={this.searchlist} />
                      </div>
                      {this.state.allCustomer.length > 0 ? (
                        <div id="browsers" style={{ border: "1px solid lightgrey", borderRadius: "5px", display: this.state.afterSelect, width: "100%" }}>
                          {this.state.allCustomer.map((option, index) => (
                            <option key={option.firstName} value={option.firstName} className="Fonts" style={{ padding: "8px", cursor: "pointer" }} onClick={this.selectName.bind(this, option)}>{option.firstName} {option.lastName}</option>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <br></br>
                    <div className="TotalMoneyDisplay">
                      <input placeholder="&#x20b9;" value={this.state.collectionAmount || ""} className="displaytotalmoney" disabled style={{ backgroundColor: "transparent" }} />
                    </div>
                    <span className="Fonts instalment">{t('AddLoan.instal')}</span>
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}
export default withNamespaces()(AddLoan);