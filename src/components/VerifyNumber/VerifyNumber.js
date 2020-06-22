import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import loginimage from "../../assets/images/loginimage.svg";
// import "./ForgetPassword.scss";
// import { Link } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaseUrl } from "../../Environment"
const axios = require("axios");
class VerifyNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      submitted: false,
      emailError: "none",
      validemail: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { otp } = this.state;
    if (otp) {
      this.VerifyOtp();
    }
  }
  VerifyOtp = () => {
    console.log("otp==>", this.state.otp)
    let userEmail = localStorage.getItem("registeredEmail")
    if(!this.props.location.params) {
    const details = {
      userEmail: userEmail,
      otp: this.state.otp
    }

    axios.post(BaseUrl + "/user/verifyOtp", details, {
    })
      .then(resp => {
        if (resp.status === 200) {
          toast.success("Registered successfully!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
          this.props.history.push('/')
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
        console.log("err",error.response.data.message)
        // if (error.request.status === 400) {
        //   if (error.response.data.msg === "Password is incorrect") {
            toast.error(error.response.data.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true
            });
        //   } else {
        //     toast.error("Please fill registered Email Id", {
        //       position: "top-center",
        //       autoClose: 2000,
        //       hideProgressBar: true,
        //       closeOnClick: true,
        //       pauseOnHover: false,
        //       draggable: true
        //     });
        //   }
        // }
      });
  } else {
    const details = {
      userEmail: this.props.location.params,
      otp: this.state.otp
    }

    axios.post(BaseUrl + "/user/verifyOtp", details, {
    })
      .then(resp => {
        if (resp.status === 200) {
          toast.success("Registered successfully!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
          this.props.history.push('/')
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
        console.log("err",error.response.data.message)
        // if (error.request.status === 400) {
        //   if (error.response.data.msg === "Password is incorrect") {
            toast.error(error.response.data.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true
            });
        //   } else {
        //     toast.error("Please fill registered Email Id", {
        //       position: "top-center",
        //       autoClose: 2000,
        //       hideProgressBar: true,
        //       closeOnClick: true,
        //       pauseOnHover: false,
        //       draggable: true
        //     });
        //   }
        // }
      });
  }
   
  }

  loginPage() {
    this.props.history.push("/signup");
  }
  handleKey = event => {
    if (event.key === "Enter") {
      this.handleSubmit(event);
    }
  };
  resendOtp = () => {
    if(!this.props.location.params) {
    const userdetails = ({
      "userEmail": localStorage.getItem("registeredEmail"),
      "userPhone": localStorage.getItem("registeredPhone"),
      "createdAt": this.state.curTime,
      "updatedAt": this.state.curTime,
  })
  axios.post(BaseUrl + '/user/sendOtp', userdetails, {

  }).then(resp => {
      if (resp.request.status === 200) {
          toast.success("OTP has been sent to your Email ID and Mobile Number!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
          });
          localStorage.setItem("registeredEmail", this.state.emailid)
          localStorage.setItem("registeredPhone", this.state.mobilenum)
          this.props.history.push('/verifynumber')
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
} else {
  const userdetails = ({
    "userEmail": this.props.location.params,
    // "userPhone": localStorage.getItem("registeredPhone"),
    "createdAt": this.state.curTime,
    "updatedAt": this.state.curTime,
})
axios.post(BaseUrl + '/user/sendOtp', userdetails, {

}).then(resp => {
    if (resp.request.status === 200) {
        toast.success("OTP has been sent to your Email ID and Mobile Number!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
        localStorage.setItem("registeredEmail", this.state.emailid)
        localStorage.setItem("registeredPhone", this.state.mobilenum)
        this.props.history.push('/verifynumber')
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
  }

  render() {
    toast.configure({});
    const { otp, submitted } = this.state;
    return (
      <div className="forgetpasswordpagePage">
        <div className="mainDiv">
          <div className="firstDiv">
            <div className="firstDivOne">
              <div className="firstH3 TextColour">
              Lend like a PRO!
              </div>
              <div className="firstH4 TextColour">
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
                      <h3 className="Fonts">Welcome! Please verify your Lendstack account</h3>
                    </div>
                    <form name="form">
                      <div
                        className={
                          "form-group" +
                          (submitted && !otp ? " has-error" : "")
                        }
                        style={{ marginTop: "10px" }}
                      >
                        <Input
                          type="number"
                          required
                          placeholder="Enter OTP"
                          className="form-control"
                          name="otp"
                          className="inputBoxContent Fonts SizeFont"
                          fullWidth
                          onChange={(event) => this.setState({ otp: event.target.value })}
                          onKeyPress={this.handleKey}
                        />
                        {submitted && !otp &&
                          <div className="help-block" style={{ marginRight: "9rem" }}>Enter your OTP</div>
                        }
                      </div>
                    </form>
                    <div className="linkDiv HighlightTextColour" onClick={this.resendOtp}>
                      <a
                        className="linkFontSize HighlightTextColour Fonts"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer"
                        }}
                      >
                        Resend OTP
                      </a>
                    </div>
                    <div className="btnDiv">
                      <Button
                        variant="outlined"
                        fullWidth
                        className="Fonts btnSizeFont btn"
                        onClick={this.handleSubmit}
                      >
                        SUBMIT
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
                        Go back to Sign Up Page
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
export default VerifyNumber;