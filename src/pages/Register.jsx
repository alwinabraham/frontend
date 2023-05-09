import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {ToastContainer,toast} from "react-toastify"
import axios from 'axios';
//import  PhoneInput  from "react-phone-input-2"
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/userData';

export default function Register() {

    const [name, setName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [file, setFile] = useState()
    const [password, setPassword] = useState("")
    const [repeatPassword,setRepeatPassword] = useState("")
    const [phoneno,setPhoneno] = useState()
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const generateError = (err) => toast.error(err,{
        position:"bottom-right"
    })

    const handleSubmit = async e =>{
        e.preventDefault()

        if(!name || !lastName || !email || !password || !repeatPassword || !phoneno){
            generateError("Please fill in all fields")
            return
        }
        if(!email.includes('@')){
            generateError("Please enter a valid email address")
            return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            generateError("Please enter a valid email address");
            return;
        }
        if (password !== repeatPassword) {
            generateError("Passwords do not match")
            return
          }
        if (!/^[a-zA-Z]+$/.test(name) || !/^[a-zA-Z]+$/.test(lastName)) {
            generateError("Name and last name should contain only letters");
            return;
        }
  
        const formData = new FormData();
        formData.append("name", name)
        formData.append("lastName",lastName)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("phoneno", phoneno)
        formData.append("image", file)
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_AXIOS_KEY}/register`, formData ,{ headers: {'Content-Type': 'multipart/form-data'}})
            if(data){
                if(data.errors){
                    const {name,lastName,email,password,phoneno,image} = data.errors;
                    if(name) generateError(name)
                    else if(lastName) generateError(lastName)
                    else if(email) generateError(email)
                    else if(password) generateError(password)
                    else if(phoneno) generateError(phoneno)
                    else if(image) generateError(image)
                }else{
                    dispatch(setLogin({user:data.user}))
                    navigate("/")
                }
            }
            }catch (error) {
            console.log(error);
        }
    }

    const fileSelected = event => {
        const file = event.target.files[0]
            setFile(file)
      }

  return (
    <div className="flex justify-center items-center h-screen bg-emerald-900">
    <div className='w-96 p-6 shadow-lg bg-white rounded-md'>
        <h1 className='text-3xl block text-center font-semibold'>Register</h1>
        <hr className='mb-3'></hr>
        <form onSubmit={handleSubmit}>
        <div className='mb-3'>
            <label htmlFor="name" className='block text-base mb-2'>First Name</label>
            <input type="name" name="name" 
            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' 
            placeholder='First Name' value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className='mb-3'>
            <label htmlFor="name" className='block text-base mb-2'>Last Name</label>
            <input type="name" name="name" 
            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' 
            placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
        <div className='mb-3'>
            <label htmlFor="email" className='block text-base mb-2'>Email</label>
            <input type="email" name="email" 
            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' 
            placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className='mb-3'>
            <label htmlFor="password" className='block text-base mb-2'>Password</label>
            <input type="password" name="password" 
            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' 
            placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className='mb-3'>
            <label htmlFor="repeatPassword" className='block text-base mb-2'>Repeat Password</label>
            <input type="password" name="repeatPassword" 
            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' 
            placeholder='Repeat Password' value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} />
        </div>
        <div className='mb-3'>
            <label htmlFor="phoneno" className='block text-base mb-2'>Phone Number</label>
            {/* <PhoneInput country={"in"} value={phoneno} onChange={setPhoneno} /> */}
            <input type="text" name="phoneno" 
            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' 
            placeholder='phoneno' value={phoneno} onChange={(e)=>setPhoneno(e.target.value)} />

        </div>
        <div className='mt-3 flex justify-between items-center'>
            <div>
            Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
        <div className="mt-5">
            <input onChange={fileSelected} type="file" accept="image/*"></input>
        </div>
        <div className="mt-5">
            <button type='submit' className='border-2 border-emerald-700 bg-emerald-600 text-white py-1 px-5 w-full rounded-md hover:bg-transparent hover:text-emerald-700 font-semibold'>Register</button>
        </div>

        </form>
    </div>
    <ToastContainer />
</div>
  )
}
