import React,{useEffect,useState} from 'react'
import { getNameUser } from '../../api/NameRequests'
import { useSelector } from 'react-redux' 
import NameComponent from '../mainPage/NameComponent'

const ShareNameComponent = (props) => {
    
    const [name,setName] = useState()
    const [lastName,setLastName] = useState()

    useEffect(() => {
      const getUserName = async ()=>{
        const {data} = await getNameUser(props)
        setName(data.name)
        setLastName(data.lastName)
      }
      getUserName() 
    }, [])
        
    return (
        <div>
            {name} {lastName}
        </div>
    )
}

export default ShareNameComponent