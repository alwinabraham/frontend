import React,{useState,useEffect} from 'react'
import { getImage } from '../../api/NameRequests';

const ProfileAvatar = ({userId}) => {

    const [image,setImage] = useState()

    useEffect(() => {
        const getUserImage = async () => {
            const {data} = await getImage({userId})
            setImage(data.imageName)
        }
        getUserImage()
    }, [])
    
    return (
        <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 xl:w-36 xl:h-36 rounded-full overflow-hidden`}>
            <img src={image} />    
        </div>  
    )
    }

export default ProfileAvatar