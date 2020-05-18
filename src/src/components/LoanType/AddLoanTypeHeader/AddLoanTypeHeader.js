import React from 'react';
import './AddLoanTypeHeader.css';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export default class AddLoanTypeHeader extends React.Component{
    render(){
        return(
            <div>
                <div className="arrowBackIcon"><ArrowBackIcon /></div>
                <section className='Customerheader'>
                    <AppBar position="static" className='bar'>
                        <Toolbar>
                            <Typography variant="h6" className='title'>
                                <h4 className="addLoanTypeLabel" style={{color:"black"}}> Add Loan Type</h4>
                            </Typography>
                            <div className="addLoanTypebtn" style={{float:"right"}}>
                                <Button  className="cancelbutton btnSizeFont Fonts" onClick={() => this.props.history.push("/customer")}>
                                    Cancel
                                </Button>
                                <Button  className="savebutton btnSizeFont Fonts" onClick={this.handleSubmit}>
                                    Save
                                </Button>
                            </div>
                        </Toolbar>         
                </AppBar>
            </section>
</div>
        );
    }
}
