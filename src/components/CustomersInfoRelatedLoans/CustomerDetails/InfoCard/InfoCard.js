import React, { Component } from "react";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CancelLoan from "../../../modals/CancelLoan/CancelLoan";
import "./InfoCard.scss";

class InfoCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isCancelLoanPopupActive: false,
      headerData: '',
      loanOverView: '',
      amountOverView: '',
      loanId: '',
      isLoanActive: true,
      isInstallmentCalculator: false
    };
  }

  componentWillReceiveProps = nextProps => {
    let headerData, loanOverView, amountOverView, loanId, isLoanActive, isInstallmentCalculator
    headerData = nextProps.infoCard.headerData
    loanOverView = nextProps.infoCard.loanOverView
    amountOverView = nextProps.infoCard.amountOverView

    isInstallmentCalculator = nextProps.infoCard.loanOverView.method === 'Installment Calculator'
    loanId = nextProps.infoCard.loanId
    isLoanActive = nextProps.isLoanActive
    this.setState({
      headerData, loanOverView, amountOverView, loanId, isLoanActive, isInstallmentCalculator
    });
  }


  toggleCancelPopup = (value) => {
    let { isCancelLoanPopupActive, loanId } = this.state
    const { getCustomerDetailsById } = this.props

    isCancelLoanPopupActive = !isCancelLoanPopupActive
    this.setState({ isCancelLoanPopupActive });
    console.log('aransae ', value)
    if (value === 'confirm') {
      console.log('api call with loan id initilzed', loanId)
      getCustomerDetailsById(loanId)
    }

  }

  notDone = () => {
    alert("Oops! sorry, this features is under construction")
  }

  render() {

    const { isCancelLoanPopupActive, headerData, loanOverView, amountOverView, loanId, isLoanActive, isInstallmentCalculator } = this.state
    const { action } = this.props

    return (
      <div className="infoCardComponent">
        {/* toggleCancelPopup */}
        <CustomerInfoHeader
          headerData={headerData}
          isLoanActive={isLoanActive}
          isInstallmentCalculator={isInstallmentCalculator}
          cancelClickEvent={this.toggleCancelPopup}
        />

        <CustomerLoanInfo loanOverView={loanOverView} isInstallmentCalculator={isInstallmentCalculator} />

        <LoanProgress amountOverView={amountOverView} />

        {/* {true && <CancelLoan />} */}
        <CancelLoan loanId={loanId} open={isCancelLoanPopupActive} cancel={this.toggleCancelPopup} action={action} />

      </div>
    );
  }
}
export default InfoCard;


let CustomerLoanInfo = (props) => {

  const { duration, collectionSequence, collectorName, method, penalty } = props.loanOverView
  const { isInstallmentCalculator } = props


  return (
    <div className="infoCard">
      <div className="cardContent">
        <div className="infocardmainDiv" >
          <div className="cardDetail duration">
            <h4 className="h4heading Fonts">{duration}</h4>
            <p className="pHeading Fonts">Duration</p>
          </div>

          <div className="cardDetail Fonts">
            <h4 className="h4heading Fonts">{collectionSequence}</h4>
            <p className="pHeading Fonts">Collection seq</p>
          </div>

          <div className="cardDetail Fonts">
            <h4 className="h4heading Fonts">{collectorName}</h4>
            <p className="pHeading Fonts">Collection Agent</p>
          </div>

          <div className="cardDetail">
            <h4 className="h4heading Fonts">{method}</h4>
            <p className="pHeading Fonts">Method</p>
          </div>

          {!isInstallmentCalculator &&
            <div className="cardDetail">
              <h4 className="h4heading Fonts">{penalty}</h4>
              <p className="pHeading Fonts">Penalty</p>
            </div>}
        </div>
      </div>
    </div>
  )
}


let CustomerInfoHeader = (props) => {

  const { loanType, totalLoanAmount, location, time, moratoriumPeriods, rateOfInterest } = props.headerData
  const { cancelClickEvent, isLoanActive, isInstallmentCalculator } = props
  let countryCurrency = JSON.parse(localStorage.getItem("companyCountry"))
  let countryCurrencySymbol = countryCurrency.symbol;

  return (
    <div className="headerPart">
      <div className="headerLeft">
        <div className="headerPartOne">
          <div className="headerPartOneOne Fonts">
            {countryCurrencySymbol} {totalLoanAmount}
            {isInstallmentCalculator && <span> at {rateOfInterest} %</span>}
          </div>
          <div className="headerPartOneTwo Fonts"> {loanType}</div>
        </div>
      </div>

      <div className="headerRightSide">

        {
          isInstallmentCalculator &&

          <div className="headerPartTwo">
            <div className="headerPartTwoOne Fonts"> {moratoriumPeriods} months</div>
            <div className="headerPartTwoTwo Fonts">Moratorium </div>
          </div>
        }
        {isInstallmentCalculator && <div className="headerPartTwo">
          <div className="headerPartTwoOne Fonts"> {totalLoanAmount}</div>
          <div className="headerPartTwoTwo Fonts">Value after Moratorium </div>
        </div>
        }

        <div className="headerPartTwo">
          <div className="headerPartTwoOne Fonts"> {location}</div>
          <div className="headerPartTwoTwo Fonts">Collection Loc.</div>
        </div>

        <div className="headerPartThree">
          <div className="headerPartThreeOne Fonts"> {time}</div>
          <div className="headerPartThreeTwo Fonts">Collection Time</div>
        </div>
        <div className="headerPartFour">
          <button
            onClick={cancelClickEvent}
            disabled={!isLoanActive}
            className={isLoanActive ? 'cancelBtn' : 'cancelBtn disableLoanButton'} >
            Cancel
            </button>
        </div>
      </div>
    </div >
  )
}

let LoanProgress = (props) => {
  const { totalAmountPaid, balanceData, percentage, paidPenalty } = props.amountOverView
  let countryCurrency = JSON.parse(localStorage.getItem("companyCountry"))
    let countryCurrencySymbol = countryCurrency.symbol;
    console.log("currency symbol",countryCurrencySymbol )
  return (
    <div className="loanProgress">

      <div className="progress" >
        <div className="circularBar Fonts">
          <CircularProgressbarWithChildren
            counterClockwise={true}
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: "black",
              pathColor: "#00D95E",
              trailColor: "rgb(177, 169, 169)",
              fontWeight: "bold",
            })}
          >
            <div style={{ fontSize: "9px", marginTop: "26px", color: "#a8a8a8" }} className="Fonts">
              Received
          </div>
          </CircularProgressbarWithChildren>
        </div>
        <div className="MainAmountDisplay">
          <div className="amountDisplay Fonts">

            {countryCurrencySymbol}&nbsp;&nbsp;{totalAmountPaid}

            <div className="type Fonts">Total Amount Paid</div>
          </div>

          <div className="amountDisplay Fonts">
            {countryCurrencySymbol}&nbsp;&nbsp;{balanceData}
            <div className="type Fonts">Balance Amount</div>
          </div>
          <div className="amountDisplay Fonts">
            {countryCurrencySymbol}&nbsp;&nbsp;{paidPenalty}
            <div className="type Fonts">Penalty Applied</div>
          </div>
        </div>
      </div >
    </div >
  )
}


