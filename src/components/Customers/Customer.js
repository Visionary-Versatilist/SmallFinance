import React, { Component } from 'react';
import Sidebar from '../sidebar/sidebar';

class Customer extends Component {
    render(){
        return(
            <div>
            <Sidebar/>
            <div style={{marginLeft: '50%',marginTop: '18%',}}>
            Customer page is Working! 
            </div>
            </div>         
        )
    }
}
export default Customer;