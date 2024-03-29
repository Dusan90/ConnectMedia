import React from 'react'
import './Charts.scss'

import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
    {
        name: 'Page B',
        uv: 868,
        pv: 967,
        amt: 1506,
    },
    {
        name: 'Page C',
        uv: 1397,
        pv: 1098,
        amt: 989,
    },
    {
        name: 'Page D',
        uv: 1480,
        pv: 1200,
        amt: 1228,
    },
    {
        name: 'Page E',
        uv: 1520,
        pv: 1108,
        amt: 1100,
    },
    {
        name: 'Page F',
        uv: 1400,
        pv: 680,
        amt: 1700,
    },




    {
        name: 'Page G',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page BG',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page CD',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page DE',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page EG',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page FS',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page GV',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },

    {
        name: 'Page A2',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B2',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C2',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D2',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E2',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F2',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G2',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },

];

function VerticalChart({ customData, customStyle }) {
    return (
        <div className='mainDivCharts' lenght={data.length} style={customStyle && customStyle}>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    layout="vertical"
                    width={500}
                    height={400}
                    data={customData ? customData : data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" scale="band" />
                    <Tooltip />
                    <Legend />
                    <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                    <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                    <Line dataKey="uv" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}

export default VerticalChart
