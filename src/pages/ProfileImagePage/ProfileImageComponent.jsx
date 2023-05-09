import React,{useState,useEffect} from 'react'
import { getImage } from '../../api/NameRequests';

const ProfileImageComponent = ({userId,size}) => {

    const [image,setImage] = useState()

    useEffect(() => {
        const getUserImage = async () => {
            const {data} = await getImage({userId})
            setImage(data.imageName)
        }
        getUserImage()
    }, [])
    
    return (
        <div className='rounded-md overflow-hidden'>
            {size? 
                <img className='w-36 rounded-full overflow-hidden' src={image} />
                :
                <img className='w-12 rounded-full overflow-hidden' src={image} />
            }
        </div>  
    )
    }

export default ProfileImageComponent