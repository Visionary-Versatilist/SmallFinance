import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import userdefault from '../../assets/images/userdefault.svg';
import './updateadminprofile.scss';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Sidebar from '../sidebar/sidebar';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {BaseUrl, ImageBaseUrl} from "../../Environment";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';


const axios = require('axios')
 const LangugaeData  = [
    {
      value: 'English',
      label: 'English',
    },
    {
      value: 'Hindi',
      label: 'Hindi',
    },
    {
        value: 'Tamil',
        label: 'Tamil',
    },
    {
      value: 'Kannada',
      label: 'Kannada',
    },
    {
        value: 'Deutsch',
        label: 'Deutsch',
      },  
]

class UpdateAdminProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            changeColorname: '1px solid #D4D4D5',
            changeColorname1: '1px solid #D4D4D5',
            changeColornumber: '1px solid #D4D4D5',
            changeColoremail: '1px solid #D4D4D5',
            changeColorcategory: '1px solid #D4D4D5',
            languagee:"1px solid #D4D4D5",
            fname:"",
            lname:"",
            mobilenum:"",
            emailid:"",
            emailError: "none",
            submitted: false,
            validemail: true,
            userid:"",
            userType:"",
            validnum: true,
            numError: "none",
            language:""
        };
        this.nameBox = this.nameBox.bind(this)
        this.nameBox1 = this.nameBox1.bind(this)
        this.numberBox = this.numberBox.bind(this)
        this.emailBox = this.emailBox.bind(this)
        this.categoryBox = this.categoryBox.bind(this)
        this.updateUser=this.updateUser.bind(this)
        this.handleSave=this.handleSave.bind(this)
        this.languageBox=this.languageBox.bind(this)
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
    }

    _handleImageChange(e) {
        e.preventDefault();
        if(e.target.files[0].size > 1000000){
            toast.error("Image Size should be less than 1 MB!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                });         //    this.value = "";
         } else{

        let reader = new FileReader();
        let file = e.target.files[0];
        let tempName = file.name
        tempName = tempName.split('.');
        let name  = tempName[0] + Date.now() + '.' + tempName[1];
        let data;
         let temp = new File([file], name, {type: file.type})


        reader.onloadend = () => {
            this.setState({
                file: temp,
                filename:name,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
        // e.preventDefault();

        // let reader = new FileReader();
        // let file = e.target.files[0];

        // reader.onloadend = () => {
        //     this.setState({
        //         file: file,
        //         imagePreviewUrl: reader.result
        //     });
        // }

        // reader.readAsDataURL(file)
    }
}
    handleChange = event => {
        this.setState({ category: event.target.value });
        // this.setState({ vehiclemodel: event.target.value })
    };
    nameBox() {
        this.setState({
            changeColorname: "1px solid #00D95E",
            changeColorname1: '1px solid #D4D4D5',
            changeColornumber: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5"
        })
    }
    nameBox1() {
        this.setState({
            changeColorname: "1px solid #D4D4D5",
            changeColorname1: '1px solid #00D95E',
            changeColornumber: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5"
        })
    }
    numberBox() {
        this.setState({
            changeColornumber: "1px solid #00D95E",
            changeColorname1: '1px solid #D4D4D5',
            changeColorname: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5"
        })
    }
    emailBox() {
        this.setState({
            changeColoremail: "1px solid #00D95E",
            changeColorname1: '1px solid #D4D4D5',
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5"
        })
    }
    categoryBox() {
        this.setState({
            changeColorcategory: "1px solid #00D95E",
            changeColorname1: '1px solid #D4D4D5',
            changeColoremail: "1px solid #D4D4D5",
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
        })
    }
    languageBox(){
        this.setState({
            changeColorcategory: "1px solid #D4D4D5",
            changeColorname1: '1px solid #D4D4D5',
            changeColoremail: "1px solid #D4D4D5",
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
            languagee:"1px solid #00D95E"
        })
    }
    updateUser(){

          const userdetails = {
               "firstName":this.state.fname,
               "lastName":this.state.lname,
               "userPhone":this.state.mobilenum,
               "userEmail":this.state.emailid,
            //    "password":this.state.password,
               "userId": this.state.userid,
               "createdAt":new Date().toLocaleString(),
               "updatedAt":new Date().toLocaleString(),
               "userType":this.state.userType,
               "isActive":true,
               "language": this.state.language
            }
            
             let formData = new FormData();
        formData.append('alldetails', JSON.stringify(userdetails)); 
        formData.append("userprofilepic", this.state.file);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
          }
        
        axios.put(BaseUrl + '/user/updateUser',formData,{
            headers: headers,
        }).then(resp => {
            if(resp.status===200) {
                toast.success("User Details Updated Successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
                this.props.history.push('/usermanagement')      
            }else{
                toast.error("Please fill correct information!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
            }
        }).catch(err => {
            if(err.request.status === 413){
                toast.error("Profile Image should be less than 1 MB!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
            } else {
            toast.error("Please try again later!!", {
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
    updatePassword(emailId){
        this.props.history.push({pathname:"/updatepassword", params:emailId})
    }
    back(){
        window.history.back();
      }
      componentDidMount(){
          if(localStorage.getItem('token')){
          let details = JSON.parse(localStorage.getItem("loggedinUser"))
          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
            }
          axios.get(BaseUrl + '/user/getUserDetails?userId=' + details.userId, {
              headers: headers,
          }).then(resp => {
              if (resp.status === 200) {
                  this.setState({
                      loggedinUserDetails: resp.data,
                      fname:resp.data.firstName,
                      lname:resp.data.lastName,
                      mobilenum:resp.data.userPhone,
                      emailid:resp.data.userEmail,
                      imagePreviewUrl:resp.data.userImagePath? ImageBaseUrl + resp.data.userImagePath:null,
                      userid:localStorage.getItem('userid'),
                      userType:resp.data.userType,
                      language:resp.data.language?resp.data.language:'English'
                  })
                  i18n.changeLanguage(resp.data.language)
                } else {
                  toast.error("Please try again later!", {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                  });
              }
          })

        } else {
        }
      }


      handleSave(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { lname, fname, emailid,mobilenum } = this.state;
        if (lname && fname && emailid && mobilenum) {
            // this.props.login(username, password);
            this.updateUser();
        }
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
                emailError: "none",
            })
        }
    }
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
                numError: "none",
            })
        }
    }
    handleLang(event){
     this.setState({ language: event.target.value })
     i18n.changeLanguage(event.target.value)
    }
    render() {
        const { t } = this.props;

        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} style={{objectFit:"cover"}} />);
        } else {
            $imagePreview = (<div className="previewText">
                <img src={userdefault} alt="userdefault" className="iconButton" style={{width:"75px"}} />
            </div>);
        }
        toast.configure({ });

        const {  emailid,mobilenum, submitted ,lname,fname} = this.state;
        return (
            <div>
                <Sidebar/>
                 <div style={{textAlign:'center', marginTop: '15px'}}>
              
                <div>
                  <h3 className="Fonts headFontSize" style={{marginLeft:'72px'}}>{t('EditProfileDetails.title')}</h3>
                </div>
              </div>
                <div className="addusercomponent">
                    <Card className="cardDiv">
                        <div className="previewComponent">
                            <form onSubmit={(e) => this._handleSubmit(e)}>
                                <div style={{ position: "relative" }}>
                                    <div className="imgPreview" >
                                        {$imagePreview}
                                        <input className="fileInput"
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(e) => this._handleImageChange(e)} 
                                            id="icon-button-file"
                                            />
                                    </div>
                                    <label htmlFor="icon-button-file">
                                    <IconButton style={{color:"#00D95E"}} aria-label="upload picture" component="span" className="cameradefault">
                                      <PhotoCamera />
                                    </IconButton>
                                    </label>
                                    {/* <img src={cameradefault} alt="cameradefault" className="cameradefault" /> */}
                                </div>
                                <div style={{ margin: 'auto', textAlign: "center" }}>
                                <div className="textFieldStyle">
                                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "16px" }}>{t('EditProfileDetails.fname')}</h6>
                                    {/* <div className={'form-group' + (submitted && !fname ? ' has-error' : '')} style={{marginTop: '10px'}}> */}
                                    <Input className="textBox" value={this.state.fname} style={{ height: '38px', border: this.state.changeColorname }} onClick={this.nameBox} onChange={(event) =>{  event.target.value = event.target.value.replace(/[^A-Z a-z]/ig, '');  this.setState({ fname: event.target.value })}} />
                                  
                                         {submitted && !fname &&
                                    <div className="help-block"> First name is required</div>
                                    }
                                </div>
                                <div className="textFieldStyle">
                                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "16px" }}>{t('EditProfileDetails.lname')}</h6>
                                    {/* <div className={'form-group' + (submitted && !lname ? ' has-error' : '')} style={{marginTop: '10px'}}> */}
                                    <Input className="textBox" value={this.state.lname} style={{ height: '38px', border: this.state.changeColorname1 }} onClick={this.nameBox1} onChange={(event) =>{  event.target.value = event.target.value.replace(/[^A-Z a-z]/ig, '');  this.setState({ lname: event.target.value })}} />
                                   
                                         {submitted && !lname &&
                                    <div className="help-block">Last name is required</div>
                                    }
                                </div>
                                <div className="numaricTextField">
                                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "30px" }}>{t('EditProfileDetails.phone')}</h6>
                                    {/* <div className={'form-group' + (submitted && !mobilenum ? ' has-error' : '')} style={{marginTop: '10px'}}> */}
                                    <Input type="number"  value={this.state.mobilenum}  className="textBox" style={{ height: '38px', border: this.state.changeColornumber }} onClick={this.numberBox} /* onChange={(event) => this.setState({ mobilenum: event.target.value })} */ onChange={this.validNum}  />
                                    
                                         <span style={{ display: this.state.numError,marginLeft:"28rem" }} className="help-block">Mobile number must be 10 digit.</span>                                        
                                         {submitted && !mobilenum &&
                                         <div className="help-block" style={{marginRight:"11rem"}}>Mobile number is required</div>
                                        }
                                </div>
                                    <div className="textFieldStyle">
                                        <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "9px" }}>{t('EditProfileDetails.email')}</h6>
                                        <Input className="textBox"  value={this.state.emailid} style={{ height: '38px', border: this.state.changeColoremail }} onClick={this.emailBox} onChange={this.validEmail} />
                                        <span style={{ display: this.state.emailError,marginLeft:"28rem" }} className="help-block">Invalid Email id.</span>
                                        {submitted && !emailid &&
                                         <div className="help-block" style={{marginRight:"14rem"}}>Email ID is required</div>
                                        }
                                    </div>
                                    <div className="textFieldStyle categorytextFieldStyle" style={{ width: '100%', height:"34px" }}>
                                        <h6 className="InputLabel Fonts SizeFont" style={{width: "75.5%"}} >{t('EditProfileDetails.lang')}</h6>
                                            {/* <Input required className="form-control" name="homeAddressState" value={this.state.homeAddressState} className="textBox" placeholder="State"  style={{ height: '41px', border: this.state.state }} onClick={this.stateBox} onChange={(event) => this.setState({ homeAddressState: event.target.value })} /> */}
                                            <TextField
                                                   id="standard-select-currency"
                                                   select
                                                   required className="form-control" name="language"
                                                   className="incomefield textBox"
                                                   value={this.state.language}
                                                   style={{border:this.state.languagee, borderRadius:"5px"}}
                                                   onClick={this.languageBox}
                                                   onChange={this.handleLang.bind(this)}
                                                 >
                                                  {LangugaeData.map(option => (
                                                    <MenuItem key={option.value} value={option.value} style={{width:"100%"}}>
                                                      {option.label}
                                                    </MenuItem>
                                                  ))}
                                                </TextField>
                                                <div className="Fonts" style={{fontSize:"13px"}}>
                                                <span style={{marginRight: "253px"}}>{this.state.area}</span> <span>{this.state.symbol}</span>
                                                </div>
                                          
                                        </div>                                    <div style={{marginRight:'19%',marginTop:'3%'}}>
                                        <div className="Fonts SizeFont" style={{color:'#00D95E', cursor:"pointer"}} onClick={this.updatePassword.bind(this, this.state.emailid)}>{t('EditProfileDetails.link')} </div>
                                    </div>
                                    <div>
                                        <Button  className="cancelbutton btnSizeFont Fonts" onClick={() => this.props.history.push("/usermanagement")}>
                                            Cancel
                                        </Button>
                                        <Button  className="savebutton btnSizeFont Fonts" onClick={this.handleSave} /* onClick={this.updateUser.bind(this)} */>
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
export default withNamespaces()(UpdateAdminProfile);
