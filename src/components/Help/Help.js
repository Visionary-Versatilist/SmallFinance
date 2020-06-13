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
