import React, { Component } from 'react';
import Sidebar from '../sidebar/sidebar';
import MessageHeader from './MessageHeader/MessageHeader';
import Card from '@material-ui/core/Card';
import msgimag from '../../assets/images/msgimag.svg';
import messanger from '../../assets/images/messanger.svg';
import whatsapp from '../../assets/images/Whatsapp.svg';
import android from '../../assets/images/android.svg';
import hangout from '../../assets/images/hangout.svg';
import telegram from '../../assets/images/telegram.svg';
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
                   <a target="_blank" href='https://web.whatsapp.com/'>
                  <img src={whatsapp} alt="Whatsapp" className="gridtypeicon" style={{width:"200px"}} />
                  </a>
                </div>
                <div className="imagDiv"  style={{padding:"5px"}}>
                <a target="_blank" href='https://www.messenger.com/'>
                  <img src={messanger} alt="messanger" className="gridtypeicon" style={{width:"200px"}} />
                </a>
                </div>
                <div className="imagDiv"  style={{padding:"5px"}}>
                <a target="_blank" href='https://messages.google.com/web/'>
                  <img src={android} alt="messanger" className="gridtypeicon" style={{width:"200px"}} />
                </a>
                </div>
                <div className="imagDiv"  style={{padding:"5px"}}>
                <a target="_blank" href='https://hangouts.google.com/'>
                  <img src={hangout} alt="messanger" className="gridtypeicon" style={{width:"200px"}} />
                </a>
                </div>
                <div className="imagDiv"  style={{padding:"5px"}}>
                <a target="_blank" href='https://web.telegram.org/#/login'>
                  <img src={telegram} alt="messanger" className="gridtypeicon" style={{width:"200px"}} />
                </a>
                </div>
                </div>
                    </Card>
                </div>
            </div>
        )
    }
}
export default withNamespaces()(MessagingService);