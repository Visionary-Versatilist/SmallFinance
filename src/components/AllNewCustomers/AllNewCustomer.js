import React, { Component } from 'react';
import NewCustomer from './NewCustomer/NewCustomer';
import Sidebar from '../sidebar/sidebar';
import AllNewCustomerHeader from './AllNewCustomerHeader/AllNewCustomerHeader';
class AllNewCustomers extends Component{
     constructor(props) {
        super(props);
        this.state = {
            allCustomer:[]
       };
    }
    getDataFromChild = (value) =>{
        this.setState({
            allCustomer: value
        })
    }
    render(){
        return(
            <div>
            <Sidebar/>
            <AllNewCustomerHeader reciveData={this.getDataFromChild}/>
            <NewCustomer searchResults={this.state.allCustomer}/>
            </div>
        )
    }
}
export default AllNewCustomers;
