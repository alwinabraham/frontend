import React,{useEffect,useState} from 'react'
import { commentCount } from '../../api/PostRequests'

const CommentCountComponent = ({postId}) => {

    const [count,setCount] = useState()

    const getCommentCount = async () => {
        const {data} = await commentCount({postId:postId})
        setCount(data)
    }

    useEffect(() => {
        getCommentCount()
    }, [])
    

    return (
        <div>
            {count}
        </div>
    )
}

export default CommentCountComponent