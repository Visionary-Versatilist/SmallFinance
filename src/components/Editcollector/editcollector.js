import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import userdefault from '../../assets/images/userdefault.svg';
import cameradefault from '../../assets/images/cameradefault.svg';
import './editcollector.scss';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import backbuttn from '../../assets/images/backbuttn.svg';
import Sidebar from '../sidebar/sidebar';

class EditCollectorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            changeColorname: '1px solid #D4D4D5',
            changeColornumber: '1px solid #D4D4D5',
            changeColoremail: '1px solid #D4D4D5',
            changeColorcategory: '1px solid #D4D4D5',
            category: "collector",
        };
        this.nameBox = this.nameBox.bind(this)
        this.numberBox = this.numberBox.bind(this)
        this.emailBox = this.emailBox.bind(this)
        this.categoryBox = this.categoryBox.bind(this)
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }
    handleChange = event => {
        console.log("event")
        console.log(event.target.value)
        this.setState({ category: event.target.value });
        // this.setState({ vehiclemodel: event.target.value })
    };
    nameBox() {
        this.setState({
            changeColorname: "1px solid #00D95E",
            changeColornumber: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5"
        })
    }
    numberBox() {
        this.setState({
            changeColornumber: "1px solid #00D95E",
            changeColorname: "1px solid #D4D4D5",
            changeColoremail: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5"
        })
    }
    emailBox() {
        this.setState({
            changeColoremail: "1px solid #00D95E",
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
            changeColorcategory: "1px solid #D4D4D5"
        })
    }
    categoryBox() {
        this.setState({
            changeColorcategory: "1px solid #00D95E",
            changeColoremail: "1px solid #D4D4D5",
            changeColornumber: "1px solid #D4D4D5",
            changeColorname: "1px solid #D4D4D5",
        })
    }
    // back(){
    //     window.history.back();
    //   }
      backLinkAction() {
        this.props.history.push('/usermanagement')      
      }
    render(){
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">
                <img src={userdefault} alt="userdefault" className="iconButton" />
            </div>);
        }
        const Category = [
            { value: 'user', label: 'user' },
            { value: 'collector', label: 'collector', },
        ];
        return(
            <div><Sidebar/>
                <div style={{textAlign:'center', marginTop: '15px'}}>
                {/* <div style={{width:'40%'}}>
                <img src={backbuttn} alt="backicon" style={{paddingLeft: '50px',paddingTop: '23px', cursor:'pointer'}} onClick={this.back.bind(this)} />
                </div> */}
                <div>
                  <h3 className="Fonts headFontSize" style={{marginLeft:'45px'}}><span className="backLink" onClick={this.backLinkAction.bind(this)}>User Management</span> / Edit</h3>
                </div>
              </div>
            <div className="editcollectorcomponent">
                <Card className="cardDiv">
                    <div className="previewComponent">
                        <form onSubmit={(e) => this._handleSubmit(e)}>
                            <div style={{ position: "relative" }}>
                                <div className="imgPreview">
                                    {$imagePreview}
                                    <input className="fileInput"
                                        type="file"
                                        onChange={(e) => this._handleImageChange(e)} />
                                </div>
                                <img src={cameradefault} alt="cameradefault" className="cameradefault" />
                            </div>
                            <div style={{ margin: 'auto', textAlign: "center" }}>
                                <div className="textFieldStyle">
                                    <h6 className="InputLabel Fonts SizeFont">Name</h6>
                                    <Input className="textBox" defaultValue="Krsnvyan" style={{ height: '38px', border: this.state.changeColorname }} onClick={this.nameBox} onChange={(event) => this.setState({ name: event.target.value })} />
                                </div>
                                <div className="numaricTextField">
                                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "30px" }}>Mobile number</h6>
                                    <Input type="number" defaultValue="01234567895" className="textBox" style={{ height: '38px', border: this.state.changeColornumber }} onClick={this.numberBox} onChange={(event) => this.setState({ mobilenum: event.target.value })} />
                                </div>
                                <div className="textFieldStyle">
                                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "9px" }}>Email ID</h6>
                                    <Input className="textBox" defaultValue="erosscandra019@gmail.com" style={{ height: '38px', border: this.state.changeColoremail }} onClick={this.emailBox} onChange={(event) => this.setState({ emailid: event.target.value })} />
                                </div>
                                <div className="categorytextFieldStyle" >
                                    <h6 className="InputLabel Fonts SizeFont" style={{ marginLeft: "10px" }}>Category</h6>
                                    <TextField id="standard-select" select value={this.state.category} className="textBox" style={{ width: "29%", marginLeft: "0%", borderRadius: '5px', border: this.state.changeColorcategory }} onClick={this.categoryBox}
                                        onChange={this.handleChange} disabled >
                                        {Category.map(option => (
                                            <MenuItem key={option.label} value={option.label}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
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
export default EditCollectorProfile;