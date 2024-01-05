import React, { useContext } from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import './sidebar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export const Sidebar = () => {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  const deleteUserFromLocalStorage = () => {
    localStorage.removeItem('jiabailiuser17082000111');
    navigate("/login/")
    // Optionally, you can perform additional actions after removing the user
    // For example, redirecting to a login page or updating the state
  };
  return (
    <div className='sidebar'>
      <div className="jiabaili">
        <div className="upper">
          <div className="img">
              <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
        <div className="middle">
          <span className="name">JiaBaiLi Supermarket</span>
          <span className="email">{user.username}</span>
        </div>
        <div className="lower">
          Visit website
        </div>
      </div>
      <div className="item">
        <div className="icon"><HomeOutlinedIcon/></div>
        <div className="term">
          <div className="master">Home</div>
        </div>
      </div>
      <div className="item">
        <div className="icon"><DescriptionOutlinedIcon/></div>
        <div className="term">
          <div onClick={()=>navigate("/orders/")} className="master">Orders</div>
        </div>
      </div>

      <div className="item">
        <div className="icon"><LocalOfferOutlinedIcon/></div>
        <div className="term">
          <div onClick={()=>navigate("/addproduct/")} className="master">Products</div>
        </div>
      </div>

      <div className="item">
        <div className="icon"><PointOfSaleOutlinedIcon/></div>
        <div className="term">
          <div className="master">Payments</div>
        </div>
      </div>

      <div className="item">
        <div className="icon"><LocationOnOutlinedIcon/></div>
        <div className="term">
        <div onClick={()=>navigate("/locations/")} className="master">Locations</div>
        </div>
      </div>

      <div className="item">
        <div className="icon"><LogoutIcon/></div>
        <div className="term">
          <div onClick={()=>deleteUserFromLocalStorage()} className="master">Log out</div>
        </div>
      </div>


    </div>
  )
}
