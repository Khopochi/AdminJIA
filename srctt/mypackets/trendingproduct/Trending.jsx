import React from 'react'
import './trending.scss'

export const Trending = () => {
  return (
    <div className='trending'>
        <div className="left">
            <div className="imgdiv">
                <img src="https://amazcart.ischooll.com/public/uploads/images/04-01-2023/63b57a51e0c21.jpeg" alt="" />
            </div>
        </div>
        <div className="middle">
            <span className="title">Gamepad</span>
            <span className="category">gaming controllers</span>
            <span className="route">Home - Electrpnics - Game controllers</span>
        </div>
        <div className="right">
            <div className="total"><span>MWK</span>450K</div>
            <span className='sales'>Sales</span>
        </div>
    </div>
  )
}
