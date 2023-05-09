import React,{useEffect,useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import NavigationCard from './mainPage/NavigationCard'
import PostFormCard from './mainPage/PostFormCard'
import Search from './search/search'
import PostCard from './mainPage/PostCard'
import { useSelector,useDispatch } from 'react-redux';
import {io} from 'socket.io-client'
import { setNotification } from '../redux/userData'
import { getNotifiCounter } from '../api/NotificationRequests'
import { getPosts } from '../api/PostRequests'
import DarkMode from './mainPage/DarkMode'

export default function Page({user}) {

  const [post,setPost] = useState()
  const navigate = useNavigate();
  const [cookies,setCookie,removeCookie] = useCookies([])
  const socket = useRef()
  const dispatch = useDispatch()
  const [onlineUsers, setOnlineUsers] = useState()

  useEffect(() => {
    socket.current = io('http://localhost:8800')
    socket.current.emit('login-user-add', user.user)
    socket.current.emit('get-users-count')
    socket.current.on('logged-users',(users)=>{
      setOnlineUsers(users);
    })
  }, [])

  useEffect(()=>{
    const getNotificationCounter = async () =>{
      const {data} = await getNotifiCounter({userId:user.user})
      dispatch(setNotification({notification:data[0].counter}))
    }
    getNotificationCounter()
  },[])

  const verifyUser = async ()=>{
    if(!cookies.jwt){
      navigate("/login")
    }else{
      const {data} = await axios.post(
        `${import.meta.env.VITE_AXIOS_KEY}`,{},
        {withCredentials: true}
        );
        console.log(data);
        if(!data.status){
          removeCookie("jwt");
          navigate("/login");
        }else if(data.user.status == "Unblock"){
          removeCookie("jwt");
          navigate("/login");
        }else{}
      }
  }
  
  useEffect(() => {
    const fetchPosts = async () =>{
      const data = await getPosts({id:user.user})
        setPost(data)
    }
    fetchPosts();
  },[user])
  
  useEffect(() => {
    verifyUser();
  }, [cookies,navigate,removeCookie])
  

  return (

    <div className='flex pt-4 max-w-8xl sm:px-5 sm:gap-6 dark:bg-gray-900'>
      <div className='w-2/12'>
        <NavigationCard />
        <DarkMode />
      </div>
        <div className='xl:w-8/12 md:w-10/12 w-10/12'>
          <Search/>
          {user && <PostFormCard />}
          {post && <PostCard post={post} />}
        </div>
    </div>

  )
}
