import React, { Component } from 'react';
import './MessageHeader.scss';
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import companylogo from '../../../assets/images/companylogo.svg';
import msgadd from '../../../assets/images/msgadd.svg';
import msgsetting from '../../../assets/images/msgsetting.svg';
import {withRouter} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import { withNamespaces } from 'react-i18next';

class MessageHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

        handleChangetime = event => {
          this.setState({ 
                time: event.target.value,
                SelectedtimeColour:"#00D95E",
                // SelectedColour:"#3E4664 !important"
             });
      };
      handleChangefilter = event => {
        this.setState({ 
            filter: event.target.value,
            // SelectedtimeColour:"#3E4664 !important",
            SelectedColour:"#00D95E" 
        });
      };
      time(){
        this.setState({ 
            SelectedColour:"#00D95E" 
        });
      }

    render(){
      const { t } = this.props;
        return(
            <div className="messageHeader">
            <section className='Customeader'>
                <div position="static" className='bar'>
                    <Toolbar>
                      <div className="messageHeaderOne">
                        <div  className="messageHeaderOneOne">
                   <Typography variant="h6" className='title' >
                        <img style={{width:'65%'}} src={companylogo} className="companyLogo" alt="logo"/>
                        </Typography>
                        </div>
                <div className="msgText Fonts">
                {t('MessagingServices.title')}
                </div>
                </div>
                    </Toolbar>         
                </div>
            </section>
            <section style={{width:"100%",display:"flex"}}>
              <div className="messageHeaderTwo">
              <div className="messageAdd" >
            <img src={msgadd} alt="msgadd" style={{paddingTop:"10px"}}/>
            </div>
            <div className="msgSetting">
            <img src={msgsetting} alt="msgsetting"  />
            </div>
            </div>
            {/* <Toolbar>
              <Typography variant="h6" className='title'>
              </Typography>
              <div className="OptionDiv">
                  <div style={{display:"flex", position:"absolute",left:"7.5rem"}}>
                <div className="imagDiv">
                <Tooltip title="Add Service" placement="top">
                  <img src={msgadd} alt="msgadd" className="gridtypeicon" style={{width:"25px", paddingTop:"5px"}} />
                  </Tooltip>
                </div>
                </div>
                <div className="imagDiv">
                <Tooltip title="Settings" placement="top">
                  <img src={msgsetting} alt="msgsetting" className="gridtypeicon" style={{width:"25px"}} />
                  </Tooltip>
                </div>
              </div>
            </Toolbar> */}
        </section>
            </div>         
        )
    }
}
export default withNamespaces()(withRouter(MessageHeader));