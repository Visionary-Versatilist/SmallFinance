import React, { Component } from 'react';
import Sidebar from '../sidebar/sidebar';

class Loan extends Component {
    render(){
        return(
            <div>
            <Sidebar/>
            <div style={{marginLeft: '50%',marginTop: '18%',}}>
            Loan Page is Working!  
            </div>
            </div>
        )
    }
}
export default Loan;