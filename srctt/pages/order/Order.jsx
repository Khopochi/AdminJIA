import React, { useContext, useEffect, useState } from 'react'
import './order.scss'
import axios from 'axios'
import OrderTable from '../../components/OrderTable'


const Order = () => {
    const [orders,setOrders] = useState()
    const [payment,setpayment] = useState()
    const [packaged,setpackaged] = useState()
    const [transit,settransit] = useState()
    const [arrived,setarrived] = useState()
    const [activeselection, setActiveselction] = useState()

    const getOrders = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"ordersubmitted/getorder/")
            setOrders(res.data)
            setActiveselction(res.data)
            console.log(res.data)
            const mOrders = res.data
            const paymentReceivedOrders = mOrders.filter(order => order.status === 'Paid');
            const opackaged = mOrders.filter(order => order.status === 'Packaged');
            const ontransit = mOrders.filter(order => order.status === 'Transit');
            const oarrived = mOrders.filter(order => order.status === 'Delivered');
            setarrived(oarrived)
            settransit(ontransit)
            setpackaged(opackaged)
            setpayment(paymentReceivedOrders)
        }catch(err){
            
        }
        
    }
    useEffect(()=>{
        // getOrders()
    },[])

    
    const activeOption = (data,id) => {
        setActiveselction(data)
        setOption(id)
    }

    const [option, setOption] = useState("all")



  return (
    <div>
      <div className="orderbody">
        <div className="container">
            <div className="top">
                <div className="orderstatuses">Order Status</div>
                <div className="items">
                    <span onClick={() => activeOption(orders,"all")} className={option === "all" ? 'active' : ''}>All Orders</span>
                    <span onClick={() => activeOption(payment,"paid")} className={option === "paid" ? 'active' : ''}>Payment received {payment && <span>[{payment.length}]</span>}</span>
                    <span onClick={() => activeOption(packaged,"packaged")} className={option === "packaged" ? 'active' : ''}>Packaged and Ready{packaged && <span>[{packaged.length}]</span>}</span>
                    <span onClick={() => activeOption(transit,"transit")} className={option === "transit" ? 'active' : ''}>In Transit{transit && <span>[{transit.length}]</span>}</span>
                    <span onClick={() => activeOption(arrived,"delivered")} className={option === "delivered" ? 'active' : ''}>Arrived{arrived && <span>[{arrived.length}]</span>}</span>

            </div>
            </div>
            <div className="down">
                <div className="dTop">All Orders</div>
                <div className="dDown">
                    {orders && <OrderTable rowss={activeselection}/>}
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Order

