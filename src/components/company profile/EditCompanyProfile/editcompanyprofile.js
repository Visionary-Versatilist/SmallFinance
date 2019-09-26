import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import penciledit from '../../../assets/images/penciledit.svg';
// import cameradefault from '../../assets/images/cameradefault.svg';
import './editcompanyprofile.scss';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import backbuttn from '../../../assets/images/backbuttn.svg';
import Sidebar from '../../sidebar/sidebar';
class EditCompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeColorname: '1px solid #D4D4D5',
            changeColornumber: '1px solid #D4D4D5',
            changeColoremail: '1px solid #D4D4D5',
            changeColorwebsite:'1px solid #D4D4D5',
            changeColoraddress: '1px solid #D4D4D5',
        };
        this.nameBox = this.nameBox.bind(this)
        this.numberBox = this.numberBox.bind(this)
        this.emailBox = this.emailBox.bind(this)
        this.addressBox = this.addressBox.bind(this)
        this.websiteBox = this.websiteBox.bind(this)
    }
    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }
    nameBox() {
        this.setState({
            changeColorname: "1px solid #00D95E",
            changeColornumber: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorwebsite: "1px solid #D4D4D5",
            changeColoraddress: "1px solid #D4D4D5"
        })
    }
    numberBox() {
        this.setState({
            changeColornumber: "1px solid #00D95E",
            changeColorname: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorwebsite: "1px solid #D4D4D5",
            changeColoraddress: "1px solid #D4D4D5"
        })
    }
    emailBox() {
        this.setState({
            changeColoremail: "1px solid #00D95E",
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
            changeColorwebsite: "1px solid #D4D4D5",
            changeColoraddress: "1px solid #D4D4D5"
        })
    }
    addressBox() {
        this.setState({
            changeColoraddress: "1px solid #00D95E",
            changeColoremail: "1px solid #D4D4D5",
            changeColornumber: "1px solid #D4D4D5",
            changeColorwebsite: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
        })
    }
    websiteBox() {
        this.setState({
            changeColoraddress: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorwebsite: "1px solid #00D95E",
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
        })
    }
    // back(){
    //     window.history.back();
    //   }
    backLinkAction() {
        this.props.history.push('/companyprofile')      
      }
    render(){
        return(
            <div>
                <Sidebar/>
                 <div style={{textAlign:'center', marginTop: '15px'}}>
                {/* <div style={{width:'40%'}}>
                <img src={backbuttn} alt="backicon" style={{paddingLeft: '50px',paddingTop: '23px', cursor:'pointer'}} onClick={this.back.bind(this)} />
                </div> */}
                <div>
                  <h3 className="Fonts headFontSize" style={{marginLeft:'45px'}}><span className="backLink" onClick={this.backLinkAction.bind(this)}>Company Profile</span> / Edit</h3>
                </div>
              </div>
                <div className="companyprofilecomponent">
                    <Card className="cardDiv">
                        <div className="previewComponent">
                            <form onSubmit={(e) => this._handleSubmit(e)}>
                                <div style={{ margin: 'auto', textAlign: "center" , marginTop: '34px' }}>
                                    <div className="textFieldStyle">
                                        <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "31px" }} >Company Name</h6>
                                        <Input className="textBox" style={{ height: '38px', border: this.state.changeColorname }} onClick={this.nameBox} onChange={(event) => this.setState({ name: event.target.value })} />
                                    </div>
                                    <div className="numaricTextField">
                                        <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "30px" }}>Mobile number</h6>
                                        <Input type="number" className="textBox" style={{ height: '38px', border: this.state.changeColornumber }} onClick={this.numberBox} onChange={(event) => this.setState({ mobilenum: event.target.value })} />
                                    </div>
                                    <div className="textFieldStyle">
                                        <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "9px" }}>Email ID</h6>
                                        <Input className="textBox" style={{ height: '38px', border: this.state.changeColoremail }} onClick={this.emailBox} onChange={(event) => this.setState({ emailid: event.target.value })} />
                                    </div>
                                    <div className="textFieldStyle">
                                        <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "9px" }}>Website</h6>
                                        <Input className="textBox" style={{ height: '38px', border: this.state.changeColorwebsite }} onClick={this.websiteBox} onChange={(event) => this.setState({ website: event.target.value })} />
                                    </div>
                                    <div className="textFieldStyle">
                                        <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "9px", marginBottom: '4px' }}>Address</h6>
                                        <TextField className="textBox" margin="dense" multiline rowsMax="10"  style={{borderRadius: '5px', paddingTop: '10px', border: this.state.changeColoraddress }} onClick={this.addressBox} onChange={(event) => this.setState({ address: event.target.value })} ></TextField>
                                    </div>
                                    {/* <div className="categorytextFieldStyle">
                                        <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "10px" }}>Category</h6>
                                        <TextField id="standard-select" select value={this.state.category} className="textBox" style={{ width: "50%", marginLeft: "0%", borderRadius: '5px', border: this.state.changeColorcategory }} onClick={this.categoryBox}
                                            onChange={this.handleChange} >
                                            {Category.map(option => (
                                                <MenuItem key={option.label} value={option.label}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div> */}
                                    <div>
                                        <Button  className="cancelbutton btnSizeFont Fonts" onClick={() => this.props.history.push("/usermanagement")}>
                                                cancel
                                        </Button>
                                            <Button  className="savebutton btnSizeFont Fonts" onClick={() => this.props.history.push("/usermanagement")}>
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
export default EditCompanyProfile;