import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { getReplyComments, sendReply } from '../../api/CommentRequests'
import Timeago from 'react-timeago'
import NameComponent from '../mainPage/NameComponent'
import ProfileImageComponent from '../ProfileImagePage/ProfileImageComponent'

const ReplyComponent = ({commentId}) => {

    const [reply,setReply] = useState()
    const [replied,setReplied] = useState()
    const [show,setShow] = useState(false)
    const user = useSelector((state)=>state.user)

    const replyObj = {
        commentId:commentId,
        userId:user.user,
        comment:reply
    }

    const handleReply = async() =>{
        await sendReply(replyObj)
    }

    const ReplyComments = async () =>{
        const {data} = await getReplyComments({commentId:commentId})
        setReplied(data)
    }

    useEffect(() => {
        ReplyComments()
    }, [show])
    
    return (
        <>
            <div className='flex justify-end' onClick={()=>setShow(!show)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:stroke-gray-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
            </div>
            {show ?    
            <div>
                <div>
                {replied?.map(obj=>(
                    <div className='ml-9 flex justify-between'>
                        <div className='flex gap-2'>
                            <ProfileImageComponent userId={obj.userId} />
                            <div>
                            <div className='dark:text-gray-200'>
                                <NameComponent userId={obj.userId} />
                            </div>
                            <p className='mb-3 font-light dark:text-gray-200'>{obj.comment}</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-between dark:text-gray-200'>
                            <Timeago date={obj.createdAt} />
                        </div>
                    </div>
                ))}
                </div>
                <form onSubmit={handleReply}>
                    <div className='m-1 ml-6'>
                        <input className='border rounded-full p-2 mr-1 dark:bg-gray-700 dark:border-gray-800' name="reply" value={reply} onChange={(e)=>setReply(e.target.value)} placeholder='Reply' />
                        <button className='dark:text-gray-200' type='submit'>Send</button>
                    </div>
                </form>
            </div>:null}
        </>
    )
}

export default ReplyComponent