import React from 'react'
import { PureComponent } from 'react';
import './rechart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Rechart = () => {
    const data = [
    {
        name: 'Mon',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Tue',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Wed',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Thu',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Fri',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Sat',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Sun',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    ];
  return (
    <div className='rechart'>
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'lightgray' }}/>
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: 'lightgray' }}/>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stackId="1" stroke="#6495ED" fill="#6495ED" />
          <Area type="monotone" dataKey="pv" stackId="1" stroke="#29AB87" fill="#29AB87" />
          <Area type="monotone" dataKey="amt" stackId="1" stroke="#FCAE1E" fill="#FCAE1E" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
