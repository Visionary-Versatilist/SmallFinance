import { Badge } from '@material-ui/core';
import { Check, HighlightOff } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import Filter from "../../../assets/images/filter.svg";
import '../CollectionFiltersButtons/CollectionFiltersButtons.scss'




const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
}));

class CollectionFiltersButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {

      filterData:
      {
        filter2: [
          {
            value: "1", label: "Loan Type", isActive: false,
            subList: [
              { value: "1-100000", label: "0 – 100000", isActive: false },
              { value: "100001-500000", label: "100001 – 500000", isActive: false },
              { value: "500001-1000000", label: "500001 – 1000000", isActive: false },
              { value: "1000001-2500000", label: "100000 – 2500000", isActive: false },
              { value: "2500001-1000000", label: "ABOVE 2500000", isActive: false }
            ]
          },
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
          {
            value: "clearall", label: "Clear All", isActive: true, subList: [
            ]
          }
        ]
      },

    };
  }

  componentWillReceiveProps = (nextProps) => {
    console.log("nextProps", nextProps)
    let { loanTypes } = nextProps
    var { filterData } = this.state

    filterData.filter2.find(temp => temp.value === "1").subList = loanTypes
    this.setState({ filterData })
  }

  changeStatus = (filter, subObj, isFromSubList) => {
    const { action } = this.props
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
    // filter2.filter(obj => obj.isActive)
    //   .map(obj => (
    //   ))
    let filterList = []
    filter2.map(obj => {
      let object = obj.subList.find(subObj => subObj.isActive)
      object && filterList.push(object)

    })

    if (subObj) {
      console.log("subopObj", subObj)
      let sendParms = { menuID: filter.value, subMenuID: subObj.loanTypeId !== undefined ? subObj.loanTypeId : subObj.value, subMenuActive: subObj.isActive, subMenuClear: isFromSubList }
      action(sendParms)
    } else if (filter.value === "clearall") {
      let sendParms = { subMenuClear: isFromSubList }
      action(sendParms)
    }
    // const {subAction}=this.props
    // subAction(filterList)
  }

  render() {

    let { filterData } = this.state
    let filterBadgeValue = filterData.filter2.filter(obj => obj.isActive).length - 1
    return (
      <div className="collectionfilterbuttonpage">
        <Badge color="primary" badgeContent={filterBadgeValue} ></Badge>
        <div className="hoverFunction">
          <button className="filterButton">
            Filter
            <img
              className="filterImg"
              src={Filter}
              alt="searchicon"
            />
          </button>
          <ul className="hoverMenu" >
            <div >
              {
                this.state.filterData.filter2.map((filterItem, index) => (
                  <li className="menuList" key={index} >
                    <a value={filterItem.value} onClick={() => { this.changeStatus(filterItem, null, false) }} >
                      {filterItem.label}
                      {filterItem.value !== "clearall" ?
                        (filterItem.isActive ?
                          <Check className="floatRightIcon" /> : null)
                        : <HighlightOff className="floatRightIcon" />}
                    </a>
                    <ul className="subList">
                      <div style={{ maxHeight: "397px", overflowY: "scroll" }}>
                        {filterItem.subList != undefined && filterItem.subList != null ? (

                          filterItem.subList.map((option) => (
                            <li onClick={() => { this.changeStatus(filterItem, option, true); }}
                              key={option.label} value={option.label} className="subListMenu">
                              <a
                                value={option.value}>
                                {option.label}
                                {option.isActive ? <Check className="menuIcon" /> : null}
                              </a>
                            </li>
                          ))) : null}

                      </div>
                    </ul>
                  </li>
                ))
              }
            </div>
          </ul>
        </div>
      </div>
    );
  }
}


export default CollectionFiltersButtons;