import React, { Component } from 'react';
import './Customerfilter.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import plusicon from '../../../assets/images/plusicon.svg';
import cardviewgreen from '../../../assets/images/cardviewgreen.svg';
import gridview from '../../../assets/images/gridview.svg';
import {withRouter} from "react-router-dom";



class Customerfilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
        time: "Any time",
        filter:"Filters"
    };
}
allcustomer(){
  this.props.history.push('/customer')
}
duecustomer(){
  this.props.history.push('/customer/duecustomer')
}
overduecustomer(){
  this.props.history.push('/customer/overduecustomer')
}
addcustomer(){
  this.props.history.push('/customers/addcustomer')
}
  handleChangetime = event => {
    this.setState({ time: event.target.value });
    // this.setState({ vehiclemodel: event.target.value })
};
handleChangefilter = event => {
  this.setState({ filter: event.target.value });
  // this.setState({ vehiclemodel: event.target.value })
};
  render() {
    const time = [
      { value: 'Any time', label: 'Any time' },
      { value: 'Custom date range', label: 'Custom date range', },
  ];
  const filter = [
    { value: '', label: 'Filters' },
    { value: 'Collection seq.', label: 'Collection seq.' },
    { value: 'Loan type', label: 'Loan type', },
    { value: 'Total loan amt. range', label: 'Total loan amt. range', },
    { value: 'Interest', label: 'Interest', },
    { value: 'Clear filter', label: 'Clear filter', },
];
    return (
      <div>
        <section className='Customerfilter'>
          <AppBar position="static" className='bar'>
            <Toolbar>
              <Typography variant="h6" className='title'>
                <Button variant="outlined" className="Tabbutton Fonts" onClick={this.allcustomer.bind(this)}>
                  All
                </Button>
                <Button variant="outlined" className="Tabbutton Fonts" onClick={this.duecustomer.bind(this)}>
                  Due
                </Button>
                <Button variant="outlined" className="Tabbutton Fonts" onClick={this.overduecustomer.bind(this)}>
                  Overdue
                </Button>
              </Typography>
              <div className="OptionDiv">
              <TextField id="standard-select" select value={this.state.time}  className="textBox" 
                  onChange={this.handleChangetime}>
                  {time.map(option => (
                      <MenuItem key={option.label} value={option.label}>
                          {option.label}
                      </MenuItem>
                  ))}
              </TextField>
              <TextField id="standard-select" select value={this.state.filter}  className="textBox" 
                  onChange={this.handleChangefilter}>
                  {filter.map(option => (
                      <MenuItem key={option.label} value={option.label}>
                          {option.label}
                      </MenuItem>
                  ))}
              </TextField>
                <div className="ButtonDiv">
                  <Button className="Fonts btnSizeFont btnbackgroundcolor adduserbutton" onClick={this.addcustomer.bind(this)}>
                    <img src={plusicon} alt="plusicon" className="plusiconButton" />
                    Add Customer
                           </Button>
                </div>
                <div className="imagediv">
                  <img src={cardviewgreen} alt="cardtype" className="cardtypeicon" />
                </div>
                <div className="gridDiv">
                  <img src={gridview} alt="gridtype" className="gridtypeicon" />
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </section>
      </div>
    )
  }
}
export default withRouter(Customerfilter);