import React, { Component } from 'react';
import Sidebar from '../sidebar/sidebar';

class Dashboard extends Component {
    render(){
        return(
            <div>
            <Sidebar/>
            <div style={{marginLeft: '50%',marginTop: '18%',}}>
            Dashboard Page is  Working! 
            </div>
            </div>
        )
    }
}
export default Dashboard;