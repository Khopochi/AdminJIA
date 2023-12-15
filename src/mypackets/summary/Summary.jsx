import React from 'react'
import './summary.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faChartLine } from '@fortawesome/free-solid-svg-icons'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import LocalAtmSharpIcon from '@mui/icons-material/LocalAtmSharp';
import SsidChartSharpIcon from '@mui/icons-material/SsidChartSharp';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export const Summary = () => {
  return (
    <div className='summary'>
        <div className="orders">
                <div className="upper">
                    <div className="left">
                        <span className="title">New Orders</span>
                        <span className="figure">56,789</span>
                        <span className="percentage">67%</span> 
                    </div>
                    <div className="right">
                        <span >
                            <ShoppingBasketOutlinedIcon/>
                        </span>
                    </div>
                </div>
                <div className="lower">
                </div>
                
        </div>
        <div className="payments">
                <div className="upper">
                    <div className="left">
                        <span className="title">Total Revenue</span>
                        <span className="figure">56,789</span>
                        <span className="percentage">67%</span> 
                    </div>
                    <div className="right">
                        <span >
                            <LocalAtmSharpIcon/>
                        </span>
                    </div>
                </div>
                <div className="lower">
                </div>
                
        </div>
        <div className="deductions">
                <div className="upper">
                    <div className="left">
                        <span className="title">Total Deductions</span>
                        <span className="figure">56,789</span>
                        <span className="percentage">67%</span> 
                    </div>
                    <div className="right">
                        <span >
                            <ReceiptOutlinedIcon/>
                        </span>
                    </div>
                </div>
                <div className="lower">
                </div>
                
        </div>
        <div className="newusers">
                <div className="upper">
                    <div className="left">
                        <span className="title">New Users</span>
                        <span className="figure">56,789</span>
                        <span className="percentage">67%</span> 
                    </div>
                    <div className="right">
                        <span >
                            <PersonOutlineOutlinedIcon/>
                        </span>
                    </div>
                </div>
                <div className="lower">
                </div>
                
        </div>

    </div>
  )
}
