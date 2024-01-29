import React from 'react'
import './navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
      <div className="addproduct1">
        <span className="icon"><FontAwesomeIcon icon={faPlus} /></span>
        <span  onClick={()=>navigate("/warehouse/")} className="product">Add product</span>
      </div>
      <div className="search">
        <span className="icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
        <input type="text" placeholder='Search...' />
        <span className="button">Search</span>
      </div>
    </div>
  )
}

export default Navbar
