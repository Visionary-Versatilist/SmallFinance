import React, { PureComponent } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import './AreaChartGraph.scss'



export default class AreaChartGraph extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  constructor(props, context) {
    super(props, context);
    this.state = {
      activeStatusCards: props.activeStatusCards === undefined ? null : props.activeStatusCards,
      areaLineConfig: [
        { dataKey: "Daily", stroke: "#e3c848", strokeWidth: 2, fill: "#fcfaec", isActive: true },
        { dataKey: "Weekly", stroke: "#5ac796", strokeWidth: 2, fill: "#eef9f4", isActive: true },
        { dataKey: "Monthly", stroke: "#b57dff", strokeWidth: 2, fill: "#f8f2ff", isActive: true }
      ],
      lineChartList: props.lineChartList ? props.lineChartList : [],
      toolTipContent: {
        value: 3000,
        totalValue: 5000
      }

    };
  }



  componentWillReceiveProps = props => {
    let { areaLineConfig } = this.state
    let { lineChartList, activeStatusCards } = props
  
    if (activeStatusCards.length === 0)
      areaLineConfig = areaLineConfig.map(obj => { obj.isActive = true; return obj })
    else {
      areaLineConfig = areaLineConfig.map(obj => { obj.isActive = false; return obj })
      areaLineConfig
        .filter(obj => activeStatusCards.indexOf(obj.dataKey.toLowerCase()) !== -1)
        .map(obj => { obj.isActive = true; return obj })
    }

    this.setState({ areaLineConfig, lineChartList });

  }



  render() {
    let { areaLineConfig, lineChartList } = this.state
    return (
      <div style={{height:"90%"}}>
      <AreaChart
        className="areaChart" 
        width={700}
        height={300}
        data={lineChartList}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
        fontSize={13}
      >
        <Legend iconType={'circle'} align={'right'} iconSize={8}
          wrapperStyle={{
            top: "-37px"
          }}
        />

        <CartesianGrid vertical={false} />

        <XAxis dataKey="name" tick={true} />

        <YAxis axisLine={false} />

        {/* Area lines iteration */}
        {areaLineConfig.filter(obj => obj.isActive).map((config, index) => (
          <Area
            key={index}
            dataKey={config.dataKey}
            stroke={config.stroke}
            activeDot={true}
            strokeWidth={config.strokeWidth}
            fill={config.fill}
          />

        ))}


        <Tooltip />


      </AreaChart>
      </div>
    );
  }
}

