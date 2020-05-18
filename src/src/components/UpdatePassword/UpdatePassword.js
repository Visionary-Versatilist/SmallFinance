import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import './UpdatePassword.scss';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Sidebar from '../sidebar/sidebar';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BaseUrl,headers} from "../../Environment";
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';

const axios = require('axios')

class UpdatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeColorname: '1px solid #D4D4D5',
            changeColorname1: '1px solid #D4D4D5',
            changeColornumber: '1px solid #D4D4D5',
            oldpassword:"",
            newpassword:"",
            confirmpassword:"",
            emailid:"",
            submitted: false

        };
        this.nameBox = this.nameBox.bind(this)
        this.nameBox1 = this.nameBox1.bind(this)

        this.numberBox = this.numberBox.bind(this)
        this.emailBox = this.emailBox.bind(this)
        this.categoryBox = this.categoryBox.bind(this)
    }

  
    nameBox() {
        this.setState({
            changeColorname: "1px solid #00D95E",
            changeColorname1: '1px solid #D4D4D5',
            changeColornumber: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5"
        })
    }
    nameBox1() {
        this.setState({
            changeColorname: "1px solid #D4D4D5",
            changeColorname1: '1px solid #00D95E',
            changeColornumber: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5"
        })
    }
    numberBox() {
        this.setState({
            changeColornumber: "1px solid #00D95E",
            changeColorname: "1px solid #D4D4D5",
            changeColorname1: '1px solid #D4D4D5',
            changeColoremail: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5"
        })
    }
    emailBox() {
        this.setState({
            changeColoremail: "1px solid #00D95E",
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
            changeColorname1: '1px solid #D4D4D5',
            changeColorcategory: "1px solid #D4D4D5"
        })
    }
    categoryBox() {
        this.setState({
            changeColorcategory: "1px solid #00D95E",
            changeColoremail: "1px solid #D4D4D5",
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
            changeColorname1: '1px solid #D4D4D5',
        })
    }
    componentDidMount(){
        this.setState({
            emailid:this.props.location.params
        })
    }
    updatepassword(){
        let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"))

          const userdetails = {
               "userEmail":this.state.emailid,
               "password":this.state.newpassword,
               "oldPassword": this.state.oldpassword,
               "companyId":loggedinUser.companyId
            }
        
        axios.post(BaseUrl + '/user/changePassword',userdetails,{
            headers: headers,
        }).then(resp => {
            if(resp.status===200) {
                toast.success("Password Updated Successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
                this.props.history.push('/usermanagement')      
            }else{
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
    }
    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { oldpassword,newpassword, confirmpassword} = this.state;
        if(newpassword !== confirmpassword){
            // alert("Passwords don't match");
            toast.error("confirm password did not match with new password!!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                });
        } else if (oldpassword && newpassword && confirmpassword) {
            // this.props.login(username, password);
            this.updatepassword();
        }
    }
    backLinkAction(){
        this.props.history.push('/updateadmin');
      }

    render() {
        const { t } = this.props;
        const { oldpassword, newpassword, confirmpassword, submitted } = this.state;
        toast.configure({ });

        
        return (
            <div>
                <Sidebar/>
                 <div style={{textAlign:'center', marginTop: '30px'}}>
                <div>
                  <h3 className="Fonts headFontSize" style={{marginLeft:'72px'}}><span className="backLink" onClick={this.backLinkAction.bind(this)}>{t('EditProfileDetails.title')}</span>/ {t('UpdateAdminPassword.subtitle')}</h3>
                </div>
              </div>
                <div className="updatepassowrdcomponent">
                    <Card className="cardDiv">
                        <div className="previewComponent">
                            <form>
                                <div style={{ margin: 'auto', textAlign: "center" }}>
                                <div className="textFieldStyle">
                                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "27px" }}>{t('UpdateAdminPassword.oldPassword')}</h6>
                                    <div className={'form-group' + (submitted && !oldpassword ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                    <Input type="password" className="textBox" style={{ height: '38px', border: this.state.changeColorname }} onClick={this.nameBox} onChange={(event) => this.setState({ oldpassword: event.target.value })} />
                                    {submitted && !oldpassword &&
                                        <div className="help-block-user" style={{paddingLeft: "21.5rem"}}>Old Password is required</div>
                                        }
                                        </div>
                                </div>
                                <div className="textFieldStyle">
                                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "30px" }}>{t('UpdateAdminPassword.newPassword')}</h6>
                                    <div className={'form-group' + (submitted && !newpassword ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                    <Input type="password" className="textBox" style={{ height: '38px', border: this.state.changeColorname1 }} onClick={this.nameBox1} onChange={(event) => this.setState({ newpassword: event.target.value })} />
                                    {submitted && !newpassword &&
                                        <div className="help-block-user" style={{paddingLeft: "21.5rem"}}>New Password is required</div>
                                        }
                                        </div>
                                </div>
                                <div className="numaricTextField">
                                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "40px" }}>{t('UpdateAdminPassword.confirmPassword')}</h6>
                                    <div className={'form-group' + (submitted && !confirmpassword ? ' has-error' : '')} style={{marginTop: '10px'}}>
                                    <Input type="password" className="textBox" style={{ height: '38px', border: this.state.changeColornumber }} onClick={this.numberBox} onChange={(event)=> this.setState({confirmpassword:event.target.value})} />
                                        {submitted && !confirmpassword &&
                                        <div className="help-block-user" style={{paddingLeft: "21.5rem"}}>Confirm Password is required</div>
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
export default withNamespaces()(UpdatePassword);