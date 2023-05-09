import React,{useState,useEffect} from 'react'
import axios from 'axios'
import NavigationCard from './mainPage/NavigationCard'
import Search from './search/search'
import ProfileCover from './mainPage/ProfileCover'
import ProfilePostCard from './ProfilePage/ProfilePostCard'
import { getSearchUser } from '../api/SearchPageRequests'
import DarkMode from './mainPage/DarkMode'

const SearchPage = () => {

    const [posts,setPosts] = useState()
    const [SearchUser,setSearchUser] = useState()
    const [check,setCheck] = useState()
    
    const verifyUser = async ()=>{
        const {data} = await getSearchUser({searchId:localStorage.getItem("targetId")})
        setSearchUser(data)
    }

    const fetchPosts = async()=>{
        try {
            const {data} =  await axios.post(`${import.meta.env.VITE_AXIOS_KEY}/profile_post`,{
                userId:localStorage.getItem("targetId")
            })
            if(data.length == 0){
              setCheck(check+1)
            }else{
              setPosts(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [check])

    useEffect(() => {
        verifyUser()
      },[])
    
    return (
        <div className='flex mt-4 max-w-8xl sm:mx-5 sm:gap-6'>
        <div className='w-2/12'>
            <NavigationCard />
            <DarkMode />
        </div>
        <div className='xl:w-8/12 md:w-10/12 w-10/12'>
            <Search />
            {SearchUser && <ProfileCover data={SearchUser} post={posts} />}
            {posts && <ProfilePostCard post={posts} />}
            </div>
        </div>
    )
}

export default SearchPage