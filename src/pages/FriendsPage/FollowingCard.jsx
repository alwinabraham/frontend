import React,{useState,useEffect} from 'react'
import axios from 'axios'
import NameComponent from '../mainPage/NameComponent';

export default function UsersFriendsCard(props) {
  const [followers,setFollowers] = useState()

  const FollowersList = async()=>{
    try {            
        const {data} = await axios.post(`${import.meta.env.VITE_AXIOS_KEY}/following`,{
            userId:props.id
        })
        setFollowers(data)
    } catch (error) {}
  }

  useEffect(() => {
    FollowersList()
  },[])
  

  return (
    <>
      {followers?.map(obj=>(
        <>
          <div className="p-3 mt-8 border dark:border-gray-800 dark:bg-gray-800 rounded flex">
            <img className="w-20 h-20 mb-3 rounded-full shadow-lg" src={obj.imageName} />
            <div className="pl-3 dark:text-gray-200">
                <NameComponent userId={obj._id}/>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-100 dark:text-gray-900 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                    Remove
                </button>
            </div>
          </div>
          </>
      ))}
    </>
  )
}
