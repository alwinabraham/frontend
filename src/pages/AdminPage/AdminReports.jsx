import React,{useState,useEffect} from 'react'
import { getReportedPosts } from '../../api/AdminRequests'
import AdminBlockedPosts from './AdminBlockedPosts'
import AdminNav from './AdminNav'
import { useSelector } from 'react-redux'
import NavigationAdmin from './NavigationAdmin'

const AdminReports = () => {

  const [posts,setPosts] = useState()
  const user = useSelector((state)=>state.user)

  useEffect(() => {
    const getPosts = async () => {
      const {data} = await getReportedPosts()
      setPosts(data)
    }
    getPosts()
  }, [user])
  

  return (
    <>
      <AdminNav />
      <div className='flex'>
        <div className='w-2/12 bg-gray-700'>
          <NavigationAdmin />
        </div>
        <div className='w-8/12 bg-gray-600'>
          {posts && <AdminBlockedPosts posts={posts}/>}
        </div>
        <div className='w-2/12 bg-gray-700'>
        </div>
      </div>
    </>
  )
}

export default AdminReports