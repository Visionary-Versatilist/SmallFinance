import React, { PureComponent } from 'react';
import { Cell, Pie, PieChart, Sector } from 'recharts';




const renderActiveShape = (props) => {

    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={payload.fontColor}>
                {Math.round(percent * 100)}% Collected
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius - 6}
                outerRadius={outerRadius + 6}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={payload.fontColor}
            />
            {/* <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={payload.fontColor}
            /> */}
            {/* <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" /> */}
            {/* <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
            {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text> */}
        </g>
    );
};


export default class Example extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

    state = {
        activeIndex: 0,
    };

    // onPieEnter = (data, index) => {
    //     this.setState({
    //         activeIndex: index,
    //     });
    // };

    componentWillReceiveProps = nextProps => {
        console.log("piechart",nextProps )
        const { pieIndex } = nextProps
        this.setState({ activeIndex: pieIndex });
    }

    render() {
        let { data } = this.props
        // if (data.reduce((sum, obj) => obj.amount + sum, 0) === 0)
        //     data = [{
        //         name: "Default.",
        //         amount: 1,
        //         value: "default",
        //         fontColor: "pink",
        //         fontBackground: "pink",
        //         pieBackground: "pink"
        //     }]
        // else
        //     console.log('else came')
        // console.log(data)
        return (
            <PieChart width={220} height={220}>
                <Pie
                    activeIndex={this.state.activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx={100}
                    cy={100}
                    innerRadius={70}
                    paddingAngle={0}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                // onMouseEnter={this.onPieEnter}
                >
                    {
                        data.map((entry, index) =>
                            <Cell
                                style={{ stroke: 'none' }}
                                key={`cell-${index}`}
                                fill={entry.pieBackground}
                                label
                            />)
                    }
                </Pie>

            </PieChart>
        );
    }
}
