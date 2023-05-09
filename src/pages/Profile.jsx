import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import NavigationCard from './mainPage/NavigationCard'
import ProfilePostCard from './ProfilePage/ProfilePostCard'
import ProfileCover from './mainPage/ProfileCover'
import Search from './search/search'
import { useSelector } from 'react-redux'
import DarkMode from './mainPage/DarkMode'

export default function Page({userId}) {

  const [id,setId] = useState()
  const [posts,setPosts] = useState()
  const navigate = useNavigate()
  const [cookies,setCookie,removeCookie] = useCookies([])
  const user = useSelector((state)=>state.user)
  
  const verifyUser = async ()=>{
    if(!cookies.jwt){
      navigate("/login")
    }else{
      const {data} = await axios.post(
        `${import.meta.env.VITE_AXIOS_KEY}`,{},
        {withCredentials: true}
        );
        setId(data?.user) 
        if(!data.status){
          removeCookie("jwt");
          navigate("/login");
        }else {};
      }
    }
    
  const fetchPosts = async()=>{
      try {
          const {data} =  await axios.post(`${import.meta.env.VITE_AXIOS_KEY}/profile_post`,{
              userId:userId.user
          })
          setPosts(data)
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
    verifyUser()
    fetchPosts()
  },[user])

  return (
    <div className='flex pt-4 max-w-8xl sm:px-5 sm:gap-6 dark:bg-gray-900'>
      <div className='w-2/12'>
        <NavigationCard />
        <DarkMode />
      </div>
      <div className='xl:w-8/12 md:w-10/12 w-10/12'>
          <Search />
          {id && <ProfileCover data={id} post={posts}/>}
          {posts && <ProfilePostCard post={posts}/>}
        </div>
    </div>
  )
}
