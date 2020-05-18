import React, { Component } from 'react';
import Sidebar from '../sidebar/sidebar';
import MessageHeader from './MessageHeader/MessageHeader';
import Card from '@material-ui/core/Card';
import msgimag from '../../assets/images/msgimag.svg';
import messanger from '../../assets/images/messanger.svg';
import Whatsapp from '../../assets/images/Whatsapp.svg';
import './MessagingService.scss';
import { withNamespaces } from 'react-i18next';

class MessagingService extends Component {
    render(){
        const { t } = this.props;
        return(
            <div>
            <Sidebar/>
            <MessageHeader/>
            
                <div className="shareComponent">
                    <Card className="cardDiv" >
                    <div style={{textAlign:"center"}}>
                  <img src={msgimag} alt="msgimag" className="gridtypeicon"  />
                </div>
                <div style={{ textAlign:"center"}}>
                    <div className="centerText Fonts">{t('MessagingServices.content')}</div>
                    <br/>

                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                 <div style={{padding:"5px"}}>
                  <img src={Whatsapp} alt="Whatsapp" className="gridtypeicon" style={{width:"40px"}} />
                </div>
                <div className="imagDiv"  style={{padding:"5px"}}>
                  <img src={messanger} alt="messanger" className="gridtypeicon" style={{width:"40px"}} />
                </div>
                </div>
                    </Card>
                </div>
            </div>
        )
    }
}
export default withNamespaces()(MessagingService);