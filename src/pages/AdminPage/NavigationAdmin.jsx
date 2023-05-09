import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'

export default function NavigationAdmin() {

    const nonActiveElement = 'flex gap-3 py-1 my-2 hover:bg-gray-900 hover:bg-opacity-20 -mx-4 px-4 rounded-md transition-all hover:scale-110'

    const navigate = useNavigate();
    const [cookies,setCookie,removeCookie] = useCookies([])

    const logout = () =>{
        removeCookie("adminjwt")
        navigate("/admin")
    }

    return (
        <div className='sticky top-0 bg-gray-700'>
                <div className='px-4 py-2 m-2'>
                    <h2 className='text-gray-200 mb-3'>Navigation</h2>
                    <Link to="/admin/dashboard" className={nonActiveElement}>
                        <div className='flex gap-2 items-center m-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <p className='text-gray-200'>Dashboard</p>
                        </div>
                    </Link>
                    <Link to="/admin/userDetails" className={nonActiveElement}>
                        <div className='flex gap-2 items-center m-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                            <p className='text-gray-200'>Users</p>
                        </div>
                    </Link>
                    <Link to="/admin/reports" className={nonActiveElement}>
                        <div className='flex gap-2 items-center m-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                            <p className='text-gray-200'>Reports</p>
                        </div>
                    </Link>
                    <div className='flex gap-2 items-center m-2'>
                        <a onClick={logout} className={nonActiveElement}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            <p className='text-gray-200'>Logout</p>
                        </a>
                    </div>
                </div>
        </div>
  )
}
