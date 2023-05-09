import React,{useState,useEffect} from 'react'
import '../chatsPage/Chats.css'
import { getUser } from '../../api/ChatRequests'

export default function Conversation({data, currentUserId}) {

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const userId = data.members.find((id)=>id!==currentUserId)
    const getUserData = async()=>{
      try {
        const {data} = await getUser(userId)
        setUserData(data)
      } catch (error) {
        
      }
    }
    getUserData()
  }, [])
  
  return (
    // <div className='follower conversation
      <div>
        {/* <img className="w-16 rounded-full overflow-hidden" src={userData?.imageName} /> */}
        <img className="w-8 h-8 sm:w-16 sm:h-16 mb-3 rounded-full shadow-lg" src={userData?.imageName} />

        {/* <ProfileImageComponent userId={userData?._id} /> */}
        <div className="name mt-3" style={{fontSize:"0.8rem"}}>
          <span className='font-semibold text-base dark:text-gray-200'>{userData?.name}</span>
        </div>
      </div>
    // </div>
  )
}
