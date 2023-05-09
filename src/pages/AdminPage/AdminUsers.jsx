import React,{useEffect,useState} from 'react'
import { getAllUsers } from '../../api/AdminRequests'
import AdminBlockList from './AdminBlockList'
import AdminNav from './AdminNav'
import { useSelector } from 'react-redux'
import NavigationAdmin from './NavigationAdmin'

const AdminUsers = () => {

  const [value,setValue] = useState()
  const user = useSelector((state)=>state.user)

  useEffect(() => {
    const usersData = async () =>{
      const {data} = await getAllUsers()
      setValue(data)
    }
    usersData()
  }, [user])
  
  return (
  <>
      <AdminNav />
      <div className='flex'>
        <div className='w-2/12 bg-gray-700'>
          <NavigationAdmin />
        </div>
        <div className='w-8/12 bg-gray-600'>
          {value && <AdminBlockList user={value}/>}
        </div>
        <div className='w-2/12 bg-gray-700'>
        </div>
      </div>
  </>
  )
}

export default AdminUsers