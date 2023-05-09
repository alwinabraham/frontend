import React,{ useState, useEffect, useRef} from 'react'
import axios from 'axios'
import NameComponent from '../mainPage/NameComponent' 
import { useSelector,useDispatch } from 'react-redux'
import { sendFriendRequest } from '../../api/FriendsRequests'
import { setCheck, setNotification } from '../../redux/userData'
import { io } from 'socket.io-client'


export default function FriendsCard(props) {

  const userDetails = props?.users?.data
  const [friend, setFriend] = useState(undefined)
  const [id,setId] = useState()
  const [chat,setChat] = useState("")
  const [userData,setUserData] = useState()
  const [follow,setFollow] = useState(false)
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const userValue = userDetails.filter(use => use._id !== id);
  const [notifiCount,setNotifiCount] = useState(user.notification)

  const socket = useRef()

  useEffect(() => {
    verifyUser()
  },[user.user,user.check,follow])

  const addFriend = {
    targetId:friend,
    userId:user.user
  }

  const addChat = {
    senderId:user.user,
    receiverId:chat
  }
  
  const verifyUser = async ()=>{
      const {data} = await axios.post(
        `${import.meta.env.VITE_AXIOS_KEY}`,{},{
          withCredentials:true
        });
        setId(data?.user?._id)
        setUserData(data?.user)
  }

  const sendNotification = {
    receiverId:user.user,
    userId:friend
  }

  dispatch(setNotification({notification:notifiCount}))

  useEffect(() => {
    try {
        socket.current = io('http://localhost:8800')
        socket.current.emit('login-user-add', user.user)
        socket.current.on("notification",(data)=>{
            if(data.userId === user.user){
                setNotifiCount(notifiCount+1)
            }
        })
    } catch (error) {
        console.log(error);         
    }
  })

  useEffect(() => {
    const addNewFriend = async ()=>{
        const {data} = await sendFriendRequest(addFriend)
        if(data.isFriend.friend == true){
          socket.current.emit("send-notification", sendNotification);
      }
        dispatch(setCheck({check:addFriend.targetId}))
      }
      setFriend(undefined)
      addNewFriend()
  }, [follow])

  return (
    <>
      {userValue.map(obj=>(
        <>
          <div className="flex justify-between p-3 mt-1 bg-white rounded border dark:border-gray-800 dark:bg-gray-800">
            <div className='flex items-center gap-3'>
              <img className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 mb-3 rounded-full shadow-lg" src={obj.imageName} />
              <p className='flex font-semibold text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl dark:text-gray-300'><NameComponent userId={obj._id}/></p>
            </div>
            <div className='flex items-center'>
              <div>
                <button onClick={()=>{setFriend(obj._id);setFollow(!follow)}} className="inline-flex items-center px-4 py-2 text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-semibold text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl">
                  {userData?.following.find((userid)=>{
                      return userid === obj._id
                      }) ? "Unfollow":"Follow"}
                </button>
              </div>
            </div>
          </div>
        </>
        ))}
    </>
  )
}
