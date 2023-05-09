import React,{useState,useEffect} from 'react'
import NameComponent from '../mainPage/NameComponent';
import { useDispatch } from 'react-redux';
import { setCheck } from '../../redux/userData';
import { blockAPost } from '../../api/AdminRequests';

const AdminBlockedPosts = ({posts}) => {

    const dispatch = useDispatch()
    const [block,setBlock] = useState()
  
    const blockObj={
      postId:block,
    }
  
    const blockPost =async ()=>{
      try {
        const {data} = await blockAPost(blockObj)
        dispatch(setCheck({check:data?.id}))
      } catch (error) {
        console.log(error); 
      }
    }
  
    useEffect(() => {
      blockPost()
    }, [block])

    return (
        <div className=''>
        {posts.map(obj=>(
            <>
            <div className="p-3 mt-1 bg-white rounded flex justify-between border">
                <div className='flex items-center gap-7'>
                <img className="h-20 w-36 mb-3 shadow-lg" src={obj.post.imageName} />
                <p><NameComponent userId={obj._doc.userId}/></p>
                <p className='font-bold'>{obj._doc.reason}</p>
                </div>
                    <div className='flex items-center justify-between w-60'>
                    <div className='flex justify-around'>
                        <div>
                            <button 
                            onClick={()=>{setBlock(obj._doc.postId)}} 
                            className="items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                            {obj.post.status}
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </>
            ))}
        </div>
  )
}

export default AdminBlockedPosts