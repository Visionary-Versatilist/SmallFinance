import React, { Component } from "react"
import "./DropDownHoverButton.scss"
import { Check, HighlightOff } from "@material-ui/icons";

class DropDownHoverButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownData: []
        };
    }
    //dropDownData={DATA} name="BUTTONNAME" icon={ICON} action={ACTIONFUNCTION}
    //  DATA FORMAT GIVEN BELOW
    //  filter1: [
    //     { value: "last 24 hours", label: "Past 24 hours", isActive: false, subList: [] },
    //     { value: "last week", label: "Past Week", isActive: false, subList: [] },
    //     { value: "last month", label: "Past Month", isActive: false, subList: [] },
    //     { value: "last year", label: "Past Year", isActive: false, subList: [] },
    //     { value: "customDate", label: "Custom date Range", isActive: false, subList: [] }
    //   ],
    componentWillMount() {
        let { dropDownData } = this.props
        this.setState({ dropDownData });
    }

    dropDownClickEvent = (menu, subMenu) => {
        let { action } = this.props
        let { dropDownData } = this.state
        let menuIndex = dropDownData.findIndex(obj => obj.value === menu.value)
        if (subMenu) {
            let subMenuIndx = dropDownData[menuIndex].subList.findIndex(obj => obj.value === subMenu.value)
            if (subMenu.isActive) {
                dropDownData[menuIndex].isActive = false
                dropDownData[menuIndex].subList[subMenuIndx].isActive = false
            } else {
                dropDownData[menuIndex].subList.map(obj => obj.isActive = false)
                dropDownData[menuIndex].subList[subMenuIndx].isActive = true
                dropDownData[menuIndex].isActive = true
            }
        } else {
            if (dropDownData[menuIndex].value === "clearall") {
                dropDownData.map(obj => {
                    obj.isActive = false
                    obj.subList.map(subObj => subObj.isActive = false)
                })
            }
            else if (dropDownData[menuIndex].subList.length === 0)
                dropDownData[menuIndex].isActive = !dropDownData[menuIndex].isActive
            else {
                dropDownData[menuIndex].isActive = false
                dropDownData[menuIndex].subList.map(obj => obj.isActive = false)
            }
        }
        this.setState({ dropDownData });
        action({ menu: menu, subMenu: subMenu })
    }

    render() {
        let { dropDownData } = this.state
        let { name, icon } = this.props
        return (
            <div>
                <div className="dropDownButton">
                    <div className="hoverFunction">
                        <button className="Button">
                            {name}
                            <img
                                className="buttonImg"
                                src={icon}
                                alt="searchicon"
                            />
                        </button>
                        <ul className="hoverMenu" >
                            <div >
                                {
                                    dropDownData.map((filterItem, index) => (
                                        <li className="menuList" key={index} >
                                            <div onClick={() => this.dropDownClickEvent(filterItem, null)}>
                                                <a value={filterItem.value}>
                                                    {filterItem.label}
                                                    {filterItem.value !== "clearall" ?
                                                        (filterItem.isActive ?
                                                            <Check className="floatRightIcon" /> : null)
                                                        : <HighlightOff className="floatRightIcon" />}
                                                </a>
                                            </div>
                                            <ul className="subList">
                                                {filterItem.subList && filterItem.subList.map(option => (
                                                    <li onClick={() => this.dropDownClickEvent(filterItem, option)}
                                                        key={option.label} value={option.label} className="subListMenu">
                                                        <a
                                                            value={option.value}>
                                                            {option.label}
                                                            {option.isActive ? <Check className="menuIcon" /> : null}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))
                                }
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default DropDownHoverButton