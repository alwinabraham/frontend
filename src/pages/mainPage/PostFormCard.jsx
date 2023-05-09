import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setCheck } from '../../redux/userData'
import ProfileImageComponent from '../ProfileImagePage/ProfileImageComponent'

export default function PostFormCard() {

    const [file, setFile] = useState()
    const [caption, setCaption] = useState("")
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const submit = async event => {
        event.preventDefault()
        
        const formData = new FormData();
        formData.append("userId", user.user)
        formData.append("image", file)
        formData.append("caption", caption)
        
        const {data} = await axios.post(`${import.meta.env.VITE_AXIOS_KEY}/upload_post`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
        dispatch(setCheck({id:data._id}))
      setCaption("")
      setFile("")
      navigate("/")
    }
  
    const fileSelected = event => {
      const file = event.target.files[0]
        setFile(file)
    }

  return (
 
        <div className = 'dark:bg-gray-800 border dark:border-gray-800 rounded-md mb-5 overflow-hidden p-1 sm:p-2 md:p-3 xl:p-4'>
            <form onSubmit={submit}>
                <div className='flex justify-between gap-2 items-center'>
                <ProfileImageComponent userId={user?.user} />
                    <textarea value={caption} onChange={e => setCaption(e.target.value)} type="text" className='grow p-3 h-14 dark:bg-gray-700 border dark:border-gray-900 rounded-xl' placeholder={'Whats on your mind'} />
                    <div className='flex items-center'>
                        <input id="fileInput" onChange={fileSelected} type="file" className="hidden " accept="image/*"></input>
                        <label htmlFor="fileInput" className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:stroke-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <p className='dark:text-gray-200 hidden sm:block'>
                            Click to select an image
                            </p>
                        </label>
                    </div>
                </div>
                <div className='flex gap-3 items-center mt-2'>
                    <div>
                        <button className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        <p className='dark:text-gray-200 text-xs sm:text-sm md:text-base xl:text-xl'>People</p>
                        </button>
                    </div>
                    <div>
                        <button className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <p className='dark:text-gray-200 text-xs sm:text-sm md:text-base xl:text-xl'>Check in</p>
                        </button>
                    </div>
                    <div>
                        <button className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                        </svg>
                        <p className='dark:text-gray-200 text-xs sm:text-sm md:text-base xl:text-xl'>Mood</p>
                        </button>
                    </div>
                    <div className='grow text-right'>
                        <button type='submit' className='text-white bg-blue-400 px-1 text-xs xl:px-6 py-1 xl:text-md rounded-md'>Share</button>
                    </div>
                </div>
            </form>
        </div>
  )
}
