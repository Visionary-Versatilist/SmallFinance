import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import loginimage from '../../assets/images/loginimage.svg';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './signup.scss';
import { toast } from 'react-toastify';
import GooglePlay from '../../assets/images/Group 28315.svg';
import AppStore from '../../assets/images/Group 28316.svg';
import 'react-toastify/dist/ReactToastify.css';
import { BaseUrl } from "../../Environment";
const axios = require('axios')
class Signup extends Component {
    constructor() {
        super();
        this.state = {
            lname: "",
            fname: "",
            type: "",
            emailid: "",
            password: "",
            confirmpassword: "",
            curTime: "",
            mobilenum: "",
            submitted: false,
            emailError: "none",
            validemail: true,
            validnum: true,
            numError: "none",

        }
        this.Register = this.Register.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    Register() {
        const userdetails = ({
            "firstName": this.state.fname,
            "lastName": this.state.lname,
            "userType": "superAdmin",
            "userEmail": this.state.emailid,
            "userPhone": this.state.mobilenum,
            "password": this.state.password,
            "isActive": true,
            "createdAt": this.state.curTime,
            "updatedAt": this.state.curTime
        })
        axios.post(BaseUrl + '/user/signUp', userdetails, {

        }).then(resp => {
            if (resp.request.status === 200) {
                toast.success("Registered successfully !", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
                this.props.history.push('/')
            } else {
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
            if (err.request.status === 401) {
                toast.error(err.response.data.message, {
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
    componentDidMount() {
        setInterval(() => {
            this.setState({
                curTime: new Date().toLocaleString()
            })
        }, 1000)

    }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { lname, fname, emailid, mobilenum, password, confirmpassword } = this.state;
        if (password !== confirmpassword) {
            // alert("Passwords don't match");
            toast.error("confirm password did not match with new password!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        } else if (lname && fname && emailid && mobilenum && password && confirmpassword) {
            // this.props.login(username, password);
            this.Register()
        }

    }

    handleKey = (event) => {
        if (event.key === "Enter") {
            this.handleSubmit(event)
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
                emailError: "none"
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
                numError: "none"
            })
        }
    }
    //   notify = () => toast.success("register successful !", {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     });

    render() {
        toast.configure({
            // autoClose: 2000,
            // draggable: false,
            // Transition:'flip',
            // hideProgressBar: 'true'.
            // // pauseOnHover: 'false',
            // position="top-center"
            //etc you get the idea
        });
        const { lname, fname, emailid, password, mobilenum, confirmpassword, submitted } = this.state;
        return (
            <div className="signupPage">
                <div className="mainDiv">
                    <div style={{marginTop: "4%"}}>
                        <div className="firstDiv">
                            <div className="firstDivOne">
                                <div className="firstH3 TextColour">LEND LIKE A PRO!</div>
                                <div className="firstH4 TextColour">World's First 360&#176; Small Finance Lending App</div>
                            </div>
                        </div>
                        <div className="secondDiv">
                            <div className="ImageDiv">
                                <img src={loginimage} alt="login" className="loginIMage" />
                                <div className="storeButtons">
                                    <div className="storeButtonsOne">
                                        <div className="googlePlay">
                                            <img src={GooglePlay} alt="googlePlay" className="googlePlay" />
                                        </div>
                                        <div className="appStore">
                                            <img src={AppStore} alt="appStore" className="appStore" />
                                        </div>
                                    </div>
                                    <div className="clickHere">
                                        Read our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
                                    </div>
                                </div>
                            </div>
                            <div className="CardDiv">
                                <div className="CardDiv2">
                                    <Card className="CardDiv3">
                                        <div className="CardDiv4">
                                            <div className="CardDiv5 HighlightTextColour">
                                                <h3 className="Fonts">Let's set up your account</h3>
                                            </div>
                                            <form>
                                                <div className={'form-group' + (submitted && !fname ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                    <Input placeholder="First Name" required className="form-control" name="fname" className="inputBoxContent Fonts SizeFont" fullWidth onChange={(event) => this.setState({ fname: event.target.value })} onKeyPress={this.handleKey} />
                                                    {submitted && !fname &&
                                                        <div className="help-block"> First name is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !lname ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                    <Input placeholder="Last Name" required className="form-control" name="lname" className="inputBoxContent Fonts SizeFont" fullWidth onChange={(event) => this.setState({ lname: event.target.value })} onKeyPress={this.handleKey} />
                                                    {submitted && !lname &&
                                                        <div className="help-block">Last name is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !emailid ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                    <Input type="email" placeholder="Email Address" required className="form-control" name="emailid" className="inputBoxContent Fonts SizeFont" fullWidth/*  onChange={(event) => this.setState({ email: event.target.value })} */ onChange={this.validEmail} onKeyPress={this.handleKey} />
                                                    <span style={{ display: this.state.emailError }} className="help-block">Invalid Email id.</span>
                                                    {submitted && !emailid &&
                                                        <div className="help-block" style={{ marginRight: "14rem" }}>Email id is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !mobilenum ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                    <Input type="number" placeholder="10-digit Mobile Number without prefixes" required className="form-control" name="mobilenum" className="inputBoxContent Fonts SizeFont" fullWidth /* onChange={(event) => this.setState({ phone: event.target.value })} */ onChange={this.validNum} onKeyPress={this.handleKey} />
                                                    <span style={{ display: this.state.numError, }} className="help-block">Mobile number must be 10 digit.</span>
                                                    {submitted && !mobilenum &&
                                                        <div className="help-block" style={{ marginRight: "12rem" }}>Mobile number is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                    <Input type="password" placeholder="New Password" required className="form-control" name="password" className="inputBoxContent Fonts SizeFont" fullWidth onChange={(event) => this.setState({ password: event.target.value })} onKeyPress={this.handleKey} />
                                                    {submitted && !password &&
                                                        <div className="help-block">Password is required</div>
                                                    }
                                                </div>
                                                <div className={'form-group' + (submitted && !confirmpassword ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                    <Input type="password" placeholder="Confirm Password" required className="form-control" name="confirmpassword" className="inputBoxContent Fonts SizeFont" fullWidth onChange={(event) => this.setState({ confirmpassword: event.target.value })} onKeyPress={this.handleKey} />
                                                    {submitted && !confirmpassword &&
                                                        <div className="help-block">Confirm your password</div>
                                                    }
                                                </div>
                                            </form>
                                            <div className="btnDiv">
                                                <Button variant="outlined" fullWidth className="Fonts btnSizeFont btn" onClick={this.handleSubmit}>
                                                    SIGN UP
                                                </Button>
                                                {/* <button onClick={this.notify}>Notify !</button> */}
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Signup