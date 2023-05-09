import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {ToastContainer,toast} from "react-toastify"
import axios from 'axios';
import {useCookies} from 'react-cookie'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/userData';

export default function Login() {

    const [cookies,setCookie,removeCookie] = useCookies([])
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
     } = useForm()

    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const generateError = (err) => toast.error(err,{
        position:"bottom-right"
    })

    const onSubmit = async (values) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_AXIOS_KEY}/login`, {
                ...values
            },
                {
                    withCredentials: true,
                })
            if (data) {
                if (data.error) {
                    const { email, password } = data.error;
                    if (email) generateError(email)
                    else if (password) generateError(password)
                } else {
                    dispatch(setLogin({ user: data.user }))
                    navigate("/")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const verifyUser=()=>{
        if(!cookies.jwt){
            navigate("/login")
        }else{
            navigate("/")
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
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3'>
                <label htmlFor="email" className='block text-base mb-2'>Email</label>
                <input type="email" name="email" className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' placeholder='Email' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
                {...register("email", {
                    required: "email is required",
                    pattern: {
                        value: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
                        message: "invalid email ",
                    },
                })}
                />
                <p className='text-sm text-red-700'>{errors.email?.message}</p>
            </div>
            <div className='mb-3'>
                <label htmlFor="password" className='block text-base mb-2'>Password</label>
                <input type="password" name="password" className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' placeholder='Password' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
                {...register("password", {
                    required: "password is required",
                    pattern: {
                        value: /^(?=.*[a-zA-Z0-9]).{3,14}$/,
                        message: "password must be 3 to 14 characters ",
                    },
                })}
                />
                <p className='text-sm text-red-700'>{errors.password?.message}</p>
            </div>
            <div className='mt-3 flex justify-between items-center'>
                <div>
                    <Link to="/register">Register</Link>
                </div>
                <div>
                    <Link to="/otp_login">Otp-Login</Link>
                </div>
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
