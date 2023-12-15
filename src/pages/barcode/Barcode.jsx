import React, { useEffect, useState } from 'react'
import './barcode.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarcode, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'
import axios from 'axios'
import baseurl from '../../ourapi'

export const Barcode = () => {
    const navigate = useNavigate()
    const [barcode, setBarcode] = useState("")


        const handleInputChange = debounce((value) => {
            // Use navigate to navigate to a new route with the dynamic parameter
            navigate(`/addproduct/addpage/${barcode}`);
        }, 1000);

        const handleBarcodeChange = (e) => {
            const newChar = e.target.value;
            setBarcode(newChar);
        };

        const [showedit,setShiwedit] = useState(false)
        const [products,setProducts] = useState()

        const nextpage = async () => {
            try{
                const res = await axios.get(baseurl+"product/barcode/"+barcode)
                if(res.data.message === "No"){
                    navigate(`/addproduct/addpage/${barcode}`);
                }else{
                    setProducts(res.data)
                    setShiwedit(true)
                }
            }catch(err){

            }
        }



        
          

  return (
    <div className='barcode' >
        {showedit && <div className="anaotheritem">
            <div className="close"><FontAwesomeIcon onClick={()=>setShiwedit(false)} icon={faXmark} /><div className="add" onClick={()=>navigate(`/addproduct/addpage/${barcode}`)}>Add</div></div>
            { products?.map((item,index)=>(
                            <div className="listitem">
                            <div className="wrapp">
                            <div className="img"></div>
                            <div className="details">
                                <div className="name">{item.name}</div>
                                <div className="price"><span className='mwk'>MWK</span> <span>{item.price}</span></div>
                                <div className="quantity"><span className='qt'>Quantity</span><span className='figure'>{item.quantity}</span></div>
                            </div>
                            </div>
                            <div className="editadd">
                                <div className="editt"  onClick={()=>navigate(`/addproduct/editpage/${item._id}`)}>Edit Current</div>
                                
                            </div>
                        </div>
            ))
        }
        </div>}
        <div className="container">
            <div className="upper">
                Scan Product
            </div>
            <div className="lower">
                <div className="icon">
                    <FontAwesomeIcon  icon={faBarcode} />
                </div>
               <div className="code">
                    <input type="text"
                    value={barcode ? barcode : ""}
                    onChange={handleBarcodeChange}
                    />
                </div>
                <div onClick={()=>nextpage()} className="codee">
                    continue
                </div>
            </div>
            <div className="footer">
                Place the item in proximity to the barcode scanner for scanning
            </div>
        </div>
    </div>
  )
}
