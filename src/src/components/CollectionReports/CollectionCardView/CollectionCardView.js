import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React, { Component } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CollectionCardView.scss';



class CollectionCardView extends Component {



  render() {

    const { loanCollectionAmount, totalLoanCollectionAmount, overDueAmount, totalOverDueAmount, totalCustomer, paidCustomer, penalty, totalpenalty } = this.props.data

    let paidCustomerPercent = paidCustomer / totalCustomer ? Math.round(paidCustomer * 100 / totalCustomer) : 0
    let loanCollectionPercent = loanCollectionAmount / totalLoanCollectionAmount ? Math.round(loanCollectionAmount * 100 / totalLoanCollectionAmount) : 0
    let overDuePercent = overDueAmount / totalOverDueAmount ? Math.round(overDueAmount * 100 / totalOverDueAmount) : 0
    let penaltyPercent = penalty / totalpenalty ? Math.round(penalty * 100 / totalpenalty) : 0

    return (

      <div className="Allcardviewpage">
        <StatusCard percent={loanCollectionPercent} amount={loanCollectionAmount} totalAmount={totalLoanCollectionAmount} header={"Loan Collection Amount"} />
        <StatusCard percent={overDuePercent} amount={overDueAmount} totalAmount={totalOverDueAmount} header={"Overdue Amount"} />
        <StatusCard percent={paidCustomerPercent} amount={paidCustomer} totalAmount={totalCustomer} header={"Paid customers"} />
        <StatusCard percent={penaltyPercent} amount={penalty} totalAmount={totalpenalty} header={"Penalty"} />

      </div>
    )
  }
}

export default CollectionCardView;



export const StatusCard = props => {
  let { percent, amount, totalAmount, header } = props
  return (
    <Card className="collectionCardDiv">
      <CardHeader
        title={
          <div className="collectionNameDiv Fonts">{header}</div>
        }
      />
      <CardContent>
        <CardHeader
          avatar={
            <div className="avatar">
              <CircularProgressbar value={percent}
                text={`${percent}%`}
                styles={buildStyles({ textColor: '#3E4664', pathColor: '#00D95E', trailColor: '#D2D2DC', textSize: '30px' })} />
            </div>
          }
          title={
            <div className="collectionMoneydetailsDiv Fonts"> {amount}</div>
          }
          subheader={
            <div style={{ display: 'flex' }}>
              <div className="Fonts" style={{ width: 'fit-content', fontSize: '14px', padding: '2px', color: '#757575', fontWeight: '400' }}>Out of {totalAmount}</div>
            </div>
          }
        />
      </CardContent>
    </Card>
  )
}