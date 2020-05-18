import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import './AddLoanType.scss';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Sidebar from '../../sidebar/sidebar';
import ls from 'local-storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BaseUrl} from "../../../Environment"
import 'date-fns';
import { withNamespaces } from 'react-i18next';

const axios = require('axios')

class AddLoanType extends Component {
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
            loantype:"",
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
         this.addLoanType = this.addLoanType.bind(this)
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
            loanAmuontRangeBorder2:"1px solid #13c902",
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
    addLoanType(){
        let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+ ls.get('token')
          }
          const addLoanData ={
            "loanType":this.state.loantype,
	        "loanAmtRangeFrom":this.state.loanAmuontRangefrom,
	        "loanAmtRangeTo":this.state.loanAmuontRangeto,
	        "roiFrom":this.state.rateOfRangeInterestfrom,
	        "roiTo":this.state.rateOfRangeInterestto,
	        "tenureMonthsFrom":this.state.loanTenureMonthsfrom,
	        "tenureMonthsTo":this.state.loanTenureMonthsto,
	        "tenureWeeksFrom":this.state.loanTenureWeeksfrom,
	        "tenureWeeksTo":this.state.loanTenureWeeksto,
	        "tenureDaysFrom":this.state.loanTenureDaysfrom,
	        "tenureDaysTo":this.state.loanTenureDaysto,
            "isDefault":false,
            "createdByUserId":localStorage.getItem('userid'),
            "updatedByUserId":localStorage.getItem('userid'),
            "companyId":loggedinUser.companyId

          }
        axios.post(BaseUrl + '/loanType/postLoanType',addLoanData,{
            headers: headers,
        }).then(resp => {
            if(resp.status===200) {
                toast.success("Loan AddedSuccessfully !", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
        this.props.history.push('/loantype')      

            }else{
                toast.error("Something went wrong!", {
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
            toast.error("Something went wrong!", {
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
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { loantype, loanAmuontRangefrom,loanAmuontRangeto, rateOfRangeInterestfrom, rateOfRangeInterestto, loanTenureMonthsfrom,loanTenureMonthsto,
            loanTenureWeeksfrom, loanTenureWeeksto,loanTenureDaysfrom,loanTenureDaysto } = this.state;
        if (loantype && loanAmuontRangefrom && loanAmuontRangeto && rateOfRangeInterestfrom && rateOfRangeInterestto && loanTenureMonthsfrom &&loanTenureMonthsto &&
            loanTenureWeeksfrom && loanTenureWeeksto &&loanTenureDaysfrom &&loanTenureDaysto) {
            this.addLoanType();
        }
    }
    
  
      backLinkAction() {
        this.props.history.push('/loantype')      
      }


    render() {
        const { t } = this.props;
        toast.configure({});
        const { loantype, loanAmuontRangefrom,loanAmuontRangeto, rateOfRangeInterestfrom, rateOfRangeInterestto, loanTenureMonthsfrom,loanTenureMonthsto,
            loanTenureWeeksfrom, loanTenureWeeksto,loanTenureDaysfrom,loanTenureDaysto, submitted } = this.state;
        
        return (
            <div>
                <Sidebar />
                {/* <AddLoanTypeHeader /> */}
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    {/* <div style={{width:'40%'}}>
                <img src={backbuttn} alt="backicon" style={{paddingLeft: '50px',paddingTop: '23px', cursor:'pointer'}} onClick={this.back.bind(this)} />
                </div> */}
                <div>
                        <h3 className="Fonts headFontSize" style={{ marginLeft: '45px' }}><span className="backLink" onClick={this.backLinkAction.bind(this)}>{t('AddLoanType.title')}</span> / {t('AddLoanType.subtitle')}</h3>
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
                                    <div className={'form-group' + (submitted && !loantype ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                            <Input className="textBox" value={this.state.loantype} style={{ height: '41px', border: this.state.loanTypeBorder }} onClick={this.loanType.bind(this)} onChange={(event) => this.setState({ loantype: event.target.value })} />
                                            {submitted && !loantype &&
                                    <div className="help-block">loantype is required</div>
                                }
                                </div>
                                        </div>
                                        <div className="numaricTextField" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }}>{t('AddLoanType.amtrange')}</h6>
                                            <div style={{display:"flex"}}>
                                    <div className={'form-group' + (submitted && !loanAmuontRangefrom ? ' has-error' : '')} style={{marginTop: '10px'}}>                                           
                                            <Input type="number" value={this.state.loanAmuontRangefrom} className="textBox" style={{ height: '41px',width: '67%',marginLeft: '70px', border: this.state.loanAmuontRangeBorder1, marginLeft: '70px' }} onClick={this.loanAmuontRange1} onChange={(event) => this.setState({ loanAmuontRangefrom: event.target.value })} /> 
                                            {submitted && !loanAmuontRangefrom &&
                                    <div className="help-block" style={{marginLeft:"4.5rem"}}>loanAmuontRange is required</div>
                                }
                                </div>
                                            <span> &nbsp; &nbsp;-</span> &nbsp; &nbsp;  
                                    <div className={'form-group' + (submitted && !loanAmuontRangeto ? ' has-error' : '')} style={{marginTop: '10px'}}>                                            
                                            <Input type="number" value={this.state.loanAmuontRangeto} className="textBox" style={{ height: '41px',width: '95%', marginLeft:'4px', border: this.state.loanAmuontRangeBorder2 }} onClick={this.loanAmuontRange2} onChange={(event) => this.setState({ loanAmuontRangeto: event.target.value })} />    
                                            {submitted && !loanAmuontRangeto &&
                                    <div className="help-block">loanAmuontRangeto is required</div>
                                }
                                </div>
                                </div>
                                        </div> 
                                    </div>



                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" >{t('AddLoanType.intrstrange')}</h6>
                                            <div style={{display:"flex"}}>
                                    <div className={'form-group' + (submitted && !rateOfRangeInterestfrom ? ' has-error' : '')} style={{width:"34%"}}>                                            
                                            <Input type="number" className="textBox" value={this.state.rateOfRangeInterestfrom} style={{ height: '41px',width: '97%' , border: this.state.rateOfRangeInterestBorder1 }} onClick={this.rateOfRangeInterestBox1} onChange={(event) => this.setState({ rateOfRangeInterestfrom: event.target.value })} />
                                            {submitted && !rateOfRangeInterestfrom &&
                                    <div className="help-block">rateOfRangeInterest is required</div>
                                }
                                </div>
                                           <span style={{marginTop:"11px"}}> &nbsp;% </span> &nbsp;&nbsp; <span style={{marginTop:"11px"}}> &nbsp; &nbsp;-&nbsp;&nbsp;</span> &nbsp;
                                    <div className={'form-group' + (submitted && !rateOfRangeInterestto ? ' has-error' : '')} style={{width:"34%"}}>                                                                                        
                                            <Input type="number" className="textBox" value={this.state.rateOfRangeInterestto} style={{ height: '41px',width: '97%', border: this.state.rateOfRangeInterestBorder2 }} onClick={this.rateOfRangeInterestBox2} onChange={(event) => this.setState({ rateOfRangeInterestto: event.target.value })} />
                                            {submitted && !rateOfRangeInterestto &&
                                    <div className="help-block">rateOfRangeInterest is required</div>
                                }
                                </div>
                                        <span style={{marginTop:"11px"}}> &nbsp;%</span>
                                        </div>
                                        </div>
                                        <div className="numaricTextField" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }}>{t('AddLoanType.tenuremonrange')}</h6>
                                            <div style={{display:"flex"}}>
                                    <div className={'form-group' + (submitted && !loanTenureMonthsfrom ? ' has-error' : '')}>                                                                                                                                   
                                            <Input type="number" value={this.state.loanTenureMonthsfrom} className="textBox" style={{ height: '41px',width: '66%', border: this.state.loanTenureMonthsBorder1, marginLeft: '70px' }} onClick={this.loanTenureMonthsBox1} onChange={(event) => this.setState({ loanTenureMonthsfrom: event.target.value })} />    
                                            {submitted && !loanTenureMonthsfrom &&
                                    <div className="help-block"  style={{marginLeft:"4.5rem"}}>loanTenureMonths is required</div>
                                }
                                </div>
                                            <span style={{marginTop:"-8px"}}> &nbsp; &nbsp;-</span> &nbsp; &nbsp;  
                                    <div className={'form-group' + (submitted && !loanTenureMonthsto ? ' has-error' : '')}>                                                                                                                                   
                                            <Input type="number" value={this.state.loanTenureMonthsto} className="textBox" style={{ height: '41px',width: '95%', border: this.state.loanTenureMonthsBorder2, marginLeft: '4px' }} onClick={this.loanTenureMonthsBox2} onChange={(event) => this.setState({ loanTenureMonthsto: event.target.value })} />
                                            {submitted && !loanTenureMonthsto &&
                                    <div className="help-block">loanTenureMonths is required</div>
                                }
                                </div>
                                </div>
                                        </div>
                                    </div>


                                    <div style={{ display: 'flex' }}>
                                        <div className="textFieldStyle" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" >{t('AddLoanType.tenureweekrange')}</h6>
                                            <div style={{display:"flex"}}>
                                    <div className={'form-group' + (submitted && !loanTenureWeeksfrom ? ' has-error' : '')} style={{width:"40%"}}>                                                                                                                                                                               
                                            <Input type="number" className="textBox" value={this.state.loanTenureWeeksfrom} style={{ height: '41px',width: '97%' , border: this.state.loanTenureWeeksBorder1 }} onClick={this.loanTenureWeeksBox1} onChange={(event) => this.setState({ loanTenureWeeksfrom: event.target.value })} />
                                            {submitted && !loanTenureWeeksfrom &&
                                    <div className="help-block">loanTenureWeeks is required</div>
                                }
                                </div>
                                            <span style={{marginTop:"10px"}}> &nbsp; &nbsp;-</span> &nbsp; &nbsp;
                                    <div className={'form-group' + (submitted && !loanTenureWeeksto ? ' has-error' : '')}>                                                                                                                                   
                                           
                                            <Input type="number" className="textBox" value={this.state.loanTenureWeeksto} style={{ height: '41px',width: '85%', border: this.state.loanTenureWeeksBorder2 }} onClick={this.loanTenureWeeksBox2} onChange={(event) => this.setState({ loanTenureWeeksto: event.target.value })} />
                                            {submitted && !loanTenureWeeksto &&
                                    <div className="help-block">loanTenureWeeks is required</div>
                                }
                                </div>
                                </div>
                                        </div>
                                        <div className="numaricTextField" style={{ width: '50%' }}>
                                            <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: '70px' }}>{t('AddLoanType.tenuredayrange')}</h6>
                                            <div  style={{display:"flex"}}>
                                    <div className={'form-group' + (submitted && !loanTenureDaysfrom ? ' has-error' : '')}>                                                                                                                                   
                                            
                                            <Input type="number" value={this.state.loanTenureDaysfrom} className="textBox" style={{ height: '41px',width: '65%', border: this.state.loanTenureDaysBorder1, marginLeft: '70px' }} onClick={this.loanTenureDaysBox1} onChange={(event) => this.setState({ loanTenureDaysfrom: event.target.value })} />    
                                            {submitted && !loanTenureDaysfrom &&
                                    <div className="help-block"  style={{marginLeft:"4.5rem"}}>loanTenureDays is required</div>
                                }
                                </div>
                                            <span style={{marginTop:"-8px"}}> &nbsp; &nbsp;-</span> &nbsp; &nbsp;
                                    <div className={'form-group' + (submitted && !loanTenureDaysto ? ' has-error' : '')}>                                                                                                                                   
                                            
                                            <Input type="number" value={this.state.loanTenureDaysto} className="textBox" style={{ height: '41px',width: '95%', border: this.state.loanTenureDaysBorder2, marginLeft: '4px' }} onClick={this.loanTenureDaysBox2} onChange={(event) => this.setState({ loanTenureDaysto: event.target.value })} />
                                            {submitted && !loanTenureDaysto &&
                                    <div className="help-block">loanTenureDays is required</div>
                                }
                                </div>
                                        </div>
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
                        <Button  className="savebutton btnSizeFont Fonts" onClick={this.handleSubmit.bind(this)}>
                            Save
                        </Button>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default withNamespaces()(AddLoanType);