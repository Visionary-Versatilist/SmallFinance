import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';

class CancelLoanMessage extends Component {
    constructor() {
        super();
        this.state = {
        };
    }
    handleCloseModal() {
        this.props.close()
    }
    savechanges() {
        this.props.close()
    }
    cancelchanges() {
        this.props.close()
    }

    render() {
        return (
            <div onClick={this.cancelLoanMessage}>
                <div className="cancelloanmessagepage">
                    <Dialog open={this.props.open} className="dialogbox1">
                        <div>Working</div>
                    </Dialog>
                </div>
            </div>
        )
    }
}
export default withRouter(CancelLoanMessage);