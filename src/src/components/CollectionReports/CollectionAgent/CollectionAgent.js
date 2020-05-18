import React, {Component} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './CollectionAgent.scss';
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
import listimage from '../../../assets/images/listimage.svg';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import rows from '../Table.json';
import Card from '@material-ui/core/Card';
import pdf from '../../../assets/images/pdf.svg';
import excel from '../../../assets/images/excel.svg';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
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

const headCells = [
  { id: 'customerName', numeric: false, disablePadding: true, label: 'Customer name' },
  { id: 'collectionAgent', numeric: false, disablePadding: false, label: 'collectionAgent' },
  { id: 'totalAmount', numeric: false, disablePadding: false, label: 'totalAmount' },
  { id: 'interest', numeric: false, disablePadding: false, label: 'interest' },
  { id: 'installment', numeric: false, disablePadding: false, label: 'installment' },
  { id: 'collectedAmount', numeric: false, disablePadding: false, label: 'collectedAmount' },
  { id: 'dueDate', numeric: false, disablePadding: false, label: 'dueDate' },
  { id: 'collectionSeq', numeric: false, disablePadding: false, label: 'collectionSeq' },
  { id: 'penalty', numeric: false, disablePadding: false, label: 'penalty' },

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
                    <TableRow hover  key={row.name}   className="Roww TextColour" style={{marginBottom:'30px'}}>
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
                    <TableCell align="left" className="changetext">{row.collectedAmount}</TableCell>
                    <TableCell align="left" className="changetext">{row.dueDate}</TableCell>
                    <TableCell align="left" className="changetext">{row.collectionSeq}</TableCell>
                    <TableCell align="left" className="changetext">{row.penalty}</TableCell>
      
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


class MonthlyTable extends Component {
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
                <h6>05 Members</h6>
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
export default MonthlyTable;

