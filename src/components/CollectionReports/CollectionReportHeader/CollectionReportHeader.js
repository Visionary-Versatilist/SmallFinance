
import { AppBar, Badge, Button, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Check, HighlightOff } from "@material-ui/icons";
import moment from 'moment';
import React, { Component } from "react";
import "react-picky/dist/picky.css";
import { withRouter } from "react-router-dom";
import Customdaterange from '../../modals/customdaterange/customdaterange';
import "./CollectionReportHeader.scss";
import { calendartime as Calender, companylogo, filter as Filter, user_solid as user } from '../../../assets/images';


const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
}));

class CollectionReportHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      durationName: "Past 24 hours",
      value: null,
      arrayValue: [],
      openmodal: false,
      anchorEl: false,
      bigList: [],
      drop: [],
      time: "Any time",
      isCustomDatePkrOpen: false,

      filterFontActive: {
        display: "initial",
        color: "#3E4664",
        backgroundColor: "#E8E9EF",
        fontWeight: "900"
      },
      filterFontInActive: {
        display: "",
        color: "",
        backgroundColor: "",
        fontWeight: ""
      },
      filterData:
      {
        filter0: [
          { value: "all", label: "All" },
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" }
        ],
        filter1: [
          { value: "last 24 hours", label: "Past 24 hours", isActive: false },
          { value: "last week", label: "Past Week", isActive: false },
          { value: "last month", label: "Past Month", isActive: false },
          { value: "last year", label: "Past Year", isActive: false },
          { value: "customDate", label: "Custom Date Range", isActive: false }
        ],
        filter2: [
          { value: "1", label: "Loan Type", isActive: false, subList: [] },
          {
            value: "2", label: "Loan Amount Range", isActive: false,
            subList: [
              { value: "1-100000", label: "0 – 100000", isActive: false },
              { value: "100001-500000", label: "100001 – 500000", isActive: false },
              { value: "500001-1000000", label: "500001 – 1000000", isActive: false },
              { value: "1000001-2500000", label: "100000 – 2500000", isActive: false },
              { value: "2500001-1000000", label: "ABOVE 2500000", isActive: false }
            ]
          },
          { value: "clearall", label: "Clear All", isActive: true, subList: [] }
        ]
      },
      selectedCollectionAgentList: [],

    };

    this.closemodal = this.closemodal.bind(this)


  }

  componentWillReceiveProps = (nextProps) => {
    let loanTypes = nextProps.condition.loanTypes
    var { filterData } = this.state

    filterData.filter2.find(temp => temp.value === "1").subList = loanTypes
    this.setState({ filterData })
  }

  getDateByCondition = object => {
    let { filterData, durationName } = this.state
    let filter1 = filterData.filter1
    filter1.map(obj => obj.isActive = false)
    filter1.find(obj => obj === object).isActive = true
    this.setState({ filterData });
    let noOfDays = 0, startDate, endDate
    let condition = object.value

    if (condition !== "customDate") {
      noOfDays = condition === "last 24 hours" ? 1
        : condition === "last week" ? 7
          : condition === "last month" ? 30 : 365




      //for past 24 hours, date shouldnt have 'startOf' and 'endOf' in moment.js
      if (condition === "last 24 hours") {
        startDate = moment().subtract(noOfDays, "day").format("YYYY-MM-DD HH:mm:ss")
        endDate = moment().format("YYYY-MM-DD HH:mm:ss")
      } else {
        startDate = moment().subtract(noOfDays, "day").startOf('D').format("YYYY-MM-DD HH:mm:ss")
        endDate = moment().endOf('D').format("YYYY-MM-DD HH:mm:ss")
      }

      durationName = object.label;
    } else {
      this.setState({ isCustomDatePkrOpen: true });

      //return is given to stop triggering api call
      return undefined
    }
    this.setState({ durationName });

    return [startDate, endDate]
  }

  collectionAgent = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };


  handleClose = () => {
    this.setState({
      anchorEl: false
    });
  };
  handleCustomDateClose = () => {
    console.log('handleCustomDateClose called')
    this.setState({ isCustomDatePkrOpen: false });
  }

  closemodal() {
    this.setState({
      openmodal: false
    })
  }




  addData = (event) => {
    try {
      let { selectedCollectionAgentList } = this.state
      let value = event.target.attributes.value.value;
      let valueIndex = selectedCollectionAgentList.indexOf(parseInt(value));


      value === "CLEARALL" ? this.state.selectedCollectionAgentList = [] : valueIndex === -1
        ? this.state.selectedCollectionAgentList.push(parseInt(value))
        : this.state.selectedCollectionAgentList.splice(valueIndex, 1)


      this.props.condition.filter("collectionAgent", selectedCollectionAgentList)
    } catch (err) {
    }
  }

  changeStatus = (filter, subObj, isFromSubList) => {

    let { filterData } = this.state
    let filter2 = filterData.filter2
    if (filter.value === "clearall") {
      filter2.filter(obj => obj.value !== "clearall")
        .map(obj => (
          obj.isActive = false,
          obj.subList.map(subObj => subObj.isActive = false)
        ))
    } else if (isFromSubList) {
      let index = filter2.indexOf(filter)
      let subIndex = filter2[index].subList.indexOf(subObj)
      if (filter2[index].subList[subIndex].isActive) {
        filter2[index].subList[subIndex].isActive = false
      } else {
        filter2[index].subList.map(obj => obj.isActive = false)
        filter2[index].subList[subIndex].isActive = !filter2[index].subList[subIndex].isActive
      }
      filter2[index].isActive = filter2[index].subList.some(subObj => subObj.isActive)
      filterData.filter2 = filter2
    }
    this.setState({ filterData });

  }



  customDateRange = (details) => {

    if (details) {
      let { durationName, isCustomDatePkrOpen } = this.state
      let dateRange = Object.values(details)

      isCustomDatePkrOpen = false
      this.props.condition.filter("dateFilter", dateRange)
      durationName = `${moment(dateRange[0]).format('DD MMM YYYY HH:mm:ss')} 
        - ${moment(dateRange[1]).format('DD MMM YYYY HH:mm:ss')}`
      this.setState({ isCustomDatePkrOpen, durationName });


    }
  }

  render() {
    let ITEM_HEIGHT = 48;
    const classes = useStyles;
    let bigList = this.state.bigList;
    let { drop, isCustomDatePkrOpen, filterData } = this.state;

    let { filterStatus } = this.props.condition

    let cSeq = filterStatus.loanTenureType ? filterStatus.loanTenureType : "all"


    for (const [index, value] of bigList.entries()) {
      drop.push({ id: index, name: `${value}` })
    }

    let filterBadgeValue = filterData.filter2.filter(obj => obj.isActive).length - 1


    return (
      <div className="collectionreportheadercomponent">

        {/* ------------------------------------Header----------------------------------- */}
        <section className="Customerheader">
          <AppBar position="static" className="bar">
            <Toolbar>
              <Typography variant="h6" className="title">
                <img style={{width:"40%"}} src={companylogo} alt="logo" />
              </Typography>

            </Toolbar>
          </AppBar>
        </section>
        {/* ------------------------------------End of Header----------------------------------- */}

        {/* ------------------------------------Filter ----------------------------------- */}
        <section className="CustomerfilterReport">
          <AppBar position="static" className="bar">
            <Toolbar>
              <Typography variant="h6" className="title" style={{ width: "50%" }}>
                {
                  this.state.filterData.filter0.map((filter, index) => (
                    <Button
                      key={index}
                      id={filter.value}
                      variant="outlined"
                      className="Tabbutton Fonts"
                      style={cSeq === filter.value ? this.state.filterFontActive : this.state.filterFontInActive}
                      onClick={() => { this.props.condition.filter("loanTenureType", filter.value) }}
                    >
                      {filter.label}
                    </Button>
                  ))
                }

                {/* collection agent */}

                <Badge color="primary" badgeContent={this.state.selectedCollectionAgentList.length} className={classes.margin}>
                <div style={{border:"1px solid lightgrey", height: "18px",marginTop: "7px",marginLeft: "5px",marginRight: "15px"}}></div>

                  <Button className="Tabbutton Fonts" id="caButton" aria-controls="collection-agent" aria-haspopup="true" onClick={this.handleClick}>
                    <div className="userIcon" ><img src={user} alt={'user'} /></div>
                    Collection Agents
                 </Button>
                </Badge>

                <Menu

                  id="collection-agent"
                  anchorEl={this.state.anchorEl ? document.getElementById("caButton") : null}
                  keepMounted
                  open={this.state.anchorEl}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: 200,
                    },
                  }}
                >
                  <MenuItem
                    value={"CLEARALL"}
                    className='caMenuItem'
                    onClick={(event) => { this.addData(event) }} >
                    Clear <div className="menuItem"><HighlightOff /></div>
                  </MenuItem>
                  {
                    this.props.condition.collectionAgents
                      .map(agent => (
                        <MenuItem
                          key={agent.id}
                          value={agent.id}
                          style={{ display: 'flex', justifyContent: 'space-between', background: '##3f51b5' }}
                          onClick={(event) => { this.addData(event) }}
                          className="menuItemList"
                        >
                          {agent.name}
                          {(this.state.selectedCollectionAgentList.indexOf(agent.id) > -1) ?
                            <div className="menuItem"><Check /></div> : null}

                        </MenuItem>
                      ))
                  }
                </Menu>
              </Typography>
              <div className="OptionDiv1">
                <div className="imagediv ">
                  <ul className="main-navigation ulClass" >
                    <li className="textBox liClass Fonts" style={{ display: this.state.filterCustomer, color: this.state.SelectedColour, borderRadius: '7px', fontSize:"14px" }}  >
                      <a className="aClass" >{this.state.durationName}
                        <img src={Calender}
                          style={{ marginLeft: "5px" }}
                          alt="searchicon"
                          className="iconButton"
                        />
                      </a>
                      <ul style={{ right: '2px', zIndex: 9999 }} className="ulClass" >
                        <div className="second_ul Fonts" style={{ width: '15rem' }}>
                          {
                            this.state.filterData.filter1.map((dayFilter, index) => (
                              < li className="liClass Fonts" key={index} value={dayFilter.value}
                                style={{ padding: "0" }}
                                onClick={() => { this.props.condition.filter("dateFilter", this.getDateByCondition(dayFilter)) }} >
                                <a className="aClass Fonts">{dayFilter.label}  {dayFilter.isActive ? <Check className="menuIcon" /> : null} </a>
                                </li>
                            ))
                          }
                        </div>
                      </ul>
                    </li>
                    <Badge color="primary" badgeContent={filterBadgeValue} className={classes.margin}></Badge>
                    <li className="textBoxFilter liClass Fonts" style={{ marginLeft: '20px', borderRadius: '7px' }}  >
                      <a className="aClass Fonts" >
                        Filter
                      <img
                          src={Filter}
                          style={{ marginLeft: "5px" }}
                          alt="searchicon"
                          className="iconButton"
                        />
                      </a>
                      <ul style={{ right: '2px', zIndex: 9999 }} className="ulClass" >
                        <div className="second_ul" style={{ width: '15rem' }}>
                          {
                            this.state.filterData.filter2.map((filterItem, index) => (
                              <li className="liClass"
                                key={index}
                                style={{ padding: "0px !important" }} >
                                <a className="aClass Fonts"
                                  value={filterItem.value}
                                  onClick={() => {
                                    this.changeStatus(filterItem, null, false);
                                    this.props.condition.filter("filterType", filterItem.value)
                                  }}

                                >
                                  {filterItem.label}
                                  {filterItem.value !== "clearall" ?
                                    (filterItem.isActive ?
                                      <Check /> : null)
                                    : <HighlightOff />}
                                </a>
                                <ul className="ulClass" style={{ zIndex: 9999 }}>
                                  {filterItem && filterItem.subList.map(option => (
                                    <li className="liClass" style={{ padding: "0px !important", display: 'flex', justifyContent: 'space-between' }} key={option.label} value={option.label}>
                                      <a className="aClass"
                                        onClick={() => {
                                          this.changeStatus(filterItem, option, true);
                                          this.props.condition.filter("filterType", [filterItem.label, option.value ? option.value : option.loanTypeId])
                                        }}
                                        value={option.value}
                                        style={{ width: '190px' }}>
                                        {option.label}
                                        {option.isActive ? <Check className="menuIcon" /> : null}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            ))
                          }
                        </div>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

            </Toolbar>
          </AppBar>

        </section>
        <Customdaterange
          open={isCustomDatePkrOpen}
          close={this.handleCustomDateClose}
          isOnlyPast={true}
          save={this.customDateRange} />
        {/* ------------------------------------End of Filter ----------------------------------- */}
      </div >
    );
  }
}
export default withRouter(CollectionReportHeader);
