import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import loginimage from '../../../assets/images/loginimage.svg';
import './ResetPassword.scss';
import { Link } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BaseUrl , headers} from "../../../Environment"
const axios = require('axios');
class ResetPassword extends Component {
    constructor(){
        super();
        this.state = {
            password:"",
            confirmpassword:"",
            submitted: false,
           
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ForgetPassword = this.ForgetPassword.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { confirmpassword, password } = this.state;
        if(password !== confirmpassword){
            // alert("Passwords don't match");
            toast.error("confirm password did not match with new password!!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                });
        } else if (confirmpassword && password) {
            this.ForgetPassword();
        }
        
    }
    ForgetPassword(){
        axios.post(BaseUrl + '/user/reset/confirm',{
            "userEmail": localStorage.getItem("EmailforForgetPassword"),
            "password":this.state.password
        }).then(resp => {
            if(resp.status===201) {
                toast.success("Password changed successfully", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
                    this.props.history.push("/")
            } else{
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
        })
    }
  
    loginPage(){
      this.props.history.push("/")
    }
    handleKey=(event)=>{
        if(event.key === "Enter") {
            this.handleSubmit(event)
        }

    }


    render(){
        toast.configure({}); 
        const {confirmpassword, password, submitted } = this.state;
        return(
            <div className="forgetpasswordpagePage">
                <div className="mainDiv">
                    <div className="firstDiv">
                        <h2 className="firstH3 TextColour">World's number one 360&#176; money collection app</h2>
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
                                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                        <Input type="password" required placeholder="New Password" className="form-control" name="password" className="inputBoxContent Fonts SizeFont" fullWidth  onChange={(event) => this.setState({ password: event.target.value })} onKeyPress={this.handleKey} />
                                            {submitted && !password &&
                                            <div className="help-block" style={{marginRight:"14rem"}}>Password is required</div>
                                            }
                                    </div>
                                    <div className={'form-group' + (submitted && !confirmpassword ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                        <Input type="password" required placeholder="Confirm Password" className="form-control" name="confirmpassword" className="inputBoxContent Fonts SizeFont" fullWidth  onChange={(event) => this.setState({ confirmpassword: event.target.value })} onKeyPress={this.handleKey} />
                                            {submitted && !confirmpassword &&
                                            <div className="help-block" style={{marginRight:"14rem"}}>Password is required</div>
                                            }
                                    </div>
                                    </form>
                                    <div className="btnDiv">
                                    <Button variant="outlined" fullWidth className="Fonts btnSizeFont btn" onClick={this.handleSubmit}>
                                        Submit
                                    </Button>
                                    </div>
                                    <div className="linkDiv HighlightTextColour">
                                        <a className="linkFontSize HighlightTextColour Fonts" style={{ textDecoration: 'underline', cursor:"pointer"}} onClick={this.loginPage.bind(this)}>Go back to Login Page</a></div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                </div>        )
    }
}
    export default ResetPassword
