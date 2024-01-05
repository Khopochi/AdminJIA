import React, { useEffect, useState } from 'react'
import './cartview.scss'

import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import DataTable from '../../components/DataTable'
import baseurl from '../../ourapi'

const CartView = () => {
    const location = useLocation()
    const [fname,setfname] = useState(location.state.name)
    const [number,setNumber] = useState(location.state.phone)
    const [data,setDat] = useState()
    const {id} = useParams()
    const [load,setLoad] = useState(true)
    const getData = async () => {
        try{
            const res = await axios.get(baseurl+"ordersubmitted/getsingleorder/"+id)
            setDat(res.data)
            setLoad(false)
        }catch(err){

        }
    }
    useEffect(()=>{
        getData()
    },[])
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };

      const [showT,setShowT] = useState(false)

      const onClickT = async (data) => {
        setShowT(false)
        const credential = {
            status: data
        }
        try{
            const res = await axios.put(baseurl+"ordersubmitted/updateOrdersubmitted/"+id, credential)
            console.log(res.data)
            getData()
        }catch(err){

        }

      }

  return (
    <div className='caryview'> 
        {load && <div className="loader">
            <BeatLoader color="hsla(351, 84%, 49%, 1)" />
        </div>}
        <div className="cartContainer">
            <div className="holder1">
                <div className="toptop">Order Details</div>
                <div className="top1">
                    <div className="id">
                        <span className="hdr">
                            <span className="1st">Oder ID</span>
                            <span className="2st">Payment ID</span>
                            <span className="1st">Customer Name</span>
                            <span className="2st">Customer Contact</span>
                        </span>
                        {data && <span className="numberaid">
                            <span>{data.order.orderId}</span>
                            <span>{data.order.paymentId}</span>
                            <span>{fname}</span>
                            <span>0{number}</span>
                        </span>}
                    </div>
                    <div className="totalcary">
                        <span className="hdr">
                            <span className="1st">Status</span>
                            <span className="2st">Total</span>
                        </span>
                        {data && <span className="numberaid">
                            <span>{data.order.status}</span>
                            <span>MWK {formatNumberWithCommas(data.order.amount)}</span>
                            <span onClick={()=>setShowT(!showT)} className="changestatus">Change status</span>
                            {showT && <div className="statuslist">
                                <div onClick={()=>onClickT("Packaged")}>Packaged</div>
                                <div onClick={()=>onClickT("Transit")}>Transit</div>
                                <div onClick={()=>onClickT("Delivered")}>Delivered</div>
                            </div>}
                        </span>}
                    </div>
                </div>
                
                <div className="middle">
                    <div className="title">Product Images</div>
                    {data && <div className="vcimages">
                        {
                            data.newCart.map((img,index)=>(
                                <img key={index} src={"https://api.jiabaili.shop/api/photos/"+img.productPhoto} />
                            ))
                        }
                       
                    </div>}
                </div>

                <div className="down">
                    <div className="title">Products details</div>
                    <div className="looper">
                        {data && <DataTable rowss={data.newCart}/>}
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CartView
