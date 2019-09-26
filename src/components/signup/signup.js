import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import loginimage from '../../assets/images/loginimage.svg';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './signup.scss';
// import { Link } from '@material-ui/core';
import ls from 'local-storage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios')

class Signup extends Component {
    constructor(){
        super();
        this.state ={
            name:"",
            type:"",
            email:"",
            password:"",
            confirmpassword:"",
            curTime:"",
            submitted: false
        }
        this.Register=this.Register.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    Register() {
        axios.post('http://52.172.186.62/fintech/v1/api/user/registerUser',{
            "userName":this.state.name,
            "userType":"Admin",
            "userEmail":this.state.email,
            "password":this.state.password,
            "isActive":true,
            "createdAt":this.state.curTime,
            "updatedAt":this.state.curTime
        }).then(resp => {
            console.log('registeration response is:', resp);
            if(resp.request.status===200) {
                toast.success("Registered successfully !", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
                // this.props.history.push('/')               
            }else{
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
            console.log("registeration error is:", err);
            if(err.request.status!==200){
            toast.error("Please fill correct data!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                });
            }
        })
    }
    componentDidMount() {
        setInterval( () => {
          this.setState({
            curTime : new Date().toLocaleString()
          })
        },1000)
        
      }
      handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { name, email, password, confirmpassword } = this.state;
        if (name && email && password && confirmpassword) {
            // this.props.login(username, password);
            this.Register();
        }
    }
    //   notify = () => toast.success("register successful !", {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     });
    
    render() {
        toast.configure({
            // autoClose: 5000,
            // draggable: false,
            // Transition:'flip',
            // hideProgressBar: 'true'.
            // // pauseOnHover: 'false',
            // position="top-center"
            //etc you get the idea
          }); 
        const { name, email, password, confirmpassword, submitted } = this.state;
          return(
            <div>
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
                                    <form>
                                    <div className={'form-group' + (submitted && !name ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                    <Input placeholder="Name" required className="form-control" name="name" className="inputBoxContent Fonts SizeFont" fullWidth onChange={(event) => this.setState({ name: event.target.value })}/>
                                    {submitted && !name &&
                                    <div className="help-block">Name is required</div>
                                    }
                                    </div>
                                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                    <Input type="email" placeholder="Email address" required className="form-control" name="email" className="inputBoxContent Fonts SizeFont" fullWidth onChange={(event) => this.setState({ email: event.target.value })} />
                                    {submitted && !email &&
                                    <div className="help-block">Email is required</div>
                                    }
                                    </div>
                                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                    <Input type="password" placeholder="Password" required className="form-control" name="password" className="inputBoxContent Fonts SizeFont" fullWidth onChange={(event) => this.setState({ password: event.target.value })} />
                                    {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                    }
                                    </div>
                                    <div className={'form-group' + (submitted && !confirmpassword ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                    <Input type="password" placeholder="Confirm password" required className="form-control" name="confirmpassword" className="inputBoxContent Fonts SizeFont" fullWidth onChange={(event) => this.setState({ confirmpassword: event.target.value })} />
                                    {submitted && !confirmpassword &&
                                    <div className="help-block">Confirm your password</div>
                                    }
                                    </div>
                                </form>
                                <div className="btnDiv">
                                <Button variant="outlined" fullWidth className="Fonts btnSizeFont btn" onClick={this.handleSubmit}>
                                    Signup
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
        )
    }
}
export default Signup