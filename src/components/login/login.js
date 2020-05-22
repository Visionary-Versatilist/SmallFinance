import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import loginimage from '../../assets/images/loginimage.svg';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './login.scss';
import { Link } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GooglePlay from '../../assets/images/Group 28315.svg';
import AppStore from '../../assets/images/Group 28316.svg';
import { BaseUrl } from "../../Environment"
const axios = require('axios');
class Login extends Component {
    constructor() {
        super();
        this.state = {
            emailid: "",
            password: "",
            loginToken: "",
            submitted: false,
            emailError: "none",
            validemail: true,
        }
        this.Login = this.Login.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.LoggedinUser = this.LoggedinUser.bind(this)
    }
    LoggedinUser() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
        axios.get(BaseUrl + '/user/getLoggedInUserDetails?userEmail=' + this.state.emailid, {
            headers: headers,
        }).then(resp => {
            console.log('logged user response is:', resp);
            if (resp.request.status === 200) {
                localStorage.setItem('userid', resp.data.userId)
                localStorage.setItem('loggedinUser', JSON.stringify(resp.data))
                localStorage.setItem('loggedinUserCompany', JSON.stringify(resp.data.companyId))
                this.props.history.push('/dashboard')
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
        })
            .catch(error => {
                // console.log("loginn catch")
                // console.log("login error is:", error);
                // console.log(error.response.status);
                // console.log(error.request);
                // console.log('Error', error.message);
                // console.log(error.response.data);
                // console.log(error.response.headers);

                if (error.request.status === 401) {
                    // console.log("loginn 401 catch", error.request.status)
                    toast.error("something went wrong", {
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
    Login() {
        console.log('login is clicked')
        const headers = {
            'Content-Type': 'application/json',
        }
        const logindata = {
            "userEmail": this.state.emailid,
            "password": this.state.password,
        }
        axios.post(BaseUrl + '/user/login', logindata, {
            headers: headers
        }).then(resp => {
            console.log('login response is:', resp);
            if (resp.status === 200) {
                this.setState({
                    loginToken: resp.data.token
                })
                console.log('tokoe setup in login.js')
                localStorage.setItem('token', JSON.stringify(resp.data.token));
                this.LoggedinUser()
            } else {
                console.log("loginn else")
                toast.error(resp.data.msg, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
            }
        })
            .catch(error => {
                // console.log("loginn catch")
                // console.log("login error is:", error);
                // console.log(error.response.status);
                // console.log(error.request);
                // console.log('Error', error.message);
                // console.log(error.response.data);
                // console.log(error.response.headers);

                if (error.request.status === 401) {
                    // console.log("loginn 401 catch", error.request.status)
                    if (error.response.data.msg === "Password is incorrect") {
                        toast.error(error.response.data.msg, {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                        });
                    } else {
                        toast.error("Please fill registered Email Id", {
                            position: "top-center",
                            autoClose: 2000,
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
        const { emailid, password } = this.state;
        if (emailid && password) {
            this.Login();
        }
    }
    Forgetpassword() {
        this.props.history.push("/forgetpassword")
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
    componentDidMount(){
        console.log("today2",new Date().toLocaleDateString('en-GB'))
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+6).toLocaleDateString('en-GB');
    console.log("week",nextweek)

    var now = new Date();
if (now.getMonth() === 12) {
    var current = new Date(now.getFullYear() + 1,now.getMonth() + 1, now.getDate()).toLocaleDateString('en-GB');
    console.log("month if",current)
} else {
    var current = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()).toLocaleDateString('en-GB');
    console.log("month else",current)
}



    }

    render() {
        toast.configure({});
        const { emailid, password, submitted } = this.state;
        return (
            <div className="loginPage">
                <div className="mainDiv">
                <div style={{marginTop: "7%"}}>
                    <div className="firstDiv">
                        <div className="firstDivOne">
                            <div className="firstH3 TextColour">LEND LIKE A PRO!</div>
                            <div className="firstH4 TextColour">World's First 360&#176; Small Finance App</div>
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
                                            <h3 className="Fonts">Welcome! Please, log into your account</h3>
                                        </div>
                                        <form name="form">
                                            <div className={'form-group' + (submitted && !emailid ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                <Input type="email" required placeholder="Email Address or Mobile Number" className="form-control" name="email" className="inputBoxContent Fonts SizeFont" fullWidth /* onChange={(event) => this.setState({ email: event.target.value })} */ onChange={this.validEmail} onKeyPress={this.handleKey} />
                                                <span style={{ display: this.state.emailError }} className="help-block">Invalid Email id.</span>
                                                {submitted && !emailid &&
                                                    <div className="help-block" style={{ marginRight: "14rem" }}>Email id is required</div>
                                                }
                                            </div>

                                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')} style={{ marginTop: '10px' }}>
                                                <Input type="password" required className="form-control" name="password" placeholder="Password" className="inputBoxContent Fonts SizeFont" fullWidth onChange={(event) => this.setState({ password: event.target.value })} onKeyPress={this.handleKey} />
                                                {submitted && !password &&
                                                    <div className="help-block">Password is required</div>
                                                }
                                            </div>
                                        </form>
                                        <div className="btnDiv">
                                            <Button variant="outlined" fullWidth className="Fonts btnSizeFont btn" onClick={this.handleSubmit}>
                                                LOG IN
                                </Button>
                                        </div>
                                        <div className="linkDiv HighlightTextColour">
                                            <a className="linkFontSize HighlightTextColour Fonts" style={{ textDecoration: 'underline', cursor: "pointer" }} onClick={this.Forgetpassword.bind(this)}>FORGOT PASSWORD?</a></div>
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
export default Login