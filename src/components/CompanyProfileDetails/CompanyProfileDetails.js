import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import './CompanyProfileDetails.scss';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Sidebar from '../sidebar/sidebar';
import MenuItem from '@material-ui/core/MenuItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import editpencil from '../../assets/images/editpencil.svg';
import { BaseUrl} from "../../Environment";
import Tooltip from "@material-ui/core/Tooltip";
import { withNamespaces } from 'react-i18next';


const axios = require('axios')
const state = [
  {
    value: ' Andhra Pradesh',
    label: 'Andhra Pradesh',
  },
  {
    value: ' Arunachal Pradesh',
    label: 'Arunachal Pradesh',
  },
  {
    value: ' Assam',
    label: 'Assam',
  },
  {
    value: ' Bihar',
    label: 'Bihar',
  },
  {
    value: ' Chhattisgarh',
    label: 'Chhattisgarh',
  },
  {
    value: ' Goa',
    label: 'Goa',
  },
  {
    value: ' Gujarat',
    label: 'Gujarat',
  },
  {
    value: ' Haryana',
    label: 'Haryana',
  },
  {
    value: ' Himachal Pradesh',
    label: 'Himachal Pradesh',
  },
  {
    value: ' Jammu and Kashmir',
    label: 'Jammu and Kashmir',
  },
  {
    value: ' Jharkhand',
    label: 'Jharkhand',
  },
  {
    value: ' Karnataka',
    label: 'Karnataka',
  },
  {
    value: ' Kerala',
    label: 'Kerala',
  },
  {
    value: ' Madhya Pradesh',
    label: 'Madhya Pradesh',
  },
  {
    value: ' Maharashtra',
    label: 'Maharashtra',
  },
  {
    value: ' Manipur',
    label: 'Manipur',
  },
  {
    value: ' Meghalaya',
    label: 'Meghalaya',
  },
  {
    value: ' Mizoram',
    label: 'Mizoram',
  },
  {
    value: ' Nagaland',
    label: 'Nagaland',
  },
  {
    value: ' Odisha',
    label: 'Odisha',
  },
  {
    value: ' Punjab',
    label: 'Punjab',
  },
  {
    value: ' Rajasthan',
    label: 'Rajasthan',
  },
  {
    value: ' Sikkim',
    label: 'Sikkim',
  },
  {
    value: ' Tamil Nadu',
    label: 'Tamil Nadu',
  },
  {
    value: ' Telangana',
    label: 'Telangana',
  },
  {
    value: ' Tripura',
    label: 'Tripura',
  },
  {
    value: ' Uttarakhand',
    label: 'Uttarakhand',
  },
  {
    value: ' Uttar Pradesh',
    label: 'Uttar Pradesh',
  },
  {
    value: ' West Bengal',
    label: 'West Bengal',
  },
  {
    value: ' Andaman and Nicobar Islands',
    label: 'Andaman and Nicobar Islands',
  },
  {
    value: ' Chandigarh',
    label: 'Chandigarh',
  },
  {
    value: ' Dadra and Nagar Haveli',
    label: 'Dadra and Nagar Haveli',
  },
  {
    value: ' Daman and Diu',
    label: 'Daman and Diu',
  },
  {
    value: ' Delhi',
    label: 'Delhi',
  },
  {
    value: ' Lakshadweep',
    label: 'Lakshadweep',
  },
  {
    value: ' Puducherry',
    label: 'Puducherry',
  },
];


class CompanyProfileDetails extends Component {
  constructor() {
    super();
    this.state = {
      changeColorname: '1px solid #D4D4D5',
      changeColornumber: '1px solid #D4D4D5',
      changeColoremail: '1px solid #D4D4D5',
      changeColorwebsite: '1px solid #D4D4D5',
      changeColoraddress: '1px solid #D4D4D5',
      changeColoremp: '1px solid #D4D4D5',
      flat: "1px solid #D4D4D5",
      street: "1px solid #D4D4D5",
      landmark: "1px solid #D4D4D5",
      city: "1px solid #D4D4D5",
      pin: "1px solid #D4D4D5",
      state: "1px solid #D4D4D5",
      name: "",
      totalemployees: "",
      mobilenum: "",
      emailid: "",
      address: "",
      website: "",
      loginToken: "",
      CompanyProfile: "",
      homeAddressLine: "",
      homeAddressStreet: "",
      homeAddressLandmark: "",
      homeAddressPincode: "",
      homeAddressCity: "",
      homeAddressState: "",
      CountryData: [],
      country: "",
      symbol: "",
      area: "",
      countryId: "",
      description:""
    };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  componentDidMount() {
    this.setState({
      loginToken: localStorage.getItem('token')
    })

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
    }
    let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))
    axios.get(BaseUrl + '/company/getCompanyProfile?companyId=' + loggedinUser.companyId, {
      headers: headers,
    }).then(resp => {
      
      if (resp.status === 200 || resp.status===304) {
        this.setState({
          CompanyProfile: resp.data,
          country:resp.data.country?resp.data.country.countryName: ""
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
    this.CountryData()
  }
  CountryData = () => {
    
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
}
    axios.get(BaseUrl + '/country/getAllCountries', {
      headers: headers,
    }).then(resp => {
     
      if (resp.status === 200 || resp.status === 304) {
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
  editcompanyprofile() {
    this.props.history.push('/companyprofile/edit')
  }
  render() {
    const { t } = this.props;

    toast.configure({
    });
    var description = this.state.description
    return (
      <div>
        <Sidebar />
        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <div>
            <h3 className="Fonts headFontSize" style={{ marginLeft: '45px' }}>{t('CompanyProfile.title')}</h3>
          </div>
        </div>
        <div className="companyprofilecomponent">
          <Card className="cardDiv">
            <div className="previewComponent">
              <form onSubmit={(e) => this._handleSubmit(e)}>
                <div style={{ position: 'absolute', right: '10%', top: '15%', cursor: 'pointer' }} onClick={this.editcompanyprofile.bind(this)}>
                  <span className="Fonts SizeFont">EDIT&nbsp;&nbsp;</span> <img src={editpencil} alt="editpencil" className="editIMage" />
                </div>
                <div style={{ margin: 'auto', textAlign: "center", marginTop: '34px' }}>
                  <div className="textFieldStyle">
                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "31px" }} >{t('CompanyProfile.cName')}</h6>
                    <Input className="textBox" value={this.state.CompanyProfile.companyName?this.state.CompanyProfile.companyName:""} style={{ height: '38px', border: this.state.changeColorname }}  onChange={(event) => this.setState({ name: event.target.value })} disabled />
                  </div>
                  <div className="textFieldStyle">
                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "49px" }} >{t('CompanyProfile.employees')}</h6>
                    <Input type="number" value={this.state.CompanyProfile.numberOfEmployee?this.state.CompanyProfile.numberOfEmployee:""} className="textBox" required className="form-control" name="totalemployees" style={{ height: '38px', border: this.state.changeColoremp }}  onChange={(event) => this.setState({ totalemployees: event.target.value })} disabled />
                  </div>
                  <div className="numaricTextField">
                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "30px" }}>{t('EditProfileDetails.phone')}</h6>
                    <Input type="number" className="textBox" value={this.state.CompanyProfile.phone?this.state.CompanyProfile.phone:""} style={{ height: '38px', border: this.state.changeColornumber }}  onChange={(event) => this.setState({ mobilenum: event.target.value })} disabled />
                  </div>
                  <div className="textFieldStyle">
                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "9px" }}>{t('EditProfileDetails.email')}</h6>
                    <Input className="textBox" value={this.state.CompanyProfile.companyMail?this.state.CompanyProfile.companyMail:""} style={{ height: '38px', border: this.state.changeColoremail }}  onChange={(event) => this.setState({ emailid: event.target.value })} disabled />
                  </div>
                  <div className="textFieldStyle">
                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "9px" }}> {t('CompanyProfile.website')}</h6>
                    <Input className="textBox" value={this.state.CompanyProfile.companyWebsite?this.state.CompanyProfile.companyWebsite:""} style={{ height: '38px', border: this.state.changeColorwebsite }}  onChange={(event) => this.setState({ website: event.target.value })} disabled />
                  </div>
                  <div className="textFieldStyle">
                    <div style={{ width: '100%' }}>
                      <div className="textFieldStyle" style={{ width: '100%' }}>
                        <h6 className="InputLabel Fonts SizeFont" style={{ width: "76%" }} >{t('CompanyProfile.Address')}</h6>
                        <Input className="textBox" required className="form-control" name="homeAddressLine" placeholder="Flat / House No. / Floor / Building / Colony" value={this.state.CompanyProfile.AddressLine?this.state.CompanyProfile.AddressLine:""} style={{ height: '41px', border: this.state.flat }}  onChange={(event) => this.setState({ homeAddressLine: event.target.value })} disabled />

                      </div>

                      <div className="textFieldStyle" style={{ width: '100%' }}>
                        <h6 className="InputLabel Fonts SizeFont" ></h6>
                        <Input className="textBox" required className="form-control" name="homeAddressStreet" placeholder="Street / Locality" value={this.state.CompanyProfile.AddressStreet?this.state.CompanyProfile.AddressStreet:""} style={{ height: '41px', border: this.state.street }}  onChange={(event) => this.setState({ homeAddressStreet: event.target.value })} disabled />

                      </div>
                      {/* <div style={{ display: 'flex' }}> */}
                      <div className="textFieldStyle" style={{ width: '100%' }}>
                        <h6 className="InputLabel Fonts SizeFont" ></h6>
                        <Input required className="form-control" name="homeAddressLandmark" value={this.state.CompanyProfile.AddressLandmark?this.state.CompanyProfile.AddressLandmark:""} placeholder="Landmark" className="textBox" style={{ height: '41px', border: this.state.landmark }} onChange={(event) => this.setState({ homeAddressLandmark: event.target.value })} disabled />

                      </div>
                      <div className="textFieldStyle" style={{ width: '100%' }}>
                        <h6 className="InputLabel Fonts SizeFont" ></h6>
                        <Input required className="form-control" name="homeAddressCity" value={this.state.CompanyProfile.AddressCity?this.state.CompanyProfile.AddressCity:""} className="textBox" placeholder="City" style={{ height: '41px', border: this.state.city }}  onChange={(event) => { event.target.value = event.target.value.replace(/[^A-Za-z]/ig, ''); this.setState({ homeAddressCity: event.target.value }) }} disabled />

                      </div>
                      {/* </div> */}
                      {/* <div style={{ display: 'flex' }}> */}
                      <div className="textFieldStyle" style={{ width: '100%' }}>
                        <h6 className="InputLabel Fonts SizeFont" ></h6>
                        <Input required className="form-control" name="homeAddressPincode" value={this.state.CompanyProfile.AddressPincode?this.state.CompanyProfile.AddressPincode:""} type="number" placeholder="Pincode" className="number" style={{ height: '41px', border: this.state.pin }}  onChange={this.validHomePin} disabled />

                      </div>
                      <div className="textFieldStyle categorytextFieldStyle" style={{ width: '100%', height: "34px" }}>
                        <h6 className="InputLabel Fonts SizeFont" ></h6>
                        {/* <Input required className="form-control" name="homeAddressState" value={this.state.homeAddressState} className="textBox" placeholder="State"  style={{ height: '41px', border: this.state.state }} onClick={this.stateBox} onChange={(event) => this.setState({ homeAddressState: event.target.value })} /> */}
                        <TextField
                          id="standard-select-currency"
                          select
                          required className="form-control" name="homeAddressState"
                          className="incomefield textBox"
                          value={this.state.CompanyProfile.AddressState?this.state.CompanyProfile.AddressState:""}
                          style={{ border: this.state.state, borderRadius: "5px" }}
                          onChange={(event) => this.setState({ homeAddressState: event.target.value })}
                          disabled
                        >
                          {state.map(option => (
                            <MenuItem key={option.value} value={option.value} style={{ width: "100%" }}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                      </div>
                      <div className="textFieldStyle categorytextFieldStyle" style={{ width: '100%', height: "34px" }}>
                        <h6 className="InputLabel Fonts SizeFont" style={{ width: "75.5%" }} >{t('CompanyProfile.country')}</h6>
                        {/* <Input required className="form-control" name="homeAddressState" value={this.state.homeAddressState} className="textBox" placeholder="State"  style={{ height: '41px', border: this.state.state }} onClick={this.stateBox} onChange={(event) => this.setState({ homeAddressState: event.target.value })} /> */}
                        <TextField
                          id="standard-select-currency"
                          select
                          required className="form-control" name="homeAddressState"
                          className="incomefield textBox"
                          value={this.state.country?this.state.country:""}
                          style={{ border: this.state.state, borderRadius: "5px" }}
                          onChange={this.handleContryChange}
                          disabled
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
                  </div>
                  {/* </div> */}
                  {/* <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "9px", marginBottom: '4px' }}>Address</h6>
                                        <TextField className="textBox" value={this.state.CompanyProfile.address} margin="dense" multiline rowsMax="10"  style={{borderRadius: '5px', paddingTop: '10px', border: this.state.changeColoraddress }} onClick={this.addressBox} onChange={(event) => this.setState({ address: event.target.value })} disabled ></TextField> */}
                  {/* </div> */}
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}
export default withNamespaces()(CompanyProfileDetails);