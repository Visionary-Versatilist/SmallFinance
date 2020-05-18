import { Card, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TablePagination } from "@material-ui/core";
import moment from "moment";
import React, { Component } from 'react';
import excel from '../../../assets/images/excel.svg';
import pdf from '../../../assets/images/pdf.svg';
import Sidebar from "../../sidebar/sidebar";
import "./ReportTable.scss";
import Pagination from "material-ui-flat-pagination";
import { Workbook } from "react-excel-workbook";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { withRouter } from "react-router-dom";



class ReportTable extends Component {
  constructor(props) {
    super();
    this.state = {
      headerTag: "",
      rowsPerPage: 10,
      page: 0,
      headerList: [
        { name: "Customer Name", arrow: "asc", dataKey: "customerName", isNumberic: false, isDate: false },
        // { name: "Loan ID", arrow: "asc", dataKey: "loanId", isNumberic: false, isDate: false },
        { name: "Loan Type", arrow: "asc", dataKey: "loanType", isNumberic: false, isDate: false },
        { name: "Collection Agent", arrow: "asc", dataKey: "collectionAgent", isNumberic: false, isDate: false },
        { name: "Total Amount", arrow: "asc", dataKey: "totalAmount", isNumberic: true, isDate: false },
        { name: "Installment", arrow: "asc", dataKey: "installment", isNumberic: true, isDate: false },
        // { name: "Collected Amount", arrow: "asc", dataKey: "collectedAmount", isNumberic: true, isDate: false },
        { name: "Due Date", arrow: "asc", dataKey: "dueDate", isNumberic: false, isDate: true },
        { name: "Collected Seq", arrow: "asc", dataKey: "collectionSeq", isNumberic: false, isDate: false },
        { name: "penalty", arrow: "asc", dataKey: "penalty", isNumberic: true, isDate: false }
      ]
    }
    this.tableHeaderClick = this.tableHeaderClick.bind(this)
  }
  tableHeaderClick(column, data) {
    let list = this.state.headerList
    let index = list.findIndex(col => col.name === column.name)
    column.arrow = column.arrow === "asc" ? "desc" : "asc"
    list[index] = column
    this.setState({
      headerList: list,
      headerTag: column.name
    });
    this.sortRecordsbyColumn(column, data)
  }

  sortRecordsbyColumn = (column, data) => {
    column.isDate ?
      column.arrow === "asc" ?
        data.sort((rec1, rec2) => new Date(rec2[column.dataKey]) - new Date(rec1[column.dataKey])) :
        data.sort((rec1, rec2) => new Date(rec1[column.dataKey]) - new Date(rec2[column.dataKey])) :
      column.arrow === "asc" ?
        data.sort((rec1, rec2) => rec1[column.dataKey] > rec2[column.dataKey] ? -1 : 1) :
        data.sort((rec1, rec2) => rec1[column.dataKey] > rec2[column.dataKey] ? 1 : -1)
  }


  handleChangePage = (offset) => {
    this.setState({ page: offset });
  };


  OnRowClick = record => {
    console.log('clicked', record.loanId)
    // console.log(this.props.history)
    this.props.history.push({
      pathname: '/customers/customerinfo',
      state: { loanID: record.loanId }
    })
  }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF("p", "mm", "a4");
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        // pdf.output('dataurlnewwindow');
        pdf.save("collectionreport.pdf");
      })
      ;
  }
  render() {
    var columnWidths = [
      { wch: 200 },
      { wch: 200 },
      { wch: 250 }
    ]
    let { data } = this.props
    const { page, rowsPerPage } = this.state
    let tableColumnHeaders = this.state.headerList
    return (
      <div className="ReportTablepage">
        <Sidebar />
        <div className="mainBodyDiv">
          <div className="secondDiv">
            <div className="collectionMembercountDiv Fonts btnSizeFont">
              <h6 className="info">{data.length} Members</h6>
            </div>
            <div className="Indication">
              <div className="PaidIndication"></div>
              <div className="PaidName Fonts">Paid</div>
              <div className="NotPaidIndication"></div>
              <div className="NotPaidName Fonts">Not Paid</div>
            </div>
            <div className="collectionExportDiv Fonts btnSizeFont">
              <h6 className="info">
                Export to:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </h6>
              <img src={pdf} alt="pdf" className="pdficon" onClick={this.printDocument.bind(this)} />&nbsp;&nbsp;&nbsp;
              <div style={{ margin: "auto" }}>
                <Workbook filename="collectionreport.xlsx" element={<img src={excel} alt="excel" className="excelicon" />}>
                  <Workbook.Sheet data={data} columsWidths={columnWidths} name="Collection Report Details">
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
            </div>
          </div>
          {/* <Card className="collectionCardDiv"> */}
            <div id="divToPrint" className="collectionCardDiv">
              <Table>
                <TableHead>
                  <TableRow className="tableHeadRow Fonts">
                    {tableColumnHeaders.map(column => (

                      <TableCell
                        key={column.name}
                        align="center"
                        padding={"none"}
                      >
                        <TableSortLabel
                          style={this.state.headerTag === column.name ? { fontWeight: "bold" } : { fontWeight: "normal" }}
                          className="tableCell Fonts"
                          active={column.name === this.state.headerTag}
                          direction={column.arrow}
                          onClick={() => this.tableHeaderClick(column, data)}>
                          {column.name}
                        </TableSortLabel>

                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page, page + rowsPerPage)
                    .map((dataValue, index) => (
                      <TableRow key={index} onClick={() => this.OnRowClick(dataValue)} className="rowTextColor Fonts">
                        <TableCell className="tablePrimaryCol Fonts" >
                          <div className="tableImgDiv"><img className="tableImg" src={dataValue.loanIcon} /></div>
                          <div style={{ marginLeft: "5px" }}>
                            <div className="tableCustomerName Fonts">{dataValue.customerName}</div>
                            <div className="tableLoanId Fonts">{dataValue.loanId}</div>
                          </div>
                        </TableCell>
                        <TableCell > {dataValue.loanType}</TableCell>
                        <TableCell > {dataValue.collectionAgent}</TableCell>
                        <TableCell > {dataValue.totalAmount}</TableCell>
                        <TableCell
                          className={dataValue.collectionStatus !== null ?
                            dataValue.collectionStatus === "Paid" ? "paid" : "notPaid"
                            : null}

                        >

                          {dataValue.installment}</TableCell>
                        {/* <TableCell > {dataValue.collectedAmount}</TableCell> */}
                        <TableCell > {moment(dataValue.dueDate).format('MM/DD/YYYY')}</TableCell>
                        <TableCell > {dataValue.collectionSeq}</TableCell>
                        <TableCell
                          className={dataValue.loanPaymentStatus === null ?
                            dataValue.loanPaymentStatus !== "Due" ? "paid" : "notPaid"
                            : null}
                        > {dataValue.penalty}</TableCell>
                      </TableRow>

                    ))}
                </TableBody>
              </Table>

              <Pagination
                limit={rowsPerPage}
                offset={page}
                total={data.length}
                onClick={(e, offset) => this.handleChangePage(offset)}
              />
            </div>
          {/* </Card> */}
        </div>
      </div>
    );
  }
}
export default withRouter(ReportTable);

