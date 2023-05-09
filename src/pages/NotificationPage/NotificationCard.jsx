import React from 'react'
import NameComponent from '../mainPage/NameComponent'
import Timeago from 'react-timeago'


export default function NotificationCard({notifications}) {
  return (
    <>
      {notifications.map(obj=>(
        <div className="w-full mt-1 p-3 sm:mt-2 bg-white rounded flex dark:bg-gray-800">
            <div tabindex="0" aria-label="heart icon" role="img" className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center dark:bg-gray-200">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00059 3.01934C9.56659 1.61334 11.9866 1.66 13.4953 3.17134C15.0033 4.68334 15.0553 7.09133 13.6526 8.662L7.99926 14.3233L2.34726 8.662C0.944589 7.09133 0.997256 4.67934 2.50459 3.17134C4.01459 1.662 6.42992 1.61134 8.00059 3.01934Z" fill="#EF4444" />
                </svg>
            </div>
            <div className="pl-3">
                <div className='flex text-xs sm:text-sm md:text-base xl:text-xl dark:text-gray-300'><NameComponent userId={obj.userId}/><p>__</p>{obj.notification}<p>__</p>item</div>
                <p tabindex="0" className="focus:outline-none text-xs sm:text-sm md:text-base xl:text-xl'leading-3 pt-1 text-gray-500 dark:text-gray-300"><Timeago date={obj.createdAt} /></p>
            </div>
        </div>
      ))}
    </>
  )
}
