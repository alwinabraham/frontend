import React,{useRef, useState, useEffect} from 'react'

const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)

    if(minutes <= 10) minutes = "0" + minutes;
    if(seconds <= 10) seconds = "0" + seconds;
    return minutes + ":" + seconds

}

const CounterComponent = ({seconds}) => {
    
    const [countDown,setCountDown] = useState(seconds)
    const timerId = useRef()

    useEffect(() => {
        timerId.current = setInterval(()=>{
            setCountDown(prev => prev -1)
        },1000)

        return() => clearInterval(timerId.current)
    
    }, [])

    useEffect(()=>{
        if(countDown <= 0){
            clearInterval(timerId.current)
        }
    })
    
    return (
        <div>

            <button className='text-white'>{formatTime(countDown)}</button>
        
        </div>
    )
}

export default CounterComponent