import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import loginimage from "../../../assets/images/loginimage.svg";
import "./ForgetPassword.scss";
import { Link } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BaseUrl, headers} from "../../../Environment"
const axios = require("axios");
class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      emailid: "",
      submitted: false,
      emailError: "none",
      validemail: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ForgetPassword = this.ForgetPassword.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { emailid } = this.state;
    if (emailid) {
      this.ForgetPassword();
    }
  }
  ForgetPassword() {
    localStorage.setItem("EmailforForgetPassword", this.state.emailid);
    axios.post(BaseUrl + "/user/forgotPassword", {
        userEmail: this.state.emailid
      })
      .then(resp => {
        if (resp.status === 200) {
          toast.success("Kindly check your email to change the password", {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true
          });
        } else {
          toast.error(resp.data.msg, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true
          });
        }
      })
      .catch(error => {
        if (error.request.status === 400) {
          if (error.response.data.msg === "Password is incorrect") {
            toast.error(error.response.data.msg, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true
            });
          } else {
            toast.error("Please fill registered Email Id", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true
            });
          }
        }
      });
  }
  validateEmail(emailid) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    return re.test(emailid);
  }

  validEmail = event => {
    const emailid = event.target.value;
    const emailVaild = this.validateEmail(emailid);
    this.setState({
      emailid: event.target.value,
      validEmail: emailVaild
    });
    if (emailVaild === false) {
      this.setState({
        emailError: "flex"
      });
    } else {
      this.setState({
        emailError: "none"
      });
    }
  };
  loginPage() {
    this.props.history.push("/");
  }
  handleKey = event => {
    if (event.key === "Enter") {
      this.handleSubmit(event);
    }
  };

  render() {
    toast.configure({});
    const { emailid, submitted } = this.state;
    return (
      <div className="forgetpasswordpagePage">
        <div className="mainDiv">
          <div className="firstDiv">
            <div className="firstDivOne">
              <div className="firstH3 TextColour">
              LEND LIKE A PRO!
              </div>
              <div className="firstH4 ">
              World’s Best in Class Small Finance Lending App
              </div>
            </div>
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
                      <div
                        className={
                          "form-group" +
                          (submitted && !emailid ? " has-error" : "")
                        }
                        style={{ marginTop: "10px" }}
                      >
                        <Input
                          type="email"
                          required
                          placeholder="Email address"
                          className="form-control"
                          name="email"
                          className="inputBoxContent Fonts SizeFont"
                          fullWidth
                          /* onChange={(event) => this.setState({ email: event.target.value })} */ onChange={
                            this.validEmail
                          }
                          onKeyPress={this.handleKey}
                        />
                        <span
                          style={{ display: this.state.emailError }}
                          className="help-block"
                        >
                          Invalid Email id.
                        </span>
                        {submitted && !emailid && (
                          <div
                            className="help-block"
                            style={{ textAlign:"left" }}
                          >
                            Email id is required
                          </div>
                        )}
                      </div>
                    </form>
                    <div className="btnDiv">
                      <Button
                        variant="outlined"
                        fullWidth
                        className="Fonts btnSizeFont btn"
                        onClick={this.handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                    <div className="linkDiv HighlightTextColour">
                      <a
                        className="linkFontSize HighlightTextColour Fonts"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer"
                        }}
                        onClick={this.loginPage.bind(this)}
                      >
                        Go back to Login Page
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ForgetPassword;