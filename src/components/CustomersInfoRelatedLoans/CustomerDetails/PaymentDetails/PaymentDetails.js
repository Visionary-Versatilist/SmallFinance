import { Card, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import Pagination from "material-ui-flat-pagination";
import moment from 'moment';
import React, { Component } from 'react';
import { greentick, redcross } from "../../../../assets/images";
import './PaymentDetails.scss';

class PaymentDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tentureType: '',
      loanHistoryDetailList: [],
      isLoanActive: true,
      cancellationReason: '',
      isInstallmentCalculator: false
    };
  }





  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("collectionreport.pdf");
      })
      ;
  }

  componentWillReceiveProps = nextProps => {
    const { tentureType, isLoanActive, loanHistoryDetailList, method } = nextProps
    const isInstallmentCalculator = method === 'Installment Calculator'
    loanHistoryDetailList.sort(function compare(a, b) {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateA - dateB;
    });
    
    console.log(loanHistoryDetailList);
    this.setState({ tentureType, isLoanActive, loanHistoryDetailList, isInstallmentCalculator });
  }

  getPaymentStatusClass = record => {
    return record.flag ? 'NextDue' :
      record.collectionStatus === null ? "" :
        record.collectionStatus === "Paid" ? "Paid" : "Unpaid"
  }

  render() {
    const { tentureType, loanHistoryDetailList,isInstallmentCalculator } = this.state

    // var columnWidths = [
    //   { wch: 200 },
    //   { wch: 200 },
    //   { wch: 250 }
    // ]

    // const tableHeader = [
    //   { label: this.props.tentureType, value: 1 },
    //   { label: 'Opening Balance', value: 1 },
    //   { label: 'Installment', value: 1 },
    //   { label: 'Collection Amount', value: 1 },
    //   { label: 'Closing Balance', value: 1 },
    //   { label: 'Due Date', value: 1 },
    //   { label: 'penalty', value: 1 },
    // ]

    return (
      <div className="paymentdetailspage">
        <div className="tableTitle" >
          <div className="titleDiv">
            <h3 className="title">Loan Schedule</h3><span className="titleText">{`${loanHistoryDetailList.length} ${tentureType}`}</span>
          </div>
          {/* <div className="collectionExportDiv Fonts btnSizeFont">
            <h6>
              Export to:
              </h6>
            <img src={pdf} alt="pdf" className="pdficon" onClick={this.printDocument.bind(this)} />&nbsp;&nbsp;&nbsp;
              <div style={{ margin: "auto" }}>
              <Workbook filename="collectionreport.xlsx" element={<img src={excel} alt="excel" className="excelicon" />}>
                <Workbook.Sheet data={loanHistoryDetailList} columsWidths={columnWidths} name="Collection Report Details">
                  <Workbook.Column label="Customer Name" value="customerName" />
                  <Workbook.Column label="Loan ID" value="loanId" />
                  <Workbook.Column label="Collection Agent" value="collectionAgent" />
                  <Workbook.Column label="Total Amount" value="totalAmount" />
                  <Workbook.Column label="Installment" value="installment" />
                  <Workbook.Column label="Collected Amount" value="collectedAmount" />
                  <Workbook.Column label="Due Date" value="dueDate" />
                  <Workbook.Column label="Collected Sequence" value="collectionSeq" />
                  <Workbook.Column label="penalty" value="penalty" />
                </Workbook.Sheet>
              </Workbook>
            </div>
            &nbsp;&nbsp;&nbsp;
            </div> */}

        </div>
        <Card>
          <div>
            <div className='tableLaylout' >
              <Table aria-label="sticky table" className='table'>
                <TableHead>
                  <TableRow className="tablHeadRowPayment">
                    <TableCell className="tablHeadCellPayment" >{this.props.tentureType}</TableCell>
                    <TableCell className="tablHeadCellPayment">Due Date</TableCell>
                    <TableCell className="tablHeadCellPayment">Opening Balance</TableCell>
                    <TableCell className="tablHeadCellPayment">Installment Amt.</TableCell>
                    {isInstallmentCalculator &&
                      <TableCell className="tablHeadCellPayment">Principal</TableCell>}
                    {isInstallmentCalculator &&
                      <TableCell className="tablHeadCellPayment">Interest</TableCell>}
                    <TableCell className="tablHeadCellPayment">Collection Amt</TableCell>
                    <TableCell className="tablHeadCellPayment">Closing Balance</TableCell>
                    {!isInstallmentCalculator && <TableCell className="tablHeadCellPayment">penalty</TableCell>}
                  </TableRow>
                </TableHead>

                <TableBody  >
                  {loanHistoryDetailList
                    .map((record, index) => (
                      <TableRow className='tableRow' key={index} >
                        <TableCell >{index + 1}</TableCell>
                        <TableCell >{moment(record.dueDate).format("DD MMM YYYY")}</TableCell>
                        <TableCell  >{record.openingBalance}</TableCell>
                        <TableCell>{record.Installment}</TableCell>
                        {isInstallmentCalculator &&
                          <TableCell>{record.principal}</TableCell>}
                        {isInstallmentCalculator &&
                          <TableCell>{record.interest}</TableCell>}

                        <TableCell
                          className={`CollectionAmtCol ${this.getPaymentStatusClass(record)}`}     >
                          {record.collectionAmount}
                          {record.collectionStatus &&
                            <div>
                              <img src={record.collectionStatus === "Paid" ? greentick : redcross} alt={'tick'} />
                              {record.collectionStatus === "Not Paid" &&
                                <div className='tooltip' >{record.additionalComments}</div>
                              }
                            </div>
                          }
                        </TableCell>
                        <TableCell >{record.closingBalance}</TableCell>
                        {!isInstallmentCalculator && <TableCell >{record.PenaltyApplied ? record.PenaltyApplied : "-"}</TableCell>}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            {/* <Pagination
              limit={rowsPerPage}
              offset={page}
              total={loanHistoryDetailList.length}
              onClick={(e, offset) => this.handleChangePage(offset)}
            /> */}
          </div>
        </Card>
      </div>
    )
  }
}
export default PaymentDetails;



