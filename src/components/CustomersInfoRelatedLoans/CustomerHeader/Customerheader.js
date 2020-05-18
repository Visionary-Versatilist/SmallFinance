import React, { Component } from 'react';
import './Customerheader.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import companylogo from '../../../assets/images/companylogo.svg';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import searchicon from '../../../assets/images/searchicon.svg';
import MenuItem from '@material-ui/core/MenuItem';
import plusicon from '../../../assets/images/plusicon.svg';
import cardviewgreen from '../../../assets/images/cardviewgreen.svg';
import cardtype from '../../../assets/images/cardtype.svg';
import gridview from '../../../assets/images/gridview.svg';
import calendar from '../../../assets/images/calendar.svg';
import InputLabel from '@material-ui/core/InputLabel';
import { withRouter } from "react-router-dom";
import ls from 'local-storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from "@material-ui/core/Menu";
import Customdaterange from '../../modals/customdaterange/customdaterange';
import CollectionFiltersButton from '../../CollectionReports/CollectionFiltersButtons/CollectionFiltersButtons'
import Select from '@material-ui/core/Select';
import {BaseUrl} from "../../../Environment";
import moment from 'moment';
import { withNamespaces } from 'react-i18next';

const axios = require('axios')

class CustomerHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "Any time",
      filter: "Filters",
      AllCustomer: null,
      dueCustomer: "",
      overdueCustomer: "",
      filterCustomer: "",
      allText: "",
      dueText: "",
      overdueText: "",
      overduebackground: "",
      duebackground: "",
      allbackground: "",
      closeText: "",
      openText: "",
      newText: "",
      overdueWeight: "",
      dueWeight: "",
      allWeight: "",
      closeWeight: "",
      newWeight: "",
      openWeight: "",
      SelectedtimeColour: "#00D95E",
      SelectedColour: "#00D95E",
      allbuttns: "",
      allbuttnscard: "",
      cardgreen: "",
      cardd: "",
      listgreen: "",
      listt: "",
      subbuttn: "",
      subbuttncard: "",
      list: "",
      card: "",
      Openloans: [],
      Allloans: [],
      Closeloans: [],
      Dueloans: [],
      Overdueloans: [],
      Cancelloans: [],
      LaonType: [],
      loanTypeDivision: "none",
      open: false,
      opendate: false,
      openprofile: false,
      openrange: false,
      loanTypeId: null,
      rangefrom: null,
      rangeto: null,
      openmodal: false,
      startdate: null,
      enddate: null,
      sequence: null,
      collectionseq: "",
      clearaction: {},
      loanPaymentStatus: null,
      loanStatus: null,
      label:""
    };
    this.allLoansData = this.allLoansData.bind(this)
    this.dueLoansData = this.dueLoansData.bind(this)
    this.overdueLoansData = this.overdueLoansData.bind(this)
    this.closeLoansData = this.closeLoansData.bind(this)
    this.cancelLoansData = this.cancelLoansData.bind(this)
    this.openLoansData = this.openLoansData.bind(this)
    this.closemodal = this.closemodal.bind(this)
  }


  opencustomer() {
    this.props.history.push('/customer')
    this.setState({
      AllCustomer: "initial",
      dueCustomer: "initial",
      overdueCustomer: "initial",
      filterCustomer: "initial",
      collectionseq: "contents",
      closeText: "#D4D4D5",
      openText: "#4D66F0",
      newText: "#D4D4D5",
      closeWeight: "",
      newWeight: "",
      openWeight: "900",
      loanPaymentStatus: null,
      loanStatus: "Open"
    })
    this.openLoansData()
  }
  closedcustomer() {
    this.props.history.push('/customer/closedcustomer')
    this.setState({
      AllCustomer: "none",
      dueCustomer: "none",
      overdueCustomer: "none",
      collectionseq: "none",
      filterCustomer: "",
      closeText: "#4D66F0",
      openText: "#D4D4D5",
      newText: "#D4D4D5",
      closeWeight: "900",
      newWeight: "",
      openWeight: "",
      loanStatus: "Closed"
    })
    this.closeLoansData()
  }
  newcustomer() {
    this.props.history.push({ pathname: '/customer/newcustomer', params: this.state.list })
    this.setState({
      AllCustomer: "none",
      dueCustomer: "none",
      overdueCustomer: "none",
      collectionseq: "none",
      filterCustomer: "none",
      closeText: "#D4D4D5",
      openText: "#D4D4D5",
      newText: "#4D66F0",
      closeWeight: "",
      newWeight: "900",
      openWeight: "",
      loanStatus: "Cancelled"
    })
    this.cancelLoansData()
  }
  // opencustomer(){

  // }
  allcustomer() {
    this.props.history.push('/customer')
    this.setState({
      allText: "#3E4664",
      dueText: "#757575",
      overdueText: "#757575",
      overduebackground: "",
      duebackground: "",
      allbackground: "#E8E9EF",
      overdueWeight: "",
      dueWeight: "",
      allWeight: "900",
      loanStatus: "Open"
    })
    this.allLoansData()
  }
  duecustomer() {
    this.props.history.push('/customer/duecustomer')
    this.setState({
      allText: "#757575",
      dueText: "#3E4664",
      overdueText: "#757575",
      overduebackground: "",
      duebackground: "#E8E9EF",
      allbackground: "",
      overdueWeight: "",
      dueWeight: "900",
      allWeight: "",
      loanPaymentStatus: "Due",
      loanStatus: "Open"
    })
    this.dueLoansData()
  }
  overduecustomer() {
    this.props.history.push('/customer/overduecustomer')
    this.setState({
      allText: "#757575",
      dueText: "#757575",
      overdueText: "#3E4664",
      overduebackground: "#E8E9EF",
      duebackground: "",
      allbackground: "",
      overdueWeight: "900",
      dueWeight: "",
      allWeight: "",
      loanPaymentStatus: "OverDue",
      loanStatus: "Open"
    })
    this.overdueLoansData()
  }
  opencustomerlist() {
    this.props.history.push('/customer')
    this.setState({
      AllCustomer: "initial",
      dueCustomer: "initial",
      overdueCustomer: "initial",
      filterCustomer: "initial",
      collectionseq: "contents",
      closeText: "#D4D4D5",
      openText: "#4D66F0",
      newText: "#D4D4D5",
      closeWeight: "",
      newWeight: "",
      openWeight: "900",
      loanStatus: "Open"
    })
    this.openLoansData()
  }
  closedcustomerlist() {
    this.props.history.push('/customer/closedcustomer')
    this.setState({
      AllCustomer: "none",
      dueCustomer: "none",
      overdueCustomer: "none",
      collectionseq: "none",
      filterCustomer: "",
      closeText: "#4D66F0",
      openText: "#D4D4D5",
      newText: "#D4D4D5",
      closeWeight: "900",
      newWeight: "",
      openWeight: "",
      loanStatus: "Closed"
    })
    this.closeLoansData()
  }
  newcustomerlist() {
    this.props.history.push('/customer/newcustomer')
    this.setState({
      AllCustomer: "none",
      dueCustomer: "none",
      overdueCustomer: "none",
      filterCustomer: "none",
      collectionseq: "none",
      closeText: "#D4D4D5",
      openText: "#D4D4D5",
      newText: "#4D66F0",
      closeWeight: "",
      newWeight: "900",
      openWeight: "",
      loanStatus: "Cancelled"
    })
    this.cancelLoansData()
  }
  allcustomerlist() {
    this.props.history.push('/customer')
    this.setState({
      allText: "#3E4664",
      dueText: "#757575",
      overdueText: "#757575",
      overduebackground: "",
      duebackground: "",
      allbackground: "#E8E9EF",
      overdueWeight: "",
      dueWeight: "",
      allWeight: "900",
      loanStatus: "Open"
    })
    this.allLoansData()
  }
  duecustomerlist() {
    this.props.history.push('/customer/duecustomer')
    this.setState({
      allText: "#757575",
      dueText: "#3E4664",
      overdueText: "#757575",
      overduebackground: "",
      duebackground: "#E8E9EF",
      allbackground: "",
      overdueWeight: "",
      dueWeight: "900",
      allWeight: "",
      loanStatus: "Open"
    })
    this.dueLoansData()
  }
  overduecustomerlist() {
    this.props.history.push('/customer/overduecustomer')
    this.setState({
      allText: "#757575",
      dueText: "#757575",
      overdueText: "#3E4664",
      overduebackground: "#E8E9EF",
      duebackground: "",
      allbackground: "",
      overdueWeight: "900",
      dueWeight: "",
      allWeight: "",
      loanStatus: "Open"
    })
    this.overdueLoansData()
  }



  addcustomer() {
    this.props.history.push('/addloannointerest')
  }
  componentDidMount() {
    this.setState({
      allCustomer: "initial",
      dueCustomer: "initial",
      overdueCustomer: "initial",
      filterCustomer: "initial",
      collectionseq: "contents",
      allbuttns: "none",
      cardgreen: "",
      cardd: "none",
      listgreen: "none",
      listt: "",
      subbuttn: "none",
      subbuttncard: "",
      allbuttnscard: "",
    })
    if (window.location.pathname === "/customer/duecustomer") {
      this.setState({
        allText: "#757575",
        dueText: "#3E4664",
        overdueText: "#757575",
        overduebackground: "",
        duebackground: "#E8E9EF",
        allbackground: "",
        overdueWeight: "",
        dueWeight: "900",
        allWeight: "",
      })
      this.dueLoansData()

    } else if (window.location.pathname === "/customer/overduecustomer") {
      this.setState({
        allText: "#757575",
        dueText: "#757575",
        overdueText: "#3E4664",
        overduebackground: "#E8E9EF",
        duebackground: "",
        allbackground: "",
        overdueWeight: "900",
        dueWeight: "",
        allWeight: "",
      })
      this.overdueLoansData()

    } else {
      this.setState({
        allText: "#3E4664",
        dueText: "#757575",
        overdueText: "#757575",
        overduebackground: "",
        duebackground: "",
        allbackground: "#E8E9EF",
        overdueWeight: "",
        dueWeight: "",
        allWeight: "900",
      })
      this.allLoansData()
    }
    if (window.location.pathname === "/customer/closedcustomer") {
      this.setState({
        AllCustomer: "none",
        dueCustomer: "none",
        overdueCustomer: "none",
        collectionseq: "none",
        filterCustomer: "",
        closeText: "#4D66F0",
        openText: "#D4D4D5",
        newText: "#D4D4D5",
        closeWeight: "900",
        newWeight: "",
        openWeight: "",
        loanStatus: "Closed"

      })
      this.closeLoansData()

    } else if (window.location.pathname === "/customer/newcustomer") {
      this.setState({
        AllCustomer: "none",
        dueCustomer: "none",
        overdueCustomer: "none",
        collectionseq: "none",
        filterCustomer: "none",
        closeText: "#D4D4D5",
        openText: "#D4D4D5",
        newText: "#4D66F0",
        closeWeight: "",
        newWeight: "900",
        openWeight: "",
        loanStatus: "Cancelled"

      })
      this.cancelLoansData()

    } else {
      this.setState({
        AllCustomer: "initial",
        dueCustomer: "initial",
        overdueCustomer: "initial",
        filterCustomer: "initial",
        collectionseq: "contents",
        closeText: "#D4D4D5",
        openText: "#4D66F0",
        newText: "#D4D4D5",
        closeWeight: "",
        newWeight: "",
        openWeight: "900",
      })
      this.openLoansData()
    }

    this.AllLoanTypeList()
  }
  handleChangetime = event => {
    this.setState({
      time: event.target.value,
      SelectedtimeColour: "#00D95E",
    });
  };
  handleChangefilter = (event, index) => {
    this.setState({
      filter: event.target.value,
      // SelectedtimeColour:"#3E4664 !important",
      SelectedColour: "#00D95E"
    });
    if (event.target.value === "Loan type") {
      this.setState({
        loanTypeDivision: ""
      })
    }
  };
  time() {
    this.setState({
      SelectedColour: "#00D95E"
    });
  }
  CardType(card) {
    this.setState({
      allbuttns: "none",
      cardgreen: "",
      cardd: "none",
      listgreen: "none",
      listt: "",
      subbuttn: "none",
      subbuttncard: "",
      allbuttnscard: "",
      card: card
    })
    this.props.cardView();

  }
  ListType(list) {
    this.setState({
      allbuttns: "",
      cardgreen: "none",
      cardd: "",
      listgreen: "",
      listt: "none",
      subbuttn: "",
      subbuttncard: "none",
      allbuttnscard: "none",
      list: list
      // enablelistview: true
    })
    this.props.listView();
    // localStorage

  }
  allLoansData() {
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))

    const headers = {
      'Authorization': 'Bearer ' + ls.get('token')
    }
    const allloan = {
      "loanStatus": "Open",
      "loanPaymentStatus": null,
      // "loanTypeId": this.state.loanTypeId,
      // "loanAmountFrom": this.state.rangefrom,
      // "loanAmountTo": this.state.rangeto,
      // "loanTenureType": this.state.sequence
      "companyId":loggedinUser.companyId
    }

    axios.post(BaseUrl + '/loan/getAllLoans', allloan, {
      headers: headers,
    }).then(resp => {
      this.setState({
        Allloans: resp.data
      })
      this.props.AllView(resp.data);
    })
  }
  dueLoansData() {
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))

    const headers = {
      'Authorization': 'Bearer ' + ls.get('token')
    }
    const allloan = {
      "loanStatus": "Open",
      "loanPaymentStatus": "Due",
      "loanTypeId": this.state.loanTypeId,
      "loanAmountFrom": this.state.rangefrom,
      "loanAmountTo": this.state.rangeto,
      "fromDate": this.state.startdate,
      "toDate": this.state.enddate,
      "loanTenureType": this.state.sequence,
      "companyId":loggedinUser.companyId


    }

    axios.post(BaseUrl + '/loan/getAllLoans', allloan, {
      headers: headers,
    }).then(resp => {
      this.setState({
        Dueloans: resp.data
      })
      this.props.DueView(resp.data);
    })

  }
  overdueLoansData() {
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))

    const headers = {
      'Authorization': 'Bearer ' + ls.get('token')
    }
    const allloan = {
      "loanStatus": "Open",
      "loanPaymentStatus": "OverDue",
      "loanTypeId": this.state.loanTypeId,
      "loanAmountFrom": this.state.rangefrom,
      "loanAmountTo": this.state.rangeto,
      "fromDate": this.state.startdate,
      "toDate": this.state.enddate,
      "loanTenureType": this.state.sequence,
      "companyId":loggedinUser.companyId

    }

    axios.post(BaseUrl + '/loan/getAllLoans', allloan, {
      headers: headers,
    }).then(resp => {
      this.setState({
        Overdueloans: resp.data
      })
      this.props.OverdueView(resp.data);
    })

  }
  closeLoansData() {
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))

    const headers = {
      'Authorization': 'Bearer ' + ls.get('token')
    }
    const allloan = {
      "loanStatus": "Closed",
      // "loanPaymentStatus":null,
      "loanTypeId": this.state.loanTypeId,
      "loanAmountFrom": this.state.rangefrom,
      "loanAmountTo": this.state.rangeto,
      "fromDate": this.state.startdate,
      "toDate": this.state.enddate,
      "loanTenureType": this.state.sequence,
      "companyId":loggedinUser.companyId

    }

    axios.post(BaseUrl + '/loan/getAllLoans', allloan, {
      headers: headers,
    }).then(resp => {
      this.setState({
        Closeloans: resp.data
      })
      this.props.CloseView(resp.data);
    })

  }
  cancelLoansData() {
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))

    const headers = {
      'Authorization': 'Bearer ' + ls.get('token')
    }
    const allloan = {
      "loanStatus": "Cancelled",
      "loanPaymentStatus": null,
      "loanTypeId": this.state.loanTypeId,
      "loanAmountFrom": this.state.rangefrom,
      "loanAmountTo": this.state.rangeto,
      "fromDate": this.state.startdate,
      "toDate": this.state.enddate,
      "loanTenureType": this.state.sequence,
      "companyId":loggedinUser.companyId

    }

    axios.post(BaseUrl + '/loan/getAllLoans', allloan, {
      headers: headers,
    }).then(resp => {
      this.setState({
        Cancelloans: resp.data
      })
      this.props.CancelView(resp.data);
    })

  }
  openLoansData() {
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))

    const headers = {
      'Authorization': 'Bearer ' + ls.get('token')
    }
    const allloan = {
      "loanStatus": "Open",
      "loanPaymentStatus": null,
      "loanTypeId": this.state.loanTypeId,
      "loanAmountFrom": this.state.rangefrom,
      "loanAmountTo": this.state.rangeto,
      "fromDate": this.state.startdate,
      "toDate": this.state.enddate,
      "loanTenureType": this.state.sequence,
      "companyId":loggedinUser.companyId

    }

    axios.post(BaseUrl + '/loan/getAllLoans', allloan, {
      headers: headers,
    }).then(resp => {
      this.setState({
        Openloans: resp.data
      })
      this.props.OpenView(resp.data);
    })

  }
  AllLoanTypeList() {
    let  loggedinUser= localStorage.getItem("loggedinUserCompany")

    const headers = {
      'Authorization': 'Bearer' + ls.get('token')
    }

    axios.get(BaseUrl + '/loanType/getAllLoanTypes?loanType=&companyId=' + loggedinUser, {
      headers: headers,
    }).then(resp => {
      if (resp.status === 200) {


        this.modifyJsonFormat(resp.data);
        // usercount:resp.data.TotalRecords

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
  modifyJsonFormat = (data) => {
    let modData = data.map(obj => ({
      loanTypeId: obj.loanTypeId,
      label: obj.loanType,
    }))
    this.setState({
      LaonType: modData
    })
  };

  handleClick = event => {
    this.setState({ open: true });
  };
  handledateClick = event => {
    this.setState({ opendate: true });
  }

  handleClose = (event) => {
    this.setState({ open: false, openprofile: false });
  };
  handleClosedate = (event) => {
    this.setState({ opendate: false });
  };
  handleCloseprofile(loanTypeId) {
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))
    this.setState({
      loanTypeId: loanTypeId
    });
    if (window.location.pathname === "/customer") {
      const headers = {
        'Authorization': 'Bearer ' + ls.get('token')
      }
      const allloan = {
        "loanStatus": "Open",
        "loanPaymentStatus": null,
        "loanTypeId": loanTypeId,
        "loanAmountFrom": this.state.rangefrom,
        "loanAmountTo": this.state.rangeto,
        "fromDate": this.state.startdate,
        "toDate": this.state.enddate,
        "loanTenureType": this.state.sequence,
        "companyId":loggedinUser.companyId

      }

      axios.post(BaseUrl + '/loan/getAllLoans', allloan, {
        headers: headers,
      }).then(resp => {
        this.setState({
          Allloans: resp.data
        })
        this.props.AllView(resp.data);
      })
    }
    this.setState({
      openprofile: false,
    });
  };

  Filter(range) {
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))
    var selectedloanid
    var words = []
    if (range.menuID === "2" && range.subMenuActive === true) {
      words = range.subMenuID.split("-");
  
      this.setState({
        rangefrom: words[0],
        rangeto: words[1]
      });
    } else if (range.menuID === "2" && range.subMenuActive === false) {
      this.setState({
        rangefrom: null,
        rangeto: null
      })

    } else if (range.menuID === "1" && range.subMenuActive === true) {
      console.log("range.subMenuID",range.subMenuID)
      selectedloanid = range.subMenuID
      this.setState({
        loanTypeId: range.subMenuID
      });
    } else if (range.menuID === "1" && range.subMenuActive === false) {
      this.setState({
        loanTypeId: null
      });
    } else {
      selectedloanid = null
      words[0] = null
      words[1] = null
      this.setState({
        loanTypeId: null,
        rangefrom: null,
        rangeto: null
      })
    }
    if (window.location.href.split('#')[1] ===  "/customer") {
      const headers = {
        'Authorization': 'Bearer ' + ls.get('token')
      }
      const allloan = {
        "loanStatus": "Open",
        "loanPaymentStatus": null,
        "loanTypeId": selectedloanid,
        "loanAmountFrom": words[0],
        "loanAmountTo": words[1],
        "fromDate": this.state.startdate,
        "toDate": this.state.enddate,
        "loanTenureType": this.state.sequence,
        "companyId":loggedinUser.companyId

      }

      axios.post(BaseUrl + '/loan/getAllLoans', allloan, {
        headers: headers,
      }).then(resp => {
        this.setState({
          Allloans: resp.data
        })
        this.props.AllView(resp.data);
      })
    }
    this.setState({
      openrange: false,
    });
  }
  handlechange = (event) => {
  }


  profileClick = () => {
    this.setState({ openprofile: true })
  }


  rangeClick = () => {
    this.setState({ openrange: true })
  }
  customdate() {
    this.setState({
      openmodal: true,
      // row: row,
      // rowindex:i
    })
  }
  closemodal() {
    this.setState({
      openmodal: false
    })
  }
  save(obj) {
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))
    this.setState({
      startdate: obj.start,
      enddate: obj.end
    })

    const headers = {
      'Authorization': 'Bearer ' + ls.get('token')
    }
    const allloan = {
      "loanStatus": "Open",
      "loanPaymentStatus": null,
      "loanTypeId": this.state.loanTypeId,
      "loanAmountFrom": this.state.rangefrom,
      "loanAmountTo": this.state.rangeto,
      "fromDate": obj.start,
      "toDate": obj.end,
      "loanTenureType": this.state.sequence,
      "companyId":loggedinUser.companyId

    }

    axios.post(BaseUrl + '/loan/getAllLoans', allloan, {
      headers: headers,
    }).then(resp => {
      this.setState({
        Allloans: resp.data
      })
      this.props.AllView(resp.data);
    })
  }
  searchlist = (event) => {
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))

    const headers = {
      'Authorization': 'Bearer ' + ls.get('token')
    }
    if (this.state.loanStatus !== "Closed" && this.state.loanStatus !== "Cancelled") {
      const data = {
        "search": event.target.value,
        "loanStatus": this.state.loanStatus,
        "loanPaymentStatus": this.state.loanPaymentStatus,
        "loanTypeId": this.state.loanTypeId,
        "loanAmountFrom": this.state.rangefrom,
        "loanAmountTo": this.state.rangeto,
        "fromDate": this.state.startdate,
        "toDate": this.state.enddate,
        "loanTenureType": this.state.sequence,
        "companyId":loggedinUser.companyId

      }
      axios.post(BaseUrl + '/loan/getAllLoans', data, {
        headers: headers,
      }).then(resp => {
        this.setState({
          Allloans: resp.data
        })
        if (this.state.loanPaymentStatus === null) {
          this.props.AllView(resp.data);
        } else if (this.state.loanPaymentStatus === "Due") {
          this.props.DueView(resp.data);
        } else {
          this.props.OverdueView(resp.data);
        }
      })
    } else {
      const data = {
        "search": event.target.value,
        "loanStatus": this.state.loanStatus,
        "loanPaymentStatus": null,
        "loanTypeId": this.state.loanTypeId,
        "loanAmountFrom": this.state.rangefrom,
        "loanAmountTo": this.state.rangeto,
        "fromDate": this.state.startdate,
        "toDate": this.state.enddate,
        "loanTenureType": this.state.sequence,
        "companyId":loggedinUser.companyId

      }
      axios.post(BaseUrl + '/loan/getAllLoans', data, {
        headers: headers,
      }).then(resp => {
        this.setState({
          Allloans: resp.data
        })
        if (this.state.loanStatus === "Closed") {
          this.props.CloseView(resp.data);
        } else {
          this.props.CancelView(resp.data);
        }
      })

    }

  }
  CollectseqChange = (event) => {
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))

    if (event.target.value !== null) {
      this.setState({
        sequence: event.target.value,
        label:"none"
      })
      const headers = {
        'Authorization': 'Bearer ' + ls.get('token')
      }
      const allloan = {
        "loanStatus": "Open",
        "loanPaymentStatus": null,
        "loanTypeId": this.state.loanTypeId,
        "loanAmountFrom": this.state.rangefrom,
        "loanAmountTo": this.state.rangeto,
        "fromDate": this.state.startdate,
        "toDate": this.state.enddate,
        "loanTenureType": event.target.value,
        "companyId":loggedinUser.companyId

      }

      axios.post(BaseUrl +'/loan/getAllLoans', allloan, {
        headers: headers,
      }).then(resp => {
        this.setState({
          Allloans: resp.data
        })
        this.props.AllView(resp.data);
      })
    } else {
      this.setState({
        sequence: null,
        label:"initial"
      })
      const headers = {
        'Authorization': 'Bearer ' + ls.get('token')
      }
      const allloan = {
        "loanStatus": "Open",
        "loanPaymentStatus": null,
        "loanTypeId": this.state.loanTypeId,
        "loanAmountFrom": this.state.rangefrom,
        "loanAmountTo": this.state.rangeto,
        "fromDate": this.state.startdate,
        "toDate": this.state.enddate,
        "loanTenureType": null,
        "companyId":loggedinUser.companyId

      }

      axios.post(BaseUrl + '/loan/getAllLoans', allloan, {
        headers: headers,
      }).then(resp => {
        this.setState({
          Allloans: resp.data
        })
        this.props.AllView(resp.data);
      })
    }
  }
  handledateClick = event => {
    this.setState({ opendate: true, anchorEl: event.currentTarget });
  }
  clearDate() {
    this.setState({
      "fromDate": null,
      "toDate": null,
      startdate:null,
      enddate:null
    })
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))

    const headers = {
      'Authorization': 'Bearer ' + ls.get('token')
    }
    const allloan = {
      "loanStatus": "Open",
      "loanPaymentStatus": null,
      "loanTypeId": this.state.loanTypeId,
      "loanAmountFrom": this.state.rangefrom,
      "loanAmountTo": this.state.rangeto,
      "fromDate": null,
      "toDate": null,
      "loanTenureType": this.state.sequence,
      "companyId":loggedinUser.companyId

    }

    axios.post(BaseUrl + '/loan/getAllLoans', allloan, {
      headers: headers,
    }).then(resp => {
      this.setState({
        Allloans: resp.data
      })
      this.props.AllView(resp.data);
    })
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <div className="customerMainHeader">
          <section className='Customerheader'> 
            <AppBar position="static" className='bar'>
              <Toolbar>
                <Typography variant="h6" className='title' component={'div'}>
                  <img src={companylogo} alt="logo" />
                </Typography>
                <div className="OptionDiv" style={{ display: this.state.allbuttnscard }}>
                  <div style={{ color: this.state.openText, fontWeight: this.state.openWeight }} onClick={this.opencustomer.bind(this)} className="option Fonts btnSizeFont">
                    <span >{t('Loans.open')}</span>
                  </div>
                  <div style={{ color: this.state.closeText, fontWeight: this.state.closeWeight }} onClick={this.closedcustomer.bind(this)} className="option Fonts btnSizeFont">
                    <span>{t('Loans.close')}</span>
                  </div>
                  <div style={{ color: this.state.newText, fontWeight: this.state.newWeight }} onClick={this.newcustomer.bind(this)} className="option Fonts btnSizeFont">
                    <span>{t('Loans.cancel')}</span>
                  </div>
                </div>
                <div className="OptionDiv" style={{ display: this.state.allbuttns }}>
                  <div style={{ color: this.state.openText, fontWeight: this.state.openWeight }} onClick={this.opencustomerlist.bind(this)} className="option Fonts btnSizeFont">
                    <span >{t('Loans.open')}</span>
                  </div>
                  <div style={{ color: this.state.closeText, fontWeight: this.state.closeWeight }} onClick={this.closedcustomerlist.bind(this)} className="option Fonts btnSizeFont">
                    <span>{t('Loans.close')}</span>
                  </div>
                  <div style={{ color: this.state.newText, fontWeight: this.state.newWeight }} onClick={this.newcustomerlist.bind(this)} className="option Fonts btnSizeFont">
                    <span>{t('Loans.cancel')}</span>
                  </div>
                </div>
                <div className="searchDiv">
                  <IconButton className='iconButton' aria-label="search">
                    <img src={searchicon} alt="searchicon" className="iconButton" />
                  </IconButton>
                  <InputBase className='input' placeholder="Search by customer name" onChange={this.searchlist} />
                </div>
              </Toolbar>
            </AppBar>
          </section>
          <section className='CustomerHeaderfilter' style={{paddingTop:"15px"}}>
            <AppBar position="static" className='bar'>
              <Toolbar>
              <Typography component={'div'}>
                <div className="buttonDiv">
                            <div className="buttonDivOne">
                <Typography variant="h6" className='titleOne' style={{ display: this.state.subbuttncard }} component={'div'}>
                  <Button variant="outlined" className="Tabbutton Fonts" style={{ display: this.state.AllCustomer, color: this.state.allText, backgroundColor: this.state.allbackground, fontWeight: this.state.allWeight }} onClick={this.allcustomer.bind(this)}>
                    {t('Loans.all')}
                </Button>
                  <Button variant="outlined" className="Tabbutton Fonts" style={{ display: this.state.dueCustomer, color: this.state.dueText, backgroundColor: this.state.duebackground, fontWeight: this.state.dueWeight }} onClick={this.duecustomer.bind(this)}>
                    {t('Loans.due')}
                </Button>
                  <Button variant="outlined" className="Tabbutton Fonts" style={{ display: this.state.overdueCustomer, color: this.state.overdueText, backgroundColor: this.state.overduebackground, fontWeight: this.state.overdueWeight }} onClick={this.overduecustomer.bind(this)}>
                    {t('Loans.over')}
                </Button>
                </Typography>
                <Typography variant="h6" className='titleOne' style={{ display: this.state.subbuttn }}>
                  <Button variant="outlined" className="Tabbutton Fonts" style={{ display: this.state.AllCustomer, color: this.state.allText, backgroundColor: this.state.allbackground, fontWeight: this.state.allWeight }} onClick={this.allcustomerlist.bind(this)}>
                    {t('Loans.all')}
                </Button>
                  <Button variant="outlined" className="Tabbutton Fonts" style={{ display: this.state.dueCustomer, color: this.state.dueText, backgroundColor: this.state.duebackground, fontWeight: this.state.dueWeight }} onClick={this.duecustomerlist.bind(this)}>
                    {t('Loans.due')}
                </Button>
                  <Button variant="outlined" className="Tabbutton Fonts" style={{ display: this.state.overdueCustomer, color: this.state.overdueText, backgroundColor: this.state.overduebackground, fontWeight: this.state.overdueWeight }} onClick={this.overduecustomerlist.bind(this)}>
                    {t('Loans.over')}
                </Button>
                </Typography>
              {/* </div> */}
              <div className="buttonDivTwo">
                <Typography style={{ width: "40%" }} component={'div'}>
                  <div style={{ display: this.state.collectionseq }}>
                    <div className="buttonDivTwoOne" >
                      <div className="buttonDivTwoOneONe"></div>
                      <div style={{ color: "#757575", marginRight: "12px",fontSize: "0.875rem",paddingTop: "5px" }} className="Fonts">{t('Loans.Collseq')}:</div>
                      <div>
                        <InputLabel id="demo-controlled-open-select-label" style={{ position: "absolute", marginTop: "10px",fontSize: "0.875rem", display:this.state.label }}>{t('Loans.all')}</InputLabel>
                        <Select labelid="demo-controlled-open-select-label" value={this.state.sequence || ""} onChange={this.CollectseqChange}>
                          <MenuItem value={null} selected className="Fonts">{t('Loans.all')}</MenuItem>
                          <MenuItem value="Daily" className="Fonts">{t('Dashboard.Days')}</MenuItem>
                          <MenuItem value="Weekly" className="Fonts">{t('Loans.weeks')}</MenuItem>
                        </Select>
                      </div>
                    </div>
                  </div>
                </Typography>
                </div>
                </div>
                
                <div className="buttonDivButtons">
                <div className="buttonDivThree">
                <div className="timeDrop">
                  <Button
                    aria-controls="time-menu"
                    aria-haspopup="true"
                    onClick={this.handledateClick.bind(this)}
                    style={{ color: "#3E4664", textTransform: "capitalize",fontWeight: "600" }}
                    className="Fonts"
                  >
                    {this.state.startdate === null && this.state.enddate === null ?t('Loans.anytime'): moment(this.state.startdate).format("DD MMM YYYY") +" " + "and" + " " + moment(this.state.enddate).format("DD MMM YYYY") } 
                    <img src={calendar} alt="calendar" className="calendar"/>
                </Button>
                  <Menu
                    id="time-menu"
                    keepMounted
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClosedate}
                    onChange={this.handlechangedate}
                    open={Boolean(this.state.opendate)}
                    className="menuItemsList"
                    // style={{ marginLeft: "55rem", marginTop: "-220px" }}
                  >
                    <MenuItem onClick={this.customdate.bind(this)}>{t('Loans.custmDate')}</MenuItem>
                    <MenuItem onClick={this.clearDate.bind(this)}> {t('Loans.clear')}</MenuItem>
                  </Menu>
                </div>
                
                {/* <TextField id="standard-select" select value={this.state.time} style={{display:this.state.filterCustomer, color:this.state.SelectedtimeColour, marginLeft: '20px'}}  className="textBox" 
                  onChange={this.handleChangetime}> */}
                {/* {time.map(option => ( */}
                {/* <MenuItem value="Any Time">Any Time</MenuItem>
                      <div onClick={this.customdate.bind(this)} value="Custom date range" style={{color:"black"}}>Custom date range</div> */}

                {/* <MenuItem value="Custom date range" onClick={this.customdate.bind(this)}>Custom date range</MenuItem> */}
                {/* ))} */}
                {/* </TextField> */}
                
                <div style={{ marginBottom: "18px" }}>
                  <CollectionFiltersButton loanTypes={this.state.LaonType}  action={this.Filter.bind(this)} />
                </div>
      </div>
      <div className="buttonDivFour">
                <div className="ButtonDiv">
                  <Button className="Fonts btnbackgroundcolor adduserbutton" style={{ color: "#fff", textTransform: "capitalize" , fontSize:"0.875rem"}} onClick={this.addcustomer.bind(this)}>
                    <img src={plusicon} alt="plusicon" className="plusiconButton" />
                    {t('Loans.buttn')}
                  </Button>
                </div>
                <div className="imagediv" >
                  <img src={cardviewgreen} alt="cardtype" style={{ display: this.state.cardgreen }} className="cardtypeicon" />
                  <img src={cardtype} alt="cardtype" style={{ display: this.state.cardd }} className="cardtypeicon" onClick={this.CardType.bind(this, "card")} />

                </div>

                {/* <div className="imagediv">
                </div> */}

                <div className="gridDiv">
                  {/* <img src={gridtypeactive} alt="gridtype" style={{ display: this.state.listgreen }} className="gridtypeicon" /> */}
                  {/* <img src={gridview} alt="gridtype" style={{ display: this.state.listt }} className="gridtypeicon" /> */}
                  {/* onClick={this.ListType.bind(this, "list")} */}
                </div>
                </div>
                </div>
                </div>
                {/* </div> */}

                {/* <div className="gridDiv" >
                </div> */}
                {/* </div> */}
                </Typography>
              </Toolbar>
            </AppBar>
          </section>
        </div>
        <Customdaterange save={this.save.bind(this)} open={this.state.openmodal} close={this.closemodal} />
      </div>
    )
  }
}
export default withNamespaces()(withRouter(CustomerHeader));