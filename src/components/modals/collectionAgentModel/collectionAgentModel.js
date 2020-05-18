import React from "react";
import Select from "react-select";
import chroma from 'chroma-js';
import Data from '../../CollectionReports/Table.json';
import { withRouter } from "react-router-dom"
import Dialog from '@material-ui/core/Dialog';

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" }
// ];

 class CollectionAgent extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: null
    }
    this.closeprofilemodal = this.closeprofilemodal.bind(this);
    // this.userManagement = this.userManagement.bind(this);
}
closeprofilemodal() {
    this.props.close()
}
savechanges(){
    this.props.close()
}
cancelchanges() {
    this.props.close()
}



 handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {



    const bigList = [];

    const drop = [];
  


    Data.map(headCell => (
      bigList.push(headCell.collectionAgent)
      ))


      for (const [index, value] of bigList.entries()) {
        // drop.push(<li key={index}>{value}</li>)
        drop.push({ value: index, label: `${value}` })

      }



    const colourStyles = {
      control: styles => ({ ...styles, backgroundColor: 'white' }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma('red');
        return {
          ...styles,
          backgroundColor: isDisabled
            ? null
            : isSelected
            ? 'red'
            : isFocused
            ? color.alpha(0.1).css()
            : null,
          color: isDisabled
            ? '#ccc'
            : isSelected
            ? chroma.contrast(color, 'white') > 2
              ? 'white'
              : 'black'
            : 'red',
          cursor: isDisabled ? 'not-allowed' : 'default',
    
          ':active': {
            ...styles[':active'],
            backgroundColor: !isDisabled && (isSelected ? 'red' : color.alpha(0.3).css()),
          },
        };
      },
      multiValue: (styles, { data }) => {
        const color = chroma('red');
        return {
          ...styles,
          backgroundColor: color.alpha(0.1).css(),
        };
      },
      multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: 'red',
      }),
      multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: 'red',
        ':hover': {
          backgroundColor: 'red',
          color: 'white',
        },
      }),
    };
 


    const { selectedOption } = this.state;

    const filterOptions = (candidate, input) => {
      if (input) {
        return candidate.value === drop[0].value;
      }
      return true;
    };
    
    return (
      <div className="collectionAgentModel">

      <div onClick={this.closeprofilemodal} className="TitleDiv">
                <div className="deleteconfirmation">
                <Dialog open={this.props.open} className="dialogbox" style={{borderRadius:'5px'}}>
                <Select
      defaultValue={drop[0]}
      isClearable
      isMulti
      isSearchable
      Select={false}
      menuIsOpen
      hideSelectedOptions={false}
      name="color"
      options={drop}
      filterOption={filterOptions}
      styles={colourStyles}
      />
                </Dialog>
                </div>
            </div>
      
            </div>
    );
  }
}
export default withRouter(CollectionAgent);