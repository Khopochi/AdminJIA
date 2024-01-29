import React, { useEffect, useState } from 'react'
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
import axios from 'axios';
import baseurl from '../../ourapi';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

export const Summary = () => {
    const [summary,setSummary] = useState()
    const [gateway,setgateway] = useState()
    const [citymall,setcity] = useState()
    const getsummary = async () => {
        try{
            const res = await axios.get(baseurl+"product/countproductsphotos")
            const resgate = await axios.get(baseurl+"product/countproductsgate")
            const rescity = await axios.get(baseurl+"product/countproductcitymall")
            setSummary(res.data)
            setgateway(resgate.data)
            setcity(rescity.data)
        }catch(err){

        }
    }
    useEffect(()=>{
        getsummary()
    },[])
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };
    const navigate = useNavigate()
  return (
    <div className='summary'>
        <div className="orders">
                <div className="upper">
                    {
                        !summary && <ClipLoader color="#36d7b7" />
                    }
                    {summary && <div className="left">
                        <span className="title">Products Summary</span>


                        <span onClick={()=>navigate("/shop/1")} className="figure"><span className='rep'>Total Products</span> <span className='res'>{formatNumberWithCommas(summary?.totalProducts)}</span> </span>
                        <span onClick={()=>navigate("/shop/2")} className="figure"><span className='rep'>Total Gateway Products</span> <span className='res'>{formatNumberWithCommas(summary?.gateway)}</span> </span>
                        <span onClick={()=>navigate("/shop/3")} className="figure"><span className='rep'>Total Citymall Products</span> <span className='res'>{formatNumberWithCommas(summary?.citymall)}</span> </span>
                        <span onClick={()=>navigate("/shop/4")} className="figure"><span className='rep'>Total Products on Website</span> <span className='res'>{formatNumberWithCommas(summary?.productsWithPhotos)}</span> </span>
                        <span onClick={()=>navigate("/shop/6")} className="figure"><span className='rep'>Total Products no Photos</span> <span className='res'>{formatNumberWithCommas(summary?.nophotos)}</span> </span>
                        <span onClick={()=>navigate("/shop/5")} className="figure"><span className='rep'>Products with Less 100</span> <span className='res'>{formatNumberWithCommas(summary?.quantityLessThan100)}</span> </span>

                    </div>}
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
                    {
                        !gateway && <ClipLoader color="#36d7b7" />
                    }
                    {gateway && <div className="left">
                        <span className="title">Gateway Mall Shop</span>
                        <span onClick={()=>navigate("/shop/2")} className="figure"><span className='rep'>Total Products in shop</span> <span className='res'>{formatNumberWithCommas(gateway?.gatewayGreaterThan0)}</span> </span>
                        <span onClick={()=>navigate("/shop/7")} className="figure"><span className='rep'>Total Products less than 50</span> <span className='res'>{formatNumberWithCommas(gateway?.gatewayLessThan50)}</span> </span>

                    </div>}
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
                {
                        !citymall && <ClipLoader color="#36d7b7" />
                    }
                    {citymall && <div className="left">
                        <span className="title">City Mall Shop</span>
                        <span onClick={()=>navigate("/shop/3")} className="figure"><span className='rep'>Total Products in shop</span> <span className='res'>{formatNumberWithCommas(citymall?.gatewayGreaterThan0)}</span> </span>
                        <span onClick={()=>navigate("/shop/8")} className="figure"><span className='rep'>Total Products less than 50</span> <span className='res'>{formatNumberWithCommas(citymall?.gatewayLessThan50)}</span> </span>

                    </div>}
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
