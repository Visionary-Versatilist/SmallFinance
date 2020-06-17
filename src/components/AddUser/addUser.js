import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import userdefault from '../../assets/images/userdefault.svg';
import './addUser.scss';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Sidebar from '../sidebar/sidebar';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {BaseUrl} from "../../Environment"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withNamespaces } from 'react-i18next';


const axios = require('axios')


class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            imagePreviewUrl: '',
            fname:"",
            lname:"",
            type:"",
            emailid:"",
            password:"",
            confrimpassword:"",
            mobilenum:"",
            validemail: true,
            emailError: "none",
            validnum: true,
            numError: "none",
            changeColorname: '1px solid #D4D4D5',
            changeColorname1:'1px solid #D4D4D5',
            changeColornumber: '1px solid #D4D4D5',
            changeColoremail: '1px solid #D4D4D5',
            changeColorpassword: '1px solid #D4D4D5',
            changeColorcategory: '1px solid #D4D4D5',
            category: "",
            submitted: false,
            reqnum:"",
            reqemail:""
        };
        this.nameBox = this.nameBox.bind(this)
        this.nameBox1 = this.nameBox1.bind(this)

        this.numberBox = this.numberBox.bind(this)
        this.emailBox = this.emailBox.bind(this)
        this.passwordBox = this.passwordBox.bind(this)
        this.categoryBox = this.categoryBox.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validEmail = this.validEmail.bind(this)
        this.validNum = this.validNum.bind(this)

    }

    _handleSubmit(e) {
        e.preventDefault();
    }

    _handleImageChange(e) {
        e.preventDefault();
        if(e.target.files[0].size > 1000000){
            toast.error("File size should be less than 1 Mb", {
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
    }
    }
    handleChange = event => {
        this.setState({ category: event.target.value });
    };
    nameBox() {
        this.setState({
            changeColorname: "1px solid #00D95E",
            changeColorname1:'1px solid #D4D4D5',
            changeColornumber: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5",
            changeColorpassword: "1px solid #D4D4D5",

        })
    }
    nameBox1() {
        this.setState({
            changeColorname: "1px solid #D4D4D5",
            changeColorname1:'1px solid #00D95E',
            changeColornumber: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5",
            changeColorpassword: "1px solid #D4D4D5",

        })
    }
    numberBox() {
        this.setState({
            changeColornumber: "1px solid #00D95E",
            changeColorname1:'1px solid #D4D4D5',
            changeColorname: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5",
            changeColorpassword: "1px solid #D4D4D5",

        })
    }
    emailBox() {
        this.setState({
            changeColoremail: "1px solid #00D95E",
            changeColorname1:'1px solid #D4D4D5',
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5",
            changeColorpassword: "1px solid #D4D4D5",

        })
    }
    passwordBox() {
        this.setState({
            changeColoremail: "1px solid #D4D4D5",
            changeColorname1:'1px solid #D4D4D5',
            changeColorpassword: "1px solid #00D95E",
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5"
        })
    }
    categoryBox() {
        this.setState({
            changeColorcategory: "1px solid #00D95E",
            changeColorname1:'1px solid #D4D4D5',
            changeColoremail: "1px solid #D4D4D5",
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
            changeColorpassword: "1px solid #D4D4D5",
        })
    }
    // back(){
    //     window.history.back();
    //   }
      backLinkAction() {
        this.props.history.push('/usermanagement')      
      }
      
      create(){
          let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))
          
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))
          }
          const userdetails = JSON.stringify({
            "firstName":this.state.fname,
            "lastName": this.state.lname,
            "userType":this.state.category,
            "userEmail":this.state.emailid,
            "password":this.state.password,
            "userPhone":this.state.mobilenum,
            "isActive":true,
            "companyId": loggedinUser.companyId
          })
          let formData = new FormData();
          formData.append('alldetails', userdetails); 
          formData.append("userprofilepic", this.state.file);
          axios.post(BaseUrl + '/user/registerUser',formData,{
            headers: headers,
        }).then(resp => {
            if(resp.request.status===200) {
                toast.success("User Added Successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
                this.props.history.push('/usermanagement')               
            }else{
                toast.error("Please enter all mandatory details!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
            }
        }).catch(error => {
            console.log("agent catch")
            if (error.request.status === 401) {               
                if (error.response.data.message === "User already exists with the above EmailID") {
                    toast.error(error.response.data.message, {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                    });
                } else {
                    toast.error(error.response.data.message, {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                    });

                }
            }
            
        })
      }
      handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { fname,lname, password,confrimpassword, category, emailid, mobilenum, file } = this.state;
        if (fname && lname && password && confrimpassword && category && emailid && mobilenum && file) {
            // this.props.login(username, password);
            this.create();
        }
    }
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
        return re.test(email)
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
                emailError: "flex",
                reqemail:"none"
            })
        } else {
            this.setState({
                emailError: "none"
            })
        }
    }
    validateNum(mobilenum) {
        const re = /^\d{10}$/g
        return re.test(mobilenum)
    }
    validNum = (event) => {
        // event.target.value = event.target.value.replace(/^[0-9\b]+$/)
        const mobilenum = event.target.value
        const numVaild = this.validateNum(mobilenum)
        this.setState({
            mobilenum: event.target.value,
            validNum: numVaild
        })
        if (numVaild === false) {
            this.setState({
                numError: "flex",
                reqnum:"none"
            })
        } else {
            this.setState({
                numError: "none"
            })
        }
    }

    render() {
        const { t } = this.props;

        toast.configure({ });
        let file=this.state.file;
        file.fieldname="userprofilepic";
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">
                <img src={userdefault} alt="userdefault" className="iconButton" style={{width:"75px"}} />
            </div>);
        }
        const Category = [
            { value: 'Admin', label: 'Admin' },
            { value: 'CollectionAgent', label: 'Collection Agent', },
            // { value: 'Executive', label: 'Executive', },
        ];
        const { fname,lname, password,confrimpassword, category, emailid, mobilenum, submitted } = this.state;
        return (
            <div>
                <Sidebar/>
                <div style={{textAlign:'center', marginTop: '15px'}}>
                {/* <div style={{width:'40%'}}>
                <img src={backbuttn} alt="backicon" style={{paddingLeft: '50px',paddingTop: '23px', cursor:'pointer'}} onClick={this.back.bind(this)} />
                </div> */}
                <div>
                  <h3 className="Fonts headFontSize" style={{marginLeft:'45px'}}><span className="backLink" onClick={this.backLinkAction.bind(this)}>{t('UserManagement.title')}</span> / {t('AddUser.Button')}</h3>
                </div>
              </div>
                <div className="addusercomponent">
                    <Card className="cardDiv">
                        <div className="previewComponent">
                            <form name="form" onSubmit={(e) => this._handleSubmit(e)}>
                                <div style={{ position: "relative" }}>
                                    <div className="imgPreview">
                                        {$imagePreview}
                                        <input className="fileInput"
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(e) => this._handleImageChange(e)}
                                            id="icon-button-file"
                                             />
                                    </div>
                                    {/* <img src={cameradefault} alt="cameradefault" className="cameradefault" /> */}
                                    <label htmlFor="icon-button-file">
                                    <IconButton style={{color:"#00D95E"}} aria-label="upload picture" component="span" className="cameradefault">
                                      <PhotoCamera />
                                    </IconButton>
                                    </label>
                                </div>
                                <div style={{ margin: 'auto', textAlign: "center" }}>
                                    <div className="textFieldStyle">
                                        <h6 className="InputLabel One Fonts fontSize" style={{ marginLeft: "16px" }}>{t('EditProfileDetails.fname')}</h6>
                                        <div className={'form-group' + (submitted && !fname ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                        <Input className="textBox" placeholder="Given Name / Middle Name" required className="form-control" name="fname" style={{ height: '38px', border: this.state.changeColorname }} onClick={this.nameBox} onChange={(event) =>{  event.target.value = event.target.value.replace(/[^A-Z a-z]/ig, ''); this.setState({ fname: event.target.value })}} />
                                        {submitted && !fname &&
                                        <div className="help-block-user">First name is required</div>
                                        }
                                        </div>
                                    </div>
                                    <div className="textFieldStyle">
                                        <h6 className="InputLabel Two Fonts fontSize" style={{ marginLeft: "16px" }}>{t('EditProfileDetails.lname')}</h6>
                                        <div className={'form-group' + (submitted && !lname ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                        <Input className="textBox" placeholder="Surname / Family Name" required className="form-control" name="lname" style={{ height: '38px', border: this.state.changeColorname1 }} onClick={this.nameBox1} onChange={(event) =>{  event.target.value = event.target.value.replace(/[^A-Z a-z]/ig, ''); this.setState({ lname: event.target.value })}} />
                                        {submitted && !lname &&
                                        <div className="help-block-user">Last name is required</div>
                                        }
                                        </div>
                                    </div>
                                    <div className="numaricTextField">
                                        <h6 className="InputLabel Three Fonts fontSize" style={{ marginLeft: "30px" }}>{t('EditProfileDetails.phone')}</h6>
                                        <div className={'form-group' + (submitted && !mobilenum ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                        <Input type="number"  placeholder="10-digit mobile number without prefixes" required className="form-control" name="mobilenum" className="textBox" style={{ height: '38px', border: this.state.changeColornumber }} onClick={this.numberBox} onChange={this.validNum} />
                                        <span style={{ display: this.state.numError, paddingLeft:"35rem"}} className="help-block">10-digit mobile number without prefixes.</span>                                                                                    
                                        {submitted && !mobilenum &&
                                        <div className="help-block-user" style={{display:this.state.reqnum}}>Mobile Number is required</div>
                                        }
                                        </div>
                                    </div>
                                    <div className="textFieldStyle">
                                        <h6 className="InputLabel Four Fonts fontSize" style={{ marginLeft: "9px" }}>{t('EditProfileDetails.email')}</h6>
                                        <div className={'form-group' + (submitted && !emailid ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                        <Input className="textBox" placeholder="smith@example.com" required className="form-control" name="emailid" style={{ height: '38px', border: this.state.changeColoremail }} onClick={this.emailBox} onChange={this.validEmail} />
                                        <span style={{ display: this.state.emailError, paddingLeft:"35rem"}} className="help-block">Invalid Email ID.</span>                                       
                                        {submitted && !emailid &&
                                        <div className="help-block-user"  style={{display:this.state.reqemail}}>Email ID is required</div>
                                        }
                                        </div>
                                    </div>
                                    <div className="textFieldStyle">
                                        <h6 className="InputLabel Five Fonts fontSize" style={{ marginLeft: "9px" }}>{t('UpdateAdminPassword.password')}</h6>
                                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                        <Input className="textBox" placeholder="New Password" type="password" required className="form-control" name="password" style={{ height: '38px', border: this.state.changeColorpassword }} onClick={this.passwordBox} onChange={(event) => this.setState({ password: event.target.value })} />
                                        {submitted && !password &&
                                        <div className="help-block-user">New Password is required</div>
                                        }
                                        </div>
                                    </div>
                                    <div className="textFieldStyle">
                                        <h6 className="InputLabel Six Fonts fontSize" style={{ marginLeft: "38px" }}>{t('UpdateAdminPassword.confirmPassword')}</h6>
                                        <div className={'form-group' + (submitted && !confrimpassword ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                        <Input className="textBox" placeholder="Confirm Password" type="password" required className="form-control" name="confrimpassword" style={{ height: '38px', border: this.state.changeColorpassword }} onClick={this.passwordBox} onChange={(event) => this.setState({ confrimpassword: event.target.value })} />
                                        {submitted && !confrimpassword &&
                                        <div className="help-block-user">Confirm Password is required</div>
                                        }
                                        </div>
                                    </div>
                                    <div className="categorytextFieldStyle">
                                        <h6 className="InputLabel Seven Fonts fontSize" style={{ marginLeft: "10px" }}>{t('AddUser.Cat')}</h6>
                                        <div className={'form-group' + (submitted && !category ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                        <TextField id="standard-select" select value={this.state.category} required className="form-control" name="category" className="textBox" style={{ width: "29%", marginLeft: "0%", borderRadius: '5px', border: this.state.changeColorcategory }} onClick={this.categoryBox}
                                            onChange={this.handleChange} >
                                            {Category.map(option => (
                                                <MenuItem key={option.label} value={option.label}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        {submitted && !category &&
                                        <div className="help-block-user">Category is required</div>
                                        }
                                        </div>
                                    </div>
                                    <div>
                                        <Button  className="cancelbutton btnSizeFont Fonts" onClick={() => this.props.history.push("/usermanagement")}>
                                                cancel
                                        </Button>
                                            <Button  className="savebutton btnSizeFont Fonts" onClick={this.handleSubmit.bind(this)}>
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
export default withNamespaces()(AddUser);