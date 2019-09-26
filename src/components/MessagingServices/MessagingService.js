import React, { Component } from 'react';
import Sidebar from '../sidebar/sidebar';

class MessagingService extends Component {
    render(){
        return(
            <div>
            <Sidebar/>
            <div style={{marginLeft: '50%',marginTop: '18%',}}>
            MessagingService Page is Working! 
            </div>
            </div>
        )
    }
}
export default MessagingService;