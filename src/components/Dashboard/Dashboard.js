import { Check } from "@material-ui/icons";
import React, { Component } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { fetchAPIData } from '../../service/service';
import LineChart from '../modals/AreaChartGraph/AreaChartGraph';
import PieChart from '../modals/PieChart/PieChart';
import Sidebar from '../sidebar/sidebar';
import './Dashboard.scss';
import { companylogo, downarrow as greenArrow, user_solid } from "../../assets/images";
import moment from "moment";
import { currencyFormat } from '../../Environment'
import LoadingPage from '../modals/LoadingPage/LoadingPage'
import { withNamespaces } from 'react-i18next';
import {pieDayFilter, amountDetailIndex, activeStatusCards, isLoading,collectionAgents, statusCardList, pieChartList, dashDayFilter, lineChartList} from './Dashboard.json'





class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amountDetailIndex, activeStatusCards, collectionAgents, statusCardList,
            pieChartList, pieDayFilter, dashDayFilter, lineChartList, isLoading,
            dashboardCondition: {
                companyId: localStorage.getItem('loggedinUserCompany'),
                loanTenureType: null,    //not required for Dashboard 
                fromDate: null,
                toDate: null,
                collectorId: null,
                category: null
            },
            pieCondition: {
                companyId: localStorage.getItem('loggedinUserCompany'),
                loanTenureType: null,
                fromDate: moment().startOf('day').startOf('D').format('YYYY-MM-DD HH:mm:mm'),
                toDate: moment().endOf('day').endOf('D').format('YYYY-MM-DD HH:mm:mm'),
            }
        };
    }

    async componentDidMount() {

        // this.setState({ isLoading: true });
        const { dashDayFilter, pieDayFilter } = this.state
        console.log(dashDayFilter)

        const activeDashFilter = dashDayFilter.find(obj => obj.isActive)
        const activePieFilter = pieDayFilter.find(obj => obj.isActive)

        //get collection agent by api call and assign in state
        const collectionAgentsRes = await fetchAPIData("collectionAgent", {})
        this.setState({ collectionAgents: collectionAgentsRes.collectionAgents });


        //make dashboard and piechart call
        this.changeDashDayFilter(activeDashFilter)
        this.changePieDayFilter(activePieFilter)
        this.setState({ isLoading: false });

    }

    makeDashCall = async dashboardCondition => {
        let response = null
        let { statusCardList } = this.state
        this.setState({ isLoading: true });
        response = await fetchAPIData('dashboard', dashboardCondition)


        let { cardDetail, lineChartList } = response

        statusCardList = statusCardList.map(card => {
            let key = card.value
            let dataCard = cardDetail[key]
            card.amount = dataCard.paidSum
            card.totalAmount = dataCard.total
            return card
        })


        this.setState({ statusCardList, lineChartList, isLoading: false });
    }


    makePieCall = async pieCondition => {
        this.setState({ isLoading: true });
        let response = await fetchAPIData('dashboard', pieCondition)
        let { pieChartList } = this.state
        let { pieChartData } = response
        console.group("makePieCall Responese", response)

        pieChartList = pieChartList.map(item => {
            let key = item.value
            item.amount = pieChartData[key]
            return item
        })

        this.setState({ pieChartList, isLoading: false });
    }

    //Pie Chart Event
    changeAmountDetailIndex = index => {
        let { amountDetailIndex } = this.state
        amountDetailIndex = index
        this.setState({ amountDetailIndex });
    }

    //Status Card Event
    changeActiveStatusCard = (value) => {
        let { activeStatusCards } = this.state
        let index = activeStatusCards.indexOf(value)

        index === -1 ? activeStatusCards.push(value) : activeStatusCards.splice(index, 1)
        activeStatusCards.length === 3 && (activeStatusCards = [])
        this.setState({ activeStatusCards, isRpOpen: true });
    }

    //Dropdown filter- Dashboard
    changeDashDayFilter = filterObj => {

        let { dashDayFilter, dashboardCondition } = this.state
        const activeIndex = dashDayFilter.indexOf(filterObj)
        const value = filterObj.value

        //reset values and make respective value active
        dashDayFilter = dashDayFilter.map(item => { item.isActive = false; return item })
        dashDayFilter[activeIndex].isActive = true

        //get values and assgin in state
        switch (value) {
            case 'pastweek':
                dashboardCondition.category = 'week'
                dashboardCondition.fromDate = moment()
                    .subtract(7, 'days')
                    .startOf('day')
                    .format('YYYY-MM-DD HH:mm:mm')
                dashboardCondition.toDate = moment()
                    .subtract(1, 'days')
                    .endOf('day')
                    .format('YYYY-MM-DD HH:mm:mm')

                break;
            case 'pastmonth':

                dashboardCondition.category = 'month'

                dashboardCondition.fromDate = moment()
                    .subtract(1, 'month')
                    .startOf('M')
                    .format('YYYY-MM-DD HH:mm:mm')

                dashboardCondition.toDate = moment()
                    .subtract(1, 'month')
                    .endOf('M')
                    .format('YYYY-MM-DD HH:mm:mm')

                break;
            case 'pastyear':
                dashboardCondition.category = 'year'

                dashboardCondition.fromDate = moment()
                    .subtract(1, 'year')
                    .startOf('month')
                    .format('YYYY-MM-DD HH:mm:mm')

                dashboardCondition.toDate = moment()
                    .subtract(1, 'month')
                    .endOf('month')
                    .format('YYYY-MM-DD HH:mm:mm')
                break;

            default:
                console.log("invalid key value in changeDashDayFilter")
                break;
        }

        this.setState({ dashDayFilter, dashboardCondition });
        this.makeDashCall(dashboardCondition)

    }

    //Dropdown filter- PieChart
    changePieDayFilter = filterObj => {
        let { pieDayFilter, pieCondition } = this.state
        const activeIndex = pieDayFilter.indexOf(filterObj)

        //reset values and make respective value active
        pieDayFilter = pieDayFilter.map(item => { item.isActive = false; return item })
        pieDayFilter[activeIndex].isActive = true

        pieCondition.loanTenureType = filterObj.value === 'all' ? null : filterObj.value

        this.makePieCall(pieCondition)
        this.setState({ pieDayFilter, pieCondition });
    }

    //Collection agent filter
    changeCAgent = agent => {
        let { collectionAgents, dashboardCondition } = this.state
        const index = collectionAgents.indexOf(agent)
        let selectedAgent

        if (collectionAgents[index].isActive) {
            collectionAgents[index].isActive = false
        } else {
            collectionAgents[index].isActive = true
        }
        selectedAgent = collectionAgents.filter(agent => agent.isActive).map(agent => agent.id)
        dashboardCondition.collectorId = selectedAgent.length ? selectedAgent : null

        this.setState({ collectionAgents, dashboardCondition });
        this.makeDashCall(dashboardCondition)

    }

    render() {
        const { t } = this.props;
        const { amountDetailIndex, activeStatusCards, collectionAgents, isLoading,
            statusCardList, pieChartList, lineChartList, pieDayFilter, dashDayFilter } = this.state


        return (
            <div >
                <LoadingPage isLoading={isLoading} />
                <Sidebar />
                {/* --------------------Dashboard Starts-----------------------------------------  */}
                <div className='dashboard Fonts'>
                    <Header
                        collectionAgents={collectionAgents}
                        dayFilter={dashDayFilter}
                        changeDashDayFilter={this.changeDashDayFilter}
                        changeCAgent={this.changeCAgent}
                    />
                    {/* ------------Status Cards----------------------- */}
                    <div className="progressCards">
                        {
                            statusCardList.map((card, index) => (
                                <StatusCard
                                    activeStatusCards={activeStatusCards}
                                    key={index}
                                    changeActiveStatusCard={this.changeActiveStatusCard}
                                    card={card}
                                />
                            ))
                        }
                    </div>

                    {/* ----------------------Graph------------------------------- */}
                    <div className='graphLayout' >
                        <LineChartLayout activeStatusCards={activeStatusCards} lineChartList={lineChartList} />
                        <PieChartLayout
                            pieDayFilter={pieDayFilter}
                            pieChartList={pieChartList}
                            pieIndex={amountDetailIndex}
                            changeAmountDetailIndex={this.changeAmountDetailIndex}
                            changePieDayFilter={this.changePieDayFilter}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default  withNamespaces()(Dashboard);




let Header = props => {
    let { collectionAgents, dayFilter, changeDashDayFilter, changeCAgent } = props
    return (

        <section className='header'  >
            <div><img style={{width:"70%"}} src={companylogo} alt="logo" /></div>
            <div className='filterLayout' >
                <CollectionAgentFilter collectionAgents={collectionAgents} changeCAgent={changeCAgent} />
                <Dropdown dayFilter={dayFilter} changeFilter={changeDashDayFilter} />
            </div>
        </section>

    )
}

const Dropdown = props => {
    const onMenuItemClick = (filterObj) => {
        props.changeFilter(filterObj)
    }


    const { dayFilter } = props
    const activeFilter = dayFilter.find(item => item.isActive)
    const label = activeFilter ? activeFilter.label : null

    return (
        <div className='dropdownbuttonlayout'>
            <button className='dropdownButton' >
                {label}
                <img className='dropdownIcon' src={greenArrow} alt={'greenArrow'} />
            </button>

            <div className='hoverMenu'>
                {dayFilter.map(item => (
                    <li
                        className='menuItem'
                        key={item.value}
                        value={item.value}
                        onClick={() => onMenuItemClick(item)}
                    >
                        {item.label}
                        {item.isActive && <Check className="floatRightIcon" />}
                    </li>
                ))}
            </div>

        </div>
    )
}

const CollectionAgentFilter = (props) => {

    const onMenuItemClick = (agent) => {
        props.changeCAgent(agent)
    }

    const { collectionAgents } = props

    return (
        <div className='collectionAgentlayout'>
            <button className='collectionAgentButton' >
                <img src={user_solid} alt={'user_solid'} className="userSolid" />
                Collection Agents
                <img src={greenArrow} alt={'greenArrow'} className="greenArrow" />
            </button>

            <div className='hoverMenu'>
                {collectionAgents && collectionAgents.map((agent, index) => (
                    <li
                        key={index}
                        className='menuItem'
                        value={agent.value}
                        onClick={() => onMenuItemClick(agent)}
                    >
                        {agent.name}
                        {agent.isActive && <Check className="floatRightIcon" />}
                    </li>
                ))}
            </div>

        </div>
    )
}

const StatusCard = (props) => {

    const { changeActiveStatusCard, card, activeStatusCards } = props
    const { bcColor, header, amount, totalAmount, hasFunctionality, value } = card
    const percent = Math.round(amount * 100 / (totalAmount === 0 ? 1 : totalAmount))
    const isInActive = activeStatusCards.length === 0 ? false : activeStatusCards.indexOf(value) === -1
    let countryCurrency = JSON.parse(localStorage.getItem("companyCountry"))
    let countryCurrencySymbol = countryCurrency.symbol;
    console.log("currency symbol",countryCurrencySymbol )
    return (
        <div onClick={() => { hasFunctionality && changeActiveStatusCard(value) }}
            className={`statusCard ${bcColor} ${hasFunctionality ? '' : 'defaultCursor'} 
            ${(isInActive && hasFunctionality) ? 'scInactiveCard' : ''}   `} >

            <div className='scInnerLayout'>
                <div className='scHeader' >{header} </div>
                <div className='scBody'>
                    <div className='circularBar'>
                        <CircularProgressbar
                            value={percent}
                            counterClockwise={true}
                            text={`${percent} %`}
                            pathTransitionDuration={0.5}
                            styles={buildStyles({
                                textColor: 'white',
                                pathColor: 'white',
                            })}
                        />
                    </div>
                    <div className="scValues">
                        <span className='mainAmountVal' >{countryCurrencySymbol} {amount.toLocaleString(currencyFormat, { minimumFractionDigits: 0 })}</span> <br />
                        Out of {countryCurrencySymbol} {totalAmount.toLocaleString(currencyFormat, { minimumFractionDigits: 0 })}
                    </div>
                </div>
            </div>
        </div >
    )
}
const LineChartLayout = props => {
    const { activeStatusCards, lineChartList } = props
    return (

        <div className='lineChartLayout' >
            <div className='innerLayout' >
                <div className='lineChartHeader' >
                    <h2 style={{ marginLeft: "34px" }}>Collections</h2>
                </div>
                {/* <div className='lineChartHeader'></div> */}
                <LineChart activeStatusCards={activeStatusCards} lineChartList={lineChartList} />
            </div>
        </div>
    )
}


const PieChartLayout = props => {
    const { changeAmountDetailIndex, pieIndex, pieChartList, pieDayFilter, changePieDayFilter } = props


    const onAmtDetEventClk = (index) => {
        changeAmountDetailIndex(index)
    }

    return (
        <div className='piechartLayout'>
            <div className='innerLayout'>
                <div className='pieHeader' >
                    <h2>Status</h2>
                    <span className='pieHead' >Today</span>
                    <Dropdown dayFilter={pieDayFilter} changeFilter={changePieDayFilter} />
                </div>
                <div className='piechart' >
                    <PieChart data={pieChartList} pieIndex={pieIndex} />
                </div>
                <div className='amountDetailLayout'>
                    {pieChartList.length !== 0 && pieChartList.map((obj, index) => (
                        <AmountDetail
                            key={index}
                            obj={obj}
                            index={index}
                            action={onAmtDetEventClk}
                            pieIndex={pieIndex} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const AmountDetail = props => {

    const { action, index, pieIndex, obj } = props
    const { fontColor, name, fontBackground, amount } = obj;

    const isActive = pieIndex === index
    return (
        <div onClick={(e) => { action(index) }}
            className='amountDetail'
            style={{ color: `${fontColor}`, background: `${isActive ? fontBackground : '#FBFCFF'}` }}>
            <span className='adHead' >
                {amount.toLocaleString(currencyFormat, { minimumFractionDigits: 0 })}
            </span><br />
            <span className='adBody' >{name}</span>
        </div>
    )
}

