import React, { Component } from 'react';
import './Help.scss';
import Sidebar from '../sidebar/sidebar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Card } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withNamespaces } from 'react-i18next';
import i18next from 'i18next';

class Help extends Component {
    constructor() {
        super();
        this.state = {
            takereply: "phonenumber",
        }
    }
    handleChange = event => {
        this.setState({
            takereply: event.target.value
        });
    };
   
    render() {
        const { t } = this.props;

        return (
            <div>
                <Sidebar />
                <div className="HelpMainDiv Fonts">
                    {/* <div className="Helphead">
                        <h3>Help</h3>
                    </div>
                    <Card style={{ margin: "4.6%", padding: "3%" }}>
                        <div style={{ textAlign: "center" }}>
                            <TextareaAutosize style={{ width: "51%", height: "110px", borderRadius: "5px", padding: "15px" }} aria-label="emptytextarea" placeholder="Kindly share your thought here." />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                            <FormControl component="fieldset" style={{ border: "none", width: "47%" }}>
                                <RadioGroup aria-label="position" name="position" value={this.state.takereply} onChange={this.handleChange} row className="Fonts">
                                    <FormControlLabel
                                        value="phonenumber"
                                        control={<Radio style={{ color: "#00D95E" }} />}
                                        label="Get reply by phone number"
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="email"
                                        className="partialPayment"
                                        control={<Radio style={{ color: "#00D95E" }} />}
                                        label="Get reply by email"
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <div>
                                <button className="SaveButton Fonts">submit</button>
                            </div>
                        </div>
                    </Card> */}
                    <div style={{ textAlign: "center",paddingTop: "2rem" }}>
                        <h2>{t('FAQ.title')}</h2>
                    </div>
                    <div style={{margin: "3.6rem"}}>
                        {t('FAQ.questions', {returnObjects: true}).map(data=>(
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography style={{fontSize:"16px" ,fontWeight:"400"}} className="Fonts" >{data.que}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                  <Typography style={{color:"grey"}} className="Fonts">{data.ans}</Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
export default withNamespaces()(Help)
