import React, { useContext, useEffect, useRef, useState } from 'react'
import './message.scss'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { SingleMessage } from '../../components/singlemessage/SingleMessage';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import {format} from 'timeago.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { io } from 'socket.io-client';
import { useMediaQuery } from 'react-responsive';
import baseurl from '../../ourapi';


export const Message = () => {
    const user = {
        _id: "65bba67908bbe58ec8a7f1e1"
    }
    const [selectedConvo, setSelectedConvo] = useState()
    const [membersArray, setMembersArray] = useState([])
    const [chatMessages, setChatMessages] = useState([])
    const [convo, setConvo] = useState()
    const [newMessage, setNewMessage] = useState("")
    const [status, setStatus] = useState(false)
    const [img, setImg] = useState([])
    const [photoarray, setPhotoarray] = useState([])

    const socket = useRef()

    // socketio open
    // const [socket, setSocket] = useState(null)
    // useEffect(()=>{
    //     socket.current = io("ws://casaserver.eu-4.evennode.com")
    // },[])
  
    //add my userid that i am connected
    // useEffect(()=>{
    //     socket.current.emit("addUser", user?._id)
    //     socket.current.on("getusers", (users)=>{
    //       //console.log(users)
    //     })
    // },[socket])




    //socketioclose

    useEffect(()=>{
        const fetchConvo = async () => {
            const convo = await axios.get(baseurl+"convo/"+user?._id)
            setConvo(convo.data)
        }
        fetchConvo()
    },[])
    //set selected convo and member arrsy
    const memberArray = (convo, members) => {
        setChattingArea(true)
        setSelectedConvo(convo)
        setMembersArray(members)
    }
    //fetch actual messages
    useEffect(()=>{
        const fetchChat = async () => {
            try{
                const res = await axios.get(baseurl+"message/"+selectedConvo)
                setChatMessages(res.data)
            }catch(err){

            }
        }
        fetchChat()
    },[selectedConvo])

    //update messages that are seen
    useEffect(()=>{
        const fetchChat = async () => {
            try{
                const res = await axios.get(baseurl+"message/updateseen/"+user._id)
                //console.log(res.data)
            }catch(err){

            }
        }
        fetchChat()
    },[])
    //fetch messages end here
    //console.log(chatMessages)
    //send message function
    const handleSendMessage = async () => {
        //sett date for te purpose of sockeio
        const now = new Date();
        const formattedDate = now.toISOString();
        //message body
        const message = {
            conversationid: selectedConvo,
            text:newMessage,            
            senderid: user._id,
        }
        //for convo, update message
        const updatedText = {
            message: newMessage
          }
        if(newMessage){
                const postMessage = await axios.post(baseurl+"message/", message)
                const resMessage = postMessage.data
                setChatMessages([...chatMessages, resMessage])
                const {text,type,conversationid} = resMessage
                //sending message to other client from response
                // socket.current.emit("sendMessage", {
                //     senderId: user?._id,
                //     receiverid: activechat._id,
                //     text: text,
                //     type: type,
                //     members: membersArray,
                //     conversationid: conversationid,
                //     createdAt: formattedDate     
                // })
                const updateThatText = await axios.put(baseurl+"convo/update/"+selectedConvo, updatedText)
                const resUpConvo = updateThatText.data

                //remove from conco array
                const idToRemove = selectedConvo;
                const indexToRemove = convo.findIndex((item) => item._id === idToRemove);

                if (indexToRemove > -1) {
                    convo.splice(indexToRemove, 1);
                }
                setConvo([resUpConvo, ...convo])
                setNewMessage("")
        }else{
            //console.log("Rubbish")
        }
    }

    // //console.log(convo[0])
    //auto down scroll
    //scroll down
    const ref = useRef()
    useEffect(()=> {
        ref.current?.scrollIntoView({behavior:"smooth"})
    }, [chatMessages])

    //handle message having an image
    const [imageMessage, setImageMessage] = useState({
            conversationid: selectedConvo,
            text:"Image",            
            senderid: user._id,
            type: true,
            photos: [undefined]
    })
    //setting message details
    useEffect(()=>{
        setImageMessage((prev) => ({...prev, conversationid: selectedConvo}))
        setStatus(false)
        setImageMessage((prev) => ({...prev, photos: undefined}))
    },[selectedConvo])
    //handle caption
    const handleCaption = (e) => {
        setImageMessage((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const loadImages = (e) => {
        // setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
        // setImg([e.target.files])
        setStatus(true)
        const selectedValues = e.target.files
        const selectedValuesArray = Array.from(selectedValues)
        setPhotoarray(selectedValuesArray)
        // //console.log(selectedValuesArray)
  
        const imageArray = selectedValuesArray.map((file)=>{
          return URL.createObjectURL(file)
        })
        const imageArray2 = selectedValuesArray.map((file)=>{
          return file.size + file.name
        })
        // //console.log(imageArray)
        setImg(imageArray)
        setImageMessage((prev) => ({...prev, [e.target.id]: imageArray2}))
        // //console.log(selectedValuesArray)
  
    }
    //send message from image
    const handleImageSend = async () => {
        //date
        const now = new Date();
        const formattedDate = now.toISOString();
          const updatedText = {
            message: imageMessage.text
          }
            
          
          try{
            try{
                photoarray.map((file) => {
                  let formData = new FormData()
                  formData.append("zola", file)
                  axios({
                    url: 'https://api.jiabaili.shop/uploady',
                    method: "POST",
                    data: formData
                  }).then((res)=>{
        
                  }, (err)=>{
        
                  })
                })
              }catch(er){
              }
                const postMessage = await axios.post(baseurl+"message/", imageMessage)
                const resMessage = postMessage.data
                setChatMessages([...chatMessages, resMessage])
                const {text,type,photos,conversationid} = resMessage
                //sending message to other client from response
                // socket.current.emit("sendPhoto", {
                //     senderId: user?._id,
                //     receiverid: activechat._id,
                //     text: text,
                //     photos: photos,
                //     members: membersArray,
                //     type: type,
                //     conversationid: conversationid,
                //     createdAt: formattedDate     
                // })
                const updateThatText = await axios.put(baseurl+"convo/update/"+selectedConvo, updatedText)
                const resUpConvo = updateThatText.data

                //remove from conco array
                const idToRemove = selectedConvo;
                const indexToRemove = convo.findIndex((item) => item._id === idToRemove);

                if (indexToRemove > -1) {
                    convo.splice(indexToRemove, 1);
                }
                setConvo([resUpConvo, ...convo])
                setNewMessage("")
                setStatus(false)
                setImageMessage((prev) => ({...prev, text: "Image"}))
                setImageMessage((prev) => ({...prev, photos: undefined}))


          }catch(err){

          }

    }
    //to change user on top when clicked
     //to change user ingo on top of the chatting page
     const [activechat,setactivechat] = useState(null)
     const [usetemp,settemp] = useState(null)
     useEffect(()=>{
       if(selectedConvo){const getuser = async () => {
           const friendid = membersArray.find((friend) => friend !== user._id)

           try{
               const res = await axios.get(baseurl+"user/useronload/"+friendid)
               setactivechat(res.data)
           }catch(err){

           }
       }
       getuser()}
       
     },[selectedConvo])

    
     //receive message in realtime
     const [chatty, setChatty] = useState()
    //  useEffect(()=>{
    //     socket.current.on("getMessage", (data)=>{
    //         setChatty(data)
    //     })
    //  },[])
     //send it to the actual message not anything
     useEffect(()=>{
        chatty && membersArray.includes(chatty.senderId) && setChatMessages(prev=>[...prev, chatty]) //setChatMessages([...chatMessages, chatty])

        // setChatMessages(prev=>[...prev, chatty])
        // //console.log(chatty)
       // //console.log(chatmessages)
    },[chatty])

    useEffect(()=>{
        if(chatty){
            const {conversationid,text,createdAt,members} = chatty
            const resUpConvo = {
                _id: conversationid,
                conversationid: conversationid,
                message: text,
                members: members,
                updatedAt: createdAt
        }

        const idToRemove = chatty.conversationid;
        const indexToRemove = convo.findIndex((item) => item._id === idToRemove);

        if (indexToRemove > -1) {
            convo.splice(indexToRemove, 1);
        }
        setConvo([resUpConvo, ...convo])
        // //console.log(resUpConvo)
    }
    },[chatty])

    // //console.log(chatMessages)
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
      })
      const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
      const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
      const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
      const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

      const [chattingarea, setChattingArea] = useState(false)

  return (
    <>
        {isDesktopOrLaptop && <div className='message'>
           
            <div className="messageContainer">
                {/* <Navbar/> */}
                <div className="messageContainer">
                    <div className="left">
                        <div className="messagesAlert">
                            {
                                convo?.map((text,index)=>(
                                    <div onClick={()=>memberArray(text?._id,text.members)} key={index}>
                                        <SingleMessage selected={selectedConvo} body={text}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="right">
                        { !selectedConvo && <div className='tapchat'>
                            <span className="title">Jia Bai Li Chat</span>
                            <span className="description">
                                chat live with other Jia Bai Li users 24/7 to discuss bids and orders. 
                                All messages are encrypted end-to-end, 
                                so you can be confident that your conversations are private
                            </span>
                        </div>}
                        {selectedConvo && <div className='normal'>
                                    { status && <div className="imagemessagearea">
                                        <div className='imageArea'>
                                            <div className="imagespace">
                                                <div onClick={()=>setStatus(false)} className="close"><FontAwesomeIcon icon={faXmark} /></div>                                            <img src={img[0]} alt="" />
                                            </div>
                                            <div className="textspace">
                                                <input id='text' onChange={handleCaption} type="text" placeholder='caption...' className="caption" />
                                                <div className='imagesender' onClick={handleImageSend}>
                                                    <SendOutlinedIcon/>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>}
                                    <div className='top'>
                                        <div className="selecteduserprofile">
                                                {activechat?.profile && <img src={`https://casaserver.eu-4.evennode.com/photos/${activechat?.profile}`} alt="" />}
                                                {!activechat?.profile && <div className='imgHold'></div>}
                                            </div>
                                            <div className="usernameandonline">
                                                <div className="username">{activechat?.firstname} {activechat?.lastname}</div>
                                                <div className="online">Jia Bai Li</div>
                                            </div>
                                    </div>
                                    <div className='messageBody'>
                                        <div className="messages">

                                            {/* messages start */}

                                        { chatMessages?.map((chat,index)=>(
                                                <div key={index} >
                                                    {!chat.type && <div  key={index} className={(chat?.senderid === user?._id) ? "leftmessage" : "rightmessage"}>
                                                        <div className={(chat?.senderid === user?._id) ? "actualmessegaeleft" : "actualmessageright"}>
                                                            {chat.text}
                                                            <div ref={ref} className='minutes'>{format(chat.createdAt)}</div>
                                                        </div>
                                                    </div>}
                                                    {
                                                        chat.type && <div key={index} className={(chat?.senderid === user?._id) ? "leftmessage" : "rightmessage"}>
                                                            <div className={(chat?.senderid === user?._id) ? "actualmessegaeleftImg" : "actualmessagerightImg"}>
                                                                <span className='classIMGHolder'><img className='chatImage' src={`https://api.jiabaili.shop/photosy/${chat?.photos[0]}`} alt="" /></span>
                                                                {
                                                                    !(chat?.text === "Image") && <div className='imagetext'>{chat?.text}</div>
                                                                }
                                                                <div ref={ref} className='minutes'>{format(chat.createdAt)}</div>
                                                                
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                        ))}
                                            {/* messages end */}
                                            
                                            
                                        </div>
                                        <div className="chatSpace">
                                            <div className="img">
                                                <form>
                                                    <label className='getphotos' htmlFor='photos'><AddPhotoAlternateOutlinedIcon  /></label>
                                                    <input type="file" multiple onChange={loadImages} className="file" accept='image/*' style={{display:"none"}} id='photos' />
                                                </form>
                                            </div>
                                            <input type="text" placeholder='Type a message' onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}  />
                                            <div onClick={handleSendMessage} className="send">
                                                <SendOutlinedIcon/>
                                            </div>
                                        </div>
                                    </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>}

        {
            isTabletOrMobile && <div className='messageMobile'>
          
            <div className="messageContainer">
                {/* <Navbar/> */}
                <div className="messageContainer">
                    <div className="left">
                        <div className='searchDiv'>
                            <SearchSharpIcon className='searchIcon'/>
                            <input type="text" placeholder='Search Name...' className="usersearch" />
                        </div>
                        <div className="messagesAlert">
                            {
                                convo?.map((text,index)=>(
                                    <div onClick={()=>memberArray(text?._id,text.members)} key={index}>
                                        <SingleMessage selected={selectedConvo} body={text}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {chattingarea && <div className="right">
                        { !selectedConvo && <div className='tapchat'>
                            <span className="title">Agri-Connect Chat</span>
                            <span className="description">
                                chat live with other Agri-connect users 24/7 to discuss bids and orders. 
                                All messages are encrypted end-to-end, 
                                so you can be confident that your conversations are private
                            </span>
                        </div>}
                        {selectedConvo && <div className='normal'>
                                    { status && <div className="imagemessagearea">
                                        <div className='imageArea'>
                                            <div className="imagespace">
                                                <div onClick={()=>setStatus(false)} className="close"><FontAwesomeIcon icon={faXmark} /></div>
                                                <img src={img[0]} alt="" />
                                            </div>
                                            <div className="textspace">
                                                <input id='text' onChange={handleCaption} type="text" placeholder='caption...' className="caption" />
                                                <div className='imagesender' onClick={handleImageSend}>
                                                    <SendOutlinedIcon/>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>}
                                    <div className='top'>
                                        <div className="selecteduserprofile">
                                                {activechat?.profile && <img src={`https://casaserver.eu-4.evennode.com/photos/${activechat?.profile}`} alt="" />}
                                                {!activechat?.profile && <div className='imgHold'></div>}
                                            </div>
                                            <div className="usernameandonline">
                                                <div onClick={()=>setChattingArea(false)} className="closecurrentchat"><FontAwesomeIcon icon={faXmark}/></div>
                                                <div className="username">{activechat?.firstname} {activechat?.lastname}</div>
                                                <div className="online">Jia Bai Li</div>
                                            </div>
                                    </div>
                                    <div className='messageBody'>
                                        <div className="messages">

                                            {/* messages start */}

                                        { chatMessages?.map((chat,index)=>(
                                                <div key={index} >
                                                    {!chat.type && <div  key={index} className={(chat?.senderid === user?._id) ? "leftmessage" : "rightmessage"}>
                                                        <div className={(chat?.senderid === user?._id) ? "actualmessegaeleft" : "actualmessageright"}>
                                                            {chat.text}
                                                            <div ref={ref} className='minutes'>{format(chat.createdAt)}</div>
                                                        </div>
                                                    </div>}
                                                    {
                                                        chat.type && <div key={index} className={(chat?.senderid === user?._id) ? "leftmessage" : "rightmessage"}>
                                                            <div className={(chat?.senderid === user?._id) ? "actualmessegaeleftImg" : "actualmessagerightImg"}>
                                                                <span className='classIMGHolder'><img className='chatImage' src={`https://api.jiabaili.shop/photosy/${chat?.photos[0]}`} alt="" /></span>
                                                                {
                                                                    !(chat?.text === "Image") && <div className='imagetext'>{chat?.text}</div>
                                                                }
                                                                <div ref={ref} className='minutes'>{format(chat.createdAt)}</div>
                                                                
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                        ))}
                                            {/* messages end */}
                                            
                                            
                                        </div>
                                        <div className="chatSpace">
                                            <div className="img">
                                                <form>
                                                    <label className='getphotos' htmlFor='photos'><AddPhotoAlternateOutlinedIcon  /></label>
                                                    <input type="file" multiple onChange={loadImages} className="file" accept='image/*' style={{display:"none"}} id='photos' />
                                                </form>
                                            </div>
                                            <input type="text" placeholder='Type a message' onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}  />
                                            <div onClick={handleSendMessage} className="send">
                                                <SendOutlinedIcon/>
                                            </div>
                                        </div>
                                    </div>
                        </div>}
                    </div>}
                </div>
            </div>
            </div>
        }
    </>
  )
}
