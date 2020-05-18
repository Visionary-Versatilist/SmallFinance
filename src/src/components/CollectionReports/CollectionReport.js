import localStorage from 'local-storage';
import moment from 'moment';
import React, { Component } from 'react';
import { fetchAPIData } from '../../service/service';
import Sidebar from '../sidebar/sidebar';
import CollectionCardView from './CollectionCardView/CollectionCardView';
import Header from './CollectionReportHeader/CollectionReportHeader';
import ReportTable from './ReportTable/ReportTable';
import LoadingPage from '../modals/LoadingPage/LoadingPage';



const companyId = localStorage.get('loggedinUserCompany')

//initialize 
let last24Hrs = [moment().subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"), moment().format("YYYY-MM-DD HH:mm:ss")]

class CollectionReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableRecords: [],
      loanTypes: [],
      collectionAgents: [],
      filter: {},
      isLoading: false,
      collectionCardViewData: {
        loanCollectionAmount: 0,
        totalLoanCollectionAmount: 0,
        overDueAmount: 0,
        totalOverDueAmount: 0,
        paidCustomer: 0,
        totalCustomer: 0,
        penalty: 0
      }
    };
  }

  async componentDidMount() {

    this.setState({ isLoading: true });
    let result;

    //get type of loans
    result = await fetchAPIData("getLoanType", {})
    this.setState({ loanTypes: result.loanTypes });

    //get list of Collection Agents
    result = await fetchAPIData("collectionAgent", {})
    this.setState({ collectionAgents: result.collectionAgents });

    //Initial conditon is past 24 hours
    this.filterEvent("dateFilter", last24Hrs)
    
  }


  filterEvent = async (key, value) => {
    let updatedFilter = this.state.filter
    updatedFilter.companyId = companyId
    this.setState({ isLoading: true });
    if (value) {
      switch (key) {
        case "loanTenureType":
          if (value === "all") {
            updatedFilter.hasOwnProperty("loanTenureType") && delete updatedFilter.loanTenureType
          } else {
            updatedFilter.loanTenureType = value
          }
          break;

        case "dateFilter":
          updatedFilter.fromDate = value[0]
          updatedFilter.toDate = value[1]
          break;

        case "filterType":

          if (!Array.isArray(value)) {
            if (value === "clearall") {
              delete updatedFilter.loanTypeId
              delete updatedFilter.loanAmountFrom
              delete updatedFilter.loanAmountTo
            }
          } else
            if (value[0] === "Loan Type")
              updatedFilter.loanTypeId = value[1]
            else {
              let range = value[1]
              let rangeArr = range.split("-")
              updatedFilter.loanAmountFrom = parseInt(rangeArr[0])
              updatedFilter.loanAmountTo = parseInt(rangeArr[1])
            }
          break;

        case "collectionAgent":
          value.length !== 0 ? updatedFilter.collectorId = value : delete updatedFilter.collectorId
          break;

        default:
          console.log(`Invalid Key received Key: ${key} `)
          break;
      }
      this.setState({ filter: updatedFilter });

      let records = await fetchAPIData("tableRecord", updatedFilter)

      this.setState({
        tableRecords: records.tableRecords,
        collectionCardViewData: records.calcValue,
        isLoading: records.isLoading
      });


    } else {
      this.setState({ isLoading: false });
      console.log("Experienced 'undefined' from ", key)
    };

  }

  render() {
    let headerCondition = {
      filterStatus: this.state.filter,
      filter: this.filterEvent,
      collectionAgents: this.state.collectionAgents,
      loanTypes: this.state.loanTypes
    }
    const { isLoading } = this.state

    return (
      <div>
        <LoadingPage isLoading={isLoading} />
        <Header condition={headerCondition} />
        <CollectionCardView data={this.state.collectionCardViewData} />
        <div>
          <ReportTable data={this.state.tableRecords} />
        </div>
        <Sidebar />

      </div>

    )
  }
}
export default CollectionReport;