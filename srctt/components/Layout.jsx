import React from 'react'
import Navbar from '../mypackets/navbar/Navbar'
import { Sidebar } from '../mypackets/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import './layout.scss'

export const Layout = () => {
  return (
    <div className='layout'>
        <div className="mainarea">
            <div className="sidebar">
                <Sidebar/>
            </div>
            <div className="wholebar">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

