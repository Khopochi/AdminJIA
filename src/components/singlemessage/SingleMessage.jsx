import React, { useContext, useEffect, useState } from 'react'
import './singlemessage.scss'
import { format } from 'timeago.js'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import baseurl from '../../ourapi'

export const SingleMessage = ({body,selected}) => {


  const user = {
    _id: "65bba67908bbe58ec8a7f1e1"
  }
  const [userInfo, setUserInfo] = useState()
  const array = body.members
  const removeItem = (name)  => {
    const filteredArray = array.filter((item) => item !== name);
    return filteredArray;
  };

  const newArray = removeItem(user?._id)

  //fetch user name
  useEffect(()=>{
    const fetchname = async () => {
      const res = await axios.get(baseurl+`user/useronload/${newArray[0]}`)
      setUserInfo(res.data)
    }
    fetchname()
  },[newArray[0]])

  // console.log(newArray[0])
  return (
    <>
    { userInfo && <div className={(selected === body._id) ? 'singlemessage selectedmessage' : 'singlemessage'}>
            <div className="profilePhoto">
                {userInfo?.profile && <img  src={`https://casaserver.eu-4.evennode.com/photos/${userInfo?.profile}`} alt="" className="profilephotoimg" />}
                {!userInfo?.profile && <div className='profilephotoimg'></div>}
            </div>
            <div className="nameMessage">
                <div className="nametime">
                    <span className='name'>{userInfo.firstname} {userInfo.lastname}</span>
                    <span className='time'>{format(body.updatedAt)}</span>
                </div>
                <div className="message">{body.message}</div>
            </div>
    </div>}
    {
      !userInfo && <div className='singlemessage'>
        Loading...
      </div>
    }
    </>
  )
}
