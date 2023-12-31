import React from 'react'
import'./range.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons'

export const Range = () => {
  return (
    <div className='range'>
        <div className="left">
            <span className="title">Summary Dashboard</span>
            <span className="heading">JiaBaiLi - Dashboard</span>
        </div>
        <div className="right">
            <div className="leftSide">
                <span className="day">Day</span>
                <span className="week">Week</span>
                <span className="month">Month</span>
                <span className="year">Annual</span>
            </div>
            <div className="rightSide">
                <span className="back"><FontAwesomeIcon icon={faLessThan} /></span>
                <span className="visible">12 August, 2023</span>
                <span className="back"><FontAwesomeIcon icon={faGreaterThan} /></span>
            </div>
        </div>
    </div>
  )
}
