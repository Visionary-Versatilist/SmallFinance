import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import './editcompanyprofile.scss';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Sidebar from '../../sidebar/sidebar';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BaseUrl} from "../../../Environment";
import Tooltip from "@material-ui/core/Tooltip";
import { withNamespaces } from 'react-i18next';



const axios = require('axios')
const state = [
    {
      value: 'Andhra Pradesh',
      label: 'Andhra Pradesh',
    },
    {
      value: 'Arunachal Pradesh',
      label: 'Arunachal Pradesh',
    },
    {
        value: 'Assam',
        label: 'Assam',
      },
      {
        value: 'Bihar',
        label: 'Bihar',
      },
      {
        value: 'Chhattisgarh',
        label: 'Chhattisgarh',
      },
      {
        value: 'Goa',
        label: 'Goa',
      },
      {
        value: 'Gujarat',
        label: 'Gujarat',
      },
      {
        value: 'Haryana',
        label: 'Haryana',
      },
      {
        value: 'Himachal Pradesh',
        label: 'Himachal Pradesh',
      },
      {
        value: 'Jharkhand',
        label: 'Jharkhand',
      },
      {
        value: 'Karnataka',
        label: 'Karnataka',
      },
      {
        value: 'Kerala',
        label: 'Kerala',
      },
      {
        value: 'Madhya Pradesh',
        label: 'Madhya Pradesh',
      },
      {
        value: 'Maharashtra',
        label: 'Maharashtra',
      },
      {
        value: 'Manipur',
        label: 'Manipur',
      },
      {
        value: 'Meghalaya',
        label: 'Meghalaya',
      },
      {
        value: 'Mizoram',
        label: 'Mizoram',
      },
      {
        value: 'Nagaland',
        label: 'Nagaland',
      },
      {
        value: 'Odisha',
        label: 'Odisha',
      },
      {
        value: 'Punjab',
        label: 'Punjab',
      },
      {
        value: 'Rajasthan',
        label: 'Rajasthan',
      },
      {
        value: 'Sikkim',
        label: 'Sikkim',
      },
      {
        value: 'Tamil Nadu',
        label: 'Tamil Nadu',
      }, 
      {
        value: 'Telangana',
        label: 'Telangana',
      }, 
      {
        value: 'Tripura',
        label: 'Tripura',
      }, 
      {
        value: 'Uttarakhand',
        label: 'Uttarakhand',
      },
       {
        value: 'Uttar Pradesh',
        label: 'Uttar Pradesh',
      }, 
      {
        value: 'West Bengal',
        label: 'West Bengal',
      }, 
      {
        value: 'Andaman and Nicobar Islands',
        label: 'Andaman and Nicobar Islands',
      }, 
      {
        value: 'Chandigarh',
        label: 'Chandigarh',
      }, 
      {
        value: 'Dadra and Nagar Haveli',
        label: 'Dadra and Nagar Haveli',
      }, 
      {
        value: 'Daman and Diu',
        label: 'Daman and Diu',
      }, 
      {
        value: 'Delhi',
        label: 'Delhi',
      },
      {
        value: 'Jammu and Kashmir',
        label: 'Jammu and Kashmir',
      },
      {
        value: 'Ladakh',
        label: 'Ladakh',
      }, 
      {
        value: 'Lakshadweep',
        label: 'Lakshadweep',
      }, 
      {
        value: 'Puducherry',
        label: 'Puducherry',
      },  
  ];

class EditCompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeColorname: '1px solid #D4D4D5',
            changeColornumber: '1px solid #D4D4D5',
            changeColoremail: '1px solid #D4D4D5',
            changeColorwebsite:'1px solid #D4D4D5',
            changeColoraddress: '1px solid #D4D4D5',
            changeColoremp:'1px solid #D4D4D5',
            changeColoremp:'1px solid #D4D4D5',
            flat:"1px solid #D4D4D5",
            street:"1px solid #D4D4D5",
            landmark:"1px solid #D4D4D5",
            city:"1px solid #D4D4D5",
            pin:"1px solid #D4D4D5",
            state:"1px solid #D4D4D5",
            CompanyProfile:"",
            name:"",
            totalemployees:"",
            mobilenum:"",
            emailid:"",
            address:"",
            website:"",
            homeAddressLine:"",
            homeAddressStreet:"",
            homeAddressLandmark:"",
            homeAddressPincode:"",
            homeAddressCity:"",
            homeAddressState:"",
            loginToken:"",
            curTime:"",
            validemail: true,
            emailError: "none",
            validnum: true,
            numError: "none",
            validemp: true,
            empError:"none",
            validhomepin: true,
            homepinError: "none",
            CountryData: [],
            country: "",
            symbol: "",
            area: "",
            countryId: "",
            description:""
        };
        this.nameBox = this.nameBox.bind(this)
        this.numberBox = this.numberBox.bind(this)
        this.emailBox = this.emailBox.bind(this)
        this.employeesBox = this.employeesBox.bind(this)
        this.websiteBox = this.websiteBox.bind(this)
        this.validEmail = this.validEmail.bind(this)
        this.validNum = this.validNum.bind(this)
        this.validEmp = this.validEmp.bind(this)
        this.validHomePin = this.validHomePin.bind(this)

        this.flatBox = this.flatBox.bind(this)
        this.streetBox = this.streetBox.bind(this)
        this.landmarkBox = this.landmarkBox.bind(this)
        this.cityBox = this.cityBox.bind(this)
        this.pinBox =this.pinBox.bind(this)
        this.stateBox =this.stateBox.bind(this)

    }
    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
    }
    nameBox() {
        this.setState({
            changeColorname: "1px solid #00D95E",
            changeColornumber: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorwebsite: "1px solid #D4D4D5",
            changeColoraddress: "1px solid #D4D4D5",
            changeColoremp:'1px solid #D4D4D5',
            flat:"1px solid #D4D4D5",
            street:"1px solid #D4D4D5",
            landmark:"1px solid #D4D4D5",
            city:"1px solid #D4D4D5",
            pin:"1px solid #D4D4D5",
            state:"1px solid #D4D4D5",
        })
    }
    numberBox() {
        this.setState({
            changeColornumber: "1px solid #00D95E",
            changeColorname: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorwebsite: "1px solid #D4D4D5",
            changeColoraddress: "1px solid #D4D4D5",
            changeColoremp:'1px solid #D4D4D5',
            flat:"1px solid #D4D4D5",
            street:"1px solid #D4D4D5",
            landmark:"1px solid #D4D4D5",
            city:"1px solid #D4D4D5",
            pin:"1px solid #D4D4D5",
            state:"1px solid #D4D4D5",
        })
    }
    emailBox() {
        this.setState({
            changeColoremail: "1px solid #00D95E",
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
            changeColorwebsite: "1px solid #D4D4D5",
            changeColoraddress: "1px solid #D4D4D5",
            changeColoremp:'1px solid #D4D4D5',
            flat:"1px solid #D4D4D5",
            street:"1px solid #D4D4D5",
            landmark:"1px solid #D4D4D5",
            city:"1px solid #D4D4D5",
            pin:"1px solid #D4D4D5",
            state:"1px solid #D4D4D5",
        })
    }
    employeesBox() {
        this.setState({
            changeColoraddress: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColornumber: "1px solid #D4D4D5",
            changeColorwebsite: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
            changeColoremp:'1px solid #00D95E',
            flat:"1px solid #D4D4D5",
            street:"1px solid #D4D4D5",
            landmark:"1px solid #D4D4D5",
            city:"1px solid #D4D4D5",
            pin:"1px solid #D4D4D5",
            state:"1px solid #D4D4D5",
        })

    }
    websiteBox() {
        this.setState({
            changeColoraddress: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorwebsite: "1px solid #00D95E",
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
            changeColoremp:'1px solid #D4D4D5',
            flat:"1px solid #D4D4D5",
            street:"1px solid #D4D4D5",
            landmark:"1px solid #D4D4D5",
            city:"1px solid #D4D4D5",
            pin:"1px solid #D4D4D5",
            state:"1px solid #D4D4D5",
        })
    }
    flatBox() {
      this.setState({
          changeColoraddress: "1px solid #D4D4D5",
          changeColoremail: "1px solid #D4D4D5",
          changeColorwebsite: "1px solid #D4D4D5",
          changeColornumber: "1px solid #D4D4D5",
          changeColorname: "1px solid #D4D4D5",
          changeColoremp:'1px solid #D4D4D5',
          flat:"1px solid #00D95E",
          street:"1px solid #D4D4D5",
          landmark:"1px solid #D4D4D5",
          city:"1px solid #D4D4D5",
          pin:"1px solid #D4D4D5",
          state:"1px solid #D4D4D5",
      })
  }
  streetBox() {
    this.setState({
        changeColoraddress: "1px solid #D4D4D5",
        changeColoremail: "1px solid #D4D4D5",
        changeColorwebsite: "1px solid #D4D4D5",
        changeColornumber: "1px solid #D4D4D5",
        changeColorname: "1px solid #D4D4D5",
        changeColoremp:'1px solid #D4D4D5',
        flat:"1px solid #D4D4D5",
        street:"1px solid #00D95E",
        landmark:"1px solid #D4D4D5",
        city:"1px solid #D4D4D5",
        pin:"1px solid #D4D4D5",
        state:"1px solid #D4D4D5",
    })
}
landmarkBox() {
  this.setState({
      changeColoraddress: "1px solid #D4D4D5",
      changeColoremail: "1px solid #D4D4D5",
      changeColorwebsite: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColoremp:'1px solid #D4D4D5',
      flat:"1px solid #D4D4D5",
      street:"1px solid #D4D4D5",
      landmark:"1px solid #00D95E",
      city:"1px solid #D4D4D5",
      pin:"1px solid #D4D4D5",
      state:"1px solid #D4D4D5",
  })
}

cityBox() {
  this.setState({
      changeColoraddress: "1px solid #D4D4D5",
      changeColoremail: "1px solid #D4D4D5",
      changeColorwebsite: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColoremp:'1px solid #D4D4D5',
      flat:"1px solid #D4D4D5",
      street:"1px solid #D4D4D5",
      landmark:"1px solid #D4D4D5",
      city:"1px solid #00D95E",
      pin:"1px solid #D4D4D5",
      state:"1px solid #D4D4D5",
  })
}
stateBox() {
  this.setState({
      changeColoraddress: "1px solid #D4D4D5",
      changeColoremail: "1px solid #D4D4D5",
      changeColorwebsite: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColoremp:'1px solid #D4D4D5',
      flat:"1px solid #D4D4D5",
      street:"1px solid #D4D4D5",
      landmark:"1px solid #D4D4D5",
      city:"1px solid #D4D4D5",
      pin:"1px solid #00D95E",
      state:"1px solid #D4D4D5",
  })
}
pinBox() {
  this.setState({
      changeColoraddress: "1px solid #D4D4D5",
      changeColoremail: "1px solid #D4D4D5",
      changeColorwebsite: "1px solid #D4D4D5",
      changeColornumber: "1px solid #D4D4D5",
      changeColorname: "1px solid #D4D4D5",
      changeColoremp:'1px solid #D4D4D5',
      flat:"1px solid #D4D4D5",
      street:"1px solid #D4D4D5",
      landmark:"1px solid #D4D4D5",
      city:"1px solid #D4D4D5",
      pin:"1px solid #00D95E",
      state:"1px solid #D4D4D5",
  })
}
    componentDidMount() {
        this.setState({
            loginToken: localStorage.getItem('token')
        })
        setInterval( () => {
            this.setState({
              curTime : new Date().toLocaleString()
            })
          },1000)
          let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))
          
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
}
          axios.get(BaseUrl + '/company/getCompanyProfile?companyId=' +loggedinUser.companyId,{
            headers: headers,
        }).then(resp => {
            if(resp.status===200 || resp.status===304) {
                this.setState({
                    name: resp.data.companyName,
                    mobilenum:resp.data.phone,
                    emailid:resp.data.companyMail,
                    address:resp.data.address,
                    website:resp.data.companyWebsite,
                    totalemployees:resp.data.numberOfEmployee,
                    homeAddressLine:resp.data.AddressLine,
                    homeAddressStreet:resp.data.AddressStreet,
                    homeAddressLandmark:resp.data.AddressLandmark,
                    homeAddressPincode:resp.data.AddressPincode,
                    homeAddressCity:resp.data.AddressCity,
                    homeAddressState:resp.data.AddressState,
                    countryId:resp.data.countryId,
                    country:resp.data.country?resp.data.country.countryName:""
                })
            }
        }).catch(err => {
            if(err.request.status!==200){
            toast.error("something went wrong, please try again later!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                });
            }
        })
        this.CountryData()
    }
    editSave() {
        let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))
          const companyData ={
            "companyName":this.state.name,
            "numberOfEmployee":this.state.totalemployees,
            "companyMail":this.state.emailid,
            "companyWebsite":this.state.website,
            "address":this.state.address,
            "companyId":localStorage.getItem("companyId"),
            "phone":this.state.mobilenum,
            "createdAt": this.state.curTime,
            "updatedAt": this.state.curTime,
            "AddressLine":this.state.homeAddressLine,
            "AddressStreet":this.state.homeAddressStreet,
            "AddressLandmark":this.state.homeAddressLandmark,
            "AddressPincode":this.state.homeAddressPincode,
            "AddressCity":this.state.homeAddressCity,
            "AddressState":this.state.homeAddressState,
            "createdByUserId":localStorage.getItem("userid"),
            "updatedByUserId":localStorage.getItem("userid"),
            "companyId": loggedinUser.companyId,
            "countryId":this.state.countryId
          }
          
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
}
        axios.put(BaseUrl + '/company/putCompany',companyData,{
            headers: headers,
        }).then(resp => {
            if(resp.status===200) {
                toast.success("Company Details Updated Successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
                this.props.history.push('/companyprofile')      
            }else{
                toast.error("Please fill correct data!", {
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
            toast.error("Something went wrong. Please try again later!!", {
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
        this.props.history.push('/companyprofile')      
      }
      validateEmail(emailid) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
        return re.test(emailid)
    }
    validEmail = (event) => {
        const emailid = event.target.value
        const emailVaild = this.validateEmail(emailid)
        this.setState({
            emailid: event.target.value,
            validEmail: emailVaild
        })
        if (emailVaild === false) {
            this.setState({
                emailError: "flex"
            })
        } else {
            this.setState({
                emailError: "none"
            })
        }
    }
  //   validateEmp(totalemployees) {
  //     const re = /^\d{10}$/g
  //     return re.test(totalemployees)
  // }
  //   validEmp = (event) =>{
  //     // (event) => this.setState({ totalemployees: event.target.value })
  //     const totalemployees = event.target.value
  //       const empVaild = this.validateNum(totalemployees)
  //     this.setState({
  //       totalemployees: event.target.value,
  //       validEmp: empVaild
  //   })
  //   if (empVaild === false) {
  //     this.setState({
  //         empError: "flex"
  //     })
  // } else {
  //     this.setState({
  //         empError: "none"
  //     })
  // }
  //   }
    validateNum(mobilenum) {
        const re = /^\d{10}$/g
        return re.test(mobilenum)
    }
    validNum = (event) => {
        const mobilenum = event.target.value
        const numVaild = this.validateNum(mobilenum)
        this.setState({
            mobilenum: event.target.value,
            validNum: numVaild
        })
        if (numVaild === false) {
            this.setState({
                numError: "flex"
            })
        } else {
            this.setState({
                numError: "none"
            })
        }
    }
    validateHomePin(homeAddressPincode) {
      const re = /^\d{6}$/g
      return re.test(homeAddressPincode)
  }
  validHomePin = (event) => {
      const homeAddressPincode = event.target.value
      const homepinVaild = this.validateHomePin(homeAddressPincode)
      this.setState({
          homeAddressPincode: event.target.value,
          validHomePin: homepinVaild
      })
      if (homepinVaild === false) {
          this.setState({
              homepinError: "flex"
          })
      } else {
          this.setState({
              homepinError: "none"
          })
      }
  }
  CountryData = () => {
    
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
}
    axios.get(BaseUrl + '/country/getAllCountries', {
      headers: headers,
    }).then(resp => {
      if (resp.status === 200 || resp.status===304) {
        this.setState({
          CountryData: resp.data,
        })
      } else {
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
      if (err.request.status !== 200) {
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
  handleContryChange = (e) => {
    console.log("e", e.target.value)
    this.setState({
      country: e.target.value
    })
    this.state.CountryData.map(data => {
      if (e.target.value === data.countryName) {
        this.setState({
          symbol: data.symbol,
          area: data.area,
          countryId: data.countryId,
          description:data.description
        })
      }
    })
  }

    render(){
      const { t } = this.props;

        toast.configure({
        });
        var description = this.state.description

        const { name,totalemployees, homeAddressLine, homeAddressCity,homeAddressPincode, homeAddressState, homeAddressStreet,homeAddressLandmark, mobilenum, emailid, website, address,validemail,validnum,validemp, submitted } = this.state;
        return(
          <div className="Editcompanyprofilecomponent">
              <Sidebar/>
               <div style={{textAlign:'center', marginTop: '15px'}}>
              <div>
                <h3 className="Fonts headFontSize" style={{marginLeft:'45px'}}><span className="backLink" onClick={this.backLinkAction.bind(this)}>{t('CompanyProfile.title')}</span> / {t('CompanyProfile.subtitle')}</h3>
              </div>
            </div>
              <div >
                  <Card className="cardDiv">
                      <div className="previewComponent">
                          <form onSubmit={(e) => this._handleSubmit(e)}>
                              <div style={{ margin: 'auto', textAlign: "center" , marginTop: '34px' }}>
                                  <div className="textFieldStyle">
                                      <h6 className="InputLabel One Fonts fontSize" style={{ marginLeft: "31px" }} >{t('CompanyProfile.cName')} </h6>
                                      <Input className="textBox"   value={this.state.name?this.state.name:""}  style={{ height: '38px', border: this.state.changeColorname }} onClick={this.nameBox} onChange={ (event) => this.setState({ name: event.target.value })}  />
                                  </div>
                                  <div className="textFieldStyle">
                                      <h6 className="InputLabel Two Fonts fontSize" style={{ marginLeft: "49px" }} >{t('CompanyProfile.employees')}</h6>
                                      {/* <div className={'form-group' + (submitted && !totalemployees ? ' has-error' : '')} style={{marginTop: '10px'}}> */}
                                      <Input type="number" className="textBox" required className="form-control" name="totalemployees" style={{ height: '38px', border: this.state.changeColoremp }} value={this.state.totalemployees?this.state.totalemployees:""} onClick={this.employeesBox} onChange={(event) => this.setState({ totalemployees: event.target.value })} />
                                      {/* {submitted && !totalemployees &&
                                      <div className="help-block" style={{marginRight:"12rem"}}>company name is required</div>
                                      }
                                  </div> */}
                                  </div>
                                  <div className="numaricTextField">
                                      <h6 className="InputLabel Three Fonts fontSize" style={{ marginLeft: "30px" }}>{t('EditProfileDetails.phone')}</h6>
                                      <Input type="number"  value={this.state.mobilenum?this.state.mobilenum:""}  className="textBox" style={{ height: '38px', border: this.state.changeColornumber }} onClick={this.numberBox} onChange={this.validNum}  />
                                      <span style={{ display: this.state.numError, paddingLeft:"25.2rem"}} className="help-block">Mobile number must be 10 digit.</span>                                                                            
                                  </div>
                                  <div className="textFieldStyle">
                                      <h6 className="InputLabel Four Fonts fontSize" style={{ marginLeft: "9px" }}> {t('EditProfileDetails.email')}</h6>
                                      <Input className="textBox"  value={this.state.emailid?this.state.emailid:""}  style={{ height: '38px', border: this.state.changeColoremail }} onClick={this.emailBox} onChange={this.validEmail} />
                                      <span style={{ display: this.state.emailError, paddingLeft:"25.2rem"}} className="help-block">Invalid Email id.</span>                                    
                                  </div>
                                  <div className="textFieldStyle">
                                      <h6 className="InputLabel Five Fonts fontSize" style={{ marginLeft: "9px" }}> {t('CompanyProfile.website')}</h6>
                                      <Input className="textBox"  value={this.state.website?this.state.website:""}  style={{ height: '38px', border: this.state.changeColorwebsite }} onClick={this.websiteBox} onChange={(event) => this.setState({ website: event.target.value })} />
                                  </div>
                                  <div style={{width:'100%' }}>
                                      <div className="textFieldStyle" style={{ width: '100%' }}>
                                          <h6 className="InputLabel Six Fonts fontSize" style={{width:"75%"}} > {t('CompanyProfile.Address')}</h6>                                                                                                                                                                                                                                                                                                                             
                                      {/* <div className={'form-group' + (submitted && !homeAddressLine ? ' has-error' : '')} style={{marginTop: '10px', width:"100%"}}>                                                                                                                                                                             */}
                                          <Input className="textBox" required className="form-control" name="homeAddressLine" placeholder="Flat / House No. / Floor / Building / Colony" value={this.state.homeAddressLine?this.state.homeAddressLine:""}  style={{ height: '41px', border: this.state.flat }} onClick={this.flatBox} onChange={(event) => this.setState({ homeAddressLine: event.target.value })} />
                                          {/* {submitted && !homeAddressLine &&
                                       <div className="help-block" style={{marginRight:"14rem"}}>Address is required</div>
                                      }
                                  </div> */}
                                      </div>
                                      
                                      <div className="textFieldStyle" style={{ width: '100%' }}>
                                      <h6 className="InputLabel Fonts fontSize" ></h6>
                                      {/* <div className={'form-group' + (submitted && !homeAddressStreet ? ' has-error' : '')} style={{marginTop: '10px'}}>                                                                                                                                                                             */}
                                          <Input className="textBox" required className="form-control" name="homeAddressStreet" placeholder="Street / Locality" value={this.state.homeAddressStreet?this.state.homeAddressStreet:""}  style={{ height: '41px', border: this.state.street }} onClick={this.streetBox} onChange={(event) => this.setState({ homeAddressStreet: event.target.value })} />
                                          {/* {submitted && !homeAddressStreet &&
                                       <div className="help-block" style={{marginRight:"14rem"}}>Address is required</div>
                                      }
                                  </div> */}
                                      </div>
                                     {/* <div style={{ display: 'flex' }}> */}
                                      <div className="textFieldStyle" style={{ width: '100%' }}>
                                      <h6 className="InputLabel Fonts fontSize" ></h6>
                                      {/* <div className={'form-group' + (submitted && !homeAddressLandmark ? ' has-error' : '')} style={{marginTop: '10px'}}>                                                                                                                                                                             */}
                                          <Input required className="form-control" name="homeAddressLandmark" value={this.state.homeAddressLandmark?this.state.homeAddressLandmark:""} placeholder="Landmark" className="textBox"  style={{ height: '41px', border: this.state.landmark }} onClick={this.landmarkBox} onChange={(event) => this.setState({ homeAddressLandmark: event.target.value })} />
                                          {/* {submitted && !homeAddressLandmark &&
                                       <div className="help-block" style={{marginRight:"14rem"}}>Address is required</div>
                                      }
                                  </div> */}
                                      </div>
                                      <div className="textFieldStyle" style={{ width: '100%' }}>
                                      <h6 className="InputLabel Fonts fontSize" ></h6>
                                      {/* <div className={'form-group' + (submitted && !homeAddressCity ? ' has-error' : '')} style={{marginTop: '10px'}}>                                                                                                                                                                             */}
                                          <Input required className="form-control" name="homeAddressCity" value={this.state.homeAddressCity?this.state.homeAddressCity:""} className="textBox" placeholder="City"  style={{ height: '41px', border: this.state.city }} onClick={this.cityBox} onChange={(event) => { event.target.value = event.target.value.replace(/[^A-Za-z]/ig, '');this.setState({ homeAddressCity: event.target.value })}} />
                                          {/* {submitted && !homeAddressCity &&
                                       <div className="help-block" style={{marginRight:"14rem"}}>Address is required</div>
                                      }
                                  </div> */}
                                      </div>
                                  {/* </div> */}
                                  {/* <div style={{ display: 'flex' }}> */}
                                      <div className="textFieldStyle" style={{ width: '100%' }}>
                                      <h6 className="InputLabel Fonts fontSize" ></h6>
                                      {/* <div className={'form-group' + (submitted && !homeAddressPincode ? ' has-error' : '')} style={{marginTop: '10px'}}>                                                                                                                                                                             */}
                                          <Input required className="form-control" name="homeAddressPincode" value={this.state.homeAddressPincode?this.state.homeAddressPincode:""} type="number" placeholder="Pincode" className="number"  style={{ height: '41px', border: this.state.pin }} onClick={this.pinBox} onChange={this.validHomePin} />
                                          <span style={{ display: this.state.homepinError, marginLeft:"36%"}} className="help-block">Invalid pincode.</span>                                                                                    
                                          {/* {submitted && !homeAddressPincode &&
                                       <div className="help-block" style={{marginRight:"14rem"}}>Address is required</div>
                                      }
                                  </div> */}
                                      </div>
                                      <div className="textFieldStyle categorytextFieldStyle" style={{ width: '100%', height:"34px" }}>
                                      <h6 className="InputLabel Fonts fontSize" ></h6>
                                      {/* <div className={'form-group' + (submitted && !homeAddressState ? ' has-error' : '')} style={{marginTop: '10px'}}>                                                                                                                                                                             */}
                                          {/* <Input required className="form-control" name="homeAddressState" value={this.state.homeAddressState} className="textBox" placeholder="State"  style={{ height: '41px', border: this.state.state }} onClick={this.stateBox} onChange={(event) => this.setState({ homeAddressState: event.target.value })} /> */}
                                          <TextField
                                                 id="standard-select-currency"
                                                 select
                                                 required className="form-control" name="homeAddressState"
                                                 className="incomefield textBox"
                                                 value={this.state.homeAddressState?this.state.homeAddressState:""}
                                                 style={{border:this.state.state, borderRadius:"5px"}}
                                                 onClick={this.stateBox}
                                                 onChange={(event) => this.setState({ homeAddressState: event.target.value })}
                                               >
                                                {state.map(option => (
                                                  <MenuItem key={option.value} value={option.value} style={{width:"100%"}}>
                                                    {option.label}
                                                  </MenuItem>
                                                ))}
                                              </TextField>
                                          {/* {submitted && !homeAddressState &&
                                       <div className="help-block" style={{marginRight:"14rem"}}>Address is required</div>
                                      }
                                  </div> */}
                                      </div>
                                      <div className="textFieldStyle categorytextFieldStyle" style={{ width: '100%', height: "34px" }}>
                        <h6 className="InputLabel Fonts SizeFont" style={{ width: "75.5%" }} > {t('CompanyProfile.country')}</h6>
                        {/* <Input required className="form-control" name="homeAddressState" value={this.state.homeAddressState} className="textBox" placeholder="State"  style={{ height: '41px', border: this.state.state }} onClick={this.stateBox} onChange={(event) => this.setState({ homeAddressState: event.target.value })} /> */}
                        <TextField
                          id="standard-select-currency"
                          select
                          required className="form-control" name="homeAddressState"
                          className="incomefield textBox"
                          value={this.state.country?this.state.country:""}
                          style={{ border: this.state.state, borderRadius: "5px" }}
                          onClick={this.stateBox}
                          onChange={this.handleContryChange}
                        >
                          {this.state.CountryData.map(option => (
                            <MenuItem key={option.countryName} value={option.countryName} style={{ width: "100%" }}>
                              {option.countryName}
                            </MenuItem>
                          ))}
                        </TextField>
                        <div className="Fonts" style={{ fontSize: "13px" }}>
                          <span style={{ marginRight: "253px" }}>{this.state.area}</span>
                          <Tooltip title={description} placement="right">
                            <span>{this.state.symbol}</span>
                          </Tooltip>
                        </div>

                      </div>
                                  {/* </div> */}
                              </div>
                                  {/* </div> */}
                                      {/* <h6 className="InputLabel Fonts fontSize" style={{ marginLeft: "9px", marginBottom: '4px' }}>Address</h6>
                                      <TextField className="textBox"  value={this.state.address}  margin="dense" multiline rowsMax="10"  style={{borderRadius: '5px', paddingTop: '10px', border: this.state.changeColoraddress }} onClick={this.addressBox} onChange={(event) => this.setState({ address: event.target.value })} ></TextField> */}
                                  <div style={{marginTop:"35px"}}>
                                      <Button  className="cancelbutton btnfontSize Fonts" onClick={() => this.props.history.push("/companyprofile")} style={{paddingTop: "3px"}}>
                                              cancel
                                      </Button>
                                          <Button  className="savebutton btnfontSize Fonts" onClick={this.editSave.bind(this)} style={{paddingTop: "4px"}}>
                                              Save
                                          </Button>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </Card>
              </div>
          </div>
      )
    }
}
export default withNamespaces()(EditCompanyProfile);