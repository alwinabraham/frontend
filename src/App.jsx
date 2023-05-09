import React,{ useEffect } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import OtpLogin from './pages/otpLogin/OtpLogin'
import Page from './pages/Page'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Chats from './pages/Chats'
import Notification from './pages/Notification'
import SearchPage from './pages/SearchPage'
import "react-toastify/dist/ReactToastify.css"
import Friends from './pages/Friends'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from './redux/userData'
import AdminLogin from './pages/AdminPage/AdminLogin'
import AdminDashboard from './pages/AdminPage/AdminDashboard'
import AdminUsers from './pages/AdminPage/AdminUsers'
import AdminReports from './pages/AdminPage/AdminReports'
import Share from './pages/Share'

function App() {
  
  let check = false;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const verifyUser = async ()=>{
    const {data} = await axios.post(
        `${import.meta.env.VITE_AXIOS_KEY}`,{},
        {withCredentials: true}
        );
        dispatch(setLogin({user:data?.user?._id}))
      }

  useEffect(() => {
    verifyUser()
  }, [])

  check = user.user == null ? false : true    
      
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element= {<Register />} />
        <Route exact path="/login" element= {<Login />} />
        <Route exact path="/" element={<Page user={user} />} />
        <Route exact path="/otp_login" element={check && <OtpLogin />} />
        <Route exact path="/profile" element={check && <Profile userId={user} />} />
        <Route exact path="/friends" element={check && <Friends />} />
        <Route exact path="/chats" element={check && <Chats />} />
        <Route exact path="/notification" element={check && <Notification />} />
        <Route exact path="/searchPage" element={check && <SearchPage />} />
        <Route exact path="/admin" element={<AdminLogin />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/admin/userDetails" element={<AdminUsers />} />
        <Route exact path="/admin/reports" element={<AdminReports />} />
        <Route exact path="/share/:id" element={<Share />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
