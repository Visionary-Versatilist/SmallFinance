import React, {Component} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import './Monthly.scss';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import listimage from '../../../../assets/images/listimage.svg';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
// import rows from '../../../CollectionReports/Table.json';
import Card from '@material-ui/core/Card';
import pdf from '../../../../assets/images/pdf.svg';
import excel from '../../../../assets/images/excel.svg';
import { CircularProgressbar, buildStyles,   CircularProgressbarWithChildren} from 'react-circular-progressbar';
import {withRouter} from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
function detailspage(){
  this.props.history.push('/customers/customerinfo')
}
// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
// ];
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
const rows = [
  {
      "customerName": "abhilash",
      "loanIcon": "/home/aswathi/Downloads/Group 27545.svg",
      "collectionAgent": "arun",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 2500,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "abhinand",
      "loneIcon": "../Images/agricultureLoan.svg",
      "collectionAgent": "sanil",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 2500,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "abin",
      "loneIcon": "../Images/homeLoan.svg",
      "collectionAgent": "amal",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 2000,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "amal",
      "loneIcon": "../Images/personalLoan.svg",
      "collectionAgent": "nikhil",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 4500,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "arun",
      "loneIcon": "../Images/twoweelerLoan.svg",
      "collectionAgent": "dineep",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 3500,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "dineep",
      "loneIcon": "../Images/creditcardLoan.svg",
      "collectionAgent": "abin",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 3500,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "nikhil",
      "loneIcon": "../Images/loanAgainstFixedDeposit.svg",
      "collectionAgent": "vijay",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 2500,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "sanil",
      "loneIcon": "../Images/creditcardLoan.svg",
      "collectionAgent": "sibin",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 2000,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "sibin",
      "loneIcon": "../Images/educationalLoan.svg",
      "collectionAgent": "sunil",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 2500,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "sunil",
      "loneIcon": "../Images/loanAgainstFixedDeposit.svg",
      "collectionAgent": "vishnu",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 2000,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "syam",
      "loneIcon": "../Images/renewableEnargyLoan.svg",
      "collectionAgent": "abhilash",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 3000,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "vishnu",
      "loneIcon": "../Images/loanAgainstGold.svg",
      "collectionAgent": "abhinand",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 2000,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "vijay",
      "loneIcon": "../Images/loanAgainstFixedDeposit.svg",
      "collectionAgent": "syam",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 3500,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "chank",
      "loneIcon": "../Images/loanAgainstFixedDeposit.svg",
      "collectionAgent": "ganga",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 2500,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  },
  {
      "customerName": "ganaga",
      "loneIcon": "../Images/loanAgainstFixedDeposit.svg",
      "collectionAgent": "chank",
      "totalAmount": 100000,
      "interest": 11.00,
      "installment": 200,
      // "collectedAmount": 2500,
      "dueDate": "13 mar 2019",
      "collectionSeq": "Monthly",
      "Status": "Due",
      "tenureDaysFrom": 10,
      "tenureDaysTo": 90,
      "isDefault": true
  }
]
const headCells = [
  { id: 'customerName', numeric: false, disablePadding: true, label:'Customer name' },
  { id: 'collectionAgent', numeric: false, disablePadding: false, label:'Collection agent' },
  { id: 'totalAmount', numeric: false, disablePadding: false, label:'Total amount' },
  { id: 'interest', numeric: false, disablePadding: false, label:'Interest' },
  { id: 'installment', numeric: false, disablePadding: false, label:'Installment' },
  // { id: 'collectedAmount', numeric: false, disablePadding: false, label:'Collected amount' },
  { id: 'dueDate', numeric: false, disablePadding: false, label:'Due date' },
  { id: 'collectionSeq', numeric: false, disablePadding: false, label:'Collection seq'},
  { id: 'Status', numeric: false, disablePadding: false, label:'Status'},
  { id: 'Chart', any: false, disablePadding: false, label:'Chart'},
];
function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow >
        {/* <TableCell padding="checkbox">
        
        </TableCell> */}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            // padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{marginLeft:"10px",backgroundColor:"#E1F0FA", color:'#B2B2B2',height:"10px"}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
   onRequestSort: PropTypes.func.isRequired,
   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    // marginBottom: theme.spacing(2),
  },
  // table: {
  //   minWidth: 750,
  // },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: "5px",
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));
function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  /* const handleChangeDense = event => {
    setDense(event.target.checked);
  }; */
  const isSelected = name => selected.indexOf(name) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const percentage = 66;

  return (
    <div className={classes.root} >
      <Paper className={classes.paper}>
       
        <div className={classes.tableWrapper}>
          <Table
          // style={{padding:"5px"}}
            className={classes.table}
            aria-labelledby="tableTitle"
            size= 'small'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow hover  key={row.name}  onClick={this.detailspage.bind(this)}  className="Roww TextColour" style={{marginBottom:'30px'}}>
                    <TableCell component="th" scope="row">
                      <div style={{display:'flex'}}>
                    <img src={listimage} alt="listimage" className="iconButton" />                
                     <p style={{paddingLeft:'10px', fontWeight:'800', color:'#3E4664'}} className="changetext"> {row.customerName} </p>
                     </div>
                    </TableCell>
                    <TableCell align="left" className="changetext" >{row.collectionAgent}</TableCell>
                    <TableCell align="left" className="changetext">{row.totalAmount}</TableCell>
                    <TableCell align="left" className="changetext">{row.interest}</TableCell>
                    <TableCell align="left" className="changetext">{row.installment}</TableCell>
                    {/* <TableCell align="left" className="changetext">{row.collectedAmount}</TableCell> */}
                    <TableCell align="left" className="changetext">{row.dueDate}</TableCell>
                    <TableCell align="left" className="changetext">{row.collectionSeq}</TableCell>
                    <TableCell align="left" className="changetext">{row.Status}</TableCell>
                    <TableCell>
                    <div style={{borderRadius:'50%', backgroundColor:'transparent', width:'38px'}}>
                    <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({  textColor: '#3E4664',  pathColor: '#00D95E',  trailColor: '#D2D2DC', textSize: '30px'})} />
                    </div>
                    </TableCell>
      
                       </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow className="Roww TextColour" style={{ height: (dense ? 10 : 10) * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[ 10,20,30]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
     {/*  <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}
class AllCustomerListView extends Component {
  constructor(){
    super();
    this.state ={
           
    }
   
}
   
    render() {
        
        return (
            
          <div className="usermanagementpage">
          {/* <Sidebar/> */}
          <div className='mainBodyDiv'>
          
            
            <div className="secondDiv">
              <div className="collectionMembercountDiv Fonts btnSizeFont">
                <h6>15 Members</h6>
              </div>
              <div className="collectionExportDiv Fonts btnSizeFont">
                <h6>Export to:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                <img src={pdf} alt="pdf" className="pdficon" />&nbsp;&nbsp;&nbsp;
                <img src={excel} alt="excel" className="excelicon" />
              </div>
            </div>
            <Card className="collectionCardDiv">
            <div>
                          <EnhancedTable/>
                          </div>
                </Card>
            </div></div>
        )
    }
}
export default withRouter(AllCustomerListView);