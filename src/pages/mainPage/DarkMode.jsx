import React,{useEffect, useState} from 'react'

const DarkMode = () => {
    const [theme,setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme"):"system")
    const element = document.documentElement
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const options = [
        {
            icon:"M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z",
            text:'light'
        },
        {
            icon:'M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z',
            text:'dark'
        },
        {
            icon:"M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5z",
            text:"system"
        }
    ]

    useEffect(()=>{
        switch (theme) {
            case "dark":
                element.classList.add('dark')
                localStorage.setItem("theme","dark")
                break;
            case "light":
                element.classList.remove('dark')
                localStorage.setItem("theme","light")
                break;
            default:
                localStorage.removeItem("theme")
                onWindowMatch()
                break;
        }
    },[theme])

    function onWindowMatch(){
        if(localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)){
            element.classList.add("dark")
        }else{
            element.classList.remove("dark")
        }
    }
    onWindowMatch()

    darkQuery.addEventListener("change",(e)=>{
        if(!("theme" in localStorage)){
            if(e.matches){
                element.classList.add("dark")
            }else{
                element.classList.remove("dark")
            }
        }
    })

    return (
        <div className='items-center duration-100 dark:bg-gray-800 bg-gray-100 rounded-xl mt-1 pl-3 sticky top-80 md:flex md:justify-around'>
            {
                options?.map(opt=>(
                <button key={opt.text} onClick={()=>setTheme(opt.text)} className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${theme === opt.text && "text-sky-600" }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path d={opt.icon} />
                    </svg>
                </button>
                ))
            }  
        </div>
    )
}

export default DarkMode