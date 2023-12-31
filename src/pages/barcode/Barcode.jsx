import React, { useEffect, useState, useRef } from 'react'
import './barcode.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarcode, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'
import axios from 'axios'
import baseurl from '../../ourapi'
import { BeatLoader } from 'react-spinners'

export const Barcode = () => {
    const navigate = useNavigate()
    const [barcode, setBarcode] = useState("")
    const inputRef = useRef(null); // Create a ref for the input element

    useEffect(() => {
        // Focus on the input element when the component mounts
        inputRef.current.focus();
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    const handleInputChange = debounce((value) => {
        // Use navigate to navigate to a new route with the dynamic parameter
        navigate(`/addproduct/addpage/${barcode}`);
    }, 1000);

    const handleBarcodeChange = (e) => {
        const newChar = e.target.value;
        setBarcode(newChar);
    };

    const [showedit, setShiwedit] = useState(false)
    const [products, setProducts] = useState()

    const nextpage = async () => {
        setLoader(true)
        try {
            const res = await axios.get(baseurl + "product/barcode/" + barcode)
            if (res.data.message === "No") {
                navigate(`/addproduct/addpage/${barcode}`);
                setLoader(false)
            } else {
                setProducts(res.data)
                setShiwedit(true)
                setLoader(false)
            }
        } catch (err) {

        }
    }

    const handleKeyPress = (e) => {
        // Check if the 'Enter' key is pressed
        if (e.key === 'Enter' && barcode.length > 10) {
            nextpage();
        }
    };

    console.log(products)
    const [loader,setLoader] = useState(false)

    const addnew = () => {
        navigate(`/addproduct/addpage/${barcode}`);
    }


    return (
        <div className='barcode'>
             {loader && <div className="loaderb">
            <BeatLoader color="hsla(42, 89%, 65%, 1)" />
        </div>}
            {(products && showedit) && <div class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Product with Same Barcode Exist</h2>
                        <span onClick={()=>setShiwedit(false)} class="close-modal">&times;</span>
                    </div>
                    <div class="product-list">
                        {
                            products.map((item,index)=>(
                                <div key={index} class="product-item">
                                    <img src={baseurl+"photos/"+item.photos[0]} />
                                    <div class="product-details">
                                        <div class="product-info">
                                            <p class="product-price">{item.name}</p>
                                            <p class="product-price">MWK {item.price}</p>
                                            <p class="product-quantity">Quantity: {item.quantity}</p>
                                        </div>
                                        <button onClick={()=>navigate("/addproduct/editpage/"+item._id)} class="edit-button">Edit</button>
                                    </div>
                                </div>
                            ))
                        }
                        
                        
                        <button onClick={()=>addnew()} className='buttonarleadyexist'>Add New</button>
                    
                    </div>
                </div>
            </div>}
            <div className="container">
                <div className="upper">
                    Scan Product
                </div>
                <div className="lower">
                    <div className="icon">
                        <FontAwesomeIcon icon={faBarcode} />
                    </div>
                    <div className="code">
                        <input
                            ref={inputRef} // Attach the ref to the input element
                            type="text"
                            value={barcode ? barcode : ""}
                            onChange={handleBarcodeChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    {/* <div onClick={() => nextpage()} className="codee">
                        continue
                    </div> */}
                </div>
                <div className="footer">
                    Place the item in proximity to the barcode scanner for scanning
                </div>
            </div>
        </div>
    )
}
