import React, { useState } from 'react'
import './previewproduct.scss'
import { faEye, faFile } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarcode, faCopyright, faExpand, faFileAlt, faList, faPalette, faPercent, faRecycle, faTable, faTag } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigation, useHistory, useNavigate} from 'react-router-dom'
import parse from 'html-react-parser';
import { BeatLoader } from 'react-spinners'
import axios from 'axios'
import baseurl from '../../ourapi'

export const PreviewProduct = () => {
  const location = useLocation()
  const [credetials, setCreditials] = useState(location.state?.credentilas)
  const [preview, setpreview] = useState(location.state?.previewAttributes)
  const Navigate = useNavigate()

  const [load,setLoad] = useState(false)
  const onConfirm = async () => {
    setLoad(true)
    try{
      const postProduct = await axios.post(baseurl+"product/addproduct",credetials)
      setLoad(false)
      Navigate("/addproduct/scan/")
    }catch(err){

    }
  }
  return (
  <div className="previewproduct">
    {load && <div className="loader">
      <div className="containerl">
        <div className="icon"><BeatLoader color="hsla(187, 100%, 26%, 1)" /></div>
        <div className="loading">Uploading...</div>
      </div>
    </div>}
    <div className="heading">
      <div className="header">Product Preview</div>
    </div>
    <div className="div">
    <div className='container'>
      <div className="first">
        <div className="title">{credetials.name}</div>
        <div className="images">
                    {preview?.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Preview ${index + 1}`}
                            />
                    ))}
        </div>
      </div>
      <div className="second">
        <div className="description">
          <div className="title">
            <span><FontAwesomeIcon icon={faFileAlt} /></span>
            <span>Description</span>
          </div>
          <div className="word">
               {parse(credetials.details)}
          </div>   
        </div>
        <div className="category">
          <div className="title">
              <span><FontAwesomeIcon icon={faList} /></span>
              <span>Category</span>
          </div>
          <div className="word">Fashion</div>
        </div>
        <div className="category">
        <div className="title">
              <span><FontAwesomeIcon icon={faList} /></span>
              <span>Sub Category</span>
          </div>
          <div className="word">Women</div>
        </div>
        <div className="category">
          <div className="title">
              <span><FontAwesomeIcon icon={faList} /></span>
              <span>Deep Category</span>
          </div>
          <div className="word">Shoes</div>
        </div>
      </div>
      <div className="third">
        <div className="price">
          <div className="title">
              <span><FontAwesomeIcon icon={faTag} /></span>
              <span>Price</span>
          </div>
          <div className="wordprice"><span className="mwk">MWK</span> <span className="figure">{credetials.price}</span></div>
        </div>
        <div className="quantity">
          <div className="title">
              <span><FontAwesomeIcon icon={faExpand} /></span>
              <span>Quantity</span>
          </div>
          <div className="word">{credetials.quantity}</div>
        </div>
        <div className="discount">
          <div className="title">
              <span><FontAwesomeIcon icon={faPercent} /></span>
              <span>Discount</span>
          </div>
          <div className="word">{credetials.discount}%</div>
        </div>
      </div>
      <div className="third">
        <div className="price">
          <div className="title">
              <span><FontAwesomeIcon icon={faBarcode} /></span>
              <span>Bar code</span>
          </div>
          <div className="wordprice"><span className="figure">9678459857489672039567</span></div>
        </div>
      </div>
    </div>
    <div className="right">
    <div className="third">
      <div className="namer">Attributes</div>
        <div className="price">
          <div className="title">
              <span><FontAwesomeIcon icon={faCopyright} /></span>
              <span>{credetials.brand}</span>
          </div>
          <div className="title">
              <span><FontAwesomeIcon icon={faPalette} /></span>
              <span>{credetials.color}</span>
          </div>
          <div className="title">
              <span><FontAwesomeIcon icon={faRecycle} /></span>
              <span>{credetials.material}</span>
          </div>
          <div className="title">
              <span><FontAwesomeIcon icon={faEye} /></span>
              <span>{credetials.appearance}</span>
          </div>
          <div className="title">
              <span><FontAwesomeIcon icon={faTable} /></span>
              <span>{credetials.producttype}</span>
          </div>
        </div>
    </div>
          <button onClick={()=>onConfirm()} className='buttonn'>
            Confirm
          </button>
    </div>
    </div>
  </div>

  )
}
