import React, { Component } from 'react';
import { fetchAPIData } from '../../../service/service';
import LoadingPage from '../../modals/LoadingPage/LoadingPage';
import './CustomerDetails.scss';
import InfoCard from './InfoCard/InfoCard';
import PaymentDetails from './PaymentDetails/PaymentDetails';
import ProfileCard from "./ProfileCard/ProfileCard";




class CustomerDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loanDetails: {},
            customerInfo: {},
            isLoading: false
        };

    }


    async componentWillMount() {
        const { location } = this.props.history

        let loanID, response
        if (location.state && location.state.loanID)
            loanID = location.state.loanID
        else
            loanID = localStorage.getItem('loanId')

        this.setState({ isLoading: true });
        response = await fetchAPIData("loanID", loanID)
        this.setState({ loanDetails: response.loanDetails, isLoading: response.isLoading });
    }

    getCustomerDetailsById = async (loanID) => {
        let response
        this.setState({ isLoading: true });
        response = await fetchAPIData("loanID", loanID)
        this.setState({ loanDetails: response.loanDetails, isLoading: response.isLoading });
    }


    notDone = () => {
        alert("Oops! sorry, this features is under construction")
    }

    render() {

        const { personalCardDetail, infoCard, loanHistoryDetailList,
            tentureType, isLoanActive, cancellationReason, method } = this.state.loanDetails
        const { customerInfo, isLoading } = this.state




        return (
            <div className="customerdetailsinfo">
                <LoadingPage isLoading={isLoading} />
                <div className="MainDiv">
                    <div className="firstcomponent">
                        <ProfileCard
                            action={this.getCustomerDetailsById}
                            customerInfo={customerInfo}
                            personalCardDetail={personalCardDetail}
                            isLoanActive={isLoanActive}
                            cancellationReason={cancellationReason}
                            method={method}
                        />
                    </div>

                    <div className="secondComponent">
                        <div className="infoLayout Fonts" >
                            <InfoCard infoCard={infoCard} isLoanActive={isLoanActive}
                                getCustomerDetailsById={this.getCustomerDetailsById}
                            />
                            <PaymentDetails
                                tentureType={tentureType}
                                loanHistoryDetailList={loanHistoryDetailList}
                                isLoanActive={isLoanActive}
                                method={method}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CustomerDetails;