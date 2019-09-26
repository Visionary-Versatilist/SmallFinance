import React, { Component } from 'react';
import '../header/header.scss';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu'; 
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
        if(window.location.pathname==='/signup') {
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
    login()  {
        console.log('login is clicked')
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
        console.log('signup is clicked')
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
            <section className='root'>
                <AppBar position="static" className='bar'>
                    <Toolbar>
                        {/* <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="h6" className='title'>
                        <img src={companylogo} alt="logo"/>
                        </Typography>
                        <div className='bttn'>
                        {/* <Link to="/signup" style={{ textDecoration: 'none', color: '#3E4664' }}> */}
                            <Button className="Fonts" style={{textTransform:'capitalize',border: this.state.changeColorsignup, color:this.state.Textcolorsignup, backgroundColor:this.state.signupbackground}} onClick={this.signup.bind(this)}>Sign Up</Button>
                            {/* </Link> */}
                        {/* <Link to="/" style={{ textDecoration: 'none', color: '#3E4664' }}> */}
                            <Button className="Fonts" style={{textTransform:'capitalize',border: this.state.changeColorlogin, color:this.state.Textcolorlogin, backgroundColor:this.state.loginbackground}}  onClick={this.login.bind(this)}>Login</Button>
                            {/* </Link>   */}
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
