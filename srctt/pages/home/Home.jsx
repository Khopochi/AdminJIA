import React from 'react'
import './home.scss'
import Navbar from '../../mypackets/navbar/Navbar'
import { Range } from '../../mypackets/range/Range'
import { Summary } from '../../mypackets/summary/Summary'
import { Graph } from '../../mypackets/graphs/Graph'

export const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <Range/>
        <Summary/>
        <Graph/>
    </div>
  )
}
