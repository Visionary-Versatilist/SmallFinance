import React, { Component } from 'react';
import '../header/header.scss';
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import companylogo from '../../assets/images/companylogo.svg';
import Signup from '../signup/signup';
import Login from '../login/login';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeColorsignup: '',
            changeColorlogin: '',
            signupbackground:'transparent !important',
            loginbackground:'transparent !important',
            Textcolorlogin:'#3E4664!important',
            Textcolorsignup:'#3E4664!important',
        };
    }
       
    componentDidMount(){
        if(window.location.href.split('#')[1]==='/signup') {
            this.setState({
                changeColorsignup: '1px solid #8E8E98',
                Textcolorsignup: '#00D95E',
                signupbackground:'transparent',
                changeColorlogin: '',
                Textcolorlogin: '#3E4664',
                loginbackground:'transparent',
            })
        } else {
            this.setState({
                changeColorlogin: '1px solid #8E8E98',
                Textcolorlogin: '#00D95E',
                loginbackground:'transparent',
                changeColorsignup: '',
                Textcolorsignup: '#3E4664',
                signupbackground:'transparent'
            })
        }
    }
    componentWillReceiveProps=()=> {
        if(window.location.href.split('#')[1]==='/') {
        this.setState({
            changeColorlogin: '1px solid #8E8E98',
            Textcolorlogin: '#00D95E',
            loginbackground:'transparent',
            changeColorsignup: '',
            Textcolorsignup: '#3E4664',
            signupbackground:'transparent'
        })
    }
    }

    login()  {
        this.setState({
            changeColorlogin: '1px solid #8E8E98',
            Textcolorlogin: '#00D95E',
            loginbackground:'transparent',
            changeColorsignup: '',
            Textcolorsignup: '#3E4664',
            signupbackground:'transparent'
        })
        this.props.history.push('/')        
    }
    signup(){
        this.setState({
            changeColorsignup: '1px solid #8E8E98',
            Textcolorsignup: '#00D95E',
            signupbackground:'transparent',
            changeColorlogin: '',
            Textcolorlogin: '#3E4664',
            loginbackground:'transparent',
        })
        this.props.history.push('/signup')
    }
    render() {
       
        return (
            <section className='headerroot'>
                <AppBar position="static" className='bar'>
                    <Toolbar className="headerDiv">
                        {/*  <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="h6" className='title'>
                        <img src={companylogo} alt="logo" className="image" />
                        </Typography>
                        <div className='bttn'>
                        {/* <Link to="/signup" style={{ textDecoration: 'none', color: '#3E4664' }}> */}
                        <div>
                            <Button className="Fonts" style={{textTransform:'capitalize',border: this.state.changeColorsignup, color:this.state.Textcolorsignup, backgroundColor:this.state.signupbackground,fontWeight: "600"}} onClick={this.signup.bind(this)}>SIGN UP</Button>
                            {/* </Link> */}
                            </div>
                        {/* <Link to="/" style={{ textDecoration: 'none', color: '#3E4664' }}> */}
                        <div>
                            <Button className="Fonts" style={{textTransform:'capitalize',border: this.state.changeColorlogin, color:this.state.Textcolorlogin, backgroundColor:this.state.loginbackground,fontWeight: "600"}}  onClick={this.login.bind(this)}>LOG IN</Button>
                            {/* </Link>   */}</div>
                        </div>
                    </Toolbar>
                </AppBar>
                <div>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  {/* <Route exact path="**" component={Login} /> */}
                </div>
            </section>
        )
    }
}
export default Header