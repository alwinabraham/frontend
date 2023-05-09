import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {ToastContainer,toast} from "react-toastify"
import axios from 'axios';
import {useCookies} from 'react-cookie'
import { useDispatch } from 'react-redux';

const AdminLogin = () => {

  const [cookies,setCookie,removeCookie] = useCookies([])
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [values, setValues] = useState({
      email: "",
      password: ""
  });

  const generateError = (err) => toast.error(err,{
      position:"bottom-right"
  })

  const handleSubmit = async (e)=>{
      e.preventDefault()
      try {
          const {data} = await axios.post(`${import.meta.env.VITE_AXIOS_KEY}/admin/login`,{
              ...values
          },
          {
              withCredentials:true,
          })
          if(data){
              if(data.errors){
                  // const {email,password} = data.errors;
                  // if(email) generateError(email)
                  // else if(password) generateError(password)
              }else{
                  navigate("/admin/dashboard")
              }
          }
      } catch (error) {
          console.log(error);
      }
  }
  
  const verifyUser=()=>{
      if(!cookies.adminjwt){
          navigate("/admin")
      }else{
          navigate("/admin/dashboard")
      }
  }

  useEffect(() => {
      verifyUser();
  },[cookies])
  

  return (
    <>
    <div className="flex justify-center items-center h-screen bg-emerald-900">
        <div className='w-96 p-6 shadow-lg bg-white rounded-md'>
            <h1 className='text-3xl block text-center font-semibold'>Login</h1>
            <hr className='mb-3'></hr>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className='mb-3'>
                <label htmlFor="email" className='block text-base mb-2'>Email</label>
                <input type="email" name="email" className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' placeholder='Email' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password" className='block text-base mb-2'>Password</label>
                <input type="password" name="password" className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' placeholder='Password' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
            </div>
            <div className="mt-5">
                <button type='submit' className='border-2 border-emerald-700 bg-emerald-600 text-white py-1 px-5 w-full rounded-md hover:bg-transparent hover:text-emerald-700 font-semibold'>Login</button>
            </div>
            </form>
        </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default AdminLogin