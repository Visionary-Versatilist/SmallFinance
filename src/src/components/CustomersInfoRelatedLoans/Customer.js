import React, { Component } from 'react';
import Sidebar from '../sidebar/sidebar';
import CustomerHeader from '../CustomersInfoRelatedLoans/CustomerHeader/Customerheader';
import Customerfilter from '../CustomersInfoRelatedLoans/CustomerFilter/Customerfilter';
import AllCustomerCardview from '../CustomersInfoRelatedLoans/AllCustomerCardView/AllCustomerCardview';
import AllCustomerListview from './CustomersListView/AllCustomerListView/AllCustomerListView';
import DueCustomerCardview from './DueCustomers/DueCustomer';
import DueCustomerListview from './CustomersListView/DueCustomerListView/DueCustomerListView';
import OverdueCustomerCardview from './OverdueCustomers/OverdueCustomer';
import OverdueCustomerListview from './CustomersListView/OverdueCustomerListView/OverdueCustomerListView';
import ClosedCustomerCardview from './ClosedCustomerCardView/ClosedCustomerCardView';
import ClosedCustomerListview from './CustomersListView/ClosedCustomerListView/ClosedCustomerListView';
import CancelledCustomerCardView from './CancelledCustomer/CancelledCustomer';
import CancelledCustomerListView from './CustomersListView/CancelledCustomerListView/CancelledCustomerListView';

class Customer extends Component {

    constructor(props) {
        super(props);
        this.state = {
          listdispl:"",
          opendata:[],
          closedata:[],
          canceldata:[],
          duedata:[],
          overduedata:[],
          alldata:[],
       };
       this.handleView = this.handleView.bind(this)
       this.handlecardView = this.handlecardView.bind(this)
       this.openhandle = this.openhandle.bind(this)
       this.closehandle = this.closehandle.bind(this)
       this.cancelhandle = this.cancelhandle.bind(this)
       this.duehandle = this.duehandle.bind(this)
       this.overduehandle = this.overduehandle.bind(this)
       this.allhandle = this.allhandle.bind(this)
    }
    _switchPart(Filter){
        switch(Filter) {
            case 'duecustomer' :
              return  (<DueCustomerCardview list={this.state.listdispl} dueData={this.state.duedata}/>)
            case 'overduecustomer':
              return  (<OverdueCustomerCardview list={this.state.listdispl} overdueData={this.state.overduedata}/>)
              case 'customer':
              return  (<AllCustomerCardview list={this.state.listdispl} allData={this.state.alldata}/>)
              case 'closedcustomer' :
              return  (<ClosedCustomerCardview list={this.state.listdispl} closeData={this.state.closedata}/>)
            case 'newcustomer':
              return  (<CancelledCustomerCardView list={this.state.listdispl} cancelData={this.state.canceldata}/>)
            default:
              return  (<AllCustomerCardview list={this.state.listdispl} allData={this.state.alldata}/>)
              // case 'duecustomerlist' :
              //   return  <DueCustomerListview/>
              // case 'overduecustomerlist':
              //   return  <OverdueCustomerListview/>
              //   case 'customerlist':
              //   return  <AllCustomerListview/>
              //   case 'closedcustomerlist' :
              //   return  <ClosedCustomerListview/>
              // case 'newcustomerlist':
              //   return  <NewCustomerListView/>
              // default:
              //   return  <AllCustomerCardview/>
        }
    }

    handleView() {
      alert("list")
      this.setState({
        listdispl:"list"
      })
    }
    handlecardView(){
      alert("card")
      this.setState({
        listdispl:"card"
      })
    }
    openhandle(val) {
      this.setState({
        opendata:val
      })
    }
    closehandle(val) {
      this.setState({
        closedata:val
      })
    }
    cancelhandle(val) {
      this.setState({
        canceldata:val
      })
    }
    duehandle(val) {
      this.setState({
        duedata:val
      })
    }
    overduehandle(val) {
      this.setState({
        overduedata:val
      })
    }
    allhandle(val) {
      this.setState({
        alldata:val
      })
    }
    render(){

        return(
            <div>
            <CustomerHeader listView={this.handleView} cardView={this.handlecardView} OpenView={this.openhandle} CloseView={this.closehandle} CancelView={this.cancelhandle} DueView={this.duehandle} OverdueView={this.overduehandle} AllView={this.allhandle} />
            {/* <Customerfilter/> */}
            <div>
            <div>
                {this._switchPart(this.props.match.params.filter)}
            </div>
            </div>
            <Sidebar/>
            </div>         
        )
    }
}
export default Customer;