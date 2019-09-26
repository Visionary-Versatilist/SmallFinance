import React, { Component } from 'react';
import '../sidebar/sidebar.scss';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import dashboard from '../../assets/images/dashboard.svg';
import members from '../../assets/images/members.svg';
import loan from '../../assets/images/loan.svg';
import details from '../../assets/images/details.svg';
import share from '../../assets/images/share.svg';
import profile from '../../assets/images/profile.svg';
// import { Link } from '@material-ui/core';
import ProfileModal from '../modals/profile modal/profileModal';
import Tooltip from '@material-ui/core/Tooltip';


class Sidebar extends Component {
    constructor(){
        super();
        this.state={
            openmodal : false,
        }
        this.openprofileModal = this.openprofileModal.bind(this)
        this.closemodal = this.closemodal.bind(this)
    }
    openprofileModal(){
        console.log('click is working')
        this.setState({
            openmodal : true
        })
    }
    closemodal(){
        this.setState({
            openmodal : false
        })
    }
    render() {
        // const theme = createMuiTheme({
        //     overrides: {
        //       // Style sheet name ⚛️
        //       MuiTooltip: {
        //         // Name of the rule
        //         tooltip: {
        //           // Some CSS
        //           rippleBackgroundColor:' #3E4664',
        //         },
        //       },
        //     },
        //   });
        return(
            <div>
            <div className="area"></div><nav className="main-menu" style={{position:'fixed'}}>
            <ul>
                <li>
                    <Link to="dashboard">
                    <Tooltip title="Dashboard" placement="top">
                        <img className="fa fa-2x" src={dashboard} alt="dashboard"/>
                    </Tooltip>
                        {/* <span className="nav-text">
                            Dashboard
                        </span> */}
                    </Link>
                  
                </li>
                <li className="has-subnav">
                    <Link to="customer">
                    <Tooltip title="Customers" placement="top">
                    <img className="fa fa-2x" src={members} alt="customers"/>
                    </Tooltip>
                        {/* <span className="nav-text" style={{Display: 'table-cell',left: '33px'}}>
                            Customers
                        </span> */}
                    </Link>
                    
                </li>
                <li className="has-subnav">
                    <Link to="loan">
                    <Tooltip title="Loans" placement="top">
                    <img className="fa fa-2x" src={loan} alt="loan"/>
                    </Tooltip>
                        {/* <span className="nav-text" style={{Display: 'table-cell',left: '35px'}}>
                            Loans
                        </span> */}
                    </Link>
                    
                </li>
                <li className="has-subnav">
                    <Link to="Collectionreport">
                    <Tooltip title="Collection Reports" placement="top">
                    <img className="fa fa-2x" src={details} alt="details"/>
                    </Tooltip>
                        {/* <span className="nav-text" style={{Display: 'table-cell',left: '26px'}}>
                            Details
                        </span> */}
                    </Link>
                </li>
                <li>
                    <Link to="share">
                    <Tooltip title="Messaging Services" placement="top">
                    <img className="fa fa-2x" src={share} alt="share"/>
                    </Tooltip>
                        {/* <span className="nav-text" style={{Display: 'table-cell',left: '35px'}}>
                            Share
                        </span> */}
                    </Link>
                </li>
            </ul>

            <ul className="logout">
                <li onClick={this.openprofileModal}>
                   <Link>
                   <Tooltip title="Profile" placement="top" className="tooltipdetails">
                   <img className="fa fa-2x" src={profile} alt="profile" style={{Display: 'table-cell',left: '-8px'}}/>
                    </Tooltip>
                        {/* <span className="nav-text" style={{Display: 'table-cell',left: '16px'}}>
                            Profile
                        </span> */}
                    </Link>
                </li>  
            </ul>
        </nav>
        <ProfileModal open={this.state.openmodal} close={this.closemodal}/>
          </div>
        )
    }
}
export default Sidebar;
