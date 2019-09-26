import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import loginimage from '../../assets/images/loginimage.svg';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './login.scss';
import { Link } from '@material-ui/core';
import ls from 'local-storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios');




class Login extends Component {
    constructor(){
        super();
        this.state = {
            email:"",
            password:"",
            loginToken:"",
            submitted: false
        }
        this.Login=this.Login.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    Login() {
        console.log('login is clicked')
        axios.post('http://52.172.186.62/fintech/v1/api/user/login',{
            "userEmail":this.state.email,
            "password":this.state.password
        }).then(resp => {
            console.log('login response is:', resp);
            if(resp.request.status===200) {
            this.setState({
                loginToken: resp.data.token
            })
            ls.set('token', this.state.loginToken);
            // ls.get('token')
            if(ls.get('token')!=="")
            this.props.history.push('/usermanagement')                
            } else{
                toast.error("Please fill correct data!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
            }
        }).catch(err => {
            console.log("login error is:", err);
            toast.error("Please fill correct data!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                });
        })
    }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            // this.props.login(username, password);
            this.Login();
        }
    }
    render() {
        // const { loggingIn } = this.props;
        toast.configure({
            // autoClose: 5000,
            // draggable: false,
            // Transition:'flip',
            // hideProgressBar: 'true'.
            // // pauseOnHover: 'false',
            // position="top-center"
            //etc you get the idea
          }); 
        const { email, password, submitted } = this.state;
        return (
            <div className="mainDiv">
                <div className="firstDiv">
                    <h2 className="firstH3 TextColour">Smarter way to track the LOANS</h2>
                </div>
                <div className="secondDiv">
                    <div className="ImageDiv">
                        <img src={loginimage} alt="login" className="loginIMage" />
                    </div>
                    <div className="CardDiv">
                        <div className="CardDiv2">
                            <Card className="CardDiv3"> 
                                <div className="CardDiv4">
                                    <div className="CardDiv5 HighlightTextColour">
                                        <h3 className="Fonts">Welcome!</h3>
                                    </div>
                                <form name="form">
                                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                    <Input type="email" required placeholder="Email address" className="form-control" name="email" className="inputBoxContent Fonts SizeFont" fullWidth onChange={(event) => this.setState({ email: event.target.value })} />
                                {/* </form> */}
                                {submitted && !email &&
                                    <div className="help-block">Username is required</div>
                                }
                                </div>
                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                {/* <form> */}
                                    <Input type="password" required className="form-control" name="password" placeholder="Password" className="inputBoxContent Fonts SizeFont" fullWidth onChange={(event) => this.setState({ password: event.target.value })} />
                                    {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                }
                                </div>
                                </form>
                                <div className="btnDiv">
                                <Button variant="outlined" fullWidth className="Fonts btnSizeFont btn" onClick={this.handleSubmit}>
                                    Login
                                </Button>
                                </div>
                                <div className="linkDiv HighlightTextColour">
                                    <Link className="linkFontSize HighlightTextColour Fonts" style={{ textDecoration: 'underline'}}>Forget password</Link></div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login
