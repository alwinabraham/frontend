import React,{useState, useEffect} from 'react'
import FriendsCard from './FriendsPage/FriendsCard'
import RequestsCard from './FriendsPage/RequestsCard'
import FollowingCard from './FriendsPage/FollowingCard'
import NavigationCard from './mainPage/NavigationCard'
import Search from './search/search'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { getFriends } from '../api/FriendsRequests'
import { useSelector } from 'react-redux'
import DarkMode from './mainPage/DarkMode'

export default function Friends() {

  const navigate = useNavigate();
  const user = useSelector((state)=>state.user)
  const [users, setUsers] = useState()
  const [followingPage,setFollowingPage] = useState(false)
  const [followerPage,setFollowerPage] = useState(false)
  const [suggestionsPage,setSuggestionsPage] = useState(true)
  const [userId,setUserId] = useState()
  const [cookies,setCookie,removeCookie] = useCookies([])

  const verifyUser = async ()=>{
    if(!cookies.jwt){
      navigate("/login")
    }else{
      const {data} = await axios.post(
        `${import.meta.env.VITE_AXIOS_KEY}`,{},
        {withCredentials: true}
        );
        setUserId(data?.user?._id)
        if(!data.status){
          removeCookie("jwt");
          navigate("/login");
        }else {};
    }
  }

  const fetchUsers = async () =>{
      const userData = await getFriends()
      setUsers(userData)
  }

  useEffect(() => {
    fetchUsers()
  }, [user])
  
  useEffect(()=>{
    verifyUser()
  })
  

  return (
    <div className='flex pt-4 max-w-8xl sm:px-5 sm:gap-6 dark:bg-gray-900'>
      <div className='w-2/12'>
        <NavigationCard />
        <DarkMode />
      </div>
      <div className='xl:w-8/12 md:w-10/12 w-10/12'>
          <Search />
           <div className='flex'>
            <button onClick={()=>{setFollowingPage(false);setSuggestionsPage(true);setFollowerPage(false)}} className="m-1 bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-full text-xs sm:text-sm md:text-md lg:text-lg">Suggestions</button>
            <button onClick={()=>{setFollowingPage(false);setSuggestionsPage(false);setFollowerPage(true)}} className="m-1 bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-full text-xs sm:text-sm md:text-md lg:text-lg">Followers</button>
            <button onClick={()=>{setFollowingPage(true);setSuggestionsPage(false);setFollowerPage(false)}} className="m-1 bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-full text-xs sm:text-sm md:text-md lg:text-lg">Following</button>
           </div>
          <div>
          {suggestionsPage && users && <FriendsCard users={users}/>}
          {followerPage && userId && <RequestsCard id={userId} />}
          {followingPage && userId && <FollowingCard id={userId} />}
          </div>
        </div>
    </div>
  )
}
