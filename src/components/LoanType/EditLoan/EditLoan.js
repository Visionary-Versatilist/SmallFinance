import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import './EditLoan.scss';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Sidebar from '../../sidebar/sidebar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'date-fns';
import {BaseUrl, headers} from "../../../Environment";
import { withNamespaces } from 'react-i18next';

const axios = require('axios')

class EditLoan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loanTypeBorder:"1px solid #D4D4D5",
            loanAmuontRangeBorder1:"1px solid #D4D4D5",
            loanAmuontRangeBorder2:"1px solid #D4D4D5",
            rateOfRangeInterestBorder1:"1px solid #D4D4D5",
            rateOfRangeInterestBorder2:"1px solid #D4D4D5",
            loanTenureMonthsBorder1:"1px solid #D4D4D5",
            loanTenureMonthsBorder2:"1px solid #D4D4D5",
            loanTenureWeeksBorder1:"1px solid #D4D4D5",
            loanTenureWeeksBorder2:"1px solid #D4D4D5",
            loanTenureDaysBorder1:"1px solid #D4D4D5",
            loanTenureDaysBorder2:"1px solid #D4D4D5",
            loanTenureDays1Border:"1px solid #D4D4D5",
            clicked: false,
            SelectedDate:new Date().toLocaleString(),
            openmodal : false,
            curTime:new Date().toLocaleString(),
            submitted: false,
            loanType:"",
            loanAmuontRangefrom:"",
            loanAmuontRangeto:"",
            rateOfRangeInterestfrom:"",
            rateOfRangeInterestto:"",
            loanTenureMonthsfrom:"",
            loanTenureMonthsto:"",
            loanTenureWeeksfrom:"",
            loanTenureWeeksto:"",
            loanTenureDaysfrom:"",
            loanTenureDaysto:""
        };
       
         
        this.loanType = this.loanType.bind(this)
        this.loanAmuontRange1 = this.loanAmuontRange1.bind(this)
        this.loanTenureDays1 = this.loanTenureDays1.bind(this)



        this.rateOfRangeInterestBox1 = this.rateOfRangeInterestBox1.bind(this)
        this.rateOfRangeInterestBox2 = this.rateOfRangeInterestBox2.bind(this)
         this.loanAmuontRange2 = this.loanAmuontRange2.bind(this)
         this.loanTenureMonthsBox1 = this.loanTenureMonthsBox1.bind(this)
         this.loanTenureMonthsBox2 = this.loanTenureMonthsBox2.bind(this)
         this.loanTenureWeeksBox1 = this.loanTenureWeeksBox1.bind(this)
         this.loanTenureWeeksBox2 = this.loanTenureWeeksBox2.bind(this)


         this.loanTenureDaysBox1 = this.loanTenureDaysBox1.bind(this)
         this.loanTenureDaysBox2 = this.loanTenureDaysBox2.bind(this)
          }
       
        loanType(){
            this.setState({
          
            loanTypeBorder:"1px solid #13c902",
            loanAmuontRangeBorder1:"1px solid #D4D4D5",
            loanAmuontRangeBorder2:"1px solid #D4D4D5",
            rateOfRangeInterestBorder1:"1px solid #D4D4D5",
            rateOfRangeInterestBorder2:"1px solid #D4D4D5",
            loanTenureMonthsBorder1:"1px solid #D4D4D5",
            loanTenureMonthsBorder2:"1px solid #D4D4D5",
            loanTenureWeeksBorder1:"1px solid #D4D4D5",
            loanTenureWeeksBorder2:"1px solid #D4D4D5",
            loanTenureDaysBorder1:"1px solid #D4D4D5",
            loanTenureDaysBorder2:"1px solid #D4D4D5",
            })
            
        } 
        loanAmuontRange1(){
            this.setState({
            
            loanTypeBorder:"1px solid #D4D4D5",
            loanAmuontRangeBorder1:"1px solid #13c902",
            loanAmuontRangeBorder2:"1px solid #D4D4D5",
            rateOfRangeInterestBorder1:"1px solid #D4D4D5",
            rateOfRangeInterestBorder2:"1px solid #D4D4D5",
            loanTenureMonthsBorder1:"1px solid #D4D4D5",
            loanTenureMonthsBorder2:"1px solid #D4D4D5",
            loanTenureWeeksBorder1:"1px solid #D4D4D5",
            loanTenureWeeksBorder2:"1px solid #D4D4D5",
            loanTenureDaysBorder1:"1px solid #D4D4D5",
            loanTenureDaysBorder2:"1px solid #D4D4D5",
          
            })
            
        }
        loanAmuontRange2(){
            this.setState({
            
            loanTypeBorder:"1px solid #D4D4D5",
            loanAmuontRangeBorder1:"1px solid #D4D4D5",
            loanAmuontRangeBorder2:"1px solid #D4D4D5",
            rateOfRangeInterestBorder1:"1px solid #D4D4D5",
            rateOfRangeInterestBorder2:"1px solid #13c902",
            loanTenureMonthsBorder1:"1px solid #D4D4D5",
            loanTenureMonthsBorder2:"1px solid #D4D4D5",
            loanTenureWeeksBorder1:"1px solid #D4D4D5",
            loanTenureWeeksBorder2:"1px solid #D4D4D5",
            loanTenureDaysBorder1:"1px solid #D4D4D5",
            loanTenureDaysBorder2:"1px solid #D4D4D5",
          
            })
            
        }

        rateOfRangeInterestBox1(){
            this.setState({
            
            loanTypeBorder:"1px solid #D4D4D5",
            loanAmuontRangeBorder1:"1px solid #D4D4D5",
            loanAmuontRangeBorder2:"1px solid #D4D4D5",
            rateOfRangeInterestBorder1:"1px solid #13c902",
            rateOfRangeInterestBorder2:"1px solid #D4D4D5",
            loanTenureMonthsBorder1:"1px solid #D4D4D5",
            loanTenureMonthsBorder2:"1px solid #D4D4D5",
            loanTenureWeeksBorder1:"1px solid #D4D4D5",
            loanTenureWeeksBorder2:"1px solid #D4D4D5",
            loanTenureDaysBorder1:"1px solid #D4D4D5",
            loanTenureDaysBorder2:"1px solid #D4D4D5",
          
            })
            
        }
        rateOfRangeInterestBox2(){
            this.setState({
            
            loanTypeBorder:"1px solid #D4D4D5",
            loanAmuontRangeBorder1:"1px solid #D4D4D5",
            loanAmuontRangeBorder2:"1px solid #D4D4D5",
            rateOfRangeInterestBorder1:"1px solid #D4D4D5",
            rateOfRangeInterestBorder2:"1px solid #13c902",
            loanTenureMonthsBorder1:"1px solid #D4D4D5",
            loanTenureMonthsBorder2:"1px solid #D4D4D5",
            loanTenureWeeksBorder1:"1px solid #D4D4D5",
            loanTenureWeeksBorder2:"1px solid #D4D4D5",
            loanTenureDaysBorder1:"1px solid #D4D4D5",
            loanTenureDaysBorder2:"1px solid #D4D4D5",
          
            })
            
        }


        loanTenureMonthsBox1(){
            this.setState({
            
            loanTypeBorder:"1px solid #D4D4D5",
            loanAmuontRangeBorder1:"1px solid #D4D4D5",
            loanAmuontRangeBorder2:"1px solid #D4D4D5",
            rateOfRangeInterestBorder1:"1px solid #D4D4D5",
            rateOfRangeInterestBorder2:"1px solid #D4D4D5",
            loanTenureMonthsBorder1:"1px solid #13c902",
            loanTenureMonthsBorder2:"1px solid #D4D4D5",
            loanTenureWeeksBorder1:"1px solid #D4D4D5",
            loanTenureWeeksBorder2:"1px solid #D4D4D5",
            loanTenureDaysBorder1:"1px solid #D4D4D5",
            loanTenureDaysBorder2:"1px solid #D4D4D5",
          
            })

        }
        loanTenureMonthsBox2(){
            this.setState({
            
            loanTypeBorder:"1px solid #D4D4D5",
            loanAmuontRangeBorder1:"1px solid #D4D4D5",
            loanAmuontRangeBorder2:"1px solid #D4D4D5",
            rateOfRangeInterestBorder1:"1px solid #D4D4D5",
            rateOfRangeInterestBorder2:"1px solid #D4D4D5",
            loanTenureMonthsBorder1:"1px solid #D4D4D5",
            loanTenureMonthsBorder2:"1px solid #13c902",
            loanTenureWeeksBorder1:"1px solid #D4D4D5",
            loanTenureWeeksBorder2:"1px solid #D4D4D5",
            loanTenureDaysBorder1:"1px solid #D4D4D5",
            loanTenureDaysBorder2:"1px solid #D4D4D5",
          
            })

        }
        
        loanTenureWeeksBox1(){
            this.setState({
            
            loanTypeBorder:"1px solid #D4D4D5",
            loanAmuontRangeBorder1:"1px solid #D4D4D5",
            loanAmuontRangeBorder2:"1px solid #D4D4D5",
            rateOfRangeInterestBorder1:"1px solid #D4D4D5",
            rateOfRangeInterestBorder2:"1px solid #D4D4D5",
            loanTenureMonthsBorder1:"1px solid #D4D4D5",
            loanTenureMonthsBorder2:"1px solid #D4D4D5",
            loanTenureWeeksBorder1:"1px solid #13c902",
            loanTenureWeeksBorder2:"1px solid #D4D4D5",
            loanTenureDaysBorder1:"1px solid #D4D4D5",
            loanTenureDaysBorder2:"1px solid #D4D4D5",
          
            })

        }

        loanTenureWeeksBox2(){
            this.setState({
            
            loanTypeBorder:"1px solid #D4D4D5",
            loanAmuontRangeBorder1:"1px solid #D4D4D5",
            loanAmuontRangeBorder2:"1px solid #D4D4D5",
            rateOfRangeInterestBorder1:"1px solid #D4D4D5",
            rateOfRangeInterestBorder2:"1px solid #D4D4D5",
            loanTenureMonthsBorder1:"1px solid #D4D4D5",
            loanTenureMonthsBorder2:"1px solid #D4D4D5",
            loanTenureWeeksBorder1:"1px solid #D4D4D5",
            loanTenureWeeksBorder2:"1px solid #13c902",
            loanTenureDaysBorder1:"1px solid #D4D4D5",
            loanTenureDaysBorder2:"1px solid #D4D4D5",
          
            })

        }

        loanTenureDaysBox1(){
            this.setState({
            
            loanTypeBorder:"1px solid #D4D4D5",
            loanAmuontRangeBorder1:"1px solid #D4D4D5",
            loanAmuontRangeBorder2:"1px solid #D4D4D5",
            rateOfRangeInterestBorder1:"1px solid #D4D4D5",
            rateOfRangeInterestBorder2:"1px solid #D4D4D5",
            loanTenureMonthsBorder1:"1px solid #D4D4D5",
            loanTenureMonthsBorder2:"1px solid #D4D4D5",
            loanTenureWeeksBorder1:"1px solid #D4D4D5",
            loanTenureWeeksBorder2:"1px solid #D4D4D5",
            loanTenureDaysBorder1:"1px solid #13c902",
            loanTenureDaysBorder2:"1px solid #D4D4D5",
          
            })

        }



        loanTenureDaysBox2(){
            this.setState({
            
            loanTypeBorder:"1px solid #D4D4D5",
            loanAmuontRangeBorder1:"1px solid #D4D4D5",
            loanAmuontRangeBorder2:"1px solid #D4D4D5",
            rateOfRangeInterestBorder1:"1px solid #D4D4D5",
            rateOfRangeInterestBorder2:"1px solid #D4D4D5",
            loanTenureMonthsBorder1:"1px solid #D4D4D5",
            loanTenureMonthsBorder2:"1px solid #D4D4D5",
            loanTenureWeeksBorder1:"1px solid #D4D4D5",
            loanTenureWeeksBorder2:"1px solid #D4D4D5",
            loanTenureDaysBorder1:"1px solid #D4D4D5",
            loanTenureDaysBorder2:"1px solid #13c902",
          
            })

        }

        loanTenureDays1(){
            this.setState({
            
            loanTypeBorder:"1px solid #D4D4D5",
            loanAmuontRangeBorder1:"1px solid #D4D4D5",
            loanAmuontRangeBorder2:"1px solid #D4D4D5",
            rateOfRangeInterestBorder1:"1px solid #D4D4D5",
            rateOfRangeInterestBorder2:"1px solid #D4D4D5",
            loanTenureMonthsBorder1:"1px solid #D4D4D5",
            loanTenureMonthsBorder2:"1px solid #D4D4D5",
            loanTenureWeeksBorder1:"1px solid #D4D4D5",
            loanTenureWeeksBorder2:"1px solid #D4D4D5",
            loanTenureDaysBorder1:"1px solid #D4D4D5",
            loanTenureDaysBorder2:"1px solid #D4D4D5",
          
            })
            
        }
       
    openprofileModal(){
        this.setState({
            openmodal : true
        })
    }
    closemodal(){
        this.setState({
            openmodal : false
        })
    }
   
    handleStatusChange(event) {
          this.setState({
            status: event.target.value
        });
    }
    handleDateChange = date => {
        this.setState({
            SelectedDate: date
        })
      };
   
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { firstname, lastname,mobilenum, homeAddressLine, homeAddressStreet, homeAddressLandmark,homeAddressCity,
            homeAddressPincode, homeAddressState,OfficeAddressLine,OfficeAddressStreet, OfficeAddressCity,
            OfficeAddressLandmark, OfficeAddressPincode,OfficeAddressState } = this.state;
        if (firstname && lastname && mobilenum && homeAddressLine && homeAddressStreet && homeAddressLandmark &&homeAddressCity &&
            homeAddressPincode && homeAddressState &&OfficeAddressLine &&OfficeAddressStreet && OfficeAddressCity &&
            OfficeAddressLandmark && OfficeAddressPincode &&OfficeAddressState) {
            this.savegeneralinfo();
        }
    }
  
     
      componentDidMount(){
        this.loantypeinfoGet()
        
        // this.setState({
        //   loanTypeId:this.props.location.params
        // })
    } 
      
      loantypeinfoGet(){
      
        axios.get(BaseUrl + '/loanType/getLoanTypeDetails?loanTypeId=' +this.props.location.params,{
            headers: headers,
        }).then(resp => {
            if(resp.status===200) {
                this.setState({
                    loanType:resp.data.loanType,
                    loanAmuontRangefrom:resp.data.loanAmtRangeFrom,
                    loanAmuontRangeto:resp.data.loanAmtRangeTo,
                    rateOfRangeInterestfrom:resp.data.roiFrom,
                    rateOfRangeInterestto:resp.data.roiTo,
                    loanTenureMonthsfrom:resp.data.tenureMonthsFrom,
                    loanTenureMonthsto:resp.data.tenureMonthsTo,
                    loanTenureWeeksfrom:resp.data.tenureWeeksFrom,
                    loanTenureWeeksto:resp.data.tenureWeeksTo,
                    loanTenureDaysfrom:resp.data.tenureDaysFrom,
                    loanTenureDaysto:resp.data.tenureDaysTo
                })
            }else{
                toast.error("Something went wrong. Please try again later!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
            }
        }).catch(err => {
            if(err.request.status!==200){
            toast.error("Something went wrong. Please try again later!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                });
            }
        })
      }
      savechanges(){
     
          const data={
            "loanType": this.state.loanType,                     
            "loanTypeId": this.props.location.params,                       
           "loanAmtRangeFrom": this.state.loanAmuontRangefrom,           
           "loanAmtRangeTo": this.state.loanAmuontRangeto,              
           "roiFrom":  this.state.rateOfRangeInterestfrom,            
           "roiTo":   this.state.rateOfRangeInterestto,         
           "tenureMonthsFrom": this.state.loanTenureMonthsfrom,            
           "tenureMonthsTo":   this.state.loanTenureMonthsto,            
           "tenureWeeksFrom":   this.state.loanTenureWeeksfrom,           
           "tenureWeeksTo":     this.state.loanTenureWeeksto,       
           "tenureDaysFrom":   this.state.loanTenureDaysfrom,            
           "tenureDaysTo":    this.state.loanTenureDaysto,         
           "isDefault":false
          }

        axios.put(BaseUrl + '/loanType/putLoanType',data,{
            headers: headers,
        }).then(resp => {
            if(resp.status===200) {
               this.props.history.push('/loantype')
            }else{
                toast.error("Something went wrong. Please try again later!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
            }
        }).catch(err => {
            if(err.request.status!==200){
            toast.error("Something went wrong. Please try again later!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                });
            }
        })
      }
    
      backLinkAction() {
        this.props.history.push('/loantype')      
      }


    render() {
      const { t } = this.props;
        return (
            <div>
                <Sidebar />
                {/* <AddLoanTypeHeader /> */}
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    {/* <div style={{width:'40%'}}>
                <img src={backbuttn} alt="backicon" style={{paddingLeft: '50px',paddingTop: '23px', cursor:'pointer'}} onClick={this.back.bind(this)} />
                </div> */}
                <div>
                        <h3 className="Fonts headFontSize" style={{ marginLeft: '45px' }}><span className="backLink" onClick={this.backLinkAction.bind(this)}>{this.state.loanType}</span> / {t('AddLoanType.edit')}</h3>
                    </div>
                   
                </div>
              
                <div className="addcustomercomponent" style={{marginTop:'3rem'}}>
                    {/* <span className="backLink" onClick={this.backLinkAction.bind(this)}></span> */}
                   
                    
                    <Card className="cardDiv">
                        <div className="previewComponent">
                            <form onSubmit={(e) => this._handleSubmit(e)}>
                                <div style={{ margin: '70px', marginTop: '34px', marginBottom: '34px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" >{t('AddLoanType.Type')}</h6>
                                            <Input className="textBox" value={this.state.loanType} defaultValue="Home Loan" style={{ height: '41px', border: this.state.loanTypeBorder }} onClick={this.loanType} onChange={(event) => this.setState({ loanType: event.target.value })} disabled/>
                                        </div>
                                        <div className="numaricTextField" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }}>{t('AddLoanType.amtrange')}</h6>
                                            <Input type="text" value={this.state.loanAmuontRangefrom} defaultValue="500" className="textBox" style={{ height: '41px',width: '36%',marginLeft: '70px', border: this.state.loanAmuontRangeBorder1, marginLeft: '70px' }} onClick={this.loanAmuontRange1} onChange={(event) => this.setState({ loanAmuontRangefrom: event.target.value })} /> 
                                            <text> &nbsp; &nbsp;-</text> &nbsp; &nbsp;  
                                            <Input type="text" value={this.state.loanAmuontRangeto} defaultValue="50,00,000" className="textBox" style={{ height: '41px',width: '36%', marginLeft:'4px', border: this.state.loanAmuontRangeBorder2 }} onClick={this.loanAmuontRange2} onChange={(event) => this.setState({ loanAmuontRangeto: event.target.value })} />    
                                        </div> 
                                    </div>



                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" >{t('AddLoanType.intrstrange')}</h6>
                                            <Input className="textBox" value={this.state.rateOfRangeInterestfrom} defaultValue="0.8%" style={{ height: '41px',width: '20%' , border: this.state.rateOfRangeInterestBorder1 }} onClick={this.rateOfRangeInterestBox1} onChange={(event) => this.setState({ rateOfRangeInterestfrom: event.target.value })} />
                                           <text> &nbsp;% </text> &nbsp;&nbsp; <text> &nbsp; &nbsp;-&nbsp;&nbsp;</text> &nbsp;
                                            <Input className="textBox" value={this.state.rateOfRangeInterestto} defaultValue="47.8%" style={{ height: '41px',width: '20%', border: this.state.rateOfRangeInterestBorder2 }} onClick={this.rateOfRangeInterestBox2} onChange={(event) => this.setState({ rateOfRangeInterestto: event.target.value })} />
                                        <text> &nbsp;%</text>
                                        </div>
                                        <div className="numaricTextField" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }}>{t('AddLoanType.tenuremonrange')}</h6>
                                            <Input type="text" value={this.state.loanTenureMonthsfrom} className="textBox" defaultValue="03" style={{ height: '41px',width: '36%', border: this.state.loanTenureMonthsBorder1, marginLeft: '70px' }} onClick={this.loanTenureMonthsBox1} onChange={(event) => this.setState({ loanTenureMonthsfrom: event.target.value })} />    
                                            <text> &nbsp; &nbsp;-</text> &nbsp; &nbsp;  
                                            <Input type="text" value={this.state.loanTenureMonthsto} className="textBox" defaultValue="24" style={{ height: '41px',width: '36%', border: this.state.loanTenureMonthsBorder2, marginLeft: '4px' }} onClick={this.loanTenureMonthsBox2} onChange={(event) => this.setState({ loanTenureMonthsto: event.target.value })} />
                                        </div>
                                    </div>  


                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" >{t('AddLoanType.tenureweekrange')}</h6>
                                            <Input className="textBox" value={this.state.loanTenureWeeksfrom} defaultValue="02" style={{ height: '41px',width: '38%' , border: this.state.loanTenureWeeksBorder1 }} onClick={this.loanTenureWeeksBox1} onChange={(event) => this.setState({ loanTenureWeeksfrom: event.target.value })} />
                                            <text> &nbsp; &nbsp;-</text> &nbsp; &nbsp;
                                            <Input className="textBox" value={this.state.loanTenureWeeksto} defaultValue="38" style={{ height: '41px',width: '38%', border: this.state.loanTenureWeeksBorder2 }} onClick={this.loanTenureWeeksBox2} onChange={(event) => this.setState({ loanTenureWeeksto: event.target.value })} />
                                        </div>
                                        <div className="numaricTextField" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }}>{t('AddLoanType.tenuredayrange')}</h6>
                                            <Input type="text" value={this.state.loanTenureDaysfrom} className="textBox" defaultValue="05" style={{ height: '41px',width: '36%', border: this.state.loanTenureDaysBorder1, marginLeft: '70px' }} onClick={this.loanTenureDaysBox1} onChange={(event) => this.setState({ loanTenureDaysfrom: event.target.value })} />    
                                            <text> &nbsp; &nbsp;-</text> &nbsp; &nbsp;
                                            <Input type="text" value={this.state.loanTenureDaysto} className="textBox" defaultValue="365" style={{ height: '41px',width: '36%', border: this.state.loanTenureDaysBorder2, marginLeft: '4px' }} onClick={this.loanTenureDaysBox2} onChange={(event) => this.setState({ loanTenureDaysto: event.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            
                            </form>
                        </div>
                    </Card>
                    <div style={{textAlign:"end"}}>
                        <Button  className="cancelbutton btnSizeFont Fonts" onClick={() => this.props.history.push("/loantype")}>
                            Cancel
                        </Button>
                        <Button  className="savebutton btnSizeFont Fonts" onClick={this.savechanges.bind(this)}>
                            Save
                        </Button>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default withNamespaces()(EditLoan);