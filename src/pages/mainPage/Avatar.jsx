import React from 'react'

export default function Avatar(props) {

  const file = props.file

  return (
    <div className={`w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 xl:w-16 xl:h-16 rounded-full overflow-hidden`}>
        <img src={file} />
    </div>
  )
}
